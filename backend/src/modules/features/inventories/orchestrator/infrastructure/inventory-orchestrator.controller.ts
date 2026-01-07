import { CreateInventoryOrchestratorSchema, CreateTransferInventoryOrchestratorSchema } from "./../application/dto/inventory-orchestrator.endpoint.schema";
import { InventoryOrchestratorResponseDto, InventoryTransferResponseDto } from "../application/dto/inventory-orchestrator.model.schema";
import { CreateTransferInventoryOrchestratorUseCase } from "../application/use-cases/create-tranfers-inventory-orchestrator.usecase";
import { InventoryLocationItemRepository } from "../../posicition/infrastructure/repository/inventory-location-item.repository";
import { InventoryQueryRepository } from "@modules/query/inventory/infrastructure/repository/inventory-query.repository";
import { IInventoryLocationItemRepository } from "../../posicition/domain/inventory-location-item.repository.interface";
import { InventoryTransferRepository } from "../../transfers/infrastructure/repository/inventory-transfer.repository";
import { CreateInventoryOrchestratorUseCase } from "../application/use-cases/create-inventory-orchestrator.usecase";
import { IInventoryQueryRepository } from "@modules/query/inventory/domain/inventory-query.repository.interface";
import { InventoryRepository } from "@modules/core/inventory/infrastructure/repository/inventory.repository";
import { IInventoryTransferRepository } from "../../transfers/domain/inventory-tranfer.repository.interface";
import { IInventoryRepository } from "@modules/core/inventory/domain/inventory.repository.interface";
import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { InventoryTransferProps } from "../../transfers/domain/inventory-tranfer.types";
import { InventoryOrchestrator } from "../domain/inventory-orchestrator.type";

const mapInventoryTransferDomainToDto = (data: InventoryTransferProps): InventoryTransferResponseDto => {
    return {
        ...data,
        created_at: data.created_at.toISOString(),
        updated_at: data.updated_at.toISOString(),
        qty: data.qty.toString()
    }
};

const mapInventoryDomainToDto = (data: InventoryOrchestrator): InventoryOrchestratorResponseDto => {
    const { inventory, inventory_location_item } = data;
    return {
        inventory: {
            ...inventory,
            created_at: inventory.created_at.toISOString(),
            updated_at: inventory.updated_at.toISOString(),
            maximum_stock: inventory.maximum_stock.toString(),
            minimum_stock: inventory.minimum_stock.toString(),
            stock: inventory.stock.toString()
        },
        inventory_location_item: {
            ...inventory_location_item,
            created_at: inventory_location_item.created_at.toISOString(),
            updated_at: inventory_location_item.updated_at.toISOString(),
        }
    }
}

export class InventoryOrchestratorController {
    private readonly inventoryRepo: IInventoryRepository;
    private readonly inventoryLocationItemRepo: IInventoryLocationItemRepository;
    private readonly createInventoryOrchestratorUseCase: CreateInventoryOrchestratorUseCase;
    private readonly inventoryQueryRepo: IInventoryQueryRepository;
    private readonly inventoryTransferRepo: IInventoryTransferRepository;
    private readonly createTransferInventoryOrchestratorUseCase: CreateTransferInventoryOrchestratorUseCase;

    constructor() {
        this.inventoryRepo = new InventoryRepository();
        this.inventoryLocationItemRepo = new InventoryLocationItemRepository();
        this.inventoryTransferRepo = new InventoryTransferRepository();
        this.inventoryQueryRepo = new InventoryQueryRepository();
        this.createInventoryOrchestratorUseCase = new CreateInventoryOrchestratorUseCase({
            inventoryLocationItemRepo: this.inventoryLocationItemRepo,
            inventoryRepo: this.inventoryRepo
        });
        this.createTransferInventoryOrchestratorUseCase = new CreateTransferInventoryOrchestratorUseCase({
            inventoryLocationItemRepo: this.inventoryLocationItemRepo,
            inventoryQueryRepo: this.inventoryQueryRepo,
            inventoryRepo: this.inventoryRepo,
            inventoryTransferRepo: this.inventoryTransferRepo
        });
    };
    create = async (req: ApiRequest<CreateInventoryOrchestratorSchema>, res: ApiResponse<CreateInventoryOrchestratorSchema>) => {
        const body: CreateInventoryOrchestratorSchema["body"] = req.body;
        const inventoryOrchestratorResponse: InventoryOrchestrator[] = await this.createInventoryOrchestratorUseCase.create(body);
        const inventoryOrchestratorResult = inventoryOrchestratorResponse.map(mapInventoryDomainToDto);
        return res.status(201).json(inventoryOrchestratorResult);
    };
    craeteTransfer = async (req: ApiRequest<CreateTransferInventoryOrchestratorSchema>, res: ApiResponse<CreateTransferInventoryOrchestratorSchema>) => {
        const body: CreateTransferInventoryOrchestratorSchema["body"] = req.body;
        const inventoryTransferOrchestratorResponse = await this.createTransferInventoryOrchestratorUseCase.create(body);
        return res.status(201).json(mapInventoryTransferDomainToDto(inventoryTransferOrchestratorResponse));
    };
};