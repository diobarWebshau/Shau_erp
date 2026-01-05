"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductUseCase = void 0;
const validation_diff_engine_backend_1 = require("@helpers/validation-diff-engine-backend");
const pickEditableFields_1 = require("@helpers/pickEditableFields");
const http_error_1 = __importDefault(require("@shared/errors/http/http-error"));
const imageHandlerClass_1 = __importDefault(require("@helpers/imageHandlerClass"));
const decimal_normalization_and_cleaning_utils_1 = require("@src/helpers/decimal-normalization-and-cleaning.utils");
/**
 * UseCase
 * ------------------------------------------------------------------
 * Representa un caso de uso dentro de la capa de aplicación.
 * Encapsula una operación del sistema, gestionando validaciones,
 * reglas de negocio y coordinación con el repositorio. Su propósito
 * es manejar la lógica de actualización de un registro, asegurando
 * consistencia y control de la transacción.
 *
 * Función técnica:
 * - Define la semántica de una acción del sistema (ej. crear, actualizar, eliminar).
 * - Orquesta la interacción entre el dominio (entidades, reglas de negocio) y la infraestructura (repositorios, servicios externos).
 * - Aplica validaciones previas a la persistencia, como existencia del registro, unicidad de campos, y detección de cambios.
 * - Coordina operaciones atómicas delegadas al repositorio, garantizando que la transacción se ejecute de forma consistente.
 * - Devuelve resultados tipados y coherentes con el contrato de la API o capa superior.
 *
 * Qué hace:
 * - Encapsula la lógica de negocio aplicada a una operación concreta.
 * - Gestiona validaciones y reglas antes de modificar el estado del sistema.
 * - Controla el flujo de la operación (ej. si no hay cambios, retorna el registro original).
 * - Delegar la persistencia y transacciones al repositorio, manteniendo separación de responsabilidades.
 *
 * Qué no hace:
 * - No representa una entidad del negocio ni modela conceptos del dominio.
 * - No maneja directamente infraestructura (bases de datos, frameworks, librerías externas).
 * - No sustituye a la capa de presentación ni decide cómo se muestran los resultados.
 * - No expone detalles técnicos de almacenamiento ni protocolos de comunicación.
 *
 * Convención de nombres:
 * Un caso de uso no lleva el sufijo "Entity" porque no representa un objeto del dominio,
 * sino una acción del sistema. Las entidades modelan conceptos del negocio; los casos de uso
 * expresan operaciones sobre esos conceptos, por eso se nombran como "UseCase".
 *
 * Ubicación en la arquitectura Clean + Core + Features + Orchestrators:
 * - Clean/Core: las entidades y reglas de negocio puras.
 * - Features: repositorios, servicios y adaptadores que implementan infraestructura.
 * - UseCase: capa de aplicación que orquesta la lógica de negocio con infraestructura.
 * - Orchestrators: capa superior (controladores, endpoints) que invoca los casos de uso
 *   para responder a las solicitudes externas.
 */
