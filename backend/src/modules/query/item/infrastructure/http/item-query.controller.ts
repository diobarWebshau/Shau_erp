import { GetAllItemQuerySchema, GetByIdItemQuerySchema } from "../../application/dto/item-query.endpoint.schema";
import { ProductRepository } from "@modules/core/product/infrastructure/repository/producto.repository";
import { ItemRepository } from "@modules/features/items/infrastructure/repository/item.repository";
import { GetByIdItemQueryUseCase } from "../../application/use-case/get-by-id-item-query.usecase";
import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { InputRepository } from "@modules/core/input/infrastructure/repository/input.repository";
import { GetAllItemQueryUseCase } from "../../application/use-case/get-all-item-query.usecase";
import { ItemQueryResponseDTO } from "../../application/dto/item-query.model.schema";
import { ItemQueryProps, ItemSearchCriteria } from "../../domain/item-query.types";
import { mapItemQueryToCriteria } from "./item-query-mapper";
import ImageHandler from "@helpers/imageHandlerClass";

/**
 * Controller (Infrastructure / HTTP)
 * ------------------------------------------------------------------
 * Define un controlador HTTP tipado que actúa como adaptador entre
 * el mundo externo (Express, HTTP requests/responses) y la aplicación.
 * Su propósito es recibir peticiones, extraer parámetros, ejecutar
 * casos de uso y devolver respuestas formateadas, manteniendo la
 * separación entre dominio e infraestructura.
 *
 * Diferencia con otras capas:
 * - Entity: representa conceptos del negocio con identidad, reglas e invariantes.
 * - UseCase: encapsula operaciones del sistema aplicando reglas de negocio.
 * - Repository: implementa acceso a datos y persistencia.
 * - Controller: orquesta casos de uso en respuesta a peticiones externas,
 *   pero no contiene lógica de negocio ni persistencia.
 *
 * Responsabilidades técnicas:
 * - Recibir y tipar requests mediante `ApiRequest` y `ApiResponse`.
 * - Invocar casos de uso (`GetAll`, `GetById`, `Create`, `Update`, `Delete`).
 * - Formatear respuestas (ej. convertir fechas a ISO).
 * - Manejar respuestas estándar (200 OK, 201 Created, 204 No Content).
 * - Encapsular lógica repetida en helpers privados para mantener el código limpio.
 *
 * Qué hace:
 * - Controla el flujo de entrada/salida de la aplicación vía HTTP.
 * - Orquesta casos de uso y devuelve DTOs formateados.
 * - Asegura tipado estricto en endpoints mediante schemas.
 * - Centraliza lógica repetida como formateo de fechas y manejo de "no found".
 *
 * Qué no hace:
 * - No representa entidades del dominio ni objetos de negocio.
 * - No contiene reglas de negocio ni invariantes.
 * - No implementa persistencia ni interactúa directamente con infraestructura.
 * - No sustituye a los casos de uso; su rol es coordinar su ejecución.
 *
 * Convención de nombres:
 * - Se nombra con el sufijo `Controller` porque su responsabilidad es
 *   controlar el flujo de entrada/salida HTTP. A diferencia de las `Entity`,
 *   que modelan conceptos del negocio, los `Controller` son adaptadores
 *   externos que conectan la aplicación con el mundo exterior.
 *
 * Ubicación en la arquitectura Clean + Core + Features + Orchestrators:
 * - Core: entidades y casos de uso.
 * - Features: repositorios y servicios de infraestructura.
 * - Controller: capa de infraestructura HTTP que recibe requests y
 *   orquesta casos de uso.
 * - Orchestrators: pueden agrupar controladores y exponer endpoints
 *   de forma coherente hacia productes externos.
 */

export class ItemQueryController {

    private readonly itemRepo: ItemRepository;
    private readonly productRepo: ProductRepository;
    private readonly inputRepo: InputRepository;
    private readonly getAllItemQueryUseCase: GetAllItemQueryUseCase;
    private readonly getByIdItemQueryUseCase: GetByIdItemQueryUseCase;

    constructor() {
        this.itemRepo = new ItemRepository();
        this.productRepo = new ProductRepository();
        this.inputRepo = new InputRepository();
        this.getAllItemQueryUseCase = new GetAllItemQueryUseCase({
            itemRepo: this.itemRepo, productRepo: this.productRepo,
            inputRepo: this.inputRepo
        });
        this.getByIdItemQueryUseCase = new GetByIdItemQueryUseCase({
            itemRepo: this.itemRepo, productRepo: this.productRepo,
            inputRepo: this.inputRepo
        });
    };

    private formatItemResponseDate = async (item: ItemQueryProps): Promise<ItemQueryResponseDTO> => {
        const response = {
            ...item,
            ...(
                item.item ? {
                    item: {
                        ...item.item,
                        photo: item.item?.photo ? await ImageHandler.convertToBase64(item.item.photo) : null,
                        created_at: item.item?.created_at.toISOString(),
                        updated_at: item.item?.updated_at.toISOString()
                    }
                } : { item: null }
            )
        };
        return response;
    };

    getAll = async (req: ApiRequest<GetAllItemQuerySchema>, res: ApiResponse<GetAllItemQuerySchema>): Promise<void> => {
        const queryRequest: GetAllItemQuerySchema["query"] = req.query;
        const query: ItemSearchCriteria = mapItemQueryToCriteria(queryRequest);
        const items: ItemQueryProps[] = await this.getAllItemQueryUseCase.execute(query);
        const formattedItems: ItemQueryResponseDTO[] = await Promise.all(items.map((item) => this.formatItemResponseDate(item)));
        res.status(200).json(formattedItems);
    };

    getById = async (req: ApiRequest<GetByIdItemQuerySchema>, res: ApiResponse<GetByIdItemQuerySchema>): Promise<void> => {
        const { id }: GetByIdItemQuerySchema["params"] = req.params;
        const item: ItemQueryProps | null = await this.getByIdItemQueryUseCase.execute(Number(id));
        res.status(200).json(item ? await this.formatItemResponseDate(item) : null);
    };
};