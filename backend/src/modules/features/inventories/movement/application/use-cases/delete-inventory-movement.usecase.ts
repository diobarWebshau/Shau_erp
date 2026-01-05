import { IInventoryMovementRepository } from "../../domain/inventory-movement.repository.interface"
import { Transaction } from "sequelize";

export class DeleteInventoryMovementUseCase {
    private readonly repo: IInventoryMovementRepository;
    constructor(repo: IInventoryMovementRepository) {
        this.repo = repo;
    };
    execute = async (id: number, tx?: Transaction): Promise<void> =>
        await this.repo.delete(id, tx);
};