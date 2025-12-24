import type { ClientAddressProps, ClientAddressUpdateProps } from "../../domain/client-address.types";
import type { IClientAddressRepository } from "../../domain/client-address.repository.interface";
import { deepNormalizeDecimals } from "@helpers/decimal-normalization-and-cleaning.utils";
import { diffObjects } from "@helpers/validation-diff-engine-backend";
import { pickEditableFields } from "@helpers/pickEditableFields";
import HttpError from "@shared/errors/http/http-error";
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

export class UpdateClientAddressUseCase {
    constructor(private readonly repo: IClientAddressRepository) { }
    async execute(id: number, data: ClientAddressUpdateProps, tx?: Transaction): Promise<ClientAddressProps> {
        const existing: ClientAddressProps | null = await this.repo.findById(id, tx);
        if (!existing) throw new HttpError(404,
            "El cliente que se desea actualizar no fue posible encontrarlo."
        );
        const editableFields: (keyof ClientAddressUpdateProps)[] = [
            "city", "client_id", "country",
            "neighborhood", "state", "street", "street_number",
            "zip_code"
        ];
        const filteredBody: ClientAddressUpdateProps = pickEditableFields(data, editableFields);
        const merged: ClientAddressProps = { ...existing, ...filteredBody };
        const normalizedExisting: ClientAddressUpdateProps = deepNormalizeDecimals<ClientAddressUpdateProps>(existing, ["zip_code", "street_number"]);
        const normalizedMerged: ClientAddressUpdateProps = deepNormalizeDecimals<ClientAddressUpdateProps>(merged, ["zip_code", "street_number"]);
        const updateValues: ClientAddressUpdateProps = await diffObjects(normalizedExisting, normalizedMerged);
        if (!Object.keys(updateValues).length) return existing;
        const updated: ClientAddressProps = await this.repo.update(id, updateValues, tx);
        if (!updated) throw new HttpError(500,
            "No fue posible actualizar el cliente."
        );
        return updated;
    }
}
