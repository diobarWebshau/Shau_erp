import { ApiRequest, ApiResponse } from "@src/shared/typed-request-endpoint/typed-request.interface";
import { GetAllInventoryUseCase } from "../../application/use-cases/get-all-inventory.usecase";
import { GetByIdInventoryUseCase } from "../../application/use-cases/get-by-id-inventory.usecase";
import { UpdateInventoryUseCase } from "../../application/use-cases/update-inventory.usecase";
import { DeleteInventoryUseCase } from "../../application/use-cases/delete-inventory.usecase";
import { CreateInventoryUseCase } from "../../application/use-cases/create-inventory.usecase";
import { inventoryResponseDto } from "../../application/dto/inventory.model.schema";
import { IInventoryRepository } from "../../domain/inventory.repository.interface";
import { InventoryRepository } from "../repository/inventory.repository";
import { InventoryProps } from "../../domain/inventory.types";
import {
    CreateInventorySchema, DeleteInventorySchema,
    GetAllInventoryScehma, GetByIdInventoryScehma,
    UpdateInventorySchema
} from "./../../application/dto/inventory.usecases.schema";


const mapInventoryDomainToDto = (data: InventoryProps): inventoryResponseDto => ({
    ...data,
    stock: data.stock.toString(),
    maximum_stock: data.maximum_stock.toString(),
    minimum_stock: data.minimum_stock.toString(),
    created_at: data.created_at.toISOString(),
    updated_at: data.updated_at.toISOString(),
});

export class InventoryController {

    private readonly repo: IInventoryRepository;
    private readonly getAllInventoryUseCase: GetAllInventoryUseCase;
    private readonly getByIdInventoryUseCase: GetByIdInventoryUseCase;
    private readonly updateInventoryUseCase: UpdateInventoryUseCase;
    private readonly deleteInventoryUseCase: DeleteInventoryUseCase;
    private readonly createInventoryUseCase: CreateInventoryUseCase;

    constructor() {
        this.repo = new InventoryRepository();
        this.createInventoryUseCase = new CreateInventoryUseCase(this.repo);
        this.getByIdInventoryUseCase = new GetByIdInventoryUseCase(this.repo);
        this.getAllInventoryUseCase = new GetAllInventoryUseCase(this.repo);
        this.updateInventoryUseCase = new UpdateInventoryUseCase(this.repo);
        this.deleteInventoryUseCase = new DeleteInventoryUseCase(this.repo);
    };

    getAll = async (_req: ApiRequest<GetAllInventoryScehma>, res: ApiResponse<GetAllInventoryScehma>) => {
        const inventoryResponses: InventoryProps[] = await this.getAllInventoryUseCase.execute();
        const inventoryResponseDto = inventoryResponses.map(mapInventoryDomainToDto);
        return res.status(200).json(inventoryResponseDto);
    }

    getById = async (req: ApiRequest<GetByIdInventoryScehma>, res: ApiResponse<GetByIdInventoryScehma>) => {
        const { id }: GetByIdInventoryScehma["params"] = req.params;
        const inventoryResponse: InventoryProps | null = await this.getByIdInventoryUseCase.execute(Number(id));
        return res.status(200).json(inventoryResponse ? mapInventoryDomainToDto(inventoryResponse) : null);
    }

    create = async (req: ApiRequest<CreateInventorySchema>, res: ApiResponse<CreateInventorySchema>) => {
        const body: CreateInventorySchema["body"] = req.body;
        const inventoryResponse: InventoryProps = await this.createInventoryUseCase.execute(body);
        return res.status(201).json(mapInventoryDomainToDto(inventoryResponse));
    }

    update = async (req: ApiRequest<UpdateInventorySchema>, res: ApiResponse<UpdateInventorySchema>) => {
        const { id }: UpdateInventorySchema["params"] = req.params;
        const body: UpdateInventorySchema["body"] = req.body;
        const inventoryResponse: InventoryProps = await this.updateInventoryUseCase.execute(Number(id), body);
        return res.status(200).json(mapInventoryDomainToDto(inventoryResponse));
    }

    delete = async (req: ApiRequest<DeleteInventorySchema>, res: ApiResponse<DeleteInventorySchema>) => {
        const { id }: DeleteInventorySchema["params"] = req.params;
        await this.deleteInventoryUseCase.execute(Number(id));
        return res.status(200).json(null);
    }
};

