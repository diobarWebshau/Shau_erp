"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInventoryLocationItemUseCase = void 0;
const http_error_1 = __importDefault(require("@shared/errors/http/http-error"));
;
class CreateInventoryLocationItemUseCase {
    inventoryLocationItemRepo;
    locationRepo;
    inputRepo;
    productRepo;
    inventoryRepo;
    constructor({ inputRepo, inventoryLocationItemRepo, locationRepo, productRepo, inventoryRepo }) {
        this.inventoryLocationItemRepo = inventoryLocationItemRepo;
        this.inputRepo = inputRepo;
        this.locationRepo = locationRepo;
        this.productRepo = productRepo;
        this.inventoryRepo = inventoryRepo;
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
        const validateInventory = await this.inventoryRepo.findById(data.inventory_id, tx);
        if (!validateInventory)
            throw new http_error_1.default(404, "El slot de inventario que se desea asignar a la locación no fue posible encontrarlo");
        const inventoryMovementResponse = await this.inventoryLocationItemRepo.create(data, tx);
        return inventoryMovementResponse;
    };
}
exports.CreateInventoryLocationItemUseCase = CreateInventoryLocationItemUseCase;
;
