import { CreateProductDiscountRangeUseCase } from "@modules/features/products/assigments/product-discounts-ranges/application/use-cases/create-product-discount-range.usecase";
import { GetProductInputByIdProductInputUseCase } from "../../assigments/product-input/application/use-cases/get-product-input-by-id-product-input.usecase";
import { CreateProductProcessUseCase } from "@modules/features/products/assigments/product-process/application/use-cases/create-product-process.usecase";
import { CreateProductInputProcessUseCase } from "../../assigments/product-input-process/application/use-cases/create-product-input-process.usecase";
import { CreateProductInputUseCase } from "@modules/features/products/assigments/product-input/application/use-cases/create-product-input.usecase";
import { IProductDiscountRangeRepository } from "../../assigments/product-discounts-ranges/domain/product-discount-range.repository.interface";
import { IProductInputProcessRepository } from "../../assigments/product-input-process/domain/product-input-process.repository.interface";
import { GetByIdProductsQueryOrchestratorUseCase } from "../../query/application/usecase/get-by-id-product-query-orchestrator.usecase";
import { IProductProcessRepository } from "../../assigments/product-process/domain/product-process.repository.interface";
import { IProductInputRepository } from "../../assigments/product-input/domain/product-input.repository.interface";
import { CreateProductUseCase } from "@modules/core/product/application/use-cases/create-product.usecase";
import { CreateProcessUseCase } from "@modules/core/process/application/use-cases/create-process.usecase";
import { IProductRepository } from "@modules/core/product/domain/product.repository.interface";
import { ProductInputProps } from "../../assigments/product-input/domain/product-input.types";
import { IInputRepository } from "@modules/core/input/domain/input.repository.interface";
import { IProductQueryRepository } from "../../query/domain/product-query.repository";
import { IProcessRepository } from "@modules/core/process/domain/process.repository";
import { ProductProps } from "@src/modules/core/product/domain/product.types";
import { ProcessProps } from "@src/modules/core/process/domain/process.types";
import { IFileCleanupPort } from "@src/shared/files/file-cleanup.port";
import { sequelize } from "@src/config/mysql/sequelize";
import HttpError from "@shared/errors/http/http-error";
import {
    ProductProcessCreateOrchestrator, ProductOrchestratorCreate, ProductProcessOrchestratorAssignExisting,
    ProductProcessOrchestratorCreateNew, ProductOrchestrator, ProductProcessProps,
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
    fileCleanup: IFileCleanupPort,
    productQuery: IProductQueryRepository,
}

export class CreateProductOrchestratorUseCase {

    // * CASOS DE USO PARA PRODUCTO
    private readonly createProductUseCase: CreateProductUseCase;
    private readonly getProductOrchestrator: GetByIdProductsQueryOrchestratorUseCase;
    // * CASOS DE USO PARA PROCESS
    private readonly createProcessUseCase: CreateProcessUseCase;
    // * CASOS DE USO PARA PRODUCTO-INPUT
    private readonly getProductInputByProductInputUseCase: GetProductInputByIdProductInputUseCase;
    private readonly createProductInputUseCase: CreateProductInputUseCase;
    // * CASOS DE USO PARA PRODUCT-PROCESS
    private readonly createProductProcessUseCase: CreateProductProcessUseCase;
    // * CASOS DE USO DE PRODUCT-DISCOUNT-RANGE
    private readonly createProductDiscountRangeUseCase: CreateProductDiscountRangeUseCase;
    // * CASOS DE USO PARA PRODUCTO-INPUT-PROCESS
    private readonly createProductInputProcessUseCase: CreateProductInputProcessUseCase;
    // * MANEJO DE IMAGENES
    private readonly fileCleanup: IFileCleanupPort;

    constructor({
        productRepo, discountRangeRepo, productInputRepo, productProcessRepo,
        inputRepo, processRepo, productInputProcessRepo, fileCleanup, productQuery
    }: CreateProductOrchestratorUseCaseProps) {

        // * CASOS DE USO PARA PRODUCTO
        this.createProductUseCase = new CreateProductUseCase(productRepo);
        this.getProductOrchestrator = new GetByIdProductsQueryOrchestratorUseCase(productQuery);
        // * CASOS DE USO PARA PROCESS
        this.createProcessUseCase = new CreateProcessUseCase(processRepo);
        // * CASOS DE USO PARA PRODUCTO-INPUT
        this.getProductInputByProductInputUseCase = new GetProductInputByIdProductInputUseCase(productInputRepo);
        this.createProductInputUseCase = new CreateProductInputUseCase(productInputRepo, productRepo, inputRepo);
        // * CASOS DE USO PARA PRODUCT-PROCESS
        this.createProductProcessUseCase = new CreateProductProcessUseCase(productProcessRepo, productRepo, processRepo);
        // * CASOS DE USO DE PRODUCT-DISCOUNT-RANGE
        this.createProductDiscountRangeUseCase = new CreateProductDiscountRangeUseCase(discountRangeRepo, productRepo);
        // * CASOS DE USO PARA PRODUCTO-INPUT-PROCESS
        this.createProductInputProcessUseCase = new CreateProductInputProcessUseCase(
            productInputProcessRepo, productRepo,
            productInputRepo, productProcessRepo

        );
        // * MANEJO DE IMAGENES
        this.fileCleanup = fileCleanup;
    };

