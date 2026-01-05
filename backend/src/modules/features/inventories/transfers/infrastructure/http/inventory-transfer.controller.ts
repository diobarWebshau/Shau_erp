import { GetByIdInventoryTransferUseCase } from "../../application/use-cases/get-by-id-inventory-transfer.usecase";
import { GetAllInventoryTransferUseCase } from "../../application/use-cases/get-all-inventory-transfer.usecase";
import { UpdateInventoryTransferUseCase } from "../../application/use-cases/update-inventory-transfer.usecase";
import { DeleteInventoryTransferUseCase } from "../../application/use-cases/delete-inventory-trasnfer.usecase";
import { CreateInventoryTransferUseCase } from "../../application/use-cases/create-inventory-transfer.usecase";
import { LocationRepository } from "@modules/core/location/infrastructure/repository/location.repository";
import { ProductRepository } from "@modules/core/product/infrastructure/repository/producto.repository";
import { InventoryTransferResponseSchemaDto } from "../../application/dto/inventory-tranfer.model.schema";
import { ILocationRepository } from "@modules/core/location/domain/location.repository.interface";
import { InputRepository } from "@modules/core/input/infrastructure/repository/input.repository";
import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { IProductRepository } from "@modules/core/product/domain/product.repository.interface";
import { IInventoryTransferRepository } from "../../domain/inventory-tranfer.repository.interface";
import { IInputRepository } from "@modules/core/input/domain/input.repository.interface";
import { InventoryTransferRepository } from "../repository/inventory-transfer.repository";
import {
    CreateInventoryTransferSchema, DeleteInventoryTransferSchema, GetAllInventoryTransferSchema,
    GetByIdInventoryTransferSchema, UpdateInventoryTransferSchema
} from "./../../application/dto/inventory-tranfer.endpoint.schema"

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
        const inventoryTransferResponses: InventoryTransferResponseSchemaDto[] = await this.getAllInventoryTransferUseCase.execute();
        return res.status(200).json(inventoryTransferResponses);
    }
    getById = async (req: ApiRequest<GetByIdInventoryTransferSchema>, res: ApiResponse<GetByIdInventoryTransferSchema>) => {
        const { id }: GetByIdInventoryTransferSchema["params"] = req.params;
        const inventoryTransferResponse: InventoryTransferResponseSchemaDto | null = await this.getByIdInventoryTransferUseCase.execute(Number(id));
        return res.status(200).json(inventoryTransferResponse);
    }
    create = async (req: ApiRequest<CreateInventoryTransferSchema>, res: ApiResponse<CreateInventoryTransferSchema>) => {
        const body: CreateInventoryTransferSchema["body"] = req.body;
        const inventoryTransferResponse: InventoryTransferResponseSchemaDto = await this.createInventoryTransferUseCase.execute(body);
        return res.status(201).json(inventoryTransferResponse);
    }
    update = async (req: ApiRequest<UpdateInventoryTransferSchema>, res: ApiResponse<UpdateInventoryTransferSchema>) => {
        const body: UpdateInventoryTransferSchema["body"] = req.body;
        const { id }: UpdateInventoryTransferSchema["params"] = req.params;
        const inventoryTransferResponse: InventoryTransferResponseSchemaDto = await this.updateInventoryTransferUseCase.execute(Number(id), body);
        return res.status(200).json(inventoryTransferResponse);
    }
    delete = async (req: ApiRequest<DeleteInventoryTransferSchema>, res: ApiResponse<DeleteInventoryTransferSchema>) => {
        const { id }: DeleteInventoryTransferSchema["params"] = req.params;
        await this.deleteInventoryTransferUseCase.execute(Number(id));
        res.status(200).json(null);
    }
}