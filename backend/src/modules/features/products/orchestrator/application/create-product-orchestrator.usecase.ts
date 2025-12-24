import { CreateProductDiscountRangeUseCase } from "@modules/features/products/assigments/product-discounts-ranges/application/use-cases/create-product-discount-range.usecase";
import { CreateProductProcessUseCase } from "@modules/features/products/assigments/product-process/application/use-cases/create-product-process.usecase";
import { CreateProductInputProcessUseCase } from "../../assigments/product-input-process/application/use-cases/create-product-input-process.usecase";
import { CreateProductInputUseCase } from "@modules/features/products/assigments/product-input/application/use-cases/create-product-input.usecase";
import { IProductDiscountRangeRepository } from "../../assigments/product-discounts-ranges/domain/product-discount-range.repository.interface";
import { IProductInputProcessRepository } from "../../assigments/product-input-process/domain/product-input-process.repository.interface";
import { ProductDiscountRangeProps } from "../../assigments/product-discounts-ranges/domain/product-discount-range.types";
import { IProductProcessRepository } from "../../assigments/product-process/domain/product-process.repository.interface";
import { ProductInputProcessProps } from "../../assigments/product-input-process/domain/product-input-process.types";
import { IProductInputRepository } from "../../assigments/product-input/domain/product-input.repository.interface";
import { CreateProductUseCase } from "@modules/core/product/application/use-cases/create-product.usecase";
import { CreateProcessUseCase } from "@modules/core/process/application/use-cases/create-process.usecase";
import { IProductRepository } from "@modules/core/product/domain/product.repository.interface";
import { ProductInputProps } from "../../assigments/product-input/domain/product-input.types";
import { IInputRepository } from "@modules/core/input/domain/input.repository.interface";
import { IProcessRepository } from "@modules/core/process/domain/process.repository";
import { ProductProps } from "@src/modules/core/product/domain/product.types";
import { IFileCleanupPort } from "@src/shared/files/file-cleanup.port";
import { sequelize } from "@src/config/mysql/sequelize";
import HttpError from "@shared/errors/http/http-error";
import {
    ProductProcessCreateOrchestrator, ProductProcessOrchestratorBase,
    ProductOrchestratorCreate, ProductOrchestratorResponse,
    ProductProcessAssignExisting, ProductProcessCreateNew,
} from "../domain/product-orchestrator.types";
import { Transaction } from "sequelize";

interface CreateProductOrchestratorUseCaseProps {
    productRepo: IProductRepository,
    inputRepo: IInputRepository,
    productProcessRepo: IProductProcessRepository,
    productInputRepo: IProductInputRepository,
    discountRangeRepo: IProductDiscountRangeRepository,
    processRepo: IProcessRepository,
    productInputProcessRepo: IProductInputProcessRepository,
    fileCleanup: IFileCleanupPort
}

export class CreateProductOrchestratorUseCase {

    private readonly createProductUseCase: CreateProductUseCase;
    private readonly createProductInputUseCase: CreateProductInputUseCase;
    private readonly fileCleanup: IFileCleanupPort;
    private readonly createProductProcessUseCase: CreateProductProcessUseCase;
    private readonly createProductDiscountRangeUseCase: CreateProductDiscountRangeUseCase;
    private readonly createProductInputProcessUseCase: CreateProductInputProcessUseCase;
    private readonly createProcess: CreateProcessUseCase;

    constructor({
        productRepo, discountRangeRepo, productInputRepo, productProcessRepo,
        inputRepo, processRepo, productInputProcessRepo, fileCleanup
    }: CreateProductOrchestratorUseCaseProps) {
        this.createProductUseCase = new CreateProductUseCase(productRepo);
        this.createProductInputUseCase = new CreateProductInputUseCase(productInputRepo, productRepo, inputRepo);
        this.createProductProcessUseCase = new CreateProductProcessUseCase(productProcessRepo, productRepo, processRepo);
        this.createProductDiscountRangeUseCase = new CreateProductDiscountRangeUseCase(discountRangeRepo, productRepo);
        this.createProcess = new CreateProcessUseCase(processRepo);
        this.createProductInputProcessUseCase = new CreateProductInputProcessUseCase(
            productInputProcessRepo, productRepo,
            productInputRepo, productProcessRepo

        );
        this.fileCleanup = fileCleanup;
    };

