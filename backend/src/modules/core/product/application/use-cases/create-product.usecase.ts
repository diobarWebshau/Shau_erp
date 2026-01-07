import type { ProductCreateProps, ProductProps } from "../../domain/product.types";
import type { IProductRepository } from "../../domain/product.repository.interface";
import { DecimalVO } from "@src/shared/domain/value-objects/decimal.vo";
import { ProductCreateDto } from "../dto/product.model.schema";
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

const mapProductCreateDtoToDomain = (data: ProductCreateDto): ProductCreateProps => ({
    ...data,
    production_cost: data.production_cost ? DecimalVO.from(data.production_cost) : null,
    sale_price: data.sale_price ? DecimalVO.from(data.sale_price) : null,
});

export class CreateProductUseCase {
    constructor(private readonly repo: IProductRepository) { }

    async execute(data: ProductCreateDto, tx?: Transaction): Promise<ProductProps> {


        const createData = mapProductCreateDtoToDomain(data);

        // ------------------------------------------------------------------
        // 🔎 VALIDACIONES DE NEGOCIO
        // ------------------------------------------------------------------
        if (createData?.name) {
            const existsByName = await this.repo.findByName(createData.name, tx);
            if (existsByName) {
                throw new HttpError(
                    409,
                    "El nombre ingresado para el nuevo producte, ya esta utilizado por otro producte."
                );
            }
        }

        if (createData?.sku) {
            const existsBySku = await this.repo.findBySku(createData.sku, tx);
            if (existsBySku) {
                throw new HttpError(
                    409,
                    "El sku ingresado para el nuevo producte, ya esta utilizado por otro producte."
                );
            }
        }

        if (createData?.custom_id) {
            const existsByCustomId = await this.repo.findByCustomId(createData.custom_id, tx);
            if (existsByCustomId) {
                throw new HttpError(
                    409,
                    "El id único ingresado para el nuevo producte, ya esta utilizado por otro producte."
                );
            }
        }

        if (createData?.barcode) {
            const existsByBarcode = await this.repo.findByBarcode(createData.barcode.toString(), tx);
            if (existsByBarcode) {
                throw new HttpError(
                    409,
                    "El codigo de barras ingresado para el nuevo producte, ya esta utilizado por otro producte."
                );
            }
        }

        // ------------------------------------------------------------------
        // 🟢 CREACIÓN INICIAL DEL PRODUCTO (SIN TOCAR FS AÚN)
        // ------------------------------------------------------------------
        const created: ProductProps = await this.repo.create(createData, tx);

        if (!created) {
            throw new HttpError(500, "No fue posible crear el nuevo producto");
        }

        // ------------------------------------------------------------------
        // 🖼️ ORGANIZACIÓN DE IMAGEN (POST-CREACIÓN)
        // ------------------------------------------------------------------
        if (createData.photo) {
            try {
                const newRelativePath =
                    await ImageHandler.moveImageToEntityDirectory(
                        createData.photo,
                        "products",
                        created.id.toString()
                    );

                // Actualizar únicamente el campo photo
                await this.repo.update(created.id, {
                    photo: newRelativePath,
                }, tx);

                // Reflejar el cambio en el objeto de retorno
                created.photo = newRelativePath;

            } catch (error) {
                // Si algo falla durante el move, limpiar archivo temporal.
                // La creación del producto NO se revierte: el producto puede existir sin imagen.
                try {
                    await ImageHandler.removeImageIfExists(createData.photo);
                } catch {
                    // silencio intencional
                }

                // Propagar el error para que la capa superior decida cómo responder
                throw error;
            }
        }

        return created;
    }
}
