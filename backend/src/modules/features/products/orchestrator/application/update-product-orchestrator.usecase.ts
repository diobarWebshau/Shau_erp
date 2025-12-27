import {
    ProductDiscountRangeCreateOrchestrator, ProductDiscountRangeUpdateOrchestrator, ProductInputCreateOrchestrator,
    ProductInputUpdateOrchestrator, ProductProcessCreateOrchestrator, ProductProcessUpdateOrchestrator, ProductProcessOrchestratorAssignExisting,
    ProductProcessOrchestratorCreateNew, ProductInputProcessProps, ProductInputProcessCreateOrchestrator, ProductInputProcessUpdateOrchestrator,
    ProductOrchestrator
} from "../domain/product-orchestrator.types";
import { CreateProductDiscountRangeUseCase } from "@modules/features/products/assigments/product-discounts-ranges/application/use-cases/create-product-discount-range.usecase";
import { DeleteProductDiscountRangeUseCase } from "@modules/features/products/assigments/product-discounts-ranges/application/use-cases/delete-product-discount-range.usecase";
import { UpdateProductDiscountRangeUseCase } from "@modules/features/products/assigments/product-discounts-ranges/application/use-cases/update-product-discount-range.usecase";
import { GetProductInputByIdProductInputUseCase } from "../../assigments/product-input/application/use-cases/get-product-input-by-id-product-input.usecase";
import { CreateProductProcessUseCase } from "@modules/features/products/assigments/product-process/application/use-cases/create-product-process.usecase";
import { UpdateProductProcessUseCase } from "@modules/features/products/assigments/product-process/application/use-cases/update-product-process.usecase";
import { DeleteProductProcessUseCase } from "@modules/features/products/assigments/product-process/application/use-cases/delete-product-process.usecase";
import { CreateProductInputProcessUseCase } from "../../assigments/product-input-process/application/use-cases/create-product-input-process.usecase";
import { UpdateProductInputProcessUseCase } from "../../assigments/product-input-process/application/use-cases/update-product-input-process.usecase";
import { DeleteProductInputProcessUseCase } from "../../assigments/product-input-process/application/use-cases/delete-product-input-process.usecase";
import { DeleteProductInputUseCase } from "@modules/features/products/assigments/product-input/application/use-cases/delete-product-input.usecase";
import { CreateProductInputUseCase } from "@modules/features/products/assigments/product-input/application/use-cases/create-product-input.usecase";
import { UpdateProductInputUseCase } from "@modules/features/products/assigments/product-input/application/use-cases/update-product-input.usecase";
import { ProductDiscountRangeResponseDto } from "../../assigments/product-discounts-ranges/application/dto/product-discount-range.model.schema";
import { IProductDiscountRangeRepository } from "../../assigments/product-discounts-ranges/domain/product-discount-range.repository.interface";
import { IProductInputProcessRepository } from "../../assigments/product-input-process/domain/product-input-process.repository.interface";
import { GetByIdProductsQueryOrchestratorUseCase } from "@modules/query/product/application/usecase/get-by-id-product-query-orchestrator.usecase";
import { IProductProcessRepository } from "../../assigments/product-process/domain/product-process.repository.interface";
import { ProductInputCreateProps, ProductInputProps } from "../../assigments/product-input/domain/product-input.types";
import { IProductInputRepository } from "../../assigments/product-input/domain/product-input.repository.interface";
import { CreateProcessUseCase } from "@modules/core/process/application/use-cases/create-process.usecase";
import { UpdateProductUseCase } from "@modules/core/product/application/use-cases/update-product.usecase";
import { ProductProcessProps } from "../../assigments/product-process/domain/product-process.types";
import { IProductRepository } from "@modules/core/product/domain/product.repository.interface";
import { ProductProps, ProductUpdateProps } from "@modules/core/product/domain/product.types";
import { IInputRepository } from "@modules/core/input/domain/input.repository.interface";
import { IProcessRepository } from "@modules/core/process/domain/process.repository";
import { IProductQueryRepository } from "@modules/query/product/domain/product-query.repository";
import { ProductOrchestratorUpdateDTO } from "./product-orchestrator.model.schema";
import { ProcessProps } from "@modules/core/process/domain/process.types";
import { IFileCleanupPort } from "@shared/files/file-cleanup.port";
import HttpError from "@shared/errors/http/http-error";
import ImageHandler from "@helpers/imageHandlerClass";
import { sequelize } from "@config/mysql/sequelize";
import { Transaction } from "sequelize";


