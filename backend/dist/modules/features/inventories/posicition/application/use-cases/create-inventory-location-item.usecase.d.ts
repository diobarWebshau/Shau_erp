import { InventoryRepository } from "@src/modules/core/inventory/infrastructure/repository/inventory.repository";
import { IInventoryLocationItemRepository } from "../../domain/inventory-location-item.repository.interface";
import { ILocationRepository } from "@modules/core/location/domain/location.repository.interface";
import { IProductRepository } from "@modules/core/product/domain/product.repository.interface";
import { InventoryLocationnItemCreateDto } from "../dto/inventory-location-item.model.schema";
import { IInputRepository } from "@modules/core/input/domain/input.repository.interface";
import { InventoryLocationItemProps } from "../../domain/inventory-location-item.types";
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
    execute: (data: InventoryLocationnItemCreateDto, tx?: Transaction) => Promise<InventoryLocationItemProps>;
}
export {};
