import { InventoryLocationItemCreateProps } from "../../domain/inventory-location-item.types";
import { InventoryRepository } from "@src/modules/core/inventory/infrastructure/repository/inventory.repository";
import { IInventoryLocationItemRepository } from "../../domain/inventory-location-item.repository.interface";
import { ILocationRepository } from "@modules/core/location/domain/location.repository.interface";
import { IProductRepository } from "@modules/core/product/domain/product.repository.interface";
import { IInputRepository } from "@modules/core/input/domain/input.repository.interface";
import { Transaction } from "sequelize";
interface ICreateInventoryLocationItemUseCase {
    productRepo: IProductRepository;
    inputRepo: IInputRepository;
    inventoryLocationItemRepo: IInventoryLocationItemRepository;
    locationRepo: ILocationRepository;
    inventoryRepo: InventoryRepository;
}
export declare class CreateInventoryLocationItemUseCase {
    private readonly inventoryLocationItemRepo;
    private readonly locationRepo;
    private readonly inputRepo;
    private readonly productRepo;
    private readonly inventoryRepo;
    constructor({ inputRepo, inventoryLocationItemRepo, locationRepo, productRepo, inventoryRepo }: ICreateInventoryLocationItemUseCase);
    execute: (data: InventoryLocationItemCreateProps, tx?: Transaction) => Promise<{
        inventory_id: number;
        item_type: "input" | "product";
        item_id: number;
        location_id: number;
        id: number;
        created_at: string;
        updated_at: string;
    }>;
}
export {};
