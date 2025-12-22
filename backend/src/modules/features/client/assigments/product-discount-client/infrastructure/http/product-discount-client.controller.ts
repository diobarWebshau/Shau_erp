import type { ProductDiscountClientCreateDto, ProductDiscountClientResponseDto, ProductDiscountClientUpdateDto } from "../../application/dto/product-discount-client.model.schema";
import { GetProductDiscountClientByProductClientUseCase } from "../../application/use-cases/get-product-discount-client-by-product-client.usecase";
import { GetProductDiscountClientByProductUseCase } from "../../application/use-cases/get-product-discount-client-by-client.usecase";
import { GetProductDiscountClientByIdUseCase } from "../../application/use-cases/get-product-discount-client-by-id.usecase";
import { GetAllProductDiscountClientUseCase } from "../../application/use-cases/get-all-product-discount-client.usecase";
import { CreateProductDiscountClientUseCase } from "../../application/use-cases/create-product-discount-client.usecase";
import { UpdateProductDiscountClientUseCase } from "../../application/use-cases/update-product-discount-client.usecase";
import { DeleteProductDiscountClientUseCase } from "../../application/use-cases/delete-product-discount-client.usecase";
import type { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { ProductDiscountClientRepository } from "../repository/product-discount-client.repository";
import { ProductDiscountClientProps } from "../../domain/product-discount-client.types";
import {
    CreateProductDiscountClientSchema, DeleteProductDiscountClientSchema,
    GetAllProductDiscountClientsSchema, GetByIdProductDiscountClientSchema,
    UpdateProductDiscountClientSchema, GetByProductIdProductDiscountClientSchema,
    GetByProductIdClientIdProductDiscountClientSchema
} from "../../application/dto/product_discount-client.endpoint.schema"
import { ProductRepository } from "@src/modules/core/product/infrastructure/repository/producto.repository";
import { ClientRepository } from "@src/modules/core/client/infrastructure/repository/client.repository";

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
 *   de forma coherente hacia clientes externos.
 */

export class ProductDiscountClientController {

    private readonly repo: ProductDiscountClientRepository;
    private readonly repoProduct: ProductRepository;
    private readonly repoClient: ClientRepository;
    private readonly getAllUseCase: GetAllProductDiscountClientUseCase;
    private readonly getByIdUseCase: GetProductDiscountClientByIdUseCase;
    private readonly createUseCase: CreateProductDiscountClientUseCase;
    private readonly updateUseCase: UpdateProductDiscountClientUseCase;
    private readonly deleteUseCase: DeleteProductDiscountClientUseCase;
    private readonly getByProductUseCase: GetProductDiscountClientByProductUseCase
    private readonly getByProductClientUseCase: GetProductDiscountClientByProductClientUseCase

    constructor() {
        this.repo = new ProductDiscountClientRepository();
        this.repoProduct = new ProductRepository();
        this.repoClient = new ClientRepository();
        this.getAllUseCase = new GetAllProductDiscountClientUseCase(this.repo);
        this.getByIdUseCase = new GetProductDiscountClientByIdUseCase(this.repo);
        this.createUseCase = new CreateProductDiscountClientUseCase(this.repo, this.repoProduct, this.repoClient);
        this.updateUseCase = new UpdateProductDiscountClientUseCase(this.repo);
        this.deleteUseCase = new DeleteProductDiscountClientUseCase(this.repo);
        this.getByProductUseCase = new GetProductDiscountClientByProductUseCase(this.repo);
        this.getByProductClientUseCase = new GetProductDiscountClientByProductClientUseCase(this.repo);
    };

    /** Formatea un Location para convertir fechas a ISO */
    private async formatResponse(productDiscountClient: ProductDiscountClientProps): Promise<ProductDiscountClientResponseDto> {
        return {
            ...productDiscountClient,
            created_at: productDiscountClient.created_at.toISOString(),
            updated_at: productDiscountClient.updated_at.toISOString()
        };
    };

    // ============================================================
    // GET ALL
    // ============================================================
    getAll = async (_req: ApiRequest<GetAllProductDiscountClientsSchema>, res: ApiResponse<GetAllProductDiscountClientsSchema>) => {
        const result: ProductDiscountClientProps[] = await this.getAllUseCase.execute();
        const formatted: ProductDiscountClientResponseDto[] = await Promise.all(
            result.map(p => this.formatResponse(p))
        );
        return res.status(200).send(formatted);
    };

    // ============================================================
    // GET all discount of the product
    // ============================================================

    getByClientId = async (req: ApiRequest<GetByProductIdProductDiscountClientSchema>, res: ApiResponse<GetByProductIdProductDiscountClientSchema>) => {
        const { client_id }: GetByProductIdProductDiscountClientSchema["params"] = req.params
        const result: ProductDiscountClientProps[] = await this.getByProductUseCase.execute(Number(client_id));
        const formatted: ProductDiscountClientResponseDto[] = await Promise.all(
            result.map(p => this.formatResponse(p))
        );
        return res.status(200).send(formatted);
    };

    // ============================================================
    // GET all discount of the product
    // ============================================================

    getByProductClientId = async (req: ApiRequest<GetByProductIdClientIdProductDiscountClientSchema>, res: ApiResponse<GetByProductIdClientIdProductDiscountClientSchema>) => {
        const { client_id, product_id }: GetByProductIdClientIdProductDiscountClientSchema["params"] = req.params
        const result: ProductDiscountClientProps | null = await this.getByProductClientUseCase.execute(Number(product_id), Number(client_id));
        if (!result) return res.status(204).send(null);
        await console.log(`result`, result)
        const formatted: ProductDiscountClientResponseDto = await this.formatResponse(result);
        return res.status(200).send(formatted);
    };

    // ============================================================
    // GET BY ID
    // ============================================================
    getById = async (req: ApiRequest<GetByIdProductDiscountClientSchema>, res: ApiResponse<GetByIdProductDiscountClientSchema>) => {
        const { id }: GetByIdProductDiscountClientSchema["params"] = req.params
        const result: ProductDiscountClientProps | null = await this.getByIdUseCase.execute(Number(id));
        if (!result) return res.status(204).send(null);
        const formatted: ProductDiscountClientResponseDto = await this.formatResponse(result);
        return res.status(200).send(formatted);
    };

    // ============================================================
    // CREATE
    // ============================================================
    create = async (req: ApiRequest<CreateProductDiscountClientSchema>, res: ApiResponse<CreateProductDiscountClientSchema>) => {
        const body: ProductDiscountClientCreateDto = req.body;
        const created: ProductDiscountClientProps = await this.createUseCase.execute(body);
        const formatted: ProductDiscountClientResponseDto = await this.formatResponse(created);
        return res.status(201).send(formatted);
    };

    // ============================================================
    // UPDATE
    // ============================================================
    update = async (req: ApiRequest<UpdateProductDiscountClientSchema>, res: ApiResponse<UpdateProductDiscountClientSchema>) => {
        const { id }: UpdateProductDiscountClientSchema["params"] = req.params;
        const body: ProductDiscountClientUpdateDto = req.body;
        const updated: ProductDiscountClientProps = await this.updateUseCase.execute(Number(id), body);
        const formatted: ProductDiscountClientResponseDto = await this.formatResponse(updated);
        return res.status(200).send(formatted);
    };

    // ============================================================
    // DELETE
    // ============================================================
    delete = async (req: ApiRequest<DeleteProductDiscountClientSchema>, res: ApiResponse<DeleteProductDiscountClientSchema>) => {
        const { id }: DeleteProductDiscountClientSchema["params"] = req.params;
        await this.deleteUseCase.execute(Number(id));
        return res.status(201).send(null);
    };
}

export default ProductDiscountClientController;
