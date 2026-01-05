import { InventoryLocationItemCreateProps, InventoryLocationItemProps, InventoryLocationItemUpdateProps } from "./inventory-location-item.types";
import type { Transaction } from "sequelize";
export interface IInventoryLocationItemRepository {
    findAll: (tx?: Transaction) => Promise<InventoryLocationItemProps[]>;
    findById: (id: number, tx?: Transaction) => Promise<InventoryLocationItemProps | null>;
    findByLocationItem: (location_id: number, item_id: number, item_type: "product" | "input", tx?: Transaction) => Promise<InventoryLocationItemProps | null>;
    create: (data: InventoryLocationItemCreateProps, tx?: Transaction) => Promise<InventoryLocationItemProps>;
    update: (id: number, data: InventoryLocationItemUpdateProps, tx?: Transaction) => Promise<InventoryLocationItemProps>;
    delete: (id: number, tx?: Transaction) => Promise<void>;
}