class UpdateProductUseCase {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async execute(id, data, tx) {
        // ------------------------------------------------------------------
        // 🔍 OBTENER ESTADO ACTUAL
        // ------------------------------------------------------------------
        const existing = await this.repo.findById(id, tx);
        if (!existing) {
            throw new http_error_1.default(404, "El Producte que se desea actualizar no fue posible encontrarlo.");
        }
        // ------------------------------------------------------------------
        // ✏️ FILTRADO DE CAMPOS EDITABLES
        // ------------------------------------------------------------------
        // Se define explícitamente qué campos pueden ser modificados.
        // Esto evita actualizaciones accidentales o maliciosas de
        // propiedades no editables del dominio.
        const editableFields = [
            "name", "storage_conditions", "description", "unit_of_measure",
            "presentation", "production_cost", "barcode", "type", "sku",
            "sale_price", "is_active", "photo", "is_draft", "custom_id",
        ];
        const filteredBody = (0, pickEditableFields_1.pickEditableFields)(data, editableFields);
        const merged = { ...existing, ...filteredBody };
        const normalizedExisting = (0, decimal_normalization_and_cleaning_utils_1.deepNormalizeDecimals)(existing, ["sale_price", "production_cost", "barcode"]);
        const normalizedMerged = (0, decimal_normalization_and_cleaning_utils_1.deepNormalizeDecimals)(merged, ["sale_price", "production_cost", "barcode"]);
        // ------------------------------------------------------------------
        // 🧮 DETECCIÓN DE CAMBIOS EFECTIVOS
        // ------------------------------------------------------------------
        // Se calcula la diferencia real entre el estado actual y el
        // estado resultante. Esto evita writes innecesarios en BD.
        const updateValues = await (0, validation_diff_engine_backend_1.diffObjects)(normalizedExisting, normalizedMerged);
        if (!Object.keys(updateValues).length)
            return existing;
        // ------------------------------------------------------------------
        // 🔐 VALIDACIONES DE UNICIDAD
        // ------------------------------------------------------------------
        // Las validaciones de unicidad se basan en la intención del usuario
        // (data), no en los cambios efectivos (updateValues), para evitar
        // inconsistencias y falsos negativos.
        if (updateValues.name) {
            const existsByName = await this.repo.findByName(updateValues.name, tx);
            if (existsByName && existsByName.id !== existing.id) {
                throw new http_error_1.default(409, "El nombre ingresado para el producte ya está en uso.");
            }
        }
        if (updateValues.sku) {
            const existsBySku = await this.repo.findBySku(updateValues.sku, tx);
            if (existsBySku && existsBySku.id !== existing.id) {
                throw new http_error_1.default(409, "El sku ingresado para el producte ya está en uso.");
            }
        }
        if (updateValues.custom_id) {
            const existsByCustomId = await this.repo.findByCustomId(updateValues.custom_id, tx);
            if (existsByCustomId && existsByCustomId.id !== existing.id) {
                throw new http_error_1.default(409, "El id único ingresado para el producte ya está en uso.");
            }
        }
        if (updateValues.barcode) {
            const existsByBarcode = await this.repo.findByBarcode(updateValues.barcode.toString(), tx);
            if (existsByBarcode && existsByBarcode.id !== existing.id) {
                throw new http_error_1.default(409, "El código de barras ingresado para el producte ya está en uso.");
            }
        }
        // ------------------------------------------------------------------
        // 🖼️ DETECCIÓN DE REEMPLAZO DE IMAGEN
        // ------------------------------------------------------------------
        // El caso de uso NO maneja archivos.
        // Solo compara rutas finales (strings) ya resueltas
        // por la capa de orquestación (controller).
        const previousPhoto = existing.photo ?? null;
        const nextPhoto = "photo" in updateValues
            ? updateValues.photo ?? null
            : null;
        const photoWasReplaced = previousPhoto !== null &&
            nextPhoto !== null &&
            previousPhoto !== nextPhoto;
        // ------------------------------------------------------------------
        // 💾 ACTUALIZACIÓN DE PERSISTENCIA
        // ------------------------------------------------------------------
        // Se delega al repositorio la operación de update, garantizando
        // que la transacción sea consistente.
        const updated = await this.repo.update(id, updateValues, tx);
        if (!updated) {
            throw new http_error_1.default(500, "No fue posible actualizar el Producte.");
        }
        // ------------------------------------------------------------------
        // 🧹 LIMPIEZA DE IMAGEN ANTERIOR (POST-COMMIT)
        // ------------------------------------------------------------------
        // La eliminación del archivo anterior se ejecuta únicamente
        // después de que la BD fue actualizada correctamente, evitando
        // inconsistencias en caso de error.
        if (photoWasReplaced && previousPhoto) {
            await imageHandlerClass_1.default.removeImageIfExists(previousPhoto);
        }
        return updated;
    }
}
exports.UpdateProductUseCase = UpdateProductUseCase;
