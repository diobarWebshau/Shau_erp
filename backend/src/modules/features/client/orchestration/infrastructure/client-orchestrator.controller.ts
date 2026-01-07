import { ProductDiscountClientRepository } from "../../assigments/product-discount-client/infrastructure/repository/product-discount-client.repository";
import { IProductDiscountClientRepository } from "../../assigments/product-discount-client/domain/product-discount-client.repository.interface";
import { ClientCreateOrchestratorSchema, ClientUpdateOrchestratorSchema } from "../application/dto/client-orchestrator.endpoint.schema";
import { ClientAddressRepository } from "../../assigments/client-addresses/infrastructure/repository/client-address.repository";
import { IClientAddressRepository } from "../../assigments/client-addresses/domain/client-address.repository.interface";
import { mapClientOrchestratorDomainToDto } from "./../../../../query/client/infrastructure/http/client-query.controller";
import { ClientQueryRepository } from "@modules/query/client/infrastructure/repository/client-query.repository";
import { CreateClientOrchestratorUseCase } from "../application/use-cases/create-client-orchestrator.usecase";
import { UpdateClientOrchestratorUseCase } from "../application/use-cases/update-client-orchestrator.usecase";
import { ClientRepository } from "@modules/core/client/infrastructure/repository/client.repository";
import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { IClientQueryRepository } from "@modules/query/client/domain/client-query.repository";
import { IClientRepository } from "@modules/core/client/domain/client.repository.interface";
import { ClientOrchestrator } from "../domain/client-orchestrator.types";

export class ClientOrchestratorController {

    private readonly createClientOrchestratorUseCase: CreateClientOrchestratorUseCase;
    private readonly updateClientOrchestratorUseCase: UpdateClientOrchestratorUseCase;
    private readonly productDiscountClientRepo: IProductDiscountClientRepository;
    private readonly clientAddressRepo: IClientAddressRepository;
    private readonly clientQueryRepo: IClientQueryRepository;
    private readonly clientRepo: IClientRepository;

    constructor() {
        this.clientRepo = new ClientRepository();
        this.clientAddressRepo = new ClientAddressRepository();
        this.productDiscountClientRepo = new ProductDiscountClientRepository();
        this.clientQueryRepo = new ClientQueryRepository();
        this.createClientOrchestratorUseCase = new CreateClientOrchestratorUseCase({
            clientRepo: this.clientRepo,
            clientAddressRepo: this.clientAddressRepo,
            clientQueryRepo: this.clientQueryRepo,
            productDiscountClientRepo: this.productDiscountClientRepo
        });
        this.updateClientOrchestratorUseCase = new UpdateClientOrchestratorUseCase({
            clientAddressRepo: this.clientAddressRepo,
            clientRepo: this.clientRepo,
            productDiscountClientRepo: this.productDiscountClientRepo,
            clientQueryRepo: this.clientQueryRepo
        })
    };

    create = async (req: ApiRequest<ClientCreateOrchestratorSchema>, res: ApiResponse<ClientCreateOrchestratorSchema>) => {
        const { payload }: ClientCreateOrchestratorSchema["body"] = req.body;
        const response: ClientOrchestrator = await this.createClientOrchestratorUseCase.execute(payload);
        const result = mapClientOrchestratorDomainToDto(response);
        return res.status(201).json(result);
    };

    update = async (req: ApiRequest<ClientUpdateOrchestratorSchema>, res: ApiResponse<ClientUpdateOrchestratorSchema>) => {
        const { id }: ClientUpdateOrchestratorSchema["params"] = req.params;
        const { payload }: ClientUpdateOrchestratorSchema["body"] = req.body;
        const response: ClientOrchestrator = await this.updateClientOrchestratorUseCase.execute(Number(id), payload);
        const result = mapClientOrchestratorDomainToDto(response);
        return res.status(200).json(result);
    };

};