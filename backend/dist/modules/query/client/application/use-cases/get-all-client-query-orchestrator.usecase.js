"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllClientsQueryOrchestratorUseCase = void 0;
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
class GetAllClientsQueryOrchestratorUseCase {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async execute(query, tx) {
        const clientOrchestratorResponse = await this.repo.getAllClientFullQuery(query, tx);
        const clientResultOrchestrator = [];
        for (const c of clientOrchestratorResponse) {
            const { addresses, discounts, ...client } = c;
            const dataClient = {
                ...client,
                created_at: client.created_at.toISOString(),
                updated_at: client.updated_at.toISOString(),
            };
            const dataDiscounts = discounts.length ? await Promise.all(discounts.map(async (disc) => ({
                ...disc,
                created_at: disc.created_at.toISOString(),
                updated_at: disc.updated_at.toISOString(),
                product: {
                    ...disc.product,
                    created_at: disc.product.created_at.toISOString(),
                    updated_at: disc.product.updated_at.toISOString(),
                    photo: disc.product.photo ? await imageHandlerClass_1.default.convertToBase64(disc.product.photo) : null
                }
            }))) : [];
            const dataAddresses = addresses.length ? await Promise.all(addresses.map(async (addr) => ({
                ...addr,
                created_at: addr.created_at.toISOString(),
                updated_at: addr.updated_at.toISOString(),
            }))) : [];
            const clientFullResult = {
                client: dataClient,
                addresses: dataAddresses,
                discounts: dataDiscounts
            };
            clientResultOrchestrator.push(clientFullResult);
        }
        return clientResultOrchestrator;
    }
}
exports.GetAllClientsQueryOrchestratorUseCase = GetAllClientsQueryOrchestratorUseCase;
;
