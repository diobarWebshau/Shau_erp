import { InventoryTransferCreateProps, InventoryTransferProps } from "../../domain/inventory-tranfer.types";
import { IInventoryTransferRepository } from "../../domain/inventory-tranfer.repository.interface";
import { ILocationRepository } from "@modules/core/location/domain/location.repository.interface";
import { IProductRepository } from "@modules/core/product/domain/product.repository.interface";
import { IInputRepository } from "@modules/core/input/domain/input.repository.interface";
import { InventoryTransferCreateDto } from "../dto/inventory-tranfer.model.schema";
import { ProductProps } from "@modules/core/product/domain/product.types";
import { LocationProps } from "@modules/core/location/domain/location.types";
import { DecimalVO } from "@shared/domain/value-objects/decimal.vo";
import { InputProps } from "@modules/core/input/domain/input.types";
import HttpError from "@shared/errors/http/http-error";
import { Transaction } from "sequelize";

interface ICreateInventoryTransferUseCase {
    inventoryTransferRepo: IInventoryTransferRepository,
    locationRepo: ILocationRepository,
    productRepo: IProductRepository,
    inputRepo: IInputRepository
};


const mapInventoryTransferUpdateDtoToDomain = (data: InventoryTransferCreateDto): InventoryTransferCreateProps => {
    return {
        ...data,
        qty: DecimalVO.from(data.qty)
    }
};

export class CreateInventoryTransferUseCase {

    private readonly inventoryTransferRepo: IInventoryTransferRepository;
    private readonly locationRepo: ILocationRepository;
    private readonly productRepo: IProductRepository;
    private readonly inputRepo: IInputRepository;

    constructor({ inputRepo, inventoryTransferRepo, locationRepo, productRepo }: ICreateInventoryTransferUseCase) {
        this.inputRepo = inputRepo;
        this.productRepo = productRepo;
        this.inventoryTransferRepo = inventoryTransferRepo;
        this.locationRepo = locationRepo;
    };

    execute = async (data: InventoryTransferCreateDto, tx?: Transaction): Promise<InventoryTransferProps> => {
        const createData = mapInventoryTransferUpdateDtoToDomain(data);
        const validateSourceLocation: LocationProps | null = await this.locationRepo.findById(createData.source_location_id, tx);
        const validateDestinationLocation: LocationProps | null = await this.locationRepo.findById(createData.destination_location_id, tx);
        if (!validateDestinationLocation) throw new HttpError(404, "La locacion de destino no existe.");
        if (!validateSourceLocation) throw new HttpError(404, "La locacion de origen no existe.");
        if (createData.item_type === "product") {
            const validateProduct: ProductProps | null = await this.productRepo.findById(createData.item_id, tx);
            if (!validateProduct) throw new HttpError(404, 'El producto que se desea transferir no existe');
        } else {
            const validateInput: InputProps | null = await this.inputRepo.findById(createData.item_id, tx);
            if (!validateInput) throw new HttpError(404, 'El insumo que se desea transferir no existe');
        }
        const inventoryTransferResponse: InventoryTransferProps = await this.inventoryTransferRepo.create(createData, tx);
        return inventoryTransferResponse;
    };

}