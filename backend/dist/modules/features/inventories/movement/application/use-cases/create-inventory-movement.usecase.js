"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInventoryMovementUseCase = exports.mapInventoryMovementCreateDtoToDomain = void 0;
const decimal_vo_1 = require("@src/shared/domain/value-objects/decimal.vo");
const http_error_1 = __importDefault(require("@shared/errors/http/http-error"));
;
const mapInventoryMovementCreateDtoToDomain = (data) => ({
    ...data,
    qty: decimal_vo_1.DecimalVO.from(data.qty)
});
exports.mapInventoryMovementCreateDtoToDomain = mapInventoryMovementCreateDtoToDomain;
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
        const createData = (0, exports.mapInventoryMovementCreateDtoToDomain)(data);
        if (createData.item_type === "product") {
            const validateProduct = await this.productRepo.findById(createData.item_id, tx);
            if (!validateProduct)
                throw new http_error_1.default(404, "El producto que se desea agregar al inventario de la locación no fue posible encontrarlo");
        }
        else {
            const validateInput = await this.inputRepo.findById(createData.item_id, tx);
            if (!validateInput)
                throw new http_error_1.default(404, "El insummo que se desea agregar al inventario de la locación no fue posible encontrarlo");
        }
        ;
        const inventoryLocationItem = await this.invetoryLocationItemRepo.findByLocationItem(createData.location_id, createData.item_id, createData.item_type, tx);
        if (!inventoryLocationItem)
            throw new http_error_1.default(404, "La locación no tiene registrado el articulo.");
        const inventorySlot = await this.inventoryQueryRepo.findByInventoryId(inventoryLocationItem.inventory_id, tx);
        if (!inventorySlot) {
            throw new http_error_1.default(404, "El articulo dentro la locacion no tienee un slot de inventario.");
        }
        if (createData.movement_type === "out") {
            const qtyMov = createData.qty;
            const available = decimal_vo_1.DecimalVO.from(inventorySlot.stock);
            if (!qtyMov.isFinite() || qtyMov.lte(0)) {
                throw new http_error_1.default(400, "La cantidad del movimiento debe ser mayor que 0");
            }
            if (!qtyMov.isInteger()) {
                throw new http_error_1.default(400, "La cantidad debe ser un número entero");
            }
            if (qtyMov.gt(available)) {
                throw new http_error_1.default(409, "La locación no tiene inventario necesario para poder efectuar el movimiento de inventario");
            }
        }
        const inventoryMovementResponse = await this.repo.create(createData, tx);
        return inventoryMovementResponse;
    };
}
exports.CreateInventoryMovementUseCase = CreateInventoryMovementUseCase;
;
