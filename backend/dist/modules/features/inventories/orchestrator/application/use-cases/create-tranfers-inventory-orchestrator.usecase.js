"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTransferInventoryOrchestratorUseCase = void 0;
const http_error_1 = __importDefault(require("@src/shared/errors/http/http-error"));
const sequelize_1 = require("@src/config/mysql/sequelize");
const sequelize_2 = require("sequelize");
;
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
            // 1) Reglas mínimas puras
            if (!Number.isFinite(data.qty) || data.qty <= 0) {
                throw new http_error_1.default(400, "La cantidad debe ser mayor que 0");
            }
            if (data.source_location_id === data.destination_location_id) {
                throw new http_error_1.default(409, "La locación de origen y destino no pueden ser la misma");
            }
            // 2) Resolver relación (slot) de ORIGEN
            const originRel = await this.inventoryLocationItemRepo.findByLocationItem(data.source_location_id, data.item_id, data.item_type, tx);
            if (!originRel) {
                throw new http_error_1.default(404, "La locación de origen no tiene registrado el artículo");
            }
            // 3) Consultar stock del slot de ORIGEN
            const originSlot = await this.inventoryQueryRepo.findByInventoryId(originRel.inventory_id, tx);
            if (!originSlot) {
                throw new http_error_1.default(404, "El artículo en origen no tiene slot de inventario");
            }
            // 4) Validar stock suficiente
            if (data.qty > originSlot.stock) {
                throw new http_error_1.default(409, "Inventario insuficiente en la locación de origen");
            }
            // 5) Asegurar relación (slot) en DESTINO
            let destinationRel = await this.inventoryLocationItemRepo.findByLocationItem(data.destination_location_id, data.item_id, data.item_type, tx);
            if (!destinationRel) {
                // 5.1) Crear inventory “slot” en destino.
                // Ajusta el payload exacto a tu InventoryCreateProps real.
                // Si tu create requiere más campos, aquí es donde va.
                const newInventory = {
                    lead_time: 100,
                    maximum_stock: 10000,
                    minimum_stock: 100,
                    stock: 0
                };
                const createdInventory = await this.inventoryRepo.create(newInventory, tx);
                const link = {
                    inventory_id: createdInventory.id,
                    location_id: data.destination_location_id,
                    item_type: data.item_type,
                    item_id: data.item_id,
                };
                destinationRel = await this.inventoryLocationItemRepo.create(link, tx);
            }
            const createTransferResponse = await this.inventoryTransferRepo.create(data, tx);
            const inventoryTransferResult = {
                ...createTransferResponse,
                created_at: createTransferResponse.created_at.toISOString(),
                updated_at: createTransferResponse.updated_at.toISOString(),
            };
            await tx.commit();
            return inventoryTransferResult;
        }
        catch (error) {
            await tx.rollback();
            throw error;
        }
    };
}
exports.CreateTransferInventoryOrchestratorUseCase = CreateTransferInventoryOrchestratorUseCase;
