import { PurchasedOrderCreateOrchestratorProps, PurchasedOrderUpdateOrchestratorProps, PurchasedOrderOrchestrator } from "./purchased-order-orchestrator.types";
import { Transaction } from "sequelize";
export interface IPurchasedOrderProductRepository {
    create: (data: PurchasedOrderCreateOrchestratorProps, tx?: Transaction) => Promise<PurchasedOrderOrchestrator>;
    update: (id: number, data: PurchasedOrderUpdateOrchestratorProps, tx?: Transaction) => Promise<PurchasedOrderOrchestrator>;
}
