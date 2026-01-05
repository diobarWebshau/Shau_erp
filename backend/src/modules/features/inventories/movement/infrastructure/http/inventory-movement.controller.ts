import { IProductRepository } from "@modules/core/product/domain/product.repository.interface";
import { IInventoryMovementRepository } from "../../domain/inventory-movement.repository.interface";
import { IInputRepository } from "@modules/core/input/domain/input.repository.interface";
import { ILocationRepository } from "@modules/core/location/domain/location.repository.interface";
import { InventoryMovementRepository } from "../repository/inventory-movement.repository";
import { InputRepository } from "@modules/core/input/infrastructure/repository/input.repository";
import { ProductRepository } from "@modules/core/product/infrastructure/repository/producto.repository";
import { LocationRepository } from "@modules/core/location/infrastructure/repository/location.repository";
import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import {
    CreateInventoryMovementSchema, DeleteInventoryMovementSchema, GetAllInventoryMovementSchema,
    GetByIdInventoryMovementSchema, UpdateInventoryMovementSchema
} from "./../../application/dto/inventory-movement.endpoint.schema";
import { CreateInventoryMovementUseCase } from "../../application/use-cases/create-inventory-movement.usecase";
import { DeleteInventoryMovementUseCase } from "../../application/use-cases/delete-inventory-movement.usecase";
import { UpdateInventoryMovementUseCase } from "../../application/use-cases/update-inventory-movement.usecase";
import { GetAllInventoryMovementUseCase } from "../../application/use-cases/get-all-inventory-movement.usecase";
import { GetByIdInventoryMovementUseCase } from "../../application/use-cases/get-by-id-inventory-movement.usecase";
import { InventoryMovementResponseSchemaDto } from "../../application/dto/inventory-movement.model.schema";
import { IInventoryQueryRepository } from "@src/modules/query/inventory/domain/inventory-query.repository.interface";
import { InventoryLocationItemRepository } from "../../../posicition/infrastructure/repository/inventory-location-item.repository";
import { InventoryQueryRepository } from "@src/modules/query/inventory/infrastructure/repository/inventory-query.repository";
import { IInventoryLocationItemRepository } from "../../../posicition/domain/inventory-location-item.repository.interface";


export class InventoryMovementController {

    private readonly inventoryMovementRepo: IInventoryMovementRepository;
    private readonly productRepo: IProductRepository;
    private readonly inputRepo: IInputRepository;
    private readonly locationRepo: ILocationRepository;
    private readonly inventoryQueryRepo: IInventoryQueryRepository;
    private readonly inventoryLocationItemRepo: IInventoryLocationItemRepository;

    private readonly createInventoryMovementUseCase: CreateInventoryMovementUseCase;
    private readonly getByIdInventoryMovementSchema: GetByIdInventoryMovementUseCase;
    private readonly getAllInventoryMovementUseCase: GetAllInventoryMovementUseCase;
    private readonly updateInventoryMovementUseCase: UpdateInventoryMovementUseCase;
    private readonly deleteInventoryMovementUseCase: DeleteInventoryMovementUseCase;

    constructor() {
        this.inventoryMovementRepo = new InventoryMovementRepository();
        this.inputRepo = new InputRepository();
        this.productRepo = new ProductRepository();
        this.locationRepo = new LocationRepository();
        this.inventoryLocationItemRepo = new InventoryLocationItemRepository();
        this.inventoryQueryRepo = new InventoryQueryRepository();
        this.createInventoryMovementUseCase = new CreateInventoryMovementUseCase({
            inputRepo: this.inputRepo,
            productRepo: this.productRepo,
            locationRepo: this.locationRepo,
            repo: this.inventoryMovementRepo,
            invetoryLocationItemRepo: this.inventoryLocationItemRepo,
            inventoryQueryRepo: this.inventoryQueryRepo
        });
        this.updateInventoryMovementUseCase = new UpdateInventoryMovementUseCase({
            repo: this.inventoryMovementRepo
        });
        this.getAllInventoryMovementUseCase = new GetAllInventoryMovementUseCase(this.inventoryMovementRepo);
        this.getByIdInventoryMovementSchema = new GetByIdInventoryMovementUseCase(this.inventoryMovementRepo);
        this.deleteInventoryMovementUseCase = new DeleteInventoryMovementUseCase(this.inventoryMovementRepo);
    };

    getAll = async (_req: ApiRequest<GetAllInventoryMovementSchema>, res: ApiResponse<GetAllInventoryMovementSchema>) => {
        const inventoryMovementResponse: InventoryMovementResponseSchemaDto[] =
            await this.getAllInventoryMovementUseCase.execute();
        return res.status(200).json(inventoryMovementResponse);
    }
    getById = async (req: ApiRequest<GetByIdInventoryMovementSchema>, res: ApiResponse<GetByIdInventoryMovementSchema>) => {
        const { id }: GetByIdInventoryMovementSchema["params"] = req.params;
        const inventoryMovementResponse: InventoryMovementResponseSchemaDto | null =
            await this.getByIdInventoryMovementSchema.execute(Number(id));
        return res.status(200).json(inventoryMovementResponse);
    }
    create = async (req: ApiRequest<CreateInventoryMovementSchema>, res: ApiResponse<CreateInventoryMovementSchema>) => {
        const body: CreateInventoryMovementSchema["body"] = req.body;
        const inventoryMovementResponse: InventoryMovementResponseSchemaDto = await this.createInventoryMovementUseCase.execute(body);
        return res.status(201).json(inventoryMovementResponse);
    }
    update = async (req: ApiRequest<UpdateInventoryMovementSchema>, res: ApiResponse<UpdateInventoryMovementSchema>) => {
        const body: UpdateInventoryMovementSchema["body"] = req.body;
        const { id }: UpdateInventoryMovementSchema["params"] = req.params;
        const inventoryMovementResponse: InventoryMovementResponseSchemaDto = await this.updateInventoryMovementUseCase.execute(Number(id), body);
        return res.status(200).json(inventoryMovementResponse);
    }
    delete = async (req: ApiRequest<DeleteInventoryMovementSchema>, res: ApiResponse<DeleteInventoryMovementSchema>) => {
        const { id }: DeleteInventoryMovementSchema["params"] = req.params;
        await this.deleteInventoryMovementUseCase.execute(Number(id));
        return res.status(200).json(null);
    }
}