interface UpdateProductOrchestratorUseCaseProps {
    productRepo: IProductRepository,
    processRepo: IProcessRepository,
    inputRepo: IInputRepository,
    productProcessRepo: IProductProcessRepository,
    productInputRepo: IProductInputRepository,
    discountRangeRepo: IProductDiscountRangeRepository,
    productInputProcessRepo: IProductInputProcessRepository,
    fileCleanup: IFileCleanupPort,
    productQuery: IProductQueryRepository
}

export class UpdateProductOrchestratorUseCase {

    // * CASOS DE USO PARA PRODUCTO
    private readonly productRepo: IProductRepository;
    private readonly updateProductUseCase: UpdateProductUseCase;

    // * CASOS DE USO PARA PROCESS
    private readonly createProcessUseCase: CreateProcessUseCase;
    private readonly getProductOrchestrator: GetByIdProductsQueryOrchestratorUseCase;
    // * CASOS DE USO PARA PRODUCTO-INPUT
    private readonly getProductInputByProductInputUseCase: GetProductInputByIdProductInputUseCase;
    private readonly createProductInputUseCase: CreateProductInputUseCase;
    private readonly deleteProductInputUseCase: DeleteProductInputUseCase;
    private readonly updateProductInputUseCase: UpdateProductInputUseCase;
    // * CASOS DE USO PRODUCT-PROCESS
    private readonly createProductProcessUseCase: CreateProductProcessUseCase;
    private readonly deleteProductProcessUseCase: DeleteProductProcessUseCase;
    private readonly updateProductProcessUseCase: UpdateProductProcessUseCase;
    // * CASOS DE USO PARA PRODUCTO-INPUT-PROCESS
    private readonly createProductInputProcess: CreateProductInputProcessUseCase;
    private readonly updateProductInputProcess: UpdateProductInputProcessUseCase;
    private readonly deleteProductInputProcess: DeleteProductInputProcessUseCase;
    // * CASOS DE USO DE PRODUCT-DISCOUNT-RANGE
    private readonly createProductDiscountRangeUseCase: CreateProductDiscountRangeUseCase;
    private readonly deleteProductDiscountRangeUseCase: DeleteProductDiscountRangeUseCase;
    private readonly updateProductDiscountRangeUseCase: UpdateProductDiscountRangeUseCase;
    // * MANEJO DE IMAGENES
    private readonly fileCleanup: IFileCleanupPort;

    constructor({
        productInputRepo, discountRangeRepo, productProcessRepo, productRepo, processRepo,
        inputRepo, productInputProcessRepo, fileCleanup, productQuery
    }: UpdateProductOrchestratorUseCaseProps) {

        this.productRepo = productRepo;

        // * CASOS DE USO PARA PRODUCTO
        this.updateProductUseCase = new UpdateProductUseCase(productRepo);
        this.getProductOrchestrator = new GetByIdProductsQueryOrchestratorUseCase(productQuery);

        // * CASOS DE USO PARA PROCESS
        this.createProcessUseCase = new CreateProcessUseCase(processRepo);
        // * CASOS DE USO PARA PRODUCTO-INPUT
        this.getProductInputByProductInputUseCase = new GetProductInputByIdProductInputUseCase(productInputRepo);
        this.createProductInputUseCase = new CreateProductInputUseCase(productInputRepo, productRepo, inputRepo);
        this.deleteProductInputUseCase = new DeleteProductInputUseCase(productInputRepo);
        this.updateProductInputUseCase = new UpdateProductInputUseCase(productInputRepo);
        // * CASOS DE USO PRODUCT-PROCESS
        this.createProductProcessUseCase = new CreateProductProcessUseCase(productProcessRepo, productRepo, processRepo);
        this.updateProductProcessUseCase = new UpdateProductProcessUseCase(productProcessRepo);
        this.deleteProductProcessUseCase = new DeleteProductProcessUseCase(productProcessRepo);
        // * CASOS DE USO PARA PRODUCTO-INPUT-PROCESS
        this.createProductInputProcess = new CreateProductInputProcessUseCase(
            productInputProcessRepo, productRepo,
            productInputRepo, productProcessRepo
        );
        this.updateProductInputProcess = new UpdateProductInputProcessUseCase(productInputProcessRepo);
        this.deleteProductInputProcess = new DeleteProductInputProcessUseCase(productInputProcessRepo)
        // * CASOS DE USO DE PRODUCT-DISCOUNT-RANGE
        this.createProductDiscountRangeUseCase = new CreateProductDiscountRangeUseCase(discountRangeRepo, productRepo);
        this.updateProductDiscountRangeUseCase = new UpdateProductDiscountRangeUseCase(discountRangeRepo);
        this.deleteProductDiscountRangeUseCase = new DeleteProductDiscountRangeUseCase(discountRangeRepo);
        // * MANEJO DE IMAGENES
        this.fileCleanup = fileCleanup;

    };

