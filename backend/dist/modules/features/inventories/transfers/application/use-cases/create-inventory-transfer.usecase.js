"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInventoryTransferUseCase = void 0;
const decimal_vo_1 = require("@shared/domain/value-objects/decimal.vo");
const http_error_1 = __importDefault(require("@shared/errors/http/http-error"));
;
const mapInventoryTransferUpdateDtoToDomain = (data) => {
    return {
        ...data,
        qty: decimal_vo_1.DecimalVO.from(data.qty)
    };
};
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
        const createData = mapInventoryTransferUpdateDtoToDomain(data);
        const validateSourceLocation = await this.locationRepo.findById(createData.source_location_id, tx);
        const validateDestinationLocation = await this.locationRepo.findById(createData.destination_location_id, tx);
        if (!validateDestinationLocation)
            throw new http_error_1.default(404, "La locacion de destino no existe.");
        if (!validateSourceLocation)
            throw new http_error_1.default(404, "La locacion de origen no existe.");
        if (createData.item_type === "product") {
            const validateProduct = await this.productRepo.findById(createData.item_id, tx);
            if (!validateProduct)
                throw new http_error_1.default(404, 'El producto que se desea transferir no existe');
        }
        else {
            const validateInput = await this.inputRepo.findById(createData.item_id, tx);
            if (!validateInput)
                throw new http_error_1.default(404, 'El insumo que se desea transferir no existe');
        }
        const inventoryTransferResponse = await this.inventoryTransferRepo.create(createData, tx);
        return inventoryTransferResponse;
    };
}
exports.CreateInventoryTransferUseCase = CreateInventoryTransferUseCase;
