import { GetByCfdiClientSchema, GetByCompanyNameClientSchema, GetByIdClientSchema } from "../../application/dto/client.endpoint.schema";
import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { GetClientByNameUseCase } from "../../application/use-cases/get-cllient-by-name.usecase";
import { GetClientByCfdiUseCase } from "../../application/use-cases/get-clietn-by-cfdi.usecase";
import { GetClientByIdUseCase } from "../../application/use-cases/get-client-by-id.usecase";
import { GetAllClientsUseCase } from "../../application/use-cases/get-all-client.usecase";
import { CreateClientUseCase } from "../../application/use-cases/create-client.usecase";
import { DeleteClientUseCase } from "../../application/use-cases/delete-client.usecase";
import { UpdateClientUseCase } from "../../application/use-cases/update-client.usecase";
import { ClientResponseDto } from "../../application/dto/client.model.schema";
import { ClientRepository } from "../repository/client.repository";
import { ClientProps, ClientSearchCriteria } from "../../domain/client.types"
import {
    GetAllClientsSchema, CreateClientSchema, UpdateClientSchema, DeleteClientSchema,
} from "../../application/dto/client.endpoint.schema";
import { mapClientQueryToCriteria } from "./client-query-mapper";


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

export class ClientController {

    private readonly repo: ClientRepository;
    private readonly getAllUseCase: GetAllClientsUseCase;
    private readonly getByIdUseCase: GetClientByIdUseCase;
    private readonly getByCfdiUseCase: GetClientByCfdiUseCase;
    private readonly getByCompanyNameUseCase: GetClientByNameUseCase;
    private readonly createUseCase: CreateClientUseCase;
    private readonly updateUseCase: UpdateClientUseCase;
    private readonly deleteUseCase: DeleteClientUseCase;

    constructor() {
        this.repo = new ClientRepository();
        this.getAllUseCase = new GetAllClientsUseCase(this.repo);
        this.getByIdUseCase = new GetClientByIdUseCase(this.repo);
        this.getByCfdiUseCase = new GetClientByCfdiUseCase(this.repo);
        this.getByCompanyNameUseCase = new GetClientByNameUseCase(this.repo);
        this.createUseCase = new CreateClientUseCase(this.repo);
        this.updateUseCase = new UpdateClientUseCase(this.repo);
        this.deleteUseCase = new DeleteClientUseCase(this.repo);
    }

    // ============================================================
    // 🔧 HELPERS PRIVADOS (evita repetir la misma lógica en 7 endpoints)
    // ============================================================

    /** Formatea un Location para convertir fechas a ISO */
    private formatResponse(client: ClientProps): ClientResponseDto {
        return {
            ...client,
            created_at: client.created_at.toISOString(),
            updated_at: client.updated_at.toISOString()
        };
    };

    // ============================================================
    // GET ALL
    // ============================================================
    getAll = async (req: ApiRequest<GetAllClientsSchema>, res: ApiResponse<GetAllClientsSchema>) => {
        const queryRequest: GetAllClientsSchema["query"] = req.query;
        const query: ClientSearchCriteria = mapClientQueryToCriteria(queryRequest);
        const result: ClientProps[] = await this.getAllUseCase.execute(query);
        const formatted: ClientResponseDto[] = result.map(l => this.formatResponse(l));
        return res.status(200).send(formatted);
    };

    // ============================================================
    // GET BY ID
    // ============================================================
    getById = async (req: ApiRequest<GetByIdClientSchema>, res: ApiResponse<GetByIdClientSchema>) => {
        const { id }: GetByIdClientSchema["params"] = req.params
        const result: ClientProps | null = await this.getByIdUseCase.execute(Number(id));
        if (!result) return res.status(204).send(null);
        const formatted: ClientResponseDto = this.formatResponse(result)
        return res.status(200).send(formatted);
    };

    // ============================================================
    // GET BY ID
    // ============================================================
    getByCfdi = async (req: ApiRequest<GetByIdClientSchema>, res: ApiResponse<GetByIdClientSchema>) => {
        const { id }: GetByIdClientSchema["params"] = req.params
        const result: ClientProps | null = await this.getByIdUseCase.execute(Number(id));
        if (!result) return res.status(204).send(null);
        const formatted: ClientResponseDto = this.formatResponse(result)
        return res.status(200).send(formatted);
    };

    // ============================================================
    // GET BY ID
    // ============================================================
    getByCFDI = async (req: ApiRequest<GetByCfdiClientSchema>, res: ApiResponse<GetByIdClientSchema>) => {
        const { cfdi }: GetByCfdiClientSchema["params"] = req.params
        const result: ClientProps | null = await this.getByCfdiUseCase.execute(cfdi);
        if (!result) return res.status(204).send(null);
        const formatted: ClientResponseDto = this.formatResponse(result)
        return res.status(200).send(formatted);
    };

    // ============================================================
    // GET BY NAME
    // ============================================================
    getByCompanyName = async (req: ApiRequest<GetByCompanyNameClientSchema>, res: ApiResponse<GetByCompanyNameClientSchema>) => {
        const { company_name }: GetByCompanyNameClientSchema["params"] = req.params
        const result: ClientProps | null = await this.getByCompanyNameUseCase.execute(company_name);
        if (!result) return res.status(204).send(null);
        const formatted: ClientResponseDto = this.formatResponse(result)
        return res.status(200).send(formatted);
    };

    // ============================================================
    // CREATE
    // ============================================================
    create = async (req: ApiRequest<CreateClientSchema>, res: ApiResponse<CreateClientSchema>) => {
        const body: CreateClientSchema["body"] = req.body;
        const created: ClientProps = await this.createUseCase.execute(body);
        const formatted: ClientResponseDto = this.formatResponse(created);
        return res.status(201).send(formatted);
    };

    // ============================================================
    // UPDATE
    // ============================================================
    update = async (req: ApiRequest<UpdateClientSchema>, res: ApiResponse<UpdateClientSchema>) => {
        const { id }: UpdateClientSchema["params"] = req.params;
        const body: UpdateClientSchema["body"] = req.body;
        const updated = await this.updateUseCase.execute(Number(id), body);
        const formatted: ClientResponseDto = this.formatResponse(updated);
        return res.status(200).send(formatted);
    };

    // ============================================================
    // DELETE
    // ============================================================
    delete = async (req: ApiRequest<DeleteClientSchema>, res: ApiResponse<DeleteClientSchema>) => {
        const { id }: DeleteClientSchema["params"] = req.params;
        await this.deleteUseCase.execute(Number(id));
        return res.status(201).send(null);
    };
};