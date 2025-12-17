"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductDiscountRangeUseCase = void 0;
const decimal_normalization_and_cleaning_utils_1 = require("../../../../../../../helpers/decimal-normalization-and-cleaning.utils");
const validation_diff_engine_backend_1 = require("../../../../../../../helpers/validation-diff-engine-backend");
const pickEditableFields_1 = require("../../../../../../../helpers/pickEditableFields");
const http_error_1 = __importDefault(require("../../../../../../../shared/errors/http/http-error"));
const check_range_conflicts_1 = require("../../../../../../../helpers/check-range-conflicts");
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
class UpdateProductDiscountRangeUseCase {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async execute(id, data) {
        const existing = await this.repo.findById(id);
        if (!existing)
            throw new http_error_1.default(404, "La asignación del descuento por rango al producto que se desea actualizar no fue posible encontrarla.");
        const editableFields = [
            "product_id", "max_qty", "min_qty", "unit_price"
        ];
        const filteredBody = (0, pickEditableFields_1.pickEditableFields)(data, editableFields);
        const merged = { ...existing, ...filteredBody };
        const normalizedExisting = (0, decimal_normalization_and_cleaning_utils_1.deepNormalizeDecimals)(existing, ["unit_price", "max_qty", "min_qty"]);
        const normalizedMerged = (0, decimal_normalization_and_cleaning_utils_1.deepNormalizeDecimals)(merged, ["unit_price", "max_qty", "min_qty"]);
        const updateValues = await (0, validation_diff_engine_backend_1.diffObjects)(normalizedExisting, normalizedMerged);
        if (!Object.keys(updateValues).length)
            return existing;
        const getAll = await this.repo.findByProductId(merged.product_id);
        const getAllExcludeIdUpdate = getAll.filter(g => g.id !== Number(id));
        const getAllExcludeIdRanges = getAllExcludeIdUpdate.map(r => ({
            min_qty: r.min_qty,
            max_qty: r.max_qty
        }));
        const mergedRange = {
            min_qty: merged.min_qty,
            max_qty: merged.max_qty
        };
        const allRanges = [...getAllExcludeIdRanges, ...[mergedRange]];
        const conflictRanges = (0, check_range_conflicts_1.checkRangeConflicts)(allRanges, "min_qty", "max_qty");
        if (conflictRanges === "invalid_range") {
            throw new http_error_1.default(400, "El rango del descuento es invalído.");
        }
        if (conflictRanges === "duplicate") {
            throw new http_error_1.default(400, "El rango del descuento ya esta aplicado por otro descuento del producto.");
        }
        if (conflictRanges === "overlap") {
            throw new http_error_1.default(400, "El rango del descueto se traslapa con otro descuento ya existente para el producto.");
        }
        const updated = await this.repo.update(id, updateValues);
        if (!updated)
            throw new http_error_1.default(500, "No fue posible actualizar la asignacion del insumo al producto.");
        return updated;
    }
}
exports.UpdateProductDiscountRangeUseCase = UpdateProductDiscountRangeUseCase;
