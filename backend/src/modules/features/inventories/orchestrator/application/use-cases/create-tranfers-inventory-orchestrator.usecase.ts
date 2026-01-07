import { InventoryTransferCreateProps, InventoryTransferProps } from "@src/modules/features/inventories/transfers/domain/inventory-tranfer.types";
import { InventoryLocationItemCreateProps, InventoryLocationItemProps } from "../../../posicition/domain/inventory-location-item.types";
import { IInventoryLocationItemRepository } from "../../../posicition/domain/inventory-location-item.repository.interface";
import { IInventoryQueryRepository } from "@src/modules/query/inventory/domain/inventory-query.repository.interface";
import { IInventoryTransferRepository } from "../../../transfers/domain/inventory-tranfer.repository.interface";
import { IInventoryRepository } from "@src/modules/core/inventory/domain/inventory.repository.interface";
import { InventoryCreateProps, InventoryProps } from "@src/modules/core/inventory/domain/inventory.types";
import { InventoryQueryProps } from "@src/modules/query/inventory/domain/inventory-query.types";
import { DecimalVO } from "@src/shared/domain/value-objects/decimal.vo";
import HttpError from "@src/shared/errors/http/http-error";
import { sequelize } from "@src/config/mysql/sequelize";
import { Transaction as SequelizeTx } from "sequelize";
import type { Transaction } from "sequelize";
import { InventoryTransferCreateDto } from "../dto/inventory-orchestrator.model.schema";

interface ICreateInventoryOrchestratorUseCase {
    inventoryRepo: IInventoryRepository,
    inventoryLocationItemRepo: IInventoryLocationItemRepository,
    inventoryQueryRepo: IInventoryQueryRepository,
    inventoryTransferRepo: IInventoryTransferRepository
};


const mapInventoryTransferOrchestratorCreateDtoToDomain = (data: InventoryTransferCreateDto): InventoryTransferCreateProps => {
    return {
        ...data,
        qty: DecimalVO.from(data.qty)
    }
}

export class CreateTransferInventoryOrchestratorUseCase {
    private readonly inventoryLocationItemRepo: IInventoryLocationItemRepository;
    private readonly inventoryRepo: IInventoryRepository;
    private readonly inventoryQueryRepo: IInventoryQueryRepository;
    private readonly inventoryTransferRepo: IInventoryTransferRepository;

    constructor({ inventoryRepo, inventoryLocationItemRepo, inventoryQueryRepo, inventoryTransferRepo }: ICreateInventoryOrchestratorUseCase) {
        this.inventoryRepo = inventoryRepo;
        this.inventoryLocationItemRepo = inventoryLocationItemRepo;
        this.inventoryQueryRepo = inventoryQueryRepo;
        this.inventoryTransferRepo = inventoryTransferRepo
    }

    create = async (data: InventoryTransferCreateDto): Promise<InventoryTransferProps> => {
        const tx: Transaction = await sequelize.transaction({
            isolationLevel: SequelizeTx.ISOLATION_LEVELS.REPEATABLE_READ,
        });

        try {

            const createData = mapInventoryTransferOrchestratorCreateDtoToDomain(data)

            // 1) Reglas mínimas puras
            if (!Number.isFinite(createData.qty) || createData.qty.lte(0)) {
                throw new HttpError(400, "La cantidad debe ser mayor que 0");
            }

            if (createData.source_location_id === createData.destination_location_id) {
                throw new HttpError(409, "La locación de origen y destino no pueden ser la misma");
            }

            // 2) Resolver relación (slot) de ORIGEN
            const originRel: InventoryLocationItemProps | null =
                await this.inventoryLocationItemRepo.findByLocationItem(
                    createData.source_location_id,
                    createData.item_id,
                    createData.item_type,
                    tx
                );

            if (!originRel) {
                throw new HttpError(404, "La locación de origen no tiene registrado el artículo");
            }

            // 3) Consultar stock del slot de ORIGEN
            const originSlot: InventoryQueryProps | null =
                await this.inventoryQueryRepo.findByInventoryId(originRel.inventory_id, tx);

            if (!originSlot) {
                throw new HttpError(404, "El artículo en origen no tiene slot de inventario");
            }

            // 4) Validar stock suficiente
            if (createData.qty.gt(originSlot.stock)) {
                throw new HttpError(409, "Inventario insuficiente en la locación de origen");
            }

            // 5) Asegurar relación (slot) en DESTINO
            let destinationRel: InventoryLocationItemProps | null =
                await this.inventoryLocationItemRepo.findByLocationItem(
                    createData.destination_location_id,
                    createData.item_id,
                    createData.item_type,
                    tx
                );

            if (!destinationRel) {
                // 5.1) Crear inventory “slot” en destino.
                // Ajusta el payload exacto a tu InventoryCreateProps real.
                // Si tu create requiere más campos, aquí es donde va.
                const newInventory: InventoryCreateProps = {
                    lead_time: 100,
                    maximum_stock: DecimalVO.from(10000),
                    minimum_stock: DecimalVO.from(100),
                    stock: DecimalVO.from(0)
                }
                const createdInventory: InventoryProps = await this.inventoryRepo.create(newInventory, tx);

                const link: InventoryLocationItemCreateProps = {
                    inventory_id: createdInventory.id,
                    location_id: createData.destination_location_id,
                    item_type: createData.item_type,
                    item_id: createData.item_id,
                };

                destinationRel = await this.inventoryLocationItemRepo.create(link, tx);
            }

            const createTransferResponse: InventoryTransferProps = await this.inventoryTransferRepo.create(createData, tx);
            await tx.commit();
            return createTransferResponse;
        } catch (error) {
            await tx.rollback();
            throw error;
        }
    };
}