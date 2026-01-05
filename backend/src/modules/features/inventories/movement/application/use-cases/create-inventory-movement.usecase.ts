import { IInventoryLocationItemRepository } from "../../../posicition/domain/inventory-location-item.repository.interface";
import { IInventoryQueryRepository } from "@src/modules/query/inventory/domain/inventory-query.repository.interface";
import { InventoryLocationItemProps } from "../../../posicition/domain/inventory-location-item.types";
import { InventoryMovementCreateAttributes } from "../../infrastructure/orm/inventory-movement.orm";
import { IInventoryMovementRepository } from "../../domain/inventory-movement.repository.interface"
import { ILocationRepository } from "@modules/core/location/domain/location.repository.interface";
import { InventoryQueryProps } from "@src/modules/query/inventory/domain/inventory-query.types";
import { IProductRepository } from "@modules/core/product/domain/product.repository.interface";
import { InventoryMovementResponseSchemaDto } from "../dto/inventory-movement.model.schema";
import { IInputRepository } from "@modules/core/input/domain/input.repository.interface";
import { InventoryMovementProps } from "../../domain/inventory-movement.types";
import { LocationProps } from "@modules/core/location/domain/location.types";
import { ProductProps } from "@modules/core/product/domain/product.types";
import { InputProps } from "@modules/core/input/domain/input.types";
import HttpError from "@shared/errors/http/http-error";
import { Transaction } from "sequelize";

interface ICreateInventoryMovementUseCase {
    productRepo: IProductRepository,
    inputRepo: IInputRepository,
    repo: IInventoryMovementRepository,
    locationRepo: ILocationRepository,
    invetoryLocationItemRepo: IInventoryLocationItemRepository,
    inventoryQueryRepo: IInventoryQueryRepository
};

export class CreateInventoryMovementUseCase {

    private readonly invetoryLocationItemRepo: IInventoryLocationItemRepository;
    private readonly inventoryQueryRepo: IInventoryQueryRepository;
    private readonly repo: IInventoryMovementRepository;
    private readonly locationRepo: ILocationRepository;
    private readonly productRepo: IProductRepository;
    private readonly inputRepo: IInputRepository;

    constructor({ inputRepo, locationRepo, productRepo, invetoryLocationItemRepo, repo, inventoryQueryRepo }: ICreateInventoryMovementUseCase) {
        this.repo = repo;
        this.inputRepo = inputRepo;
        this.productRepo = productRepo;
        this.locationRepo = locationRepo;
        this.invetoryLocationItemRepo = invetoryLocationItemRepo;
        this.inventoryQueryRepo = inventoryQueryRepo;
    };

    execute = async (data: InventoryMovementCreateAttributes, tx?: Transaction): Promise<InventoryMovementResponseSchemaDto> => {
        const validateLocation: LocationProps | null = await this.locationRepo.findById(data.location_id, tx);
        if (!validateLocation) throw new HttpError(404, "La locacíon ingresada no fue posible encontrarla");
        if (data.item_type === "product") {
            const validateProduct: ProductProps | null = await this.productRepo.findById(data.item_id, tx);
            if (!validateProduct) throw new HttpError(404, "El producto que se desea agregar al inventario de la locación no fue posible encontrarlo");
        } else {
            const validateInput: InputProps | null = await this.inputRepo.findById(data.item_id, tx);
            if (!validateInput) throw new HttpError(404, "El insummo que se desea agregar al inventario de la locación no fue posible encontrarlo");
        };

        const inventoryLocationItem: InventoryLocationItemProps | null =
            await this.invetoryLocationItemRepo.findByLocationItem(data.location_id, data.item_id, data.item_type, tx);

        if (!inventoryLocationItem) throw new HttpError(404, "La locación no tiene registrado el articulo.");

        const inventorySlot: InventoryQueryProps | null =
            await this.inventoryQueryRepo.findByInventoryId(inventoryLocationItem.inventory_id, tx);

        if (!inventorySlot) {
            throw new HttpError(404, "El articulo dentro la locacion no tienee un slot de inventario.");
        }

        if (data.movement_type === "out") {
            const qtyMov = data.qty;
            const available = inventorySlot.stock;

            if (!Number.isFinite(qtyMov) || qtyMov <= 0) {
                throw new HttpError(400, "La cantidad del movimiento debe ser mayor que 0");
            }

            if (!Number.isInteger(qtyMov)) {
                throw new HttpError(400, "La cantidad debe ser un número entero");
            }
            if (qtyMov > available) {
                throw new HttpError(409, "La locación no tiene inventario necesario para poder efectuar el movimiento de inventario");
            }
        };
        
        const inventoryMovementResponse: InventoryMovementProps = await this.repo.create(data, tx);
        const inventoryMovementResponseFormatted: InventoryMovementResponseSchemaDto = {
            ...inventoryMovementResponse,
            is_locked: Boolean(inventoryMovementResponse.is_locked),
            created_at: inventoryMovementResponse.created_at.toISOString()
        }
        return inventoryMovementResponseFormatted;
    };
}; 