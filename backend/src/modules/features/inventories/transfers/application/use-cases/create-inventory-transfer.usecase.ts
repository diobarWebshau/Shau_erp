import { InventoryTransferCreateProps, InventoryTransferProps } from "../../domain/inventory-tranfer.types";
import { IInventoryTransferRepository } from "../../domain/inventory-tranfer.repository.interface";
import { ILocationRepository } from "@modules/core/location/domain/location.repository.interface";
import { IProductRepository } from "@modules/core/product/domain/product.repository.interface";
import { InventoryTransferResponseSchemaDto } from "../dto/inventory-tranfer.model.schema";
import { IInputRepository } from "@modules/core/input/domain/input.repository.interface";
import { ProductProps } from "@src/modules/core/product/domain/product.types";
import { LocationProps } from "@modules/core/location/domain/location.types";
import { InputProps } from "@src/modules/core/input/domain/input.types";
import HttpError from "@shared/errors/http/http-error";
import { Transaction } from "sequelize";

interface ICreateInventoryTransferUseCase {
    inventoryTransferRepo: IInventoryTransferRepository,
    locationRepo: ILocationRepository,
    productRepo: IProductRepository,
    inputRepo: IInputRepository
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

    execute = async (data: InventoryTransferCreateProps, tx?: Transaction): Promise<InventoryTransferResponseSchemaDto> => {
        const validateSourceLocation: LocationProps | null = await this.locationRepo.findById(data.source_location_id, tx);
        const validateDestinationLocation: LocationProps | null = await this.locationRepo.findById(data.destination_location_id, tx);
        if (!validateDestinationLocation) throw new HttpError(404, "La locacion de destino no existe.");
        if (!validateSourceLocation) throw new HttpError(404, "La locacion de origen no existe.");
        if (data.item_type === "product") {
            const validateProduct: ProductProps | null = await this.productRepo.findById(data.item_id, tx);
            if (!validateProduct) throw new HttpError(404, 'El producto que se desea transferir no existe');
        } else {
            const validateInput: InputProps | null = await this.inputRepo.findById(data.item_id, tx);
            if (!validateInput) throw new HttpError(404, 'El insumo que se desea transferir no existe');
        }
        const inventoryTransferResponse: InventoryTransferProps = await this.inventoryTransferRepo.create(data, tx);
        const inventoryTransferReposponseFormatted: InventoryTransferResponseSchemaDto = {
            ...inventoryTransferResponse,
            created_at: inventoryTransferResponse.created_at.toISOString(),
            updated_at: inventoryTransferResponse.updated_at.toISOString(),
        }
        return inventoryTransferReposponseFormatted;
    };

}