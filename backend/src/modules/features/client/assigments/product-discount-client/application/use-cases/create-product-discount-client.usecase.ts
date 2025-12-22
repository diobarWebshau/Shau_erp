import { IProductRepository } from "@src/modules/core/product/domain/product.repository.interface";
import type { IProductDiscountClientRepository } from "../../domain/product-discount-client.repository.interface";
import type { ProductDiscountClientProps, ProductDiscountClientCreateProps } from "../../domain/product-discount-client.types";
import HttpError from "@shared/errors/http/http-error";
import { IClientRepository } from "@src/modules/core/client/domain/client.repository.interface";
import { ClientProps } from "@src/modules/core/client/domain/client.types";
import { ProductProps } from "@src/modules/core/product/domain/product.types";

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

export class CreateProductDiscountClientUseCase {
    constructor(
        private readonly repo: IProductDiscountClientRepository,
        private readonly repoProduct: IProductRepository,
        private readonly repoClient: IClientRepository
    ) { }
    async execute(data: ProductDiscountClientCreateProps): Promise<ProductDiscountClientProps> {
        const validClient: ClientProps | null = await this.repoClient.findById(data.client_id);
        if (!validClient) throw new HttpError(404,
            "El cliente seleccionado no existe."
        );
        const validProduct: ProductProps | null = await this.repoProduct.findById(data.product_id);
        if (!validProduct) throw new HttpError(404,
            "El producto seleccionado no existe."
        );
        const validDuplicate: ProductDiscountClientProps | null =
            await this.repo.findByProductClientId(data.product_id, data.product_id);
        if (validDuplicate) throw new HttpError(409,
            "El cliente ya tiene un descuento para el producto ingresado."
        );
        const created: ProductDiscountClientProps = await this.repo.create(data);
        if (!created) throw new HttpError(500,
            "No fue posible crear la asignación del descueto del producto al cliente."
        );
        return created;
    }
}
