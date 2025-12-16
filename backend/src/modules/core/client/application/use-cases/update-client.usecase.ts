import type { ClientProps, ClientUpdateProps } from "../../domain/client.types";
import type { IClientRepository } from "../../domain/client.repository.interface";
import { diffObjects } from "@helpers/validation-diff-engine-backend";
import { pickEditableFields } from "@helpers/pickEditableFields";
import { deepNormalizeDecimals } from "@helpers/decimal-normalization-and-cleaning.utils";
import HttpError from "@shared/errors/http/http-error";

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

export class UpdateClientUseCase {
    constructor(private readonly repo: IClientRepository) { }
    async execute(id: string, data: ClientUpdateProps): Promise<ClientProps> {
        const existing: ClientProps | null = await this.repo.findById(id);
        if (!existing) throw new HttpError(404,
            "El cliente que se desea actualizar no fue posible encontrarlo."
        );
        const editableFields: (keyof ClientUpdateProps)[] = [
            "cfdi", "city", "company_name", "country",
            "credit_limit", "email", "email",
            "is_active", "neighborhood", "payment_method",
            "payment_terms", "phone", "state", "street",
            "street_number", "tax_id", "tax_regimen",
            "zip_code"
        ];
        const filteredBody: ClientUpdateProps = pickEditableFields(data, editableFields);
        const merged: ClientProps = { ...existing, ...filteredBody };
        const normalizedExisting: ClientUpdateProps = deepNormalizeDecimals<ClientUpdateProps>(existing, ["credit_limit"]);
        const normalizedMerged: ClientUpdateProps = deepNormalizeDecimals<ClientUpdateProps>(merged, ["credit_limit"]);
        const updateValues: ClientUpdateProps = await diffObjects(normalizedExisting, normalizedMerged);
        if (!Object.keys(updateValues).length) return existing;
        if (updateValues?.company_name) {
            const check: ClientProps | null = await this.repo.findByCompanyName(updateValues.company_name);
            if (check && String(check.id) !== String(id)) throw new HttpError(409,
                "El nombre ingresado para el cliente, ya esta utilizado por otro cliente."
            );
        }
        if (updateValues?.cfdi) {
            const existsByName: ClientProps | null = await this.repo.findByCfdi(updateValues.cfdi);
            if (existsByName) throw new HttpError(409,
                "El cfdi ingresado para el nuevo cliente, ya esta utilizado por otro cliente."
            );
        }
        if (updateValues?.tax_id) {
            const existsByName: ClientProps | null = await this.repo.findByTaxId(updateValues.tax_id);
            if (existsByName) throw new HttpError(409,
                "El tax id ingresado para el nuevo cliente, ya esta utilizado por otro cliente."
            );
        }
        const updated: ClientProps = await this.repo.update(id, updateValues);
        if (!updated) throw new HttpError(500,
            "No fue posible actualizar el cliente."
        );
        return updated;
    }
}
