
import { IProductRepository } from "@src/modules/core/product/domain/product.repository.interface";
import { IItemRepository } from "@src/modules/features/items/domain/item.repository.interface";
import { IInputRepository } from "@src/modules/core/input/domain/input.repository.interface";
import { ItemQueryProps, ItemSearchCriteria } from "../../domain/item-query.types";
import { ProductProps } from "@src/modules/core/product/domain/product.types";
import { ItemProps } from "@src/modules/features/items/domain/item.type";
import { InputProps } from "@src/modules/core/input/domain/input.types";

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

interface IGetAllItemQueryUseCase {
    productRepo: IProductRepository,
    inputRepo: IInputRepository,
    itemRepo: IItemRepository
}

export class GetAllItemQueryUseCase {

    private readonly productRepo: IProductRepository;
    private readonly itemRepo: IItemRepository;
    private readonly inputRepo: IInputRepository;

    constructor({ inputRepo, productRepo, itemRepo }: IGetAllItemQueryUseCase) {
        this.inputRepo = inputRepo;
        this.itemRepo = itemRepo;
        this.productRepo = productRepo;
    };

    execute = async (query: ItemSearchCriteria): Promise<ItemQueryProps[]> => {
        const [products, inputs, items]: [ProductProps[], InputProps[], ItemProps[]] = await Promise.all([
            this.productRepo.findAll(query),
            this.inputRepo.findAll(query),
            this.itemRepo.findAll()
        ]);

        const productMap: Map<number, ProductProps> = new Map(products.map(p => [p.id, p]));
        const inputMap: Map<number, InputProps> = new Map(inputs.map(i => [i.id, i]));

        return items
            .filter(item =>
                item.item_type === "product"
                    ? productMap.has(item.item_id)
                    : inputMap.has(item.item_id)
            )
            .map(item => ({
                ...item,
                item:
                    item.item_type === "product"
                        ? productMap.get(item.item_id) ?? null
                        : inputMap.get(item.item_id) ?? null
            }));
    };
}