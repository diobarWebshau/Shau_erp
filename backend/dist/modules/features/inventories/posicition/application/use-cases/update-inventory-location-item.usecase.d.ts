import { InventoryLocationItemResponseSchemaDto } from "../../../posicition/application/dto/inventory-location-item.model.schema";
import { InventoryLocationItemUpdateAttributes } from "../../infrastructure/orm/inventory-location-item.orm";
import { IInventoryLocationItemRepository } from "../../domain/inventory-location-item.repository.interface";
import { Transaction } from "sequelize";
interface IUpdateInventoryLocationItemUseCase {
    repo: IInventoryLocationItemRepository;
}
export declare class UpdateInventoryLocationItemUseCase {
    private readonly repo;
    constructor({ repo }: IUpdateInventoryLocationItemUseCase);
    execute: (id: number, data: InventoryLocationItemUpdateAttributes, tx?: Transaction) => Promise<InventoryLocationItemResponseSchemaDto>;
}
export {};
