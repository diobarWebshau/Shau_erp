import { InventoryTransferProps } from "../../domain/inventory-tranfer.types";
import { IInventoryTransferRepository } from "../../domain/inventory-tranfer.repository.interface";
import { ILocationRepository } from "@modules/core/location/domain/location.repository.interface";
import { IProductRepository } from "@modules/core/product/domain/product.repository.interface";
import { IInputRepository } from "@modules/core/input/domain/input.repository.interface";
import { InventoryTransferCreateDto } from "../dto/inventory-tranfer.model.schema";
import { Transaction } from "sequelize";
interface ICreateInventoryTransferUseCase {
    inventoryTransferRepo: IInventoryTransferRepository;
    locationRepo: ILocationRepository;
    productRepo: IProductRepository;
    inputRepo: IInputRepository;
}
export declare class CreateInventoryTransferUseCase {
    private readonly inventoryTransferRepo;
    private readonly locationRepo;
    private readonly productRepo;
    private readonly inputRepo;
    constructor({ inputRepo, inventoryTransferRepo, locationRepo, productRepo }: ICreateInventoryTransferUseCase);
    execute: (data: InventoryTransferCreateDto, tx?: Transaction) => Promise<InventoryTransferProps>;
}
export {};
