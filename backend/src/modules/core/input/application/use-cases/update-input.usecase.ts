import type { IInputRepository } from "../../domain/input.repository.interface";
import type { InputProps, InputUpdateProps } from "../../domain/input.types";
import { DecimalVO } from "@src/shared/domain/value-objects/decimal.vo";
import { InputUpdateDto } from "../dto/input.model.schema";
import HttpError from "@shared/errors/http/http-error";
import ImageHandler from "@helpers/imageHandlerClass";
import { Transaction } from "sequelize";

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

const mapInputDtoToDomain = (data: InputUpdateDto): InputUpdateProps => {
    const { unit_cost, ...rest } = data;
    return {
        ...rest,
        ...(unit_cost !== undefined
            ? { credit_limit: unit_cost === null ? null : DecimalVO.from(unit_cost) }
            : {}),
    };
};

export class UpdateInputUseCase {
    constructor(private readonly repo: IInputRepository) { }

    async execute(id: number, data: InputUpdateDto, tx?: Transaction): Promise<InputProps> {

        const updateData = mapInputDtoToDomain(data);

        // ------------------------------------------------------------------
        // 🔍 OBTENER ESTADO ACTUAL
        // ------------------------------------------------------------------
        const existing: InputProps | null = await this.repo.findById(id, tx);

        if (!existing) {
            throw new HttpError(
                404,
                "El insumo que se desea actualizar no fue posible encontrarlo."
            );
        }

        if (!Object.keys(updateData).length) return existing;

        // ------------------------------------------------------------------
        // 🔐 VALIDACIONES DE UNICIDAD
        // ------------------------------------------------------------------
        // Las validaciones de unicidad se basan en la intención del usuario
        // (updateData), no en los cambios efectivos (updateValues), para evitar
        // inconsistencias y falsos negativos.
        if (updateData.name) {
            const existsByName = await this.repo.findByName(updateData.name, tx);
            if (existsByName && existsByName.id !== existing.id) {
                throw new HttpError(
                    409,
                    "El nombre ingresado para el insumo ya está en uso."
                );
            }
        }

        if (updateData.sku) {
            const existsBySku = await this.repo.findBySku(updateData.sku, tx);
            if (existsBySku && existsBySku.id !== existing.id) {
                throw new HttpError(
                    409,
                    "El sku ingresado para el insumo ya está en uso."
                );
            }
        }

        if (updateData.custom_id) {
            const existsByCustomId = await this.repo.findByCustomId(updateData.custom_id, tx);
            if (existsByCustomId && existsByCustomId.id !== existing.id) {
                throw new HttpError(
                    409,
                    "El id único ingresado para el insumo ya está en uso."
                );
            }
        }

        if (updateData.barcode) {
            const existsByBarcode = await this.repo.findByBarcode(updateData.barcode.toString(), tx);
            if (existsByBarcode && existsByBarcode.id !== existing.id) {
                throw new HttpError(
                    409,
                    "El código de barras ingresado para el insumo ya está en uso."
                );
            }
        }

        // ------------------------------------------------------------------
        // 🖼️ DETECCIÓN DE REEMPLAZO DE IMAGEN
        // ------------------------------------------------------------------
        // El caso de uso NO maneja archivos.
        // Solo compara rutas finales (strings) ya resueltas
        // por la capa de orquestación (controller).
        const previousPhoto: string | null = existing.photo ?? null;

        const nextPhoto: string | null =
            "photo" in updateData
                ? updateData.photo ?? null
                : null;

        const photoWasReplaced: boolean =
            previousPhoto !== null &&
            nextPhoto !== null &&
            previousPhoto !== nextPhoto;

        // ------------------------------------------------------------------
        // 💾 ACTUALIZACIÓN DE PERSISTENCIA
        // ------------------------------------------------------------------
        // Se delega al repositorio la operación de update, garantizando
        // que la transacción sea consistente.
        const updated: InputProps = await this.repo.update(id, updateData, tx);

        if (!updated) {
            throw new HttpError(
                500,
                "No fue posible actualizar el insumo."
            );
        }

        // ------------------------------------------------------------------
        // 🧹 LIMPIEZA DE IMAGEN ANTERIOR (POST-COMMIT)
        // ------------------------------------------------------------------
        // La eliminación del archivo anterior se ejecuta únicamente
        // después de que la BD fue actualizada correctamente, evitando
        // inconsistencias en caso de error.
        if (photoWasReplaced && previousPhoto) {
            await ImageHandler.removeImageIfExists(previousPhoto);
        }

        return updated;
    }
}
