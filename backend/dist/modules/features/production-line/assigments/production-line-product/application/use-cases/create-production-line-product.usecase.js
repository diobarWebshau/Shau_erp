"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductionLineProductUseCase = void 0;
const http_error_1 = __importDefault(require("@src/shared/errors/http/http-error"));
class CreateProductionLineProductUseCase {
    repo;
    productionLineRepo;
    productRepo;
    constructor({ productRepo, productionLineRepo, repo }) {
        this.repo = repo;
        this.productRepo = productRepo;
        this.productionLineRepo = productionLineRepo;
    }
    ;
    async execute(data, tx) {
        const validateProduct = await this.productRepo.findById(data.product_id, tx);
        if (!validateProduct)
            throw new http_error_1.default(500, "El producto que se pretende asignar a la línea de producción, no existe.");
        const validateProductionLine = await this.productionLineRepo.findById(data.production_line_id, tx);
        if (!validateProductionLine)
            throw new http_error_1.default(500, "La línea de producción que se le desea asignar un producto, no existe.");
        const validateDuplicate = await this.repo.findByProductionLineProduct(data.product_id, data.production_line_id, tx);
        if (validateDuplicate)
            throw new http_error_1.default(500, "El producto ya esta fue anteriormente asignado a la línea de producción.");
        const created = await this.repo.create(data, tx);
        if (!created)
            throw new http_error_1.default(500, "No fue posible crear la asignación del producto a la línea de producción.");
        return created;
    }
    ;
}
exports.CreateProductionLineProductUseCase = CreateProductionLineProductUseCase;
