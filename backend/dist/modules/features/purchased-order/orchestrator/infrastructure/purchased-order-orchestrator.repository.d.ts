import { Transaction } from "sequelize";
import { IPurchasedOrderOrchestratorRepository } from "../domain/purchased-order-orchestrator.repository.interface";
import { PurchasedOrderCreateOrchestratorProps, PurchasedOrderOrchestrator, PurchasedOrderUpdateOrchestratorProps } from "../domain/purchased-order-orchestrator.types";
export declare class PurchasedOrderProductRepository implements IPurchasedOrderOrchestratorRepository {
    create: (data: PurchasedOrderCreateOrchestratorProps, tx?: Transaction) => Promise<PurchasedOrderOrchestrator>;
    update: (id: number, data: PurchasedOrderUpdateOrchestratorProps, tx?: Transaction) => Promise<PurchasedOrderOrchestrator>;
}