    async execute(data: ProductOrchestratorCreate): Promise<ProductOrchestratorResponse> {
        const transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
        });

        const { product, product_discount_ranges, product_processes, products_inputs } = data;

        // ✅ estado mínimo para compensación (filesystem cleanup)
        let createdProductId: number | null = null;

        try {
            // ------------------------------------------------------------------
            // 1) Producto (const dentro del try → TS strict feliz)
            // ------------------------------------------------------------------
            const createdProduct: ProductProps = await this.createProductUseCase.execute(product, transaction);
            createdProductId = createdProduct.id;

            // ------------------------------------------------------------------
            // 2) ProductInputs
            // ------------------------------------------------------------------
            const productInputResponses: ProductInputProps[] = [];
            for (const pi of products_inputs) {
                const createdPi = await this.createProductInputUseCase.execute(
                    {
                        input_id: pi.input_id,
                        equivalence: pi.equivalence,
                        product_id: createdProduct.id,
                    },
                    transaction
                );
                productInputResponses.push(createdPi);
            }

            // ✅ Map en memoria: input_id → product_input_id (evita el 404 por lectura sin tx)
            const productInputIdByInputId = new Map<number, number>();
            for (const pi of productInputResponses) {
                productInputIdByInputId.set(pi.input_id, pi.id);
            }

            // ------------------------------------------------------------------
            // 3) ProductProcesses + ProductInputProcess
            // ------------------------------------------------------------------
            const isAssignExisting = (pp: ProductProcessCreateOrchestrator): pp is ProductProcessAssignExisting =>
                "process_id" in pp && typeof pp.process_id === "number";

            const isCreateNew = (pp: ProductProcessCreateOrchestrator): pp is ProductProcessCreateNew =>
                !("process_id" in pp) && "process" in pp;

            const productProcessForAssign = product_processes.filter(isAssignExisting);
            const productProcessForCreate = product_processes.filter(isCreateNew);

            const productProcessResponses: ProductProcessOrchestratorBase[] = [];

            // --- A) Asignar process existente ---
            for (const pp of productProcessForAssign) {
                const { product_input_process, process, product: _p, ...ppFlat } = pp;

                const createdPP = await this.createProductProcessUseCase.execute(
                    {
                        ...ppFlat,
                        product_id: createdProduct.id,
                    },
                    transaction
                );

                const pipResponses: ProductInputProcessProps[] = [];

                if (product_input_process?.length) {
                    for (const pip of product_input_process) {
                        const productInputId = productInputIdByInputId.get(pip.product_input.input_id);

                        if (!productInputId) {
                            throw new HttpError(
                                404,
                                `El insumo con ID ${pip.product_input.input_id} no está asignado al producto con ID ${createdProduct.id}.`
                            );
                        }

                        const createdPip = await this.createProductInputProcessUseCase.execute(
                            {
                                qty: pip.qty,
                                product_input_id: productInputId,
                                product_process_id: createdPP.id,
                                product_id: createdProduct.id,
                            },
                            transaction
                        );

                        pipResponses.push(createdPip);
                    }
                }

                productProcessResponses.push({
                    ...createdPP,
                    product_input_process: pipResponses,
                });
            }

            // --- B) Crear process nuevo ---
            for (const pp of productProcessForCreate) {
                const { product_input_process, process, sort_order } = pp;

                const createdProcess = await this.createProcess.execute(process, transaction);

                const createdPP = await this.createProductProcessUseCase.execute(
                    {
                        process_id: createdProcess.id,
                        product_id: createdProduct.id,
                        sort_order,
                    },
                    transaction
                );

                const pipResponses: ProductInputProcessProps[] = [];

                if (product_input_process?.length) {
                    for (const pip of product_input_process) {
                        const productInputId = productInputIdByInputId.get(pip.product_input.input_id);

                        if (!productInputId) throw new HttpError(
                            404,
                            `El insumo con ID ${pip.product_input.input_id} no está asignado al producto con ID ${createdProduct.id}.`
                        );

                        const createdPip = await this.createProductInputProcessUseCase.execute(
                            {
                                qty: pip.qty,
                                product_input_id: productInputId,
                                product_process_id: createdPP.id,
                                product_id: createdProduct.id,
                            },
                            transaction
                        );

                        pipResponses.push(createdPip);
                    }
                }

                productProcessResponses.push({
                    ...createdPP,
                    product_input_process: pipResponses,
                });
            }

            // ------------------------------------------------------------------
            // 4) DiscountRanges
            // ------------------------------------------------------------------
            const productDiscountRangeResponses: ProductDiscountRangeProps[] = [];
            for (const pdr of product_discount_ranges) {
                const createdPdr = await this.createProductDiscountRangeUseCase.execute(
                    {
                        ...pdr,
                        product_id: createdProduct.id,
                    },
                    transaction
                );
                productDiscountRangeResponses.push(createdPdr);
            }

            // ------------------------------------------------------------------
            // 5) Commit + Response
            // ------------------------------------------------------------------
            await transaction.commit();

            return {
                product: {
                    ...createdProduct,
                    created_at: createdProduct.created_at.toISOString(),
                    updated_at: createdProduct.updated_at.toISOString(),
                },
                products_inputs: productInputResponses,
                product_processes: productProcessResponses,
                product_discount_ranges: productDiscountRangeResponses.map((x) => ({
                    ...x,
                    created_at: x.created_at.toISOString(),
                    updated_at: x.updated_at.toISOString(),
                })),
            };
        } catch (error) {
            await transaction.rollback();
            try {
                if (createdProductId !== null) {
                    this.fileCleanup.scheduleCleanup(`products/${createdProductId}`);
                }
            } catch (cleanupErr) {
                console.error("Cleanup scheduling failed:", cleanupErr);
            }

            throw error;
        }
    }
};