    async execute(data: ProductOrchestratorCreate): Promise<ProductOrchestrator> {

        const tx: Transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
        });
        let createdProductId: number | null = null;

        try {
            // --------------------------------------------------
            // |🔹 DESTRUCTATION                                |
            // --------------------------------------------------
            const { product, product_discount_ranges, product_processes, products_inputs } = data;

            const safeProductsInputs = products_inputs ?? [];
            const safeProductProcesses = product_processes ?? []
            const safeProductDiscountRanges = product_discount_ranges ?? [];

            // --------------------------------------------------
            // |🔹 PRODUCT                                      |
            // --------------------------------------------------
            const productCreateResponse: ProductProps = await this.createProductUseCase.execute(product, tx);
            createdProductId = productCreateResponse.id;

            // --------------------------------------------------
            // |🔹 PRODUCT-INPUT                                |
            // --------------------------------------------------
            for (const pi of safeProductsInputs) {
                await this.createProductInputUseCase.execute({
                    input_id: pi.input_id,
                    equivalence: pi.equivalence,
                    product_id: productCreateResponse.id,
                }, tx);
            };

            // --------------------------------------------------
            // |🔹 PRODUCT-PROCESS                              |
            // --------------------------------------------------

            const productProcessForAssign: ProductProcessOrchestratorAssignExisting[] = safeProductProcesses.filter((pp: ProductProcessCreateOrchestrator): pp is ProductProcessOrchestratorAssignExisting =>
                ("process_id" in pp) && typeof pp.process_id === "number"
            );
            const productProcessForCreate = safeProductProcesses.filter((pp): pp is ProductProcessOrchestratorCreateNew =>
                !("process_id" in pp && typeof pp.process_id === "number") && ("process" in pp)
            );

            // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            // |🔸 ASIGNAR PROCESO EXISTENTE                    |
            // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            for (const pp of productProcessForAssign) {
                const { product_input_process, process, product: _p, ...ppFlat } = pp;

                const productProcessCreateResponse: ProductProcessProps = await this.createProductProcessUseCase.execute({
                    ...ppFlat,
                    product_id: productCreateResponse.id,
                }, tx);

                if (product_input_process?.length) {
                    for (const pip of product_input_process) {
                        const productInputResponse: ProductInputProps | null = await this.getProductInputByProductInputUseCase.execute(productCreateResponse.id, pip.product_input.input_id, tx);
                        if (!productInputResponse) throw new HttpError(404,
                            `El insumo con ID ${pip.product_input.input_id} no está asignado al producto con ID ${productCreateResponse.id}.`
                        );
                        await this.createProductInputProcessUseCase.execute({
                            qty: pip.qty,
                            product_input_id: productInputResponse.id,
                            product_process_id: productProcessCreateResponse.id,
                            product_id: productCreateResponse.id,
                        }, tx);
                    }
                }
            }

            // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            // |🔸 CREAR UN NUEVO PROCESO                       |
            // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            for (const pp of productProcessForCreate) {
                const { product_input_process, process, sort_order } = pp;

                const processCreateResponse: ProcessProps = await this.createProcessUseCase.execute(process, tx);

                const productProcessCreateResponse: ProductProcessProps = await this.createProductProcessUseCase.execute({
                    process_id: processCreateResponse.id,
                    product_id: productCreateResponse.id,
                    sort_order,
                }, tx);

                if (product_input_process?.length) {
                    for (const pip of product_input_process) {
                        const productInputResponse: ProductInputProps | null = await this.getProductInputByProductInputUseCase.execute(productCreateResponse.id, pip.product_input.input_id, tx);
                        if (!productInputResponse) throw new HttpError(404,
                            `El insumo con ID ${pip.product_input.input_id} no está asignado al producto con ID ${productCreateResponse.id}.`
                        );
                        await this.createProductInputProcessUseCase.execute({
                            qty: pip.qty,
                            product_input_id: productInputResponse.id,
                            product_process_id: productProcessCreateResponse.id,
                            product_id: productCreateResponse.id,
                        }, tx);
                    }
                }
            }

            // --------------------------------------------------
            // |🔹 PRODUCT-DISCOUNT-RANGE                       |
            // --------------------------------------------------
            for (const pdr of safeProductDiscountRanges) {
                await this.createProductDiscountRangeUseCase.execute({
                    ...pdr,
                    product_id: productCreateResponse.id,
                }, tx);
            }

            // --------------------------------------------------
            // |🔹 COMMIT + RESPONSE                            |
            // --------------------------------------------------
            const productOrchestrator: ProductOrchestrator | null = await this.getProductOrchestrator.execute(productCreateResponse.id, tx);
            if (!productOrchestrator)
                throw new HttpError(500, "No se pudo acceder al producto despues de haber sido creado.");
            await tx.commit();
            return productOrchestrator;

        } catch (error: unknown) {
            await tx.rollback();
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