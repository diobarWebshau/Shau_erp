import { IInventoryRepository } from "@src/modules/core/inventory/domain/inventory.repository.interface";
import { IInventoryLocationItemRepository } from "../../posicition/domain/inventory-location-item.repository.interface";
import { CreateInventoryOrchestratorUseCase } from "../application/use-cases/create-inventory-orchestrator.usecase";
import { InventoryRepository } from "@src/modules/core/inventory/infrastructure/repository/inventory.repository";
import { InventoryLocationItemRepository } from "../../posicition/infrastructure/repository/inventory-location-item.repository";
import { ApiRequest, ApiResponse } from "@src/shared/typed-request-endpoint/typed-request.interface";
import { CreateInventoryOrchestratorSchema, CreateTransferInventoryOrchestratorSchema } from "./../application/dto/inventory-orchestrator.endpoint.schema";
import { inventoryOrchestratorResponseProps } from "../domain/inventory-orchestrator.type";
import { CreateTransferInventoryOrchestratorUseCase } from "../application/use-cases/create-tranfers-inventory-orchestrator.usecase";
import { IInventoryQueryRepository } from "@src/modules/query/inventory/domain/inventory-query.repository.interface";
import { IInventoryTransferRepository } from "../../transfers/domain/inventory-tranfer.repository.interface";
import { InventoryTransferRepository } from "../../transfers/infrastructure/repository/inventory-transfer.repository";
import { InventoryQueryRepository } from "@src/modules/query/inventory/infrastructure/repository/inventory-query.repository";

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
        const inventoryOrchestratorResponse: inventoryOrchestratorResponseProps[] = await this.createInventoryOrchestratorUseCase.create(body);
        return res.status(201).json(inventoryOrchestratorResponse);
    };
    craeteTransfer = async (req: ApiRequest<CreateTransferInventoryOrchestratorSchema>, res: ApiResponse<CreateTransferInventoryOrchestratorSchema>) => {
        const body: CreateTransferInventoryOrchestratorSchema["body"] = req.body;
        const inventoryTransferOrchestratorResponse = await this.createTransferInventoryOrchestratorUseCase.create(body);
        return res.status(201).json(inventoryTransferOrchestratorResponse);
    };
};