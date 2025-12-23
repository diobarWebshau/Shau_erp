"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const location_production_line_router_1 = require("./modules/features/location/assigments/location-production-line/infrastructure/http/location-production-line.router");
const product_discount_range_router_1 = require("./modules/features/products/assigments/product-discounts-ranges/infrastructure/http/product-discount-range.router");
const product_discount_client_router_1 = require("./modules/features/client/assigments/product-discount-client/infrastructure/http/product-discount-client.router");
const location_location_type_router_1 = require("./modules/features/location/assigments/location-location-type/infrastructure/http/location-location-type.router");
const product_input_process_router_1 = require("./modules/features/products/assigments/product-input-process/infrastructure/http/product-input-process.router");
const product_process_router_1 = require("./modules/features/products/assigments/product-process/infrastructure/http/product-process.router");
const product_input_router_1 = require("./modules/features/products/assigments/product-input/infrastructure/http/product-input.router");
const product_orchestrator_router_1 = require("./modules/features/products/orchestrator/infrastructure/product-orchestrator.router");
const client_router_1 = require("./modules/features/client/assigments/client-addresses/infrastructure/http/client.router");
const production_line_router_1 = require("./modules/core/production-line/infrastructure/http/production-line.router");
const location_type_router_1 = require("./modules/core/location-type/infrastructure/http/location-type.router");
const product_query_router_1 = require("./modules/features/products/query/infrastructure/product-query.router");
const input_type_router_1 = require("./modules/core/input-type/infrastructure/http/input-type.router");
const location_router_1 = require("./modules/core/location/infrastructure/http/location.router");
const process_router_1 = require("./modules/core/process/infrastructure/http/process.router");
const product_router_1 = require("./modules/core/product/infrastructure/http/product.router");
const client_router_2 = require("./modules/core/client/infrastructure/http/client.router");
const input_router_1 = require("./modules/core/input/infrastructure/http/input.router");
const error_middleware_1 = __importDefault(require("./middlewares/error/error.middleware"));
const index_1 = require("./shared/database/index");
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const node_path_1 = __importDefault(require("node:path"));
const createApp = async () => {
    const app = (0, express_1.default)();
    app.use((0, cookie_parser_1.default)());
    app.use(express_1.default.json({ limit: "10mb" }));
    app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" }));
    app.use("/uploads", express_1.default.static(node_path_1.default.resolve(__dirname, process.env.FILES_PATH)));
    app.use((0, compression_1.default)({ threshold: 1024 }));
    await (0, index_1.initializeDatabase)();
    // ******* CORE ******* 
    app.use("/production-line", (0, production_line_router_1.productionLineRouter)());
    app.use("/client-address", (0, client_router_1.ClientAddressRouter)());
    app.use("/location-type", (0, location_type_router_1.LocationTypeRouter)());
    app.use("/input-type", (0, input_type_router_1.InputTypeRouter)());
    app.use("/process", (0, process_router_1.ProcessRouter)());
    app.use("/client", (0, client_router_2.ClientRouter)());
    app.use("/input", (0, input_router_1.InputRouter)());
    // ******* CLIENTS ******* 
    app.use("/product-discount-client", (0, product_discount_client_router_1.ProductDiscountClientRouter)());
    // ******* LOCATION ******* 
    app.use("/location", (0, location_router_1.locationRouter)());
    app.use("/location-production-line", (0, location_production_line_router_1.locationProductionLineRouter)());
    app.use("/location-location-type", (0, location_location_type_router_1.locationLocationTypeRouter)());
    // ******* PRODUCT ******* 
    app.use("/product", (0, product_router_1.ProductRouter)());
    app.use("/product-process", (0, product_process_router_1.ProductProcessRouter)());
    app.use("/product-input", (0, product_input_router_1.ProductInputRouter)());
    app.use("/product-discount-range", (0, product_discount_range_router_1.ProductDiscountRangeRouter)());
    app.use("/product-input-process", (0, product_input_process_router_1.ProductInputProcessRouter)());
    app.use("/query", (0, product_query_router_1.ProductQuery)());
    app.use("/product/orchestrator", (0, product_orchestrator_router_1.ProductOrchestratorRouter)());
    // ******* ERROR ******* 
    app.use(error_middleware_1.default);
    return app;
};
exports.default = createApp;
