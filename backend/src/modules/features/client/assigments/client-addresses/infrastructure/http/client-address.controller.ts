import { GetClienAddressByClientIdUseCase } from "../../application/use-cases/get-cllient-address-by-client-id.usecase";
import { GetClientAddressByIdUseCase } from "../../application/use-cases/get-client-address-by-id.usecase";
import { GetAllClientAddressesUseCase } from "../../application/use-cases/get-all-client-address.usecase";
import { CreateClientAddressUseCase } from "../../application/use-cases/create-client-address.usecase";
import { DeleteClientAddressUseCase } from "../../application/use-cases/delete-client-address.usecase";
import { UpdateClientAddressUseCase } from "../../application/use-cases/update-client-address.usecase";
import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { ClientAddressResponseDto } from "../../application/dto/client-address.model.schema";
import { ClientAddressRepository } from "../repository/client-address.repository";
import { ClientAddressProps } from "../../domain/client-address.types"
import {
    GetAllClientAddresssSchema, CreateClientAddressSchema,
    UpdateClientAddressSchema, DeleteClientAddressSchema,
    GetByClientIdClientAddressSchema, GetByIdClientAddressSchema
} from "../../application/dto/client-address.endpoint.schema";
import { ClientRepository } from "@modules/core/client/infrastructure/repository/client.repository";


export class ClientAddressController {

    private readonly repoClientAddress: ClientAddressRepository;
    private readonly repoClient: ClientRepository;
    private readonly getAllUseCase: GetAllClientAddressesUseCase;
    private readonly getByIdUseCase: GetClientAddressByIdUseCase;
    private readonly getByClientIdUseCase: GetClienAddressByClientIdUseCase;
    private readonly createUseCase: CreateClientAddressUseCase;
    private readonly updateUseCase: UpdateClientAddressUseCase;
    private readonly deleteUseCase: DeleteClientAddressUseCase;

    constructor() {
        this.repoClientAddress = new ClientAddressRepository();
        this.repoClient = new ClientRepository();
        this.getAllUseCase = new GetAllClientAddressesUseCase(this.repoClientAddress);
        this.getByIdUseCase = new GetClientAddressByIdUseCase(this.repoClientAddress);
        this.getByClientIdUseCase = new GetClienAddressByClientIdUseCase(this.repoClientAddress);
        this.createUseCase = new CreateClientAddressUseCase(this.repoClientAddress, this.repoClient);
        this.updateUseCase = new UpdateClientAddressUseCase(this.repoClientAddress);
        this.deleteUseCase = new DeleteClientAddressUseCase(this.repoClientAddress);
    }

    // ============================================================
    // 🔧 HELPERS PRIVADOS (evita repetir la misma lógica en 7 endpoints)
    // ============================================================

    /** Formatea un Location para convertir fechas a ISO */
    private formatResponse(clientAddress: ClientAddressProps): ClientAddressResponseDto {
        return {
            ...clientAddress,
            created_at: clientAddress.created_at.toISOString(),
            updated_at: clientAddress.updated_at.toISOString()
        };
    };

    // ============================================================
    // GET ALL
    // ============================================================
    getAll = async (_req: ApiRequest<GetAllClientAddresssSchema>, res: ApiResponse<GetAllClientAddresssSchema>) => {
        const result: ClientAddressProps[] = await this.getAllUseCase.execute();
        const formatted: ClientAddressResponseDto[] = result.map(l => this.formatResponse(l));
        return res.status(200).send(formatted);
    };

    // ============================================================
    // GET BY ID
    // ============================================================
    getById = async (req: ApiRequest<GetByIdClientAddressSchema>, res: ApiResponse<GetByIdClientAddressSchema>) => {
        const { id }: GetByIdClientAddressSchema["params"] = req.params
        const result: ClientAddressProps | null = await this.getByIdUseCase.execute(Number(id));
        if (!result) return res.status(204).send(null);
        const formatted: ClientAddressResponseDto = this.formatResponse(result)
        return res.status(200).send(formatted);
    };

    // ============================================================
    // GET BY NAME
    // ============================================================
    getByClientIdName = async (req: ApiRequest<GetByClientIdClientAddressSchema>, res: ApiResponse<GetByClientIdClientAddressSchema>) => {
        const { client_id }: GetByClientIdClientAddressSchema["params"] = req.params
        const result: ClientAddressProps | null = await this.getByClientIdUseCase.execute(client_id);
        if (!result) return res.status(204).send(null);
        const formatted: ClientAddressResponseDto = this.formatResponse(result)
        return res.status(200).send(formatted);
    };

    // ============================================================
    // CREATE
    // ============================================================
    create = async (req: ApiRequest<CreateClientAddressSchema>, res: ApiResponse<CreateClientAddressSchema>) => {
        const body: CreateClientAddressSchema["body"] = req.body;
        const created: ClientAddressProps = await this.createUseCase.execute(body);
        const formatted: ClientAddressResponseDto = this.formatResponse(created);
        return res.status(201).send(formatted);
    };

    // ============================================================
    // UPDATE
    // ============================================================
    update = async (req: ApiRequest<UpdateClientAddressSchema>, res: ApiResponse<UpdateClientAddressSchema>) => {
        const { id }: UpdateClientAddressSchema["params"] = req.params;
        const body: UpdateClientAddressSchema["body"] = req.body;
        const updated = await this.updateUseCase.execute(Number(id), body);
        const formatted: ClientAddressResponseDto = this.formatResponse(updated);
        return res.status(200).send(formatted);
    };

    // ============================================================
    // DELETE
    // ============================================================
    delete = async (req: ApiRequest<DeleteClientAddressSchema>, res: ApiResponse<DeleteClientAddressSchema>) => {
        const { id }: DeleteClientAddressSchema["params"] = req.params;
        await this.deleteUseCase.execute(Number(id));
        return res.status(201).send(null);
    };
};