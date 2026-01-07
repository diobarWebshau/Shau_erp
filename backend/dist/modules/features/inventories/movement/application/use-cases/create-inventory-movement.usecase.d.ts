import { IInventoryLocationItemRepository } from "../../../posicition/domain/inventory-location-item.repository.interface";
import { IInventoryQueryRepository } from "@src/modules/query/inventory/domain/inventory-query.repository.interface";
import { InventoryMovementCreateProps, InventoryMovementProps } from "../../domain/inventory-movement.types";
import { IInventoryMovementRepository } from "../../domain/inventory-movement.repository.interface";
import { ILocationRepository } from "@modules/core/location/domain/location.repository.interface";
import { IProductRepository } from "@modules/core/product/domain/product.repository.interface";
import { IInputRepository } from "@modules/core/input/domain/input.repository.interface";
import { InventoryMovementCreateDto } from "../dto/inventory-movement.model.schema";
import { Transaction } from "sequelize";
interface ICreateInventoryMovementUseCase {
    productRepo: IProductRepository;
    inputRepo: IInputRepository;
    repo: IInventoryMovementRepository;
    locationRepo: ILocationRepository;
    invetoryLocationItemRepo: IInventoryLocationItemRepository;
    inventoryQueryRepo: IInventoryQueryRepository;
}
export declare const mapInventoryMovementCreateDtoToDomain: (data: InventoryMovementCreateDto) => InventoryMovementCreateProps;
export declare class CreateInventoryMovementUseCase {
    private readonly invetoryLocationItemRepo;
    private readonly inventoryQueryRepo;
    private readonly repo;
    private readonly locationRepo;
    private readonly productRepo;
    private readonly inputRepo;
    constructor({ inputRepo, locationRepo, productRepo, invetoryLocationItemRepo, repo, inventoryQueryRepo }: ICreateInventoryMovementUseCase);
    execute: (data: InventoryMovementCreateDto, tx?: Transaction) => Promise<InventoryMovementProps>;
}
export {};
