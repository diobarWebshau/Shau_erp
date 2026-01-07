import { IInventoryLocationItemRepository } from "../../../posicition/domain/inventory-location-item.repository.interface";
import { IInventoryQueryRepository } from "@src/modules/query/inventory/domain/inventory-query.repository.interface";
import { InventoryMovementCreateProps, InventoryMovementProps } from "../../domain/inventory-movement.types";
import { InventoryLocationItemProps } from "../../../posicition/domain/inventory-location-item.types";
import { IInventoryMovementRepository } from "../../domain/inventory-movement.repository.interface"
import { ILocationRepository } from "@modules/core/location/domain/location.repository.interface";
import { InventoryQueryProps } from "@src/modules/query/inventory/domain/inventory-query.types";
import { IProductRepository } from "@modules/core/product/domain/product.repository.interface";
import { IInputRepository } from "@modules/core/input/domain/input.repository.interface";
import { InventoryMovementCreateDto } from "../dto/inventory-movement.model.schema";
import { LocationProps } from "@modules/core/location/domain/location.types";
import { ProductProps } from "@modules/core/product/domain/product.types";
import { DecimalVO } from "@src/shared/domain/value-objects/decimal.vo";
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

export const mapInventoryMovementCreateDtoToDomain = (data: InventoryMovementCreateDto): InventoryMovementCreateProps => ({
    ...data,
    qty: DecimalVO.from(data.qty)
});


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

    execute = async (data: InventoryMovementCreateDto, tx?: Transaction): Promise<InventoryMovementProps> => {

        const validateLocation: LocationProps | null = await this.locationRepo.findById(data.location_id, tx);
        if (!validateLocation) throw new HttpError(404, "La locacíon ingresada no fue posible encontrarla");

        const createData = mapInventoryMovementCreateDtoToDomain(data);

        if (createData.item_type === "product") {
            const validateProduct: ProductProps | null = await this.productRepo.findById(createData.item_id, tx);
            if (!validateProduct) throw new HttpError(404, "El producto que se desea agregar al inventario de la locación no fue posible encontrarlo");
        } else {
            const validateInput: InputProps | null = await this.inputRepo.findById(createData.item_id, tx);
            if (!validateInput) throw new HttpError(404, "El insummo que se desea agregar al inventario de la locación no fue posible encontrarlo");
        };

        const inventoryLocationItem: InventoryLocationItemProps | null =
            await this.invetoryLocationItemRepo.findByLocationItem(createData.location_id, createData.item_id, createData.item_type, tx);

        if (!inventoryLocationItem) throw new HttpError(404, "La locación no tiene registrado el articulo.");

        const inventorySlot: InventoryQueryProps | null =
            await this.inventoryQueryRepo.findByInventoryId(inventoryLocationItem.inventory_id, tx);

        if (!inventorySlot) {
            throw new HttpError(404, "El articulo dentro la locacion no tienee un slot de inventario.");
        }

        if (createData.movement_type === "out") {
            const qtyMov: DecimalVO = createData.qty;
            const available = DecimalVO.from(inventorySlot.stock);

            if (!qtyMov.isFinite() || qtyMov.lte(0)) {
                throw new HttpError(400, "La cantidad del movimiento debe ser mayor que 0");
            }

            if (!qtyMov.isInteger()) {
                throw new HttpError(400, "La cantidad debe ser un número entero");
            }

            if (qtyMov.gt(available)) {
                throw new HttpError(
                    409,
                    "La locación no tiene inventario necesario para poder efectuar el movimiento de inventario"
                );
            }
        }
        const inventoryMovementResponse: InventoryMovementProps = await this.repo.create(createData, tx);
        return inventoryMovementResponse;
    };
}; 