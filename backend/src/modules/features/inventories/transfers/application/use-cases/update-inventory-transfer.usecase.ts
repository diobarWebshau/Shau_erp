import { InventoryTransferProps, InventoryTransferUpdateProps } from "../../domain/inventory-tranfer.types";
import { IInventoryTransferRepository } from "../../domain/inventory-tranfer.repository.interface";
import { InventoryTransferUpdateDto } from "../dto/inventory-tranfer.model.schema";
import { DecimalVO } from "@shared/domain/value-objects/decimal.vo";
import { Transaction } from "sequelize";

const mapInventoryTransferUpdateDtoToDomain = (data: InventoryTransferUpdateDto): InventoryTransferUpdateProps => {
    const { qty, reason, ...rest } = data;
    return {
        ...rest,
        ...(
            qty !== undefined ? { qty: DecimalVO.from(qty) } : {}
        ),
    }
}

export class UpdateInventoryTransferUseCase {

    private readonly inventoryTransferRepo: IInventoryTransferRepository;

    constructor(inventoryTransferRepo: IInventoryTransferRepository) {
        this.inventoryTransferRepo = inventoryTransferRepo;
    };

    execute = async (id: number, data: InventoryTransferUpdateDto, tx?: Transaction) => {
        const updateData = mapInventoryTransferUpdateDtoToDomain(data);
        const inventoryTransferResponse: InventoryTransferProps =
            await this.inventoryTransferRepo.update(id, updateData, tx);
        return inventoryTransferResponse;
    };
}