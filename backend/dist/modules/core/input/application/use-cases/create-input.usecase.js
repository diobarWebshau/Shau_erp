"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInputUseCase = void 0;
const http_error_1 = __importDefault(require("@shared/errors/http/http-error"));
const imageHandlerClass_1 = __importDefault(require("@helpers/imageHandlerClass"));
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
class CreateInputUseCase {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async execute(data, tx) {
        // ------------------------------------------------------------------
        // 🔎 VALIDACIONES DE NEGOCIO
        // ------------------------------------------------------------------
        if (data?.name) {
            const existsByName = await this.repo.findByName(data.name, tx);
            if (existsByName) {
                throw new http_error_1.default(409, "El nombre ingresado para el nuevo insumo, ya esta utilizado por otro insumo.");
            }
        }
        if (data?.sku) {
            const existsBySku = await this.repo.findBySku(data.sku, tx);
            if (existsBySku) {
                throw new http_error_1.default(409, "El sku ingresado para el nuevo insumo, ya esta utilizado por otro insumo.");
            }
        }
        if (data?.custom_id) {
            const existsByCustomId = await this.repo.findByCustomId(data.custom_id, tx);
            if (existsByCustomId) {
                throw new http_error_1.default(409, "El id único ingresado para el nuevo insumo, ya esta utilizado por otro insumo.");
            }
        }
        if (data?.barcode) {
            const existsByBarcode = await this.repo.findByBarcode(data.barcode.toString(), tx);
            if (existsByBarcode) {
                throw new http_error_1.default(409, "El codigo de barras ingresado para el nuevo insumo, ya esta utilizado por otro insumo.");
            }
        }
        // ------------------------------------------------------------------
        // 🟢 CREACIÓN INICIAL DEL InputO (SIN TOCAR FS AÚN)
        // ------------------------------------------------------------------
        const created = await this.repo.create(data, tx);
        if (!created) {
            throw new http_error_1.default(500, "No fue posible crear el nuevo Inputo");
        }
        // ------------------------------------------------------------------
        // 🖼️ ORGANIZACIÓN DE IMAGEN (POST-CREACIÓN)
        // ------------------------------------------------------------------
        if (data.photo) {
            try {
                const newRelativePath = await imageHandlerClass_1.default.moveImageToEntityDirectory(data.photo, "inputs", created.id.toString());
                // Actualizar únicamente el campo photo
                await this.repo.update(created.id, {
                    photo: newRelativePath,
                }, tx);
                // Reflejar el cambio en el objeto de retorno
                created.photo = newRelativePath;
            }
            catch (error) {
                // Si algo falla durante el move, limpiar archivo temporal.
                // La creación del Inputo NO se revierte: el Inputo puede existir sin imagen.
                try {
                    await imageHandlerClass_1.default.removeImageIfExists(data.photo);
                }
                catch { /* silencio intencional */ }
                // Propagar el error para que la capa superior decida cómo responder
                throw error;
            }
        }
        return created;
    }
}
exports.CreateInputUseCase = CreateInputUseCase;
