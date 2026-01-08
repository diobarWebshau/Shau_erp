
import { IProductionLineRepository } from "@src/modules/core/production-line/domain/production-line.repository.interface";
import { ProductionLineProductProps } from "../../domain/production-line-product.types";
import { IProductionLineProductRepository } from "../../domain/production-line.repository.interface";
import { IProductRepository } from "@src/modules/core/product/domain/product.repository.interface";
import HttpError from "@src/shared/errors/http/http-error";
import { Transaction } from "sequelize";
import { ProductionLineProductCreateDto } from "../dto/production-line-product.model.schema";

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

interface ICreateProductionLineProductUseCase {
    repo: IProductionLineProductRepository,
    productRepo: IProductRepository,
    productionLineRepo: IProductionLineRepository,
}

export class CreateProductionLineProductUseCase {
    private readonly repo: IProductionLineProductRepository;
    private readonly productionLineRepo: IProductionLineRepository;
    private readonly productRepo: IProductRepository;

    constructor({ productRepo, productionLineRepo, repo }: ICreateProductionLineProductUseCase) {
        this.repo = repo;
        this.productRepo = productRepo;
        this.productionLineRepo = productionLineRepo;
    };

    async execute(data: ProductionLineProductCreateDto, tx?: Transaction) {
        const validateProduct = await this.productRepo.findById(data.product_id, tx);
        if (!validateProduct) throw new HttpError(500,
            "El producto que se pretende asignar a la línea de producción, no existe."
        );
        const validateProductionLine = await this.productionLineRepo.findById(data.production_line_id, tx);
        if (!validateProductionLine) throw new HttpError(500,
            "La línea de producción que se le desea asignar un producto, no existe."
        );
        const validateDuplicate: ProductionLineProductProps | null = await this.repo.findByProductionLineProduct(data.product_id, data.production_line_id, tx);
        if (validateDuplicate) throw new HttpError(500,
            "El producto ya esta fue anteriormente asignado a la línea de producción."
        );
        const created: ProductionLineProductProps = await this.repo.create(data, tx);
        if (!created) throw new HttpError(500,
            "No fue posible crear la asignación del producto a la línea de producción."
        );
        return created;
    };
}