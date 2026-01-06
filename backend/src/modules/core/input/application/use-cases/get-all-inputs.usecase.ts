import { normalizeToArray, normalizeToBoolean, normalizeToNumberArray } from "@src/shared/query-reqyest/query-request-normalizer";
import type { IInputRepository } from "../../domain/input.repository.interface";
import type { InputProps, InputSearchCriteria } from "../../domain/input.types";
import { InputQueryDto } from "../dto/input.model.schema";
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

const mapInputQueryDtoToCriteria = (query: InputQueryDto): InputSearchCriteria => {
    return {
        filter: query.filter?.trim() || undefined,
        exclude_ids: normalizeToNumberArray(query.exclude_ids),
        name: normalizeToArray(query.name),
        description: normalizeToArray(query.description),
        sku: normalizeToArray(query.sku),
        presentation: normalizeToArray(query.presentation),
        unit_of_measure: normalizeToArray(query.unit_of_measure),
        barcode: normalizeToArray(query.barcode),
        custom_id: normalizeToArray(query.custom_id),
        is_draft: normalizeToBoolean(query.is_draft),
        is_active: normalizeToBoolean(query.is_active),
    };
};

export class GetAllInputsUseCase {
    constructor(private readonly repo: IInputRepository) { }
    async execute(query: InputQueryDto, tx?: Transaction): Promise<InputProps[]> {
        return await this.repo.findAll(mapInputQueryDtoToCriteria(query), tx);
    }
};
