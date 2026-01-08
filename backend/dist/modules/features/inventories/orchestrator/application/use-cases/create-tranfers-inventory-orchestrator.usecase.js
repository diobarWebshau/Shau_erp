"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTransferInventoryOrchestratorUseCase = void 0;
const decimal_vo_1 = require("@src/shared/domain/value-objects/decimal.vo");
const http_error_1 = __importDefault(require("@src/shared/errors/http/http-error"));
const sequelize_1 = require("@src/config/mysql/sequelize");
const sequelize_2 = require("sequelize");
;
const mapInventoryTransferOrchestratorCreateDtoToDomain = (data) => {
    return {
        ...data,
        qty: decimal_vo_1.DecimalVO.from(data.qty)
    };
};
class CreateTransferInventoryOrchestratorUseCase {
    inventoryLocationItemRepo;
    inventoryRepo;
    inventoryQueryRepo;
    inventoryTransferRepo;
    constructor({ inventoryRepo, inventoryLocationItemRepo, inventoryQueryRepo, inventoryTransferRepo }) {
        this.inventoryRepo = inventoryRepo;
        this.inventoryLocationItemRepo = inventoryLocationItemRepo;
        this.inventoryQueryRepo = inventoryQueryRepo;
        this.inventoryTransferRepo = inventoryTransferRepo;
    }
    create = async (data) => {
        const tx = await sequelize_1.sequelize.transaction({
            isolationLevel: sequelize_2.Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
        });
        try {
            const createData = mapInventoryTransferOrchestratorCreateDtoToDomain(data);
            // 1) Reglas mínimas puras
            if (!Number.isFinite(createData.qty) || createData.qty.lte(0)) {
                throw new http_error_1.default(400, "La cantidad debe ser mayor que 0");
            }
            if (createData.source_location_id === createData.destination_location_id) {
                throw new http_error_1.default(409, "La locación de origen y destino no pueden ser la misma");
            }
            // 2) Resolver relación (slot) de ORIGEN
            const originRel = await this.inventoryLocationItemRepo.findByLocationItem(createData.source_location_id, createData.item_id, createData.item_type, tx);
            if (!originRel) {
                throw new http_error_1.default(404, "La locación de origen no tiene registrado el artículo");
            }
            // 3) Consultar stock del slot de ORIGEN
            const originSlot = await this.inventoryQueryRepo.findByInventoryId(originRel.inventory_id, tx);
            if (!originSlot) {
                throw new http_error_1.default(404, "El artículo en origen no tiene slot de inventario");
            }
            // 4) Validar stock suficiente
            if (createData.qty.gt(originSlot.stock)) {
                throw new http_error_1.default(409, "Inventario insuficiente en la locación de origen");
            }
            // 5) Asegurar relación (slot) en DESTINO
            let destinationRel = await this.inventoryLocationItemRepo.findByLocationItem(createData.destination_location_id, createData.item_id, createData.item_type, tx);
            if (!destinationRel) {
                // 5.1) Crear inventory “slot” en destino.
                // Ajusta el payload exacto a tu InventoryCreateProps real.
                // Si tu create requiere más campos, aquí es donde va.
                const newInventory = {
                    lead_time: 100,
                    maximum_stock: decimal_vo_1.DecimalVO.from(10000),
                    minimum_stock: decimal_vo_1.DecimalVO.from(100),
                    stock: decimal_vo_1.DecimalVO.from(0)
                };
                const createdInventory = await this.inventoryRepo.create(newInventory, tx);
                const link = {
                    inventory_id: createdInventory.id,
                    location_id: createData.destination_location_id,
                    item_type: createData.item_type,
                    item_id: createData.item_id,
                };
                destinationRel = await this.inventoryLocationItemRepo.create(link, tx);
            }
            const createTransferResponse = await this.inventoryTransferRepo.create(createData, tx);
            await tx.commit();
            return createTransferResponse;
        }
        catch (error) {
            await tx.rollback();
            throw error;
        }
    };
}
exports.CreateTransferInventoryOrchestratorUseCase = CreateTransferInventoryOrchestratorUseCase;
