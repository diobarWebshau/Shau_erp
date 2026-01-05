
import { CreateProductionLineProductSchema, DeleteProductionLineProductSchema, GetAllProductionLineProductSchema, GetByIdProductionLineProductSchema, GetByProductionLineProductSchema, UpdateProductionLineProductSchema } from "../../application/dto/production-line-product.endpoints.schema";
import { ProductionLineProductRepository } from "@modules/features/production-line/assigments/production-line-product/infrastructure/repository/production-line-product.respository";
import { ProductionLineRepository } from "@modules/core/production-line/infrastructure/repository/production-line.repository";
import { IProductionLineRepository } from "@modules/core/production-line/domain/production-line.repository.interface";
import { GetByIdProductionLineProductUseCase } from "../../application/use-cases/get-by-id-production-line-product.usecase";
import { GetAllProductionLineProductUseCase } from "../../application/use-cases/get-all-production-line-product.usecase";
import { GetByProductionLineProductUseCase } from "../../application/use-cases/get-by-production-line-product.usecase";
import { CreateProductionLineProductUseCase } from "../../application/use-cases/create-production-line-product.usecase";
import { UpdateProductionLineProductUseCase } from "../../application/use-cases/update-production-line-product.usecase";
import { DeleteProductionLineProductUseCase } from "../../application/use-cases/delete-production-line-product.usecase";
import { ProductRepository } from "@modules/core/product/infrastructure/repository/producto.repository";
import { IProductionLineProductRepository } from "../../domain/production-line.repository.interface";
import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { IProductRepository } from "@modules/core/product/domain/product.repository.interface";
import { ProductionLineProductProps } from "../../domain/production-line-product.types";

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

export class ProductionLineProductController {

    private readonly repo: IProductionLineProductRepository;
    private readonly productRepo: IProductRepository;
    private readonly productionLineRepo: IProductionLineRepository;
    private readonly getAllProductionLineProductUseCase: GetAllProductionLineProductUseCase;
    private readonly getByIdProductionLineProductUseCase: GetByIdProductionLineProductUseCase;
    private readonly getByProductionLineProductUseCase: GetByProductionLineProductUseCase;
    private readonly createProductionLineProductUseCase: CreateProductionLineProductUseCase;
    private readonly updateProductionLineProductUseCase: UpdateProductionLineProductUseCase;
    private readonly deleteProductionLineProductUseCase: DeleteProductionLineProductUseCase;


    constructor() {
        this.repo = new ProductionLineProductRepository();
        this.productRepo = new ProductRepository();
        this.productionLineRepo = new ProductionLineRepository();
        this.createProductionLineProductUseCase = new CreateProductionLineProductUseCase({
            repo: this.repo, productionLineRepo: this.productionLineRepo, productRepo: this.productRepo
        });
        this.updateProductionLineProductUseCase = new UpdateProductionLineProductUseCase(this.repo);
        this.deleteProductionLineProductUseCase = new DeleteProductionLineProductUseCase(this.repo);
        this.getAllProductionLineProductUseCase = new GetAllProductionLineProductUseCase(this.repo);
        this.getByIdProductionLineProductUseCase = new GetByIdProductionLineProductUseCase(this.repo);
        this.getByProductionLineProductUseCase = new GetByProductionLineProductUseCase(this.repo);
    };

    getAll = async (_req: ApiRequest<GetAllProductionLineProductSchema>, res: ApiResponse<GetAllProductionLineProductSchema>) => {
        const plpResponses: ProductionLineProductProps[] = await this.getAllProductionLineProductUseCase.execute();
        return res.status(200).json(plpResponses);
    }
    getById = async (req: ApiRequest<GetByIdProductionLineProductSchema>, res: ApiResponse<GetByIdProductionLineProductSchema>) => {
        const { id }: GetByIdProductionLineProductSchema["params"] = req.params;
        const plpResponse: ProductionLineProductProps | null = await this.getByIdProductionLineProductUseCase.execute(Number(id));
        return res.status(200).json(plpResponse);
    }
    getByProductionLineProduct = async (req: ApiRequest<GetByProductionLineProductSchema>, res: ApiResponse<GetByProductionLineProductSchema>) => {
        const { production_line_id, product_id }: GetByProductionLineProductSchema["params"] = req.params;
        const plpResponse: ProductionLineProductProps | null = await this.getByProductionLineProductUseCase.execute(Number(production_line_id), Number(product_id));
        return res.status(200).json(plpResponse);
    }
    create = async (req: ApiRequest<CreateProductionLineProductSchema>, res: ApiResponse<CreateProductionLineProductSchema>) => {
        const body: CreateProductionLineProductSchema["body"] = req.body;
        const plpResponse: ProductionLineProductProps | null = await this.createProductionLineProductUseCase.execute(body);
        return res.status(201).json(plpResponse);
    }
    update = async (req: ApiRequest<UpdateProductionLineProductSchema>, res: ApiResponse<UpdateProductionLineProductSchema>) => {
        const { id }: UpdateProductionLineProductSchema["params"] = req.params;
        const body: UpdateProductionLineProductSchema["body"] = req.body;
        const plpResponse: ProductionLineProductProps | null = await this.updateProductionLineProductUseCase.execute(Number(id), body);
        return res.status(201).json(plpResponse);
    }
    delete = async (req: ApiRequest<DeleteProductionLineProductSchema>, res: ApiResponse<DeleteProductionLineProductSchema>) => {
        const { id }: DeleteProductionLineProductSchema["params"] = req.params;
        await this.deleteProductionLineProductUseCase.execute(Number(id));
        res.status(200).send(null);
    }
};