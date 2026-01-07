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
    execute = async (id: number, data: InventoryLocationItemUpdateAttributes, tx?: Transaction): Promise<InventoryLocationItemProps> => {
        const InventoryLocationItemResponse: InventoryLocationItemProps = await this.repo.update(id, data, tx);
        return InventoryLocationItemResponse;
    };
}; 