import { IProductDiscountClientRepository } from "../../../assigments/product-discount-client/domain/product-discount-client.repository.interface";
import { IClientAddressRepository } from "../../../assigments/client-addresses/domain/client-address.repository.interface";
import { ClientOrchestrator } from "../../domain/client-orchestrator.types";
import { IClientQueryRepository } from "@modules/query/client/domain/client-query.repository";
import { IClientRepository } from "@modules/core/client/domain/client.repository.interface";
import { ClientOrchestratorCreateDto } from "../dto/client-orchestrator.model.schema";
interface ICreateClientOrchestratorUseCase {
    productDiscountClientRepo: IProductDiscountClientRepository;
    clientRepo: IClientRepository;
    clientAddressRepo: IClientAddressRepository;
    clientQueryRepo: IClientQueryRepository;
}
export declare class CreateClientOrchestratorUseCase {
    private readonly productDiscountClientRepo;
    private readonly clientAddressRepo;
    private readonly clientRepo;
    private readonly clientQueryRepo;
    constructor({ productDiscountClientRepo, clientAddressRepo, clientRepo, clientQueryRepo }: ICreateClientOrchestratorUseCase);
    execute: (data: ClientOrchestratorCreateDto) => Promise<ClientOrchestrator>;
}
export {};
