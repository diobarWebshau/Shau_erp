import { GetByIdInventoryTransferUseCase } from "../../application/use-cases/get-by-id-inventory-transfer.usecase";
import { GetAllInventoryTransferUseCase } from "../../application/use-cases/get-all-inventory-transfer.usecase";
import { UpdateInventoryTransferUseCase } from "../../application/use-cases/update-inventory-transfer.usecase";
import { DeleteInventoryTransferUseCase } from "../../application/use-cases/delete-inventory-trasnfer.usecase";
import { CreateInventoryTransferUseCase } from "../../application/use-cases/create-inventory-transfer.usecase";
import { LocationRepository } from "@modules/core/location/infrastructure/repository/location.repository";
import { ProductRepository } from "@modules/core/product/infrastructure/repository/producto.repository";
import { InventoryTransferResponseDto } from "../../application/dto/inventory-tranfer.model.schema";
import { IInventoryTransferRepository } from "../../domain/inventory-tranfer.repository.interface";
import { ILocationRepository } from "@modules/core/location/domain/location.repository.interface";
import { InputRepository } from "@modules/core/input/infrastructure/repository/input.repository";
import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { IProductRepository } from "@modules/core/product/domain/product.repository.interface";
import { IInputRepository } from "@modules/core/input/domain/input.repository.interface";
import { InventoryTransferRepository } from "../repository/inventory-transfer.repository";
import {
    CreateInventoryTransferSchema, DeleteInventoryTransferSchema, GetAllInventoryTransferSchema,
    GetByIdInventoryTransferSchema, UpdateInventoryTransferSchema
} from "./../../application/dto/inventory-tranfer.endpoint.schema"
import { InventoryTransferProps } from "../../domain/inventory-tranfer.types";

const mapInventoryTransferDomainToDto = (data: InventoryTransferProps): InventoryTransferResponseDto => {
    const { qty, created_at, updated_at, ...rest } = data;
    return {
        ...rest,
        created_at: created_at.toISOString(),
        updated_at: updated_at.toISOString(),
        qty: qty.toString()
    }
};

export class InventoryTransferController {

    private readonly inventoryTransferRepo: IInventoryTransferRepository;
    private readonly locationRepo: ILocationRepository;
    private readonly inputRepo: IInputRepository;
    private readonly productRepo: IProductRepository;

    private readonly createInventoryTransferUseCase: CreateInventoryTransferUseCase;
    private readonly updateInventoryTransferUseCase: UpdateInventoryTransferUseCase;
    private readonly getAllInventoryTransferUseCase: GetAllInventoryTransferUseCase;
    private readonly getByIdInventoryTransferUseCase: GetByIdInventoryTransferUseCase;
    private readonly deleteInventoryTransferUseCase: DeleteInventoryTransferUseCase;

    constructor() {
        this.inventoryTransferRepo = new InventoryTransferRepository();
        this.locationRepo = new LocationRepository();
        this.productRepo = new ProductRepository();
        this.inputRepo = new InputRepository();
        this.createInventoryTransferUseCase = new CreateInventoryTransferUseCase({
            inputRepo: this.inputRepo,
            locationRepo: this.locationRepo,
            productRepo: this.productRepo,
            inventoryTransferRepo: this.inventoryTransferRepo
        });
        this.updateInventoryTransferUseCase = new UpdateInventoryTransferUseCase(this.inventoryTransferRepo);
        this.getAllInventoryTransferUseCase = new GetAllInventoryTransferUseCase(this.inventoryTransferRepo);
        this.getByIdInventoryTransferUseCase = new GetByIdInventoryTransferUseCase(this.inventoryTransferRepo);
        this.deleteInventoryTransferUseCase = new DeleteInventoryTransferUseCase(this.inventoryTransferRepo);
    };

    getAll = async (_req: ApiRequest<GetAllInventoryTransferSchema>, res: ApiResponse<GetAllInventoryTransferSchema>) => {
        const inventoryTransferResponses: InventoryTransferProps[] = await this.getAllInventoryTransferUseCase.execute();
        const inventoryTransferResult = inventoryTransferResponses.map(mapInventoryTransferDomainToDto);
        return res.status(200).json(inventoryTransferResult);
    }
    getById = async (req: ApiRequest<GetByIdInventoryTransferSchema>, res: ApiResponse<GetByIdInventoryTransferSchema>) => {
        const { id }: GetByIdInventoryTransferSchema["params"] = req.params;
        const inventoryTransferResponse: InventoryTransferProps | null = await this.getByIdInventoryTransferUseCase.execute(Number(id));
        return res.status(200).json(inventoryTransferResponse ? mapInventoryTransferDomainToDto(inventoryTransferResponse) : null);
    }
    create = async (req: ApiRequest<CreateInventoryTransferSchema>, res: ApiResponse<CreateInventoryTransferSchema>) => {
        const body: CreateInventoryTransferSchema["body"] = req.body;
        const inventoryTransferResponse: InventoryTransferProps = await this.createInventoryTransferUseCase.execute(body);
        return res.status(201).json(mapInventoryTransferDomainToDto(inventoryTransferResponse));
    }
    update = async (req: ApiRequest<UpdateInventoryTransferSchema>, res: ApiResponse<UpdateInventoryTransferSchema>) => {
        const body: UpdateInventoryTransferSchema["body"] = req.body;
        const { id }: UpdateInventoryTransferSchema["params"] = req.params;
        const inventoryTransferResponse: InventoryTransferProps = await this.updateInventoryTransferUseCase.execute(Number(id), body);
        return res.status(200).json(mapInventoryTransferDomainToDto(inventoryTransferResponse));
    }
    delete = async (req: ApiRequest<DeleteInventoryTransferSchema>, res: ApiResponse<DeleteInventoryTransferSchema>) => {
        const { id }: DeleteInventoryTransferSchema["params"] = req.params;
        await this.deleteInventoryTransferUseCase.execute(Number(id));
        res.status(200).json(null);
    }
}