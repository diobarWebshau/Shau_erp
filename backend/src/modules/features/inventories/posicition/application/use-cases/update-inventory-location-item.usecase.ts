import { InventoryLocationItemResponseSchemaDto } from "../../../posicition/application/dto/inventory-location-item.model.schema";
import { InventoryLocationItemUpdateAttributes } from "../../infrastructure/orm/inventory-location-item.orm";
import { IInventoryLocationItemRepository } from "../../domain/inventory-location-item.repository.interface"
import { InventoryLocationItemProps } from "../../domain/inventory-location-item.types";
import { Transaction } from "sequelize";

interface IUpdateInventoryLocationItemUseCase {
    repo: IInventoryLocationItemRepository,
}

export class UpdateInventoryLocationItemUseCase {
    private readonly repo: IInventoryLocationItemRepository;
    constructor({ repo }: IUpdateInventoryLocationItemUseCase) {
        this.repo = repo;
    };
    execute = async (id: number, data: InventoryLocationItemUpdateAttributes, tx?: Transaction): Promise<InventoryLocationItemResponseSchemaDto> => {
        const InventoryLocationItemResponse: InventoryLocationItemProps = await this.repo.update(id, data, tx);
        const InventoryLocationItemResponseFormatted: InventoryLocationItemResponseSchemaDto = {
            ...InventoryLocationItemResponse,
            created_at: InventoryLocationItemResponse.created_at.toISOString(),
            updated_at: InventoryLocationItemResponse.updated_at.toISOString()
        }
        return InventoryLocationItemResponseFormatted;
    };
}; 