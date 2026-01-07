import { GetByLocationItemInventoryLocationItemUseCase } from "../../application/use-cases/get-by-location-item-inventory-location-item.usecase";
import { GetByIdInventoryLocationItemUseCase } from "../../application/use-cases/get-by-id-inventory-location-item.usecase";
import { GetAllInventoryLocationItemUseCase } from "../../application/use-cases/get-all-inventory-location-item.usecase";
import { DeleteInventoryLocationItemUseCase } from "../../application/use-cases/delete-inventory-location-item.usecase";
import { UpdateInventoryLocationItemUseCase } from "../../application/use-cases/update-inventory-location-item.usecase";
import { CreateInventoryLocationItemUseCase } from "../../application/use-cases/create-inventory-location-item.usecase";
import { InventoryLocationItemResponseDto } from "../../application/dto/inventory-location-item.model.schema";
import { InventoryRepository } from "@src/modules/core/inventory/infrastructure/repository/inventory.repository";
import { LocationRepository } from "@src/modules/core/location/infrastructure/repository/location.repository";
import { IInventoryLocationItemRepository } from "../../domain/inventory-location-item.repository.interface";
import { ProductRepository } from "@src/modules/core/product/infrastructure/repository/producto.repository";
import { IInventoryRepository } from "@src/modules/core/inventory/domain/inventory.repository.interface";
import { ILocationRepository } from "@src/modules/core/location/domain/location.repository.interface";
import { ApiRequest, ApiResponse } from "@src/shared/typed-request-endpoint/typed-request.interface";
import { InputRepository } from "@src/modules/core/input/infrastructure/repository/input.repository";
import { InventoryLocationItemRepository } from "../repository/inventory-location-item.repository";
import { IProductRepository } from "@src/modules/core/product/domain/product.repository.interface";
import { IInputRepository } from "@src/modules/core/input/domain/input.repository.interface";
import {
    CreateInventoryLocationItemSchema, DeleteInventoryLocationItemSchema,
    GetAllInventoryLocationItemSchema, GetByIdInventoryLocationItemSchema,
    UpdateInventoryLocationItemSchema, GetByLocationItemInventoryLocationItemSchema
} from "./../../application/dto/inventory-location-item.endpoint.schema";
import { InventoryLocationItemProps } from "../../domain/inventory-location-item.types";


const mapInventoryLocationItemDomainToDto = (data: InventoryLocationItemProps): InventoryLocationItemResponseDto => {
    return {
        ...data,
        created_at: data.created_at.toISOString(),
        updated_at: data.updated_at.toISOString()
    };
}

export class InventoryLocationItemController {

    private readonly inventoryLocationItemRepo: IInventoryLocationItemRepository;
    private readonly inputRepo: IInputRepository;
    private readonly productRepo: IProductRepository;
    private readonly inventoryRepo: IInventoryRepository;
    private readonly locationRepo: ILocationRepository;
    private readonly getAllInventoryLocationItemUseCase: GetAllInventoryLocationItemUseCase;
    private readonly getByIdInventoryLocationItemUseCase: GetByIdInventoryLocationItemUseCase;
    private readonly getByLocationItemInventoryLocationItemUseCase: GetByLocationItemInventoryLocationItemUseCase;
    private readonly updateInventoryLocationItemUseCase: UpdateInventoryLocationItemUseCase;
    private readonly createInventoryLocationItemUseCase: CreateInventoryLocationItemUseCase;
    private readonly deleteInventoryLocationItemUseCase: DeleteInventoryLocationItemUseCase;

    constructor() {
        this.inventoryLocationItemRepo = new InventoryLocationItemRepository();
        this.inputRepo = new InputRepository();
        this.productRepo = new ProductRepository();
        this.inventoryRepo = new InventoryRepository();
        this.locationRepo = new LocationRepository();
        this.createInventoryLocationItemUseCase = new CreateInventoryLocationItemUseCase({
            inputRepo: this.inputRepo,
            inventoryRepo: this.inventoryRepo,
            inventoryLocationItemRepo: this.inventoryLocationItemRepo,
            locationRepo: this.locationRepo,
            productRepo: this.productRepo
        });
        this.updateInventoryLocationItemUseCase = new UpdateInventoryLocationItemUseCase({
            repo: this.inventoryLocationItemRepo
        });
        this.deleteInventoryLocationItemUseCase = new DeleteInventoryLocationItemUseCase(this.inventoryLocationItemRepo);
        this.getAllInventoryLocationItemUseCase = new GetAllInventoryLocationItemUseCase(this.inventoryLocationItemRepo);
        this.getByIdInventoryLocationItemUseCase = new GetByIdInventoryLocationItemUseCase(this.inventoryLocationItemRepo);
        this.getByLocationItemInventoryLocationItemUseCase = new GetByLocationItemInventoryLocationItemUseCase(this.inventoryLocationItemRepo);
    };

    getAll = async (_req: ApiRequest<GetAllInventoryLocationItemSchema>, res: ApiResponse<GetAllInventoryLocationItemSchema>) => {
        const inventoryLocationItemResponse: InventoryLocationItemProps[] = await this.getAllInventoryLocationItemUseCase.execute();
        const inventoryLocationItemResult = inventoryLocationItemResponse.map(mapInventoryLocationItemDomainToDto);
        return res.status(200).json(inventoryLocationItemResult);
    }
    getById = async (req: ApiRequest<GetByIdInventoryLocationItemSchema>, res: ApiResponse<GetByIdInventoryLocationItemSchema>) => {
        const { id }: GetByIdInventoryLocationItemSchema["params"] = req.params;
        const inventoryLocationItemResponse: InventoryLocationItemProps | null = await this.getByIdInventoryLocationItemUseCase.execute(Number(id));
        if (!inventoryLocationItemResponse) return res.status(200).json(null);
        const inventoryLocationItemResult = mapInventoryLocationItemDomainToDto(inventoryLocationItemResponse);
        return res.status(200).json(inventoryLocationItemResult);
    }
    getByLocationItem = async (req: ApiRequest<GetByLocationItemInventoryLocationItemSchema>, res: ApiResponse<GetByLocationItemInventoryLocationItemSchema>) => {
        const { location_id, item_id, item_type }: GetByLocationItemInventoryLocationItemSchema["params"] = req.params;
        const inventoryLocationItemResponse: InventoryLocationItemProps | null = await this.getByLocationItemInventoryLocationItemUseCase.execute(Number(location_id), Number(item_id), item_type);
        if (!inventoryLocationItemResponse) return res.status(200).json(null);
        const inventoryLocationItemResult = mapInventoryLocationItemDomainToDto(inventoryLocationItemResponse);
        return res.status(200).json(inventoryLocationItemResult);
    }
    create = async (req: ApiRequest<CreateInventoryLocationItemSchema>, res: ApiResponse<CreateInventoryLocationItemSchema>) => {
        const body: CreateInventoryLocationItemSchema["body"] = req.body;
        const inventoryLocationItemResponse: InventoryLocationItemProps = await this.createInventoryLocationItemUseCase.execute(body);
        const inventoryLocationItemResult = mapInventoryLocationItemDomainToDto(inventoryLocationItemResponse);
        return res.status(201).json(inventoryLocationItemResult);
    }
    update = async (req: ApiRequest<UpdateInventoryLocationItemSchema>, res: ApiResponse<UpdateInventoryLocationItemSchema>) => {
        const { id }: UpdateInventoryLocationItemSchema["params"] = req.params;
        const body: UpdateInventoryLocationItemSchema["body"] = req.body;
        const inventoryLocationItemResponse: InventoryLocationItemProps = await this.updateInventoryLocationItemUseCase.execute(id, body);
        const inventoryLocationItemResult = mapInventoryLocationItemDomainToDto(inventoryLocationItemResponse);
        return res.status(200).json(inventoryLocationItemResult);

    }
    delete = async (req: ApiRequest<DeleteInventoryLocationItemSchema>, res: ApiResponse<DeleteInventoryLocationItemSchema>) => {
        const { id }: DeleteInventoryLocationItemSchema["params"] = req.params;
        await this.deleteInventoryLocationItemUseCase.execute(id);
        return res.status(200).json(null);
    }
};