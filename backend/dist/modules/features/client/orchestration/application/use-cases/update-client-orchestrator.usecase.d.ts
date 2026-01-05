import { ClientUpdateOrchestrator } from "../../domain/client-orchestrator.types";
import { IProductDiscountClientRepository } from "../../../assigments/product-discount-client/domain/product-discount-client.repository.interface";
import { IClientAddressRepository } from "../../../assigments/client-addresses/domain/client-address.repository.interface";
import { IClientRepository } from "@modules/core/client/domain/client.repository.interface";
import { ClientOrchestratorResponseDto } from "../dto/client-orchestrator.model.schema";
import { IClientQueryRepository } from "@src/modules/query/client/domain/client-query.repository";
interface IUpdateClientOrchestratorUseCase {
    productDiscountClientRepo: IProductDiscountClientRepository;
    clientAddressRepo: IClientAddressRepository;
    clientRepo: IClientRepository;
    clientQueryRepo: IClientQueryRepository;
}
export declare class UpdateClientOrchestratorUseCase {
    private readonly productDiscountClientRepo;
    private readonly clientAddressRepo;
    private readonly clientRepo;
    private readonly clientQueryRepo;
    constructor({ productDiscountClientRepo, clientAddressRepo, clientRepo, clientQueryRepo }: IUpdateClientOrchestratorUseCase);
    execute: (id: number, data: ClientUpdateOrchestrator) => Promise<ClientOrchestratorResponseDto>;
}
export {};
