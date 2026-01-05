import type { IInventoryQueryRepository } from "../../domain/inventory-query.repository.interface";
import { InventoryQueryProps, InventorySearchQueryProp } from "../../domain/inventory-query.types";
import { type Transaction } from "sequelize";
export declare class InventoryQueryRepository implements IInventoryQueryRepository {
    findAll: (tx?: Transaction) => Promise<InventoryQueryProps[]>;
    findByInventoryId: (inventory_id: number, tx?: Transaction) => Promise<InventoryQueryProps | null>;
    findAllLikeTo: (query: InventorySearchQueryProp, tx?: Transaction) => Promise<InventoryQueryProps[]>;
}
