import type { ProductDiscountRangeProps, ProductDiscountRangeCreateProps } from "../../domain/product-discount-range.types";
import type { IProductDiscountRangeRepository } from "../../domain/product-discount-range.repository.interface";
import { IProductRepository } from "@modules/core/product/domain/product.repository.interface";
import { checkRangeConflicts, type RangeConflict } from "@helpers/check-range-conflicts";
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

export class CreateProductDiscountRangeUseCase {
    constructor(
        private readonly repo: IProductDiscountRangeRepository,
        private readonly repoProduct: IProductRepository
    ) { }
    async execute(data: ProductDiscountRangeCreateProps, tx?: Transaction): Promise<ProductDiscountRangeProps> {
        const validateProduct = await this.repoProduct.findById(data.product_id, tx);
        if (!validateProduct) throw new HttpError(404,
            "El producto seleccionado no existe."
        );
        const getAll: ProductDiscountRangeProps[] = await this.repo.findByProductId(data.product_id, tx);
        const getAllWithNew: Pick<ProductDiscountRangeCreateProps, "min_qty" | "max_qty">[] = [...getAll, ...[data]];
        const conflictRanges: RangeConflict = checkRangeConflicts(getAllWithNew, "min_qty", "max_qty");
        if (conflictRanges === "invalid_range") {
            throw new HttpError(400,
                "El rango del descueto es invalído."
            );
        }
        if (conflictRanges === "duplicate") {
            throw new HttpError(400,
                "El rango del descuento ya esta aplicado por otro descuento del producto."
            );
        }
        if (conflictRanges === "overlap") {
            throw new HttpError(400,
                "El rango del descueto se traslapa con otro descuento ya existente para el producto."
            );
        }
        const created: ProductDiscountRangeProps = await this.repo.create(data, tx);
        if (!created) throw new HttpError(500,
            "No fue posible crear la asignación del descueto por rango al producto."
        );
        return created;
    }
}
