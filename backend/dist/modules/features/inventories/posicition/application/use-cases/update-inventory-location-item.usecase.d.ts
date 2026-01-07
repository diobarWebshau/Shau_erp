import { InventoryLocationItemUpdateAttributes } from "../../infrastructure/orm/inventory-location-item.orm";
import { IInventoryLocationItemRepository } from "../../domain/inventory-location-item.repository.interface";
import { InventoryLocationItemProps } from "../../domain/inventory-location-item.types";
import { Transaction } from "sequelize";
interface IUpdateInventoryLocationItemUseCase {
    repo: IInventoryLocationItemRepository;
}
export declare class UpdateInventoryLocationItemUseCase {
    private readonly repo;
    constructor({ repo }: IUpdateInventoryLocationItemUseCase);
    execute: (id: number, data: InventoryLocationItemUpdateAttributes, tx?: Transaction) => Promise<InventoryLocationItemProps>;
}
export {};
