import { InventoryMovementProps, InventoryMovementUpdateProps } from "../../domain/inventory-movement.types";
import { IInventoryMovementRepository } from "../../domain/inventory-movement.repository.interface"
import { InventoryMovementUpdateDto } from "../dto/inventory-movement.model.schema";
import { DecimalVO } from "@src/shared/domain/value-objects/decimal.vo";
import { Transaction } from "sequelize";

interface IUpdateInventoryMovementUseCase {
    repo: IInventoryMovementRepository,
}

const mapInventoryMovementUpdateDtoToDomain = (data: InventoryMovementUpdateDto): InventoryMovementUpdateProps => {
    const { qty, ...rest }: InventoryMovementUpdateDto = data;
    return ({
        ...rest,
        ...(
            qty !== undefined
                ? { qty: DecimalVO.from(qty) }
                : {}
        )
    });
};

export class UpdateInventoryMovementUseCase {

    private readonly repo: IInventoryMovementRepository;

    constructor({ repo }: IUpdateInventoryMovementUseCase) {
        this.repo = repo;
    };

    execute = async (id: number, data: InventoryMovementUpdateDto, tx?: Transaction): Promise<InventoryMovementProps> => {
        const inventoryMovementResponse: InventoryMovementProps = await this.repo.update(id, mapInventoryMovementUpdateDtoToDomain(data), tx);
        return inventoryMovementResponse;
    };
}; 