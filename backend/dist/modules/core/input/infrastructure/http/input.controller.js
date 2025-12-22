"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputController = void 0;
const get_input_by_custom_id_usecase_1 = require("../../application/use-cases/get-input-by-custom-id.usecase");
const get_input_by_barcode_usecase_1 = require("../../application/use-cases/get-input-by-barcode.usecase");
const get_input_by_sku_usecase_1 = require("../../application/use-cases/get-input-by-sku.usecase");
const get_input_by_id_usecase_1 = require("../../application/use-cases/get-input-by-id.usecase");
const get_input_by_name_usecase_1 = require("../../application/use-cases/get-input-by-name.usecase");
const get_all_inputs_usecase_1 = require("../../application/use-cases/get-all-inputs.usecase");
const create_input_usecase_1 = require("../../application/use-cases/create-input.usecase");
const delete_input_usecase_1 = require("../../application/use-cases/delete-input.usecase");
const local_file_cleanup_service_1 = require("../../../../../shared/files/local-file-cleanup.service");
const update_input_usecase_1 = require("../../application/use-cases/update-input.usecase");
const input_repository_1 = require("../repository/input.repository");
const input_query_mapper_1 = require("./input-query-mapper");
const imageHandlerClass_1 = __importDefault(require("../../../../../helpers/imageHandlerClass"));
/**
 * Controller (Infrastructure / HTTP)
 * ------------------------------------------------------------------
 * Define un controlador HTTP tipado que actúa como adaptador entre
 * el mundo externo (Express, HTTP requests/responses) y la aplicación.
 * Su propósito es recibir peticiones, extraer parámetros, ejecutar
 * casos de uso y devolver respuestas formateadas, manteniendo la
 * separación entre dominio e infraestructura.
 *
 * Diferencia con otras capas:
 * - Entity: representa conceptos del negocio con identidad, reglas e invariantes.
 * - UseCase: encapsula operaciones del sistema aplicando reglas de negocio.
 * - Repository: implementa acceso a datos y persistencia.
 * - Controller: orquesta casos de uso en respuesta a peticiones externas,
 *   pero no contiene lógica de negocio ni persistencia.
 *
 * Responsabilidades técnicas:
 * - Recibir y tipar requests mediante `ApiRequest` y `ApiResponse`.
 * - Invocar casos de uso (`GetAll`, `GetById`, `Create`, `Update`, `Delete`).
 * - Formatear respuestas (ej. convertir fechas a ISO).
 * - Manejar respuestas estándar (200 OK, 201 Created, 204 No Content).
 * - Encapsular lógica repetida en helpers privados para mantener el código limpio.
 *
 * Qué hace:
 * - Controla el flujo de entrada/salida de la aplicación vía HTTP.
 * - Orquesta casos de uso y devuelve DTOs formateados.
 * - Asegura tipado estricto en endpoints mediante schemas.
 * - Centraliza lógica repetida como formateo de fechas y manejo de "no found".
 *
 * Qué no hace:
 * - No representa entidades del dominio ni objetos de negocio.
 * - No contiene reglas de negocio ni invariantes.
 * - No implementa persistencia ni interactúa directamente con infraestructura.
 * - No sustituye a los casos de uso; su rol es coordinar su ejecución.
 *
 * Convención de nombres:
 * - Se nombra con el sufijo `Controller` porque su responsabilidad es
 *   controlar el flujo de entrada/salida HTTP. A diferencia de las `Entity`,
 *   que modelan conceptos del negocio, los `Controller` son adaptadores
 *   externos que conectan la aplicación con el mundo exterior.
 *
 * Ubicación en la arquitectura Clean + Core + Features + Orchestrators:
 * - Core: entidades y casos de uso.
 * - Features: repositorios y servicios de infraestructura.
 * - Controller: capa de infraestructura HTTP que recibe requests y
 *   orquesta casos de uso.
 * - Orchestrators: pueden agrupar controladores y exponer endpoints
 *   de forma coherente hacia Inputes externos.
 */
class InputController {
    repo;
    fileCleanup;
    getAllUseCase;
    getByIdUseCase;
    getByNameUseCase;
    getByBarcodeUseCase;
    getBySkuUseCase;
    getByCustomIdUseCase;
    createUseCase;
    updateUseCase;
    deleteUseCase;
    constructor() {
        this.repo = new input_repository_1.InputRepository();
        this.fileCleanup = new local_file_cleanup_service_1.LocalFileCleanupService();
        this.getAllUseCase = new get_all_inputs_usecase_1.GetAllInputsUseCase(this.repo);
        this.getByIdUseCase = new get_input_by_id_usecase_1.GetInputByIdUseCase(this.repo);
        this.getByNameUseCase = new get_input_by_name_usecase_1.GetInputByNameCase(this.repo);
        this.getByBarcodeUseCase = new get_input_by_barcode_usecase_1.GetInputByBarcodeUseCase(this.repo);
        this.getBySkuUseCase = new get_input_by_sku_usecase_1.GetInputBySkuIdUseCase(this.repo);
        this.getByCustomIdUseCase = new get_input_by_custom_id_usecase_1.GetInputByCustomIdUseCase(this.repo);
        this.createUseCase = new create_input_usecase_1.CreateInputUseCase(this.repo);
        this.updateUseCase = new update_input_usecase_1.UpdateInputUseCase(this.repo);
        this.deleteUseCase = new delete_input_usecase_1.DeleteInputUseCase(this.repo, this.fileCleanup);
    }
    // ============================================================
    // 🔧 HELPERS PRIVADOS (evita repetir la misma lógica en 7 endpoints)
    // ============================================================
    /** Formatea un Location para convertir fechas a ISO */
    async formatResponse(input) {
        return {
            ...input,
            photo: input.photo ? await imageHandlerClass_1.default.convertToBase64(input.photo) : null,
            created_at: input.created_at.toISOString(),
            updated_at: input.updated_at.toISOString()
        };
    }
    ;
    // ============================================================
    // GET ALL
    // ============================================================
    getAll = async (req, res) => {
        const queryRequest = req.query;
        const query = (0, input_query_mapper_1.mapInputQueryToCriteria)(queryRequest);
        const result = await this.getAllUseCase.execute(query);
        const formatted = await Promise.all(result.map(p => this.formatResponse(p)));
        return res.status(200).send(formatted);
    };
    // ============================================================
    // GET BY ID
    // ============================================================
    getById = async (req, res) => {
        const { id } = req.params;
        const result = await this.getByIdUseCase.execute(Number(id));
        if (!result)
            return res.status(204).send(null);
        const formatted = await this.formatResponse(result);
        return res.status(200).send(formatted);
    };
    // ============================================================
    // GET BY CustomID
    // ============================================================
    getByCustomId = async (req, res) => {
        const { custom_id } = req.params;
        const result = await this.getByCustomIdUseCase.execute(custom_id);
        if (!result)
            return res.status(204).send(null);
        const formatted = await this.formatResponse(result);
        return res.status(200).send(formatted);
    };
    // ============================================================
    // GET BY SKU
    // ============================================================
    getBySku = async (req, res) => {
        const { sku } = req.params;
        const result = await this.getBySkuUseCase.execute(sku);
        if (!result)
            return res.status(204).send(null);
        const formatted = await this.formatResponse(result);
        return res.status(200).send(formatted);
    };
    // ============================================================
    // GET BY NAME
    // ============================================================
    getByName = async (req, res) => {
        const { name } = req.params;
        const result = await this.getByNameUseCase.execute(name);
        if (!result)
            return res.status(204).send(null);
        const formatted = await this.formatResponse(result);
        return res.status(200).send(formatted);
    };
    // ============================================================
    // GET BY NAME
    // ============================================================
    getByBarcode = async (req, res) => {
        const { barcode } = req.params;
        const result = await this.getByBarcodeUseCase.execute(Number(barcode));
        if (!result)
            return res.status(204).send(null);
        const formatted = await this.formatResponse(result);
        return res.status(200).send(formatted);
    };
    // ============================================================
    // CREATE
    // ============================================================
    create = async (req, res) => {
        const body = req.body;
        try {
            // 1️⃣ Ejecutar caso de uso
            const created = await this.createUseCase.execute(body);
            // 2️⃣ Formatear salida final
            const formatted = await this.formatResponse(created);
            return res.status(201).send(formatted);
        }
        catch (error) {
            // 🧹 Limpieza de imagen temporal si hubo error
            if (body?.photo) {
                try {
                    await imageHandlerClass_1.default.removeImageIfExists(body.photo);
                }
                catch { /* silencio */ }
            }
            throw error;
        }
    };
    // ============================================================
    // UPDATE (BODY-DRIVEN IMAGE MOVE — FINAL DEFINITIVO)
    // ============================================================
    update = async (req, res) => {
        const { id } = req.params;
        // ⛔ Clonar body para no mutar req.body
        const body = { ...req.body };
        let tmpPhotoPath;
        let finalPhotoPath;
        let previousPhotoPath = null;
        try {
            // -----------------------------------------------------------
            // 1️⃣ OBTENER FOTO ACTUAL (ANTES DE MODIFICAR NADA)
            // -----------------------------------------------------------
            const existing = await this.repo.findById(Number(id));
            if (!existing) {
                throw new Error("Input not found"); // normalmente nunca pasa aquí
            }
            previousPhotoPath = existing.photo ?? null;
            // -----------------------------------------------------------
            // 2️⃣ DETECTAR IMAGEN TEMPORAL DESDE BODY
            // -----------------------------------------------------------
            if (body.photo && body.photo.startsWith("inputs/tmp/")) {
                tmpPhotoPath = body.photo;
                delete body.photo; // ⛔ nunca guardar tmp en BD
            }
            // -----------------------------------------------------------
            // 3️⃣ UPDATE DE NEGOCIO (SIN IMAGEN)
            // -----------------------------------------------------------
            const updated = await this.updateUseCase.execute(Number(id), body);
            // -----------------------------------------------------------
            // 4️⃣ MOVER IMAGEN + UPDATE TÉCNICO DE PHOTO
            // -----------------------------------------------------------
            if (tmpPhotoPath) {
                finalPhotoPath =
                    await imageHandlerClass_1.default.moveImageToEntityDirectory(tmpPhotoPath, "Inputs", id);
                await this.repo.update(Number(id), {
                    photo: finalPhotoPath,
                });
                // -------------------------------------------------------
                // 5️⃣ BORRAR IMAGEN ANTERIOR (POST-COMMIT REAL)
                // -------------------------------------------------------
                if (previousPhotoPath &&
                    previousPhotoPath !== finalPhotoPath) {
                    await imageHandlerClass_1.default.removeImageIfExists(previousPhotoPath);
                }
            }
            // -----------------------------------------------------------
            // 6️⃣ RESPUESTA
            // -----------------------------------------------------------
            const formatted = await this.formatResponse({
                ...updated,
                ...(finalPhotoPath ? { photo: finalPhotoPath } : {}),
            });
            return res.status(200).send(formatted);
        }
        catch (error) {
            // -----------------------------------------------------------
            // 🧹 CLEANUP TMP SI FALLA
            // -----------------------------------------------------------
            if (tmpPhotoPath) {
                try {
                    await imageHandlerClass_1.default.removeImageIfExists(tmpPhotoPath);
                }
                catch {
                    /* best-effort cleanup */
                }
            }
            throw error;
        }
    };
    // ============================================================
    // DELETE
    // ============================================================
    delete = async (req, res) => {
        const { id } = req.params;
        await this.deleteUseCase.execute(Number(id));
        return res.status(201).send(null);
    };
}
exports.InputController = InputController;
;
