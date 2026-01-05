"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInventoryMovementUseCase = void 0;
const http_error_1 = __importDefault(require("@shared/errors/http/http-error"));
;
class CreateInventoryMovementUseCase {
    invetoryLocationItemRepo;
    inventoryQueryRepo;
    repo;
    locationRepo;
    productRepo;
    inputRepo;
    constructor({ inputRepo, locationRepo, productRepo, invetoryLocationItemRepo, repo, inventoryQueryRepo }) {
        this.repo = repo;
        this.inputRepo = inputRepo;
        this.productRepo = productRepo;
        this.locationRepo = locationRepo;
        this.invetoryLocationItemRepo = invetoryLocationItemRepo;
        this.inventoryQueryRepo = inventoryQueryRepo;
    }
    ;
    execute = async (data, tx) => {
        const validateLocation = await this.locationRepo.findById(data.location_id, tx);
        if (!validateLocation)
            throw new http_error_1.default(404, "La locacíon ingresada no fue posible encontrarla");
        if (data.item_type === "product") {
            const validateProduct = await this.productRepo.findById(data.item_id, tx);
            if (!validateProduct)
                throw new http_error_1.default(404, "El producto que se desea agregar al inventario de la locación no fue posible encontrarlo");
        }
        else {
            const validateInput = await this.inputRepo.findById(data.item_id, tx);
            if (!validateInput)
                throw new http_error_1.default(404, "El insummo que se desea agregar al inventario de la locación no fue posible encontrarlo");
        }
        ;
        const inventoryLocationItem = await this.invetoryLocationItemRepo.findByLocationItem(data.location_id, data.item_id, data.item_type, tx);
        if (!inventoryLocationItem)
            throw new http_error_1.default(404, "La locación no tiene registrado el articulo.");
        const inventorySlot = await this.inventoryQueryRepo.findByInventoryId(inventoryLocationItem.inventory_id, tx);
        if (!inventorySlot) {
            throw new http_error_1.default(404, "El articulo dentro la locacion no tienee un slot de inventario.");
        }
        if (data.movement_type === "out") {
            const qtyMov = data.qty;
            const available = inventorySlot.stock;
            if (!Number.isFinite(qtyMov) || qtyMov <= 0) {
                throw new http_error_1.default(400, "La cantidad del movimiento debe ser mayor que 0");
            }
            if (!Number.isInteger(qtyMov)) {
                throw new http_error_1.default(400, "La cantidad debe ser un número entero");
            }
            if (qtyMov > available) {
                throw new http_error_1.default(409, "La locación no tiene inventario necesario para poder efectuar el movimiento de inventario");
            }
        }
        ;
        const inventoryMovementResponse = await this.repo.create(data, tx);
        const inventoryMovementResponseFormatted = {
            ...inventoryMovementResponse,
            is_locked: Boolean(inventoryMovementResponse.is_locked),
            created_at: inventoryMovementResponse.created_at.toISOString()
        };
        return inventoryMovementResponseFormatted;
    };
}
exports.CreateInventoryMovementUseCase = CreateInventoryMovementUseCase;
;
