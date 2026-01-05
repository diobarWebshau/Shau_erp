import { IInventoryLocationItemRepository } from "../../../posicition/domain/inventory-location-item.repository.interface";
import { IInventoryQueryRepository } from "@src/modules/query/inventory/domain/inventory-query.repository.interface";
import { InventoryMovementCreateAttributes } from "../../infrastructure/orm/inventory-movement.orm";
import { IInventoryMovementRepository } from "../../domain/inventory-movement.repository.interface";
import { ILocationRepository } from "@modules/core/location/domain/location.repository.interface";
import { IProductRepository } from "@modules/core/product/domain/product.repository.interface";
import { InventoryMovementResponseSchemaDto } from "../dto/inventory-movement.model.schema";
import { IInputRepository } from "@modules/core/input/domain/input.repository.interface";
import { Transaction } from "sequelize";
interface ICreateInventoryMovementUseCase {
    productRepo: IProductRepository;
    inputRepo: IInputRepository;
    repo: IInventoryMovementRepository;
    locationRepo: ILocationRepository;
    invetoryLocationItemRepo: IInventoryLocationItemRepository;
    inventoryQueryRepo: IInventoryQueryRepository;
}
export declare class CreateInventoryMovementUseCase {
    private readonly invetoryLocationItemRepo;
    private readonly inventoryQueryRepo;
    private readonly repo;
    private readonly locationRepo;
    private readonly productRepo;
    private readonly inputRepo;
    constructor({ inputRepo, locationRepo, productRepo, invetoryLocationItemRepo, repo, inventoryQueryRepo }: ICreateInventoryMovementUseCase);
    execute: (data: InventoryMovementCreateAttributes, tx?: Transaction) => Promise<InventoryMovementResponseSchemaDto>;
}
export {};
