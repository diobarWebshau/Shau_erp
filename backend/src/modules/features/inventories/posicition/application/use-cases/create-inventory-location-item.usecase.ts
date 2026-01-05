import { InventoryLocationItemCreateProps, InventoryLocationItemProps } from "../../domain/inventory-location-item.types";
import { InventoryRepository } from "@src/modules/core/inventory/infrastructure/repository/inventory.repository";
import { IInventoryLocationItemRepository } from "../../domain/inventory-location-item.repository.interface";
import { IInventoryRepository } from "@src/modules/core/inventory/domain/inventory.repository.interface";
import { InventoryLocationItemResponseSchemaDto } from "../dto/inventory-location-item.model.schema";
import { ILocationRepository } from "@modules/core/location/domain/location.repository.interface";
import { IProductRepository } from "@modules/core/product/domain/product.repository.interface";
import { IInputRepository } from "@modules/core/input/domain/input.repository.interface";
import { InventoryProps } from "@src/modules/core/inventory/domain/inventory.types";
import { LocationProps } from "@modules/core/location/domain/location.types";
import { ProductProps } from "@modules/core/product/domain/product.types";
import { InputProps } from "@modules/core/input/domain/input.types";
import HttpError from "@shared/errors/http/http-error";
import { Transaction } from "sequelize";

interface ICreateInventoryLocationItemUseCase {
    productRepo: IProductRepository,
    inputRepo: IInputRepository,
    inventoryLocationItemRepo: IInventoryLocationItemRepository,
    locationRepo: ILocationRepository,
    inventoryRepo: InventoryRepository
};

export class CreateInventoryLocationItemUseCase {

    private readonly inventoryLocationItemRepo: IInventoryLocationItemRepository;
    private readonly locationRepo: ILocationRepository;
    private readonly inputRepo: IInputRepository;
    private readonly productRepo: IProductRepository;
    private readonly inventoryRepo: IInventoryRepository;

    constructor({ inputRepo, inventoryLocationItemRepo, locationRepo, productRepo, inventoryRepo }: ICreateInventoryLocationItemUseCase) {
        this.inventoryLocationItemRepo = inventoryLocationItemRepo;
        this.inputRepo = inputRepo;
        this.locationRepo = locationRepo;
        this.productRepo = productRepo;
        this.inventoryRepo = inventoryRepo;
    };

    execute = async (data: InventoryLocationItemCreateProps, tx?: Transaction) => {
        const validateLocation: LocationProps | null = await this.locationRepo.findById(data.location_id, tx);
        if (!validateLocation) throw new HttpError(404, "La locacíon ingresada no fue posible encontrarla");
        if (data.item_type === "product") {
            const validateProduct: ProductProps | null = await this.productRepo.findById(data.item_id, tx);
            if (!validateProduct)
                throw new HttpError(404, "El producto que se desea agregar al inventario de la locación no fue posible encontrarlo");
        } else {
            const validateInput: InputProps | null = await this.inputRepo.findById(data.item_id, tx);
            if (!validateInput)
                throw new HttpError(404, "El insummo que se desea agregar al inventario de la locación no fue posible encontrarlo");
        };
        const validateInventory: InventoryProps | null = await this.inventoryRepo.findById(data.inventory_id, tx);
        if (!validateInventory) throw new HttpError(404, "El slot de inventario que se desea asignar a la locación no fue posible encontrarlo");
        const inventoryMovementResponse: InventoryLocationItemProps = await this.inventoryLocationItemRepo.create(data, tx);
        const inventoryMovementResponseFormatted: InventoryLocationItemResponseSchemaDto = {
            ...inventoryMovementResponse,
            created_at: inventoryMovementResponse.created_at.toISOString(),
            updated_at: inventoryMovementResponse.updated_at.toISOString()
        }
        return inventoryMovementResponseFormatted;
    };
};