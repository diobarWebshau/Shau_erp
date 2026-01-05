import { LocationLocationTypeResponseOrchestratorDto, LocationProductionLineResponseOrchestratorDto, LocationResponseOrchestratorDto } from "@modules/features/location/orchestration/application/dto/location-orchestrator.model.schema";
import { LocationResponseDto } from "@modules/core/location/application/dto/location.model.schema";
import { ILocationQueryRepository } from "../../domain/location-query.repository.interface";
import { LocationFullQueryResult } from "../../domain/location-query.types";
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

export class GetByIdLocationQueryOrchestratorUseCase {

    private readonly repo: ILocationQueryRepository;

    constructor(repo: ILocationQueryRepository) { this.repo = repo };

    async execute(id: number, tx?: Transaction): Promise<LocationResponseOrchestratorDto | null> {
        const LocationReponse: LocationFullQueryResult | null = await this.repo.getByIdLocationFullQuery(id, tx);
        if (!LocationReponse) return null;
        const { location_location_types, location_production_lines, ...rest }: LocationFullQueryResult = LocationReponse;
        const dataLocation: LocationResponseDto = {
            ...rest,
            created_at: rest.created_at.toISOString(),
            updated_at: rest.updated_at.toISOString(),
        };
        const dataLocationProductionLine: LocationProductionLineResponseOrchestratorDto[] = (location_production_lines && location_production_lines.length) ? await Promise.all(location_production_lines.map(async (lpl) => ({
            ...lpl,
            production_line: {
                ...lpl.production_line,
                created_at: lpl.production_line.created_at.toISOString(),
                updated_at: lpl.production_line.updated_at.toISOString(),
            },
            location: {
                ...lpl.location,
                created_at: lpl.production_line.created_at.toISOString(),
                updated_at: lpl.production_line.updated_at.toISOString(),
            }
        }))) : [];

        const dataLocationLocationType: LocationLocationTypeResponseOrchestratorDto[] = (location_location_types && location_location_types.length) ? await Promise.all(location_location_types.map(async (llt) => ({
            ...llt,
            location: {
                ...llt.location,
                created_at: llt.location.created_at.toISOString(),
                updated_at: llt.location.updated_at.toISOString(),
            },
            location_type: {
                ...llt.location_type,
                created_at: llt.location_type.created_at.toISOString(),
                updated_at: llt.location_type.updated_at.toISOString(),
            }
        }))) : [];

        const LocationResponseOrchstrator: LocationResponseOrchestratorDto = {
            location: dataLocation,
            location_production_lines: dataLocationProductionLine,
            location_location_types: dataLocationLocationType
        }
        return LocationResponseOrchstrator;
    };
};