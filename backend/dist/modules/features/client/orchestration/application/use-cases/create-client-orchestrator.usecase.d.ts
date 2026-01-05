import { IProductDiscountClientRepository } from "../../../assigments/product-discount-client/domain/product-discount-client.repository.interface";
import { ClientOrchestratorResponseDto } from "../dto/client-orchestrator.model.schema";
import { IClientAddressRepository } from "../../../assigments/client-addresses/domain/client-address.repository.interface";
import { IClientQueryRepository } from "@modules/query/client/domain/client-query.repository";
import { IClientRepository } from "@modules/core/client/domain/client.repository.interface";
import { ClientCreateOrchestrator } from "../../domain/client-orchestrator.types";
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
    execute: (data: ClientCreateOrchestrator) => Promise<ClientOrchestratorResponseDto>;
}
export {};
