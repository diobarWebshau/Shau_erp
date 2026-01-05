"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const applied_product_discount_client_router_1 = require("./modules/features/purchased-order/assigments/purchased-order-product/assigments/applied-product-discount-client/infrastructure/http/applied-product-discount-client.router");
const applied_product_discount_range_router_1 = require("./modules/features/purchased-order/assigments/purchased-order-product/assigments/applied-product-discount-range/infrastructure/http/applied-product-discount-range.router");
const production_line_product_router_1 = require("./modules/features/production-line/assigments/production-line-product/infrastructure/http/production-line-product.router");
const purchased_order_product_router_1 = require("./modules/features/purchased-order/assigments/purchased-order-product/infrastructure/http/purchased-order-product.router");
const location_production_line_router_1 = require("@modules/features/location/assigments/location-production-line/infrastructure/http/location-production-line.router");
const product_discount_range_router_1 = require("@modules/features/products/assigments/product-discounts-ranges/infrastructure/http/product-discount-range.router");
const product_discount_client_router_1 = require("@modules/features/client/assigments/product-discount-client/infrastructure/http/product-discount-client.router");
const location_location_type_router_1 = require("@modules/features/location/assigments/location-location-type/infrastructure/http/location-location-type.router");
const product_input_process_router_1 = require("@modules/features/products/assigments/product-input-process/infrastructure/http/product-input-process.router");
const inventory_location_item_router_1 = require("./modules/features/inventories/posicition/infrastructure/http/inventory-location-item.router");
const product_process_router_1 = require("./modules/features/products/assigments/product-process/infrastructure/http/product-process.router");
const inventory_orchestrator_router_1 = require("./modules/features/inventories/orchestrator/infrastructure/inventory-orchestrator.router");
const location_orchestrator_router_1 = require("./modules/features/location/orchestration/infrastructure/location-orchestrator.router");
const product_input_router_1 = require("@modules/features/products/assigments/product-input/infrastructure/http/product-input.router");
const product_orchestrator_router_1 = require("./modules/features/products/orchestrator/infrastructure/product-orchestrator.router");
const inventory_transfer_router_1 = require("./modules/features/inventories/transfers/infrastructure/http/inventory-transfer.router");
const inventory_movement_router_1 = require("./modules/features/inventories/movement/infrastructure/http/inventory-movement.router");
const producction_line_query_router_1 = require("./modules/query/production-line/infrastructure/http/producction-line-query.router");
const client_router_1 = require("@modules/features/client/assigments/client-addresses/infrastructure/http/client.router");
const client_orchestrator_router_1 = require("./modules/features/client/orchestration/infrastructure/client-orchestrator.router");
const purchased_order_router_1 = require("./modules/features/purchased-order/infrastructure/http/purchased-order.router");
const production_line_router_1 = require("@modules/core/production-line/infrastructure/http/production-line.router");
const inventory_query_router_1 = require("./modules/query/inventory/infrastructure/http/inventory-query.router");
const location_type_router_1 = require("@modules/core/location-type/infrastructure/http/location-type.router");
const location_query_router_1 = require("./modules/query/location/infastructure/http/location-query.router");
const client_query_router_1 = require("@modules/query/client/infrastructure/http/client-query.router");
const input_type_router_1 = require("@modules/core/input-type/infrastructure/http/input-type.router");
const product_query_router_1 = require("@modules/query/product/infrastructure/product-query.router");
const inventory_router_1 = require("./modules/core/inventory/infrastructure/http/inventory.router");
const item_query_router_1 = require("./modules/query/item/infrastructure/http/item-query.router");
const location_router_1 = require("@modules/core/location/infrastructure/http/location.router");
const process_router_1 = require("@modules/core/process/infrastructure/http/process.router");
const product_router_1 = require("@modules/core/product/infrastructure/http/product.router");
const client_router_2 = require("@modules/core/client/infrastructure/http/client.router");
const item_router_1 = require("./modules/features/items/infrastructure/http/item.router");
const input_router_1 = require("@modules/core/input/infrastructure/http/input.router");
const error_middleware_1 = __importDefault(require("@middlewares/error/error.middleware"));
const index_1 = require("@shared/database/index");
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const node_path_1 = __importDefault(require("node:path"));
const purchased_order_product_query_router_1 = require("./modules/query/purchased-order-product/infrastructure/purchased-order-product-query.router");
const createApp = async () => {
    const app = (0, express_1.default)();
    app.use((0, cookie_parser_1.default)());
    app.use(express_1.default.json({ limit: "10mb" }));
    app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" }));
    app.use("/uploads", express_1.default.static(node_path_1.default.resolve(__dirname, process.env.FILES_PATH)));
    app.use((0, compression_1.default)({ threshold: 1024 }));
    await (0, index_1.initializeDatabase)();
    // ******* CORE ******* 
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
    // ******* PURCHASED ORDER ******* 
    app.use("/purchased-order", (0, purchased_order_router_1.PurchasedOrderRouter)());
    app.use("/purchased-order-product", (0, purchased_order_product_router_1.PurchasedOrderProductRouter)());
    app.use("/applied-product-discount-client", (0, applied_product_discount_client_router_1.AppliedProductDiscountClientRouter)());
    app.use("/applied-product-discount-range", (0, applied_product_discount_range_router_1.AppliedProductDiscountRangeRouter)());
    // ******* PRODUCT ******* 
    app.use("/item", (0, item_router_1.ItemRouter)());
    app.use("/product", (0, product_router_1.ProductRouter)());
    app.use("/product-process", (0, product_process_router_1.ProductProcessRouter)());
    app.use("/product-input", (0, product_input_router_1.ProductInputRouter)());
    app.use("/product-discount-range", (0, product_discount_range_router_1.ProductDiscountRangeRouter)());
    app.use("/product-input-process", (0, product_input_process_router_1.ProductInputProcessRouter)());
    // ******* PRODUCTION LINE *******
    app.use("/production-line-product", (0, production_line_product_router_1.ProductionLineProductRouter)());
    app.use("/production-line", (0, production_line_router_1.productionLineRouter)());
    // ******* INVENTORY *******
    app.use("/inventory", (0, inventory_router_1.InventoryRouter)());
    app.use("/inventory-movement", (0, inventory_movement_router_1.InventoryMovementRouter)());
    app.use("/inventory-location-item", (0, inventory_location_item_router_1.InventoryLocationItemRouter)());
    app.use("/inventory-transfer", (0, inventory_transfer_router_1.InventoryTransferRouter)());
    // ******* ORCHESTRATOR ********
    app.use("/production-line/orchestrator", (0, production_line_router_1.productionLineRouter)());
    app.use("/inventory/orchestrator", (0, inventory_orchestrator_router_1.InventoryOrchestratorRouter)());
    app.use("/client/orchestrator", (0, client_orchestrator_router_1.ClientOrchestratorRouter)());
    app.use("/product/orchestrator", (0, product_orchestrator_router_1.ProductOrchestratorRouter)());
    app.use("/location/orchestrator", (0, location_orchestrator_router_1.locationOrchestratorRouter)());
    // ******* QUERIES ******* 
    app.use("/query", (0, product_query_router_1.ProductQueryRouter)());
    app.use("/query", (0, item_query_router_1.ItemQueryRouter)());
    app.use("/query", (0, client_query_router_1.ClientQueryRouter)());
    app.use("/query", (0, producction_line_query_router_1.ProductionLineQueryRouter)());
    app.use("/query", (0, location_query_router_1.LocationQueryRouter)());
    app.use("/query", (0, inventory_query_router_1.InventoryQueryRouter)());
    app.use("/query", (0, purchased_order_product_query_router_1.PurchasedOrderProductQueryRouter)());
    // ******* ERROR ******* 
    app.use(error_middleware_1.default);
    return app;
};
exports.default = createApp;
