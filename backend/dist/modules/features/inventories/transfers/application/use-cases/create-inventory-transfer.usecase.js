"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInventoryTransferUseCase = void 0;
const http_error_1 = __importDefault(require("@shared/errors/http/http-error"));
;
class CreateInventoryTransferUseCase {
    inventoryTransferRepo;
    locationRepo;
    productRepo;
    inputRepo;
    constructor({ inputRepo, inventoryTransferRepo, locationRepo, productRepo }) {
        this.inputRepo = inputRepo;
        this.productRepo = productRepo;
        this.inventoryTransferRepo = inventoryTransferRepo;
        this.locationRepo = locationRepo;
    }
    ;
    execute = async (data, tx) => {
        const validateSourceLocation = await this.locationRepo.findById(data.source_location_id, tx);
        const validateDestinationLocation = await this.locationRepo.findById(data.destination_location_id, tx);
        if (!validateDestinationLocation)
            throw new http_error_1.default(404, "La locacion de destino no existe.");
        if (!validateSourceLocation)
            throw new http_error_1.default(404, "La locacion de origen no existe.");
        if (data.item_type === "product") {
            const validateProduct = await this.productRepo.findById(data.item_id, tx);
            if (!validateProduct)
                throw new http_error_1.default(404, 'El producto que se desea transferir no existe');
        }
        else {
            const validateInput = await this.inputRepo.findById(data.item_id, tx);
            if (!validateInput)
                throw new http_error_1.default(404, 'El insumo que se desea transferir no existe');
        }
        const inventoryTransferResponse = await this.inventoryTransferRepo.create(data, tx);
        const inventoryTransferReposponseFormatted = {
            ...inventoryTransferResponse,
            created_at: inventoryTransferResponse.created_at.toISOString(),
            updated_at: inventoryTransferResponse.updated_at.toISOString(),
        };
        return inventoryTransferReposponseFormatted;
    };
}
exports.CreateInventoryTransferUseCase = CreateInventoryTransferUseCase;