    async execute(productId: number, data: ProductOrchestratorUpdateDTO): Promise<ProductOrchestrator> {

        const tx: Transaction = await sequelize.transaction({ isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ });

        let updatedProductId: number | null = null;

        // ✅ NUEVO: variables para lógica de imagen (sin afectar funcionalidad existente)
        let previousPhotoPath: string | null = null;
        let tmpPhotoPath: string | null = null;
        let finalPhotoPath: string | null = null;
        let removePhotoRequested: boolean = false;

        try {
            // --------------------------------------------------
            // |🔹 DESTRUCTATION                                |
            // --------------------------------------------------
            const { product, product_discount_ranges_manager, product_processes_manager, products_inputs_manager } = data

            // --------------------------------------------------
            // |🖼️ IMAGEN (MISMA LÓGICA QUE MÓDULO BASE)        |
            // --------------------------------------------------
            // - Se lee el estado actual para saber la foto previa
            // - Si viene una tmp ("products/tmp/..."), NO se guarda tmp en BD
            // - Se mueve a directorio final y se hace update técnico de "photo" en la misma TX
            // - La eliminación de la foto anterior se hace POST-COMMIT (fuera de TX)
            const existingProduct: ProductProps | null = await this.productRepo.findById(productId, tx);
            if (!existingProduct) {
                throw new HttpError(404, `El producto con ID ${productId} no fue posible encontrarlo.`);
            }

            previousPhotoPath = existingProduct.photo ?? null;
            // Detectar si el cliente pide borrar foto (photo: null explícito)
            removePhotoRequested = ("photo" in product) && (product.photo === null);

            // Detectar tmp desde body
            const incomingPhoto: string | null | undefined = product?.photo;
            const isTmpPhoto: boolean = typeof incomingPhoto === "string" && incomingPhoto.startsWith("products/tmp/");
            tmpPhotoPath = isTmpPhoto ? (incomingPhoto as string) : null;

            // Evitar persistir tmp en BD (exactamente como en tu controller)
            const safeProductUpdate: ProductUpdateProps = { ...product };
            if (tmpPhotoPath) {
                // ⛔ nunca guardar tmp en BD
                delete safeProductUpdate.photo;
            }

            // --------------------------------------------------
            // |🔹 PRODUCT                                      |
            // --------------------------------------------------
            const productUpdateResponse: ProductProps = await this.updateProductUseCase.execute(productId, safeProductUpdate, tx);
            updatedProductId = productUpdateResponse.id;

            // --------------------------------------------------
            // |🔹 MANAGERS                                     |
            // --------------------------------------------------
            const isChangeProductDiscountRange: boolean =
                (product_discount_ranges_manager?.added ?? []).length > 0 ||
                (product_discount_ranges_manager?.updated ?? []).length > 0 ||
                (product_discount_ranges_manager?.deleted ?? []).length > 0;

            const isChangeProductInput: boolean =
                (products_inputs_manager?.added ?? []).length > 0 ||
                (products_inputs_manager?.updated ?? []).length > 0 ||
                (products_inputs_manager?.deleted ?? []).length > 0;

            const isChangeProductProcess: boolean =
                (product_processes_manager?.added ?? []).length > 0 ||
                (product_processes_manager?.updated ?? []).length > 0 ||
                (product_processes_manager?.deleted ?? []).length > 0;

            // --------------------------------------------------
            // |🔹 PRODUCT-DISCOUNT-RANGE                       |
            // --------------------------------------------------
            if (isChangeProductDiscountRange) {
                const adds: ProductDiscountRangeCreateOrchestrator[] = product_discount_ranges_manager?.added ?? [];
                const deletes: ProductDiscountRangeResponseDto[] = product_discount_ranges_manager?.deleted ?? [];
                const updated: ProductDiscountRangeUpdateOrchestrator[] = product_discount_ranges_manager?.updated ?? [];

                if (adds.length) {
                    const newProductDiscountRange = adds.map((pdr) => ({
                        ...pdr,
                        product_id: productUpdateResponse.id
                    }))
                    for (const pdr of newProductDiscountRange) await this.createProductDiscountRangeUseCase.execute(pdr, tx);
                };

                if (updated.length) {
                    for (const pdr of updated) {
                        const { id: productDiscountRangeId, ...rest } = pdr;
                        await this.updateProductDiscountRangeUseCase.execute(productDiscountRangeId, rest, tx);
                    };
                }
                if (deletes.length) {
                    for (const pdr of deletes) {
                        const { id: productDiscountRangeId } = pdr;
                        await this.deleteProductDiscountRangeUseCase.execute(productDiscountRangeId, tx);
                    };
                }
            }

            // --------------------------------------------------
            // |🔹 PRODUCT-INPUT                                |
            // --------------------------------------------------
            if (isChangeProductInput) {
                const adds: ProductInputCreateOrchestrator[] = products_inputs_manager?.added ?? [];
                const deletes: ProductInputProps[] = products_inputs_manager?.deleted ?? [];
                const updated: ProductInputUpdateOrchestrator[] = products_inputs_manager?.updated ?? [];
                if (adds.length) {
                    const newProductInput: ProductInputCreateProps[] = adds.map((pi: ProductInputCreateOrchestrator) => ({
                        ...pi,
                        product_id: productUpdateResponse.id
                    }));
                    for (const pi of newProductInput) await this.createProductInputUseCase.execute(pi, tx);
                };
                if (updated.length) {
                    for (const pdr of updated) {
                        const { id: productInputId, ...rest } = pdr;
                        await this.updateProductInputUseCase.execute(productInputId, rest, tx);
                    };
                }
                if (deletes.length) {
                    for (const pdr of deletes) {
                        const { id: productInputId } = pdr;
                        await this.deleteProductInputUseCase.execute(productInputId, tx);
                    };
                }
            }

            // --------------------------------------------------
            // |🔹 PRODUCT-PROCESS                              |
            // --------------------------------------------------
            if (isChangeProductProcess) {
                const adds: ProductProcessCreateOrchestrator[] = product_processes_manager?.added ?? [];
                const deleted: ProductProcessProps[] = product_processes_manager?.deleted ?? [];
                const uptated: ProductProcessUpdateOrchestrator[] = product_processes_manager?.updated ?? [];
                if (adds.length) {

                    const productProcessForAssign: ProductProcessOrchestratorAssignExisting[] = adds.filter((pp: ProductProcessCreateOrchestrator): pp is ProductProcessOrchestratorAssignExisting =>
                        ("process_id" in pp) && typeof pp.process_id === "number"
                    );
                    const productProcessForCreate = adds.filter((pp): pp is ProductProcessOrchestratorCreateNew =>
                        !("process_id" in pp && typeof pp.process_id === "number") && ("process" in pp)
                    );
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // |🔸 ASIGNAR PROCESO EXISTENTE                    |
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    for (const pp of productProcessForAssign) {
                        const { product_input_process, process, product: _p, ...ppFlat } = pp;
                        const productProcessCreateResponse: ProductProcessProps = await this.createProductProcessUseCase.execute({
                            ...ppFlat,
                            product_id: productId,
                        }, tx);
                        if (product_input_process?.length) {
                            for (const pip of product_input_process) {
                                const productInputResponse: ProductInputProps | null = await this.getProductInputByProductInputUseCase.execute(productId, pip.product_input.input_id, tx);
                                if (!productInputResponse) throw new HttpError(404,
                                    `El insumo con ID ${pip.product_input.input_id} no está asignado al producto con ID ${productId}.`
                                );
                                await this.createProductInputProcess.execute({
                                    qty: pip.qty, product_input_id: productInputResponse.id,
                                    product_process_id: productProcessCreateResponse.id, product_id: productId
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
                            product_id: productId,
                            sort_order,
                        }, tx);

                        if (product_input_process?.length) {
                            for (const pip of product_input_process) {
                                const productInputResponse: ProductInputProps | null = await this.getProductInputByProductInputUseCase.execute(productId, pip.product_input.input_id, tx);

                                if (!productInputResponse) throw new HttpError(404,
                                    `El insumo con ID ${pip.product_input.input_id} no está asignado al producto con ID ${productId}.`
                                );

                                await this.createProductInputProcess.execute({
                                    qty: pip.qty,
                                    product_input_id: productInputResponse.id,
                                    product_process_id: productProcessCreateResponse.id,
                                    product_id: productId,
                                }, tx);
                            }
                        }
                    }
                }
                if (uptated.length) {
                    for (const pp of uptated) {
                        const { id: productProcessId, product_input_process_updated, ...rest } = pp;
                        const productProcessResponse: ProductProcessProps = await this.updateProductProcessUseCase.execute(productProcessId, rest, tx);
                        const isChangeProductInputProcess: boolean =
                            ((product_input_process_updated?.added ?? []).length) > 0 ||
                            ((product_input_process_updated?.updated ?? []).length) > 0 ||
                            ((product_input_process_updated?.deleted ?? []).length) > 0;

                        if (isChangeProductInputProcess) {
                            const addsPip: ProductInputProcessCreateOrchestrator[] = product_input_process_updated?.added ?? [];
                            const deletedPip: ProductInputProcessProps[] = product_input_process_updated?.deleted ?? [];
                            const updatedPip: ProductInputProcessUpdateOrchestrator[] = product_input_process_updated?.updated ?? [];
                            if (addsPip.length) {
                                for (const pip of addsPip) {
                                    const productInputResponse: ProductInputProps | null = await this.getProductInputByProductInputUseCase.execute(productId, pip.product_input.input_id, tx);
                                    if (!productInputResponse) throw new HttpError(404,
                                        `El insumo con ID ${pip.product_input.input_id} no está asignado al producto con ID ${productId}.`
                                    );

                                    await this.createProductInputProcess.execute({
                                        qty: pip.qty,
                                        product_input_id: productInputResponse.id,
                                        product_process_id: productProcessResponse.id,
                                        product_id: productId,
                                    }, tx);
                                }
                            }
                            if (updatedPip.length) {
                                for (const pip of updatedPip) {
                                    const { id: productInputProcessId, ...rest } = pip;
                                    await this.updateProductInputProcess.execute(productInputProcessId, rest, tx);
                                }
                            }
                            if (deletedPip.length) {
                                for (const pip of deletedPip) {
                                    const { id: productInputProcessId } = pip;
                                    await this.deleteProductInputProcess.execute(productInputProcessId, tx);
                                }
                            }
                        }

                    };
                }
                if (deleted.length) {
                    for (const pdr of deleted) {
                        const { id: productProcessId } = pdr;
                        await this.deleteProductProcessUseCase.execute(productProcessId, tx);
                    };
                }
            };

            // --------------------------------------------------
            // |🖼️ IMAGEN (MOVE + UPDATE TÉCNICO EN TX)         |
            // --------------------------------------------------
            // Si venía una imagen temporal, se mueve a /products/<id>
            // y se hace update técnico de photo en la MISMA transacción.
            if (tmpPhotoPath) {
                finalPhotoPath = await ImageHandler.moveImageToEntityDirectory(
                    tmpPhotoPath,
                    "products",
                    productId.toString()
                );

                await this.productRepo.update(productId, { photo: finalPhotoPath }, tx);
            }

            // Si pidieron explícitamente borrar foto (photo: null),
            // aquí NO borramos archivo todavía (eso es POST-COMMIT),
            // pero sí persistimos el cambio en BD dentro de TX.
            if (removePhotoRequested) {
                await this.productRepo.update(productId, { photo: null }, tx);
            }

            // --------------------------------------------------
            // |🔹 COMMIT + RESPONSE                            |
            // --------------------------------------------------
            const productOrchestrator: ProductOrchestrator | null = await this.getProductOrchestrator.execute(productUpdateResponse.id, tx);
            if (!productOrchestrator)
                throw new HttpError(500, "No se pudo acceder al producto despues de haber sido actualizado.");

            await tx.commit();

            // --------------------------------------------------
            // |🧹 IMAGEN (POST-COMMIT REAL)                    |
            // --------------------------------------------------
            // Eliminación del archivo anterior SOLO cuando ya quedó confirmado el commit.
            // - Reemplazo: previousPhotoPath != finalPhotoPath
            // - Eliminación: photo: null explícito
            if (tmpPhotoPath && previousPhotoPath && finalPhotoPath && previousPhotoPath !== finalPhotoPath) {
                await ImageHandler.removeImageIfExists(previousPhotoPath);
            }

            if (removePhotoRequested && previousPhotoPath) {
                await ImageHandler.removeImageIfExists(previousPhotoPath);
            }

            return productOrchestrator;

        } catch (error: unknown) {
            await tx.rollback();

            // --------------------------------------------------
            // 🧹 CLEANUP TMP SI FALLA (best-effort)
            // --------------------------------------------------
            // Si había tmp y algo falló antes de que se consolidara,
            // intentamos borrar tmp. Si ya se movió a final y luego hubo rollback,
            // el fileCleanup se encargará del directorio de entidad.
            if (tmpPhotoPath) {
                try {
                    await ImageHandler.removeImageIfExists(tmpPhotoPath);
                } catch { /* best-effort cleanup */ }
            }

            try {
                if (updatedProductId !== null) this.fileCleanup.scheduleCleanup(`products/${updatedProductId}`);
            } catch (cleanupErr) {
                console.error("Cleanup scheduling failed:", cleanupErr);
            }
            throw error;
        }
    }
};
