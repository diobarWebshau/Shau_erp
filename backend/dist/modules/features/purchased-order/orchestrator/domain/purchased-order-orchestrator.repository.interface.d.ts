import { PurchasedOrderCreateOrchestratorProps, PurchasedOrderOrchestratorUpdateProps, PurchasedOrderOrchestrator } from "./purchased-order-orchestrator.types";
import { Transaction } from "sequelize";
export interface IPurchasedOrderProductRepository {
    create: (data: PurchasedOrderCreateOrchestratorProps, tx?: Transaction) => Promise<PurchasedOrderOrchestrator>;
    update: (id: number, data: PurchasedOrderOrchestratorUpdateProps, tx?: Transaction) => Promise<PurchasedOrderOrchestrator>;
}
