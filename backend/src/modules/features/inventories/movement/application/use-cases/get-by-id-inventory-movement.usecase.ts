import { IInventoryMovementRepository } from "../../domain/inventory-movement.repository.interface"
import { InventoryMovementProps } from "../../domain/inventory-movement.types";
import { Transaction } from "sequelize";

export class GetByIdInventoryMovementUseCase {

    private readonly repo: IInventoryMovementRepository;

    constructor(repo: IInventoryMovementRepository) {
        this.repo = repo;
    };

    execute = async (id: number, tx?: Transaction): Promise<InventoryMovementProps | null> => {
        const inventoryReponse: InventoryMovementProps | null = await this.repo.findById(id, tx);
        return inventoryReponse;
    };
};