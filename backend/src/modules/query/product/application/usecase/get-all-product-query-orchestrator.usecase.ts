import type { ProductQueryRepository } from "../../infrastructure/product-query.repository";
import type { ProductFullQueryResult, ProductSearchCriteria } from "../../domain/product-query.type";
import { Transaction } from "sequelize";
import { ProductDiscountRangeProps, ProductOrchestratorResponse } from "@src/modules/features/products/orchestrator/domain/product-orchestrator.types";
import ImageHandler from "@src/helpers/imageHandlerClass";
import { ProductDiscountRangeResponseDto } from "@src/modules/features/products/assigments/product-discounts-ranges/application/dto/product-discount-range.model.schema";

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

export class GetAllProductsQueryOrchestratorUseCase {
    constructor(private readonly repo: ProductQueryRepository) { }
    async execute(query: ProductSearchCriteria, tx?: Transaction): Promise<ProductOrchestratorResponse[]> {
        const productsResposne: ProductFullQueryResult[] = await this.repo.getAllProductOrchestratorResult(query, tx);
        const productsResultOrchestrator: ProductOrchestratorResponse[] = [];
        for (const p of productsResposne) {
            const { products_inputs, product_processes, product_discount_ranges, ...rest } = p;
            const productResultOrch: ProductOrchestratorResponse = {
                product: {
                    ...rest,
                    photo: rest.photo ? await ImageHandler.convertToBase64(rest.photo) : null,
                    created_at: rest?.created_at.toISOString(),
                    updated_at: rest?.updated_at.toISOString(),
                },
                products_inputs: products_inputs ?? [],
                product_discount_ranges: product_discount_ranges.map(
                    (pdr: ProductDiscountRangeProps): ProductDiscountRangeResponseDto => ({
                        ...pdr,
                        created_at: pdr?.created_at.toISOString(),
                        updated_at: pdr?.updated_at.toISOString()
                    })
                ) ?? [],
                product_processes: product_processes ?? []
            };
            productsResultOrchestrator.push(productResultOrch)
        }
        return productsResultOrchestrator;
    }
};
