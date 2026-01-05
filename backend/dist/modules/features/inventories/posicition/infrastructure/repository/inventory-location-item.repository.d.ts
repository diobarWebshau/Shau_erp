import { InventoryLocationItemCreateProps, InventoryLocationItemProps, InventoryLocationItemUpdateProps } from "../../domain/inventory-location-item.types";
import { IInventoryLocationItemRepository } from "../../domain/inventory-location-item.repository.interface";
import { Transaction } from "sequelize";
export declare class InventoryLocationItemRepository implements IInventoryLocationItemRepository {
    findAll: (tx?: Transaction) => Promise<InventoryLocationItemProps[]>;
    findById: (id: number, tx?: Transaction) => Promise<InventoryLocationItemProps | null>;
    findByLocationItem: (location_id: number, item_id: number, item_type: "product" | "input", tx?: Transaction) => Promise<InventoryLocationItemProps | null>;
    create: (data: InventoryLocationItemCreateProps, tx?: Transaction) => Promise<InventoryLocationItemProps>;
    update: (id: number, data: InventoryLocationItemUpdateProps, tx?: Transaction) => Promise<InventoryLocationItemProps>;
    delete: (id: number, tx?: Transaction) => Promise<void>;
}
