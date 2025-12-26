"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductOrchestratorUseCase = void 0;
const create_product_discount_range_usecase_1 = require("../../../../features/products/assigments/product-discounts-ranges/application/use-cases/create-product-discount-range.usecase");
const delete_product_discount_range_usecase_1 = require("../../../../features/products/assigments/product-discounts-ranges/application/use-cases/delete-product-discount-range.usecase");
const update_product_discount_range_usecase_1 = require("../../../../features/products/assigments/product-discounts-ranges/application/use-cases/update-product-discount-range.usecase");
const get_product_input_by_id_product_input_usecase_1 = require("../../assigments/product-input/application/use-cases/get-product-input-by-id-product-input.usecase");
const create_product_process_usecase_1 = require("../../../../features/products/assigments/product-process/application/use-cases/create-product-process.usecase");
const update_product_process_usecase_1 = require("../../../../features/products/assigments/product-process/application/use-cases/update-product-process.usecase");
const delete_product_process_usecase_1 = require("../../../../features/products/assigments/product-process/application/use-cases/delete-product-process.usecase");
const create_product_input_process_usecase_1 = require("../../assigments/product-input-process/application/use-cases/create-product-input-process.usecase");
const update_product_input_process_usecase_1 = require("../../assigments/product-input-process/application/use-cases/update-product-input-process.usecase");
const delete_product_input_process_usecase_1 = require("../../assigments/product-input-process/application/use-cases/delete-product-input-process.usecase");
const delete_product_input_usecase_1 = require("../../../../features/products/assigments/product-input/application/use-cases/delete-product-input.usecase");
const create_product_input_usecase_1 = require("../../../../features/products/assigments/product-input/application/use-cases/create-product-input.usecase");
const update_product_input_usecase_1 = require("../../../../features/products/assigments/product-input/application/use-cases/update-product-input.usecase");
const get_by_id_product_query_orchestrator_usecase_1 = require("../../query/application/usecase/get-by-id-product-query-orchestrator.usecase");
const create_process_usecase_1 = require("../../../../core/process/application/use-cases/create-process.usecase");
const update_product_usecase_1 = require("../../../../core/product/application/use-cases/update-product.usecase");
const http_error_1 = __importDefault(require("../../../../../shared/errors/http/http-error"));
const imageHandlerClass_1 = __importDefault(require("../../../../../helpers/imageHandlerClass"));
const sequelize_1 = require("../../../../../config/mysql/sequelize");
const sequelize_2 = require("sequelize");
class UpdateProductOrchestratorUseCase {
    // * CASOS DE USO PARA PRODUCTO
    productRepo;
    updateProductUseCase;
    // * CASOS DE USO PARA PROCESS
    createProcessUseCase;
    getProductOrchestrator;
    // * CASOS DE USO PARA PRODUCTO-INPUT
    getProductInputByProductInputUseCase;
    createProductInputUseCase;
    deleteProductInputUseCase;
    updateProductInputUseCase;
    // * CASOS DE USO PRODUCT-PROCESS
    createProductProcessUseCase;
    deleteProductProcessUseCase;
    updateProductProcessUseCase;
    // * CASOS DE USO PARA PRODUCTO-INPUT-PROCESS
    createProductInputProcess;
    updateProductInputProcess;
    deleteProductInputProcess;
    // * CASOS DE USO DE PRODUCT-DISCOUNT-RANGE
    createProductDiscountRangeUseCase;
    deleteProductDiscountRangeUseCase;
    updateProductDiscountRangeUseCase;
    // * MANEJO DE IMAGENES
    fileCleanup;
    constructor({ productInputRepo, discountRangeRepo, productProcessRepo, productRepo, processRepo, inputRepo, productInputProcessRepo, fileCleanup, productQuery }) {
        this.productRepo = productRepo;
        // * CASOS DE USO PARA PRODUCTO
        this.updateProductUseCase = new update_product_usecase_1.UpdateProductUseCase(productRepo);
        this.getProductOrchestrator = new get_by_id_product_query_orchestrator_usecase_1.GetByIdProductsQueryOrchestratorUseCase(productQuery);
        // * CASOS DE USO PARA PROCESS
        this.createProcessUseCase = new create_process_usecase_1.CreateProcessUseCase(processRepo);
        // * CASOS DE USO PARA PRODUCTO-INPUT
        this.getProductInputByProductInputUseCase = new get_product_input_by_id_product_input_usecase_1.GetProductInputByIdProductInputUseCase(productInputRepo);
        this.createProductInputUseCase = new create_product_input_usecase_1.CreateProductInputUseCase(productInputRepo, productRepo, inputRepo);
        this.deleteProductInputUseCase = new delete_product_input_usecase_1.DeleteProductInputUseCase(productInputRepo);
        this.updateProductInputUseCase = new update_product_input_usecase_1.UpdateProductInputUseCase(productInputRepo);
        // * CASOS DE USO PRODUCT-PROCESS
        this.createProductProcessUseCase = new create_product_process_usecase_1.CreateProductProcessUseCase(productProcessRepo, productRepo, processRepo);
        this.updateProductProcessUseCase = new update_product_process_usecase_1.UpdateProductProcessUseCase(productProcessRepo);
        this.deleteProductProcessUseCase = new delete_product_process_usecase_1.DeleteProductProcessUseCase(productProcessRepo);
        // * CASOS DE USO PARA PRODUCTO-INPUT-PROCESS
        this.createProductInputProcess = new create_product_input_process_usecase_1.CreateProductInputProcessUseCase(productInputProcessRepo, productRepo, productInputRepo, productProcessRepo);
        this.updateProductInputProcess = new update_product_input_process_usecase_1.UpdateProductInputProcessUseCase(productInputProcessRepo);
        this.deleteProductInputProcess = new delete_product_input_process_usecase_1.DeleteProductInputProcessUseCase(productInputProcessRepo);
        // * CASOS DE USO DE PRODUCT-DISCOUNT-RANGE
        this.createProductDiscountRangeUseCase = new create_product_discount_range_usecase_1.CreateProductDiscountRangeUseCase(discountRangeRepo, productRepo);
        this.updateProductDiscountRangeUseCase = new update_product_discount_range_usecase_1.UpdateProductDiscountRangeUseCase(discountRangeRepo);
        this.deleteProductDiscountRangeUseCase = new delete_product_discount_range_usecase_1.DeleteProductDiscountRangeUseCase(discountRangeRepo);
        // * MANEJO DE IMAGENES
        this.fileCleanup = fileCleanup;
    }
    ;
    async execute(productId, data) {
        const tx = await sequelize_1.sequelize.transaction({ isolationLevel: sequelize_2.Transaction.ISOLATION_LEVELS.REPEATABLE_READ });
        let updatedProductId = null;
        // ✅ NUEVO: variables para lógica de imagen (sin afectar funcionalidad existente)
        let previousPhotoPath = null;
        let tmpPhotoPath = null;
        let finalPhotoPath = null;
        let removePhotoRequested = false;
        try {
            // --------------------------------------------------
            // |🔹 DESTRUCTATION                                |
            // --------------------------------------------------
            const { product, product_discount_ranges_manager, product_processes_manager, products_inputs_manager } = data;
            // --------------------------------------------------
            // |🖼️ IMAGEN (MISMA LÓGICA QUE MÓDULO BASE)        |
            // --------------------------------------------------
            // - Se lee el estado actual para saber la foto previa
            // - Si viene una tmp ("products/tmp/..."), NO se guarda tmp en BD
            // - Se mueve a directorio final y se hace update técnico de "photo" en la misma TX
            // - La eliminación de la foto anterior se hace POST-COMMIT (fuera de TX)
            const existingProduct = await this.productRepo.findById(productId, tx);
            if (!existingProduct) {
                throw new http_error_1.default(404, `El producto con ID ${productId} no fue posible encontrarlo.`);
            }
            previousPhotoPath = existingProduct.photo ?? null;
            // Detectar si el cliente pide borrar foto (photo: null explícito)
            removePhotoRequested = ("photo" in product) && (product.photo === null);
            // Detectar tmp desde body
            const incomingPhoto = product?.photo;
            const isTmpPhoto = typeof incomingPhoto === "string" && incomingPhoto.startsWith("products/tmp/");
            tmpPhotoPath = isTmpPhoto ? incomingPhoto : null;
            // Evitar persistir tmp en BD (exactamente como en tu controller)
            const safeProductUpdate = { ...product };
            if (tmpPhotoPath) {
                // ⛔ nunca guardar tmp en BD
                delete safeProductUpdate.photo;
            }
            // --------------------------------------------------
            // |🔹 PRODUCT                                      |
            // --------------------------------------------------
            const productUpdateResponse = await this.updateProductUseCase.execute(productId, safeProductUpdate, tx);
            updatedProductId = productUpdateResponse.id;
            // --------------------------------------------------
            // |🔹 MANAGERS                                     |
            // --------------------------------------------------
            const isChangeProductDiscountRange = (product_discount_ranges_manager?.added ?? []).length > 0 ||
                (product_discount_ranges_manager?.updated ?? []).length > 0 ||
                (product_discount_ranges_manager?.deleted ?? []).length > 0;
            const isChangeProductInput = (products_inputs_manager?.added ?? []).length > 0 ||
                (products_inputs_manager?.updated ?? []).length > 0 ||
                (products_inputs_manager?.deleted ?? []).length > 0;
            const isChangeProductProcess = (product_processes_manager?.added ?? []).length > 0 ||
                (product_processes_manager?.updated ?? []).length > 0 ||
                (product_processes_manager?.deleted ?? []).length > 0;
            // --------------------------------------------------
            // |🔹 PRODUCT-DISCOUNT-RANGE                       |
            // --------------------------------------------------
            if (isChangeProductDiscountRange) {
                const adds = product_discount_ranges_manager?.added ?? [];
                const deletes = product_discount_ranges_manager?.deleted ?? [];
                const updated = product_discount_ranges_manager?.updated ?? [];
                if (adds.length) {
                    const newProductDiscountRange = adds.map((pdr) => ({
                        ...pdr,
                        product_id: productUpdateResponse.id
                    }));
                    for (const pdr of newProductDiscountRange)
                        await this.createProductDiscountRangeUseCase.execute(pdr, tx);
                }
                ;
                if (updated.length) {
                    for (const pdr of updated) {
                        const { id: productDiscountRangeId, ...rest } = pdr;
                        await this.updateProductDiscountRangeUseCase.execute(productDiscountRangeId, rest, tx);
                    }
                    ;
                }
                if (deletes.length) {
                    for (const pdr of deletes) {
                        const { id: productDiscountRangeId } = pdr;
                        await this.deleteProductDiscountRangeUseCase.execute(productDiscountRangeId, tx);
                    }
                    ;
                }
            }
            // --------------------------------------------------
            // |🔹 PRODUCT-INPUT                                |
            // --------------------------------------------------
            if (isChangeProductInput) {
                const adds = products_inputs_manager?.added ?? [];
                const deletes = products_inputs_manager?.deleted ?? [];
                const updated = products_inputs_manager?.updated ?? [];
                if (adds.length) {
                    const newProductInput = adds.map((pi) => ({
                        ...pi,
                        product_id: productUpdateResponse.id
                    }));
                    for (const pi of newProductInput)
                        await this.createProductInputUseCase.execute(pi, tx);
                }
                ;
                if (updated.length) {
                    for (const pdr of updated) {
                        const { id: productInputId, ...rest } = pdr;
                        await this.updateProductInputUseCase.execute(productInputId, rest, tx);
                    }
                    ;
                }
                if (deletes.length) {
                    for (const pdr of deletes) {
                        const { id: productInputId } = pdr;
                        await this.deleteProductInputUseCase.execute(productInputId, tx);
                    }
                    ;
                }
            }
            // --------------------------------------------------
            // |🔹 PRODUCT-PROCESS                              |
            // --------------------------------------------------
            if (isChangeProductProcess) {
                const adds = product_processes_manager?.added ?? [];
                const deleted = product_processes_manager?.deleted ?? [];
                const uptated = product_processes_manager?.updated ?? [];
                if (adds.length) {
                    const productProcessForAssign = adds.filter((pp) => ("process_id" in pp) && typeof pp.process_id === "number");
                    const productProcessForCreate = adds.filter((pp) => !("process_id" in pp && typeof pp.process_id === "number") && ("process" in pp));
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    // |🔸 ASIGNAR PROCESO EXISTENTE                    |
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    for (const pp of productProcessForAssign) {
                        const { product_input_process, process, product: _p, ...ppFlat } = pp;
                        const productProcessCreateResponse = await this.createProductProcessUseCase.execute({
                            ...ppFlat,
                            product_id: productId,
                        }, tx);
                        if (product_input_process?.length) {
                            for (const pip of product_input_process) {
                                const productInputResponse = await this.getProductInputByProductInputUseCase.execute(productId, pip.product_input.input_id, tx);
                                if (!productInputResponse)
                                    throw new http_error_1.default(404, `El insumo con ID ${pip.product_input.input_id} no está asignado al producto con ID ${productId}.`);
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
                        const processCreateResponse = await this.createProcessUseCase.execute(process, tx);
                        const productProcessCreateResponse = await this.createProductProcessUseCase.execute({
                            process_id: processCreateResponse.id,
                            product_id: productId,
                            sort_order,
                        }, tx);
                        if (product_input_process?.length) {
                            for (const pip of product_input_process) {
                                const productInputResponse = await this.getProductInputByProductInputUseCase.execute(productId, pip.product_input.input_id, tx);
                                if (!productInputResponse)
                                    throw new http_error_1.default(404, `El insumo con ID ${pip.product_input.input_id} no está asignado al producto con ID ${productId}.`);
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
                        const productProcessResponse = await this.updateProductProcessUseCase.execute(productProcessId, rest, tx);
                        const isChangeProductInputProcess = ((product_input_process_updated?.added ?? []).length) > 0 ||
                            ((product_input_process_updated?.updated ?? []).length) > 0 ||
                            ((product_input_process_updated?.deleted ?? []).length) > 0;
                        if (isChangeProductInputProcess) {
                            const addsPip = product_input_process_updated?.added ?? [];
                            const deletedPip = product_input_process_updated?.deleted ?? [];
                            const updatedPip = product_input_process_updated?.updated ?? [];
                            if (addsPip.length) {
                                for (const pip of addsPip) {
                                    const productInputResponse = await this.getProductInputByProductInputUseCase.execute(productId, pip.product_input.input_id, tx);
                                    if (!productInputResponse)
                                        throw new http_error_1.default(404, `El insumo con ID ${pip.product_input.input_id} no está asignado al producto con ID ${productId}.`);
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
                    }
                    ;
                }
                if (deleted.length) {
                    for (const pdr of deleted) {
                        const { id: productProcessId } = pdr;
                        await this.deleteProductProcessUseCase.execute(productProcessId, tx);
                    }
                    ;
                }
            }
            ;
            // --------------------------------------------------
            // |🖼️ IMAGEN (MOVE + UPDATE TÉCNICO EN TX)         |
            // --------------------------------------------------
            // Si venía una imagen temporal, se mueve a /products/<id>
            // y se hace update técnico de photo en la MISMA transacción.
            if (tmpPhotoPath) {
                finalPhotoPath = await imageHandlerClass_1.default.moveImageToEntityDirectory(tmpPhotoPath, "products", productId.toString());
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
            const productOrchestrator = await this.getProductOrchestrator.execute(productUpdateResponse.id, tx);
            if (!productOrchestrator)
                throw new http_error_1.default(500, "No se pudo acceder al producto despues de haber sido actualizado.");
            await tx.commit();
            // --------------------------------------------------
            // |🧹 IMAGEN (POST-COMMIT REAL)                    |
            // --------------------------------------------------
            // Eliminación del archivo anterior SOLO cuando ya quedó confirmado el commit.
            // - Reemplazo: previousPhotoPath != finalPhotoPath
            // - Eliminación: photo: null explícito
            if (tmpPhotoPath && previousPhotoPath && finalPhotoPath && previousPhotoPath !== finalPhotoPath) {
                await imageHandlerClass_1.default.removeImageIfExists(previousPhotoPath);
            }
            if (removePhotoRequested && previousPhotoPath) {
                await imageHandlerClass_1.default.removeImageIfExists(previousPhotoPath);
            }
            return productOrchestrator;
        }
        catch (error) {
            await tx.rollback();
            // --------------------------------------------------
            // 🧹 CLEANUP TMP SI FALLA (best-effort)
            // --------------------------------------------------
            // Si había tmp y algo falló antes de que se consolidara,
            // intentamos borrar tmp. Si ya se movió a final y luego hubo rollback,
            // el fileCleanup se encargará del directorio de entidad.
            if (tmpPhotoPath) {
                try {
                    await imageHandlerClass_1.default.removeImageIfExists(tmpPhotoPath);
                }
                catch { /* best-effort cleanup */ }
            }
            try {
                if (updatedProductId !== null)
                    this.fileCleanup.scheduleCleanup(`products/${updatedProductId}`);
            }
            catch (cleanupErr) {
                console.error("Cleanup scheduling failed:", cleanupErr);
            }
            throw error;
        }
    }
}
exports.UpdateProductOrchestratorUseCase = UpdateProductOrchestratorUseCase;
;
