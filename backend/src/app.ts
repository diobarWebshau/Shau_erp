import { AppliedProductDiscountClientRouter } from "./modules/features/purchased-order/assigments/purchased-order-product/assigments/applied-product-discount-client/infrastructure/http/applied-product-discount-client.router";
import { AppliedProductDiscountRangeRouter } from "./modules/features/purchased-order/assigments/purchased-order-product/assigments/applied-product-discount-range/infrastructure/http/applied-product-discount-range.router";
import { ProductionLineProductRouter } from "./modules/features/production-line/assigments/production-line-product/infrastructure/http/production-line-product.router";
import { PurchasedOrderProductRouter } from "./modules/features/purchased-order/assigments/purchased-order-product/infrastructure/http/purchased-order-product.router";
import { locationProductionLineRouter } from "@modules/features/location/assigments/location-production-line/infrastructure/http/location-production-line.router";
import { ProductDiscountRangeRouter } from "@modules/features/products/assigments/product-discounts-ranges/infrastructure/http/product-discount-range.router";
import { ProductDiscountClientRouter } from "@modules/features/client/assigments/product-discount-client/infrastructure/http/product-discount-client.router";
import { locationLocationTypeRouter } from "@modules/features/location/assigments/location-location-type/infrastructure/http/location-location-type.router";
import { ProductInputProcessRouter } from "@modules/features/products/assigments/product-input-process/infrastructure/http/product-input-process.router";
import { InventoryLocationItemRouter } from "./modules/features/inventories/posicition/infrastructure/http/inventory-location-item.router";
import { ProductProcessRouter } from "./modules/features/products/assigments/product-process/infrastructure/http/product-process.router";
import { InventoryOrchestratorRouter } from "./modules/features/inventories/orchestrator/infrastructure/inventory-orchestrator.router";
import { locationOrchestratorRouter } from "./modules/features/location/orchestration/infrastructure/location-orchestrator.router";
import { ProductInputRouter } from "@modules/features/products/assigments/product-input/infrastructure/http/product-input.router";
import { ProductOrchestratorRouter } from "./modules/features/products/orchestrator/infrastructure/product-orchestrator.router";
import { InventoryTransferRouter } from "./modules/features/inventories/transfers/infrastructure/http/inventory-transfer.router";
import { InventoryMovementRouter } from "./modules/features/inventories/movement/infrastructure/http/inventory-movement.router";
import { ProductionLineQueryRouter } from "./modules/query/production-line/infrastructure/http/producction-line-query.router";
import { ClientAddressRouter } from "@modules/features/client/assigments/client-addresses/infrastructure/http/client.router";
import { ClientOrchestratorRouter } from "./modules/features/client/orchestration/infrastructure/client-orchestrator.router";
import { PurchasedOrderRouter } from "./modules/features/purchased-order/infrastructure/http/purchased-order.router";
import { productionLineRouter } from "@modules/core/production-line/infrastructure/http/production-line.router";
import { InventoryQueryRouter } from "./modules/query/inventory/infrastructure/http/inventory-query.router";
import { LocationTypeRouter } from "@modules/core/location-type/infrastructure/http/location-type.router";
import { LocationQueryRouter } from "./modules/query/location/infastructure/http/location-query.router";
import { ClientQueryRouter } from "@modules/query/client/infrastructure/http/client-query.router";
import { InputTypeRouter } from "@modules/core/input-type/infrastructure/http/input-type.router";
import { ProductQueryRouter } from "@modules/query/product/infrastructure/product-query.router";
import { InventoryRouter } from "./modules/core/inventory/infrastructure/http/inventory.router";
import { ItemQueryRouter } from "./modules/query/item/infrastructure/http/item-query.router";
import { locationRouter } from "@modules/core/location/infrastructure/http/location.router";
import { ProcessRouter } from "@modules/core/process/infrastructure/http/process.router";
import { ProductRouter } from "@modules/core/product/infrastructure/http/product.router";
import { ClientRouter } from "@modules/core/client/infrastructure/http/client.router";
import { ItemRouter } from "./modules/features/items/infrastructure/http/item.router";
import { InputRouter } from "@modules/core/input/infrastructure/http/input.router";
import errorMiddleware from "@middlewares/error/error.middleware";
import { initializeDatabase } from "@shared/database/index";
import express, { Express } from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import path from "node:path";
import { PurchasedOrderProductQueryRouter } from "./modules/query/purchased-order-product/infrastructure/purchased-order-product-query.router";

const createApp = async (): Promise<Express> => {

    const app: Express = express();

    app.use(cookieParser());
    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ extended: true, limit: "10mb" }));
    app.use("/uploads", express.static(path.resolve(__dirname, process.env.FILES_PATH)));
    app.use(compression({ threshold: 1024 }));

    await initializeDatabase();

    // ******* CORE ******* 
    app.use("/client-address", ClientAddressRouter());
    app.use("/location-type", LocationTypeRouter());
    app.use("/input-type", InputTypeRouter());
    app.use("/process", ProcessRouter());
    app.use("/client", ClientRouter());
    app.use("/input", InputRouter());

    // ******* CLIENTS ******* 
    app.use("/product-discount-client", ProductDiscountClientRouter());

    // ******* LOCATION ******* 
    app.use("/location", locationRouter());
    app.use("/location-production-line", locationProductionLineRouter());
    app.use("/location-location-type", locationLocationTypeRouter());

    // ******* PURCHASED ORDER ******* 
    app.use("/purchased-order", PurchasedOrderRouter());
    app.use("/purchased-order-product", PurchasedOrderProductRouter());
    app.use("/applied-product-discount-client", AppliedProductDiscountClientRouter());
    app.use("/applied-product-discount-range", AppliedProductDiscountRangeRouter());

    // ******* PRODUCT ******* 
    app.use("/item", ItemRouter());
    app.use("/product", ProductRouter());
    app.use("/product-process", ProductProcessRouter());
    app.use("/product-input", ProductInputRouter());
    app.use("/product-discount-range", ProductDiscountRangeRouter());
    app.use("/product-input-process", ProductInputProcessRouter());

    // ******* PRODUCTION LINE *******
    app.use("/production-line-product", ProductionLineProductRouter())
    app.use("/production-line", productionLineRouter());

    // ******* INVENTORY *******
    app.use("/inventory", InventoryRouter());
    app.use("/inventory-movement", InventoryMovementRouter());
    app.use("/inventory-location-item", InventoryLocationItemRouter());
    app.use("/inventory-transfer", InventoryTransferRouter());

    // ******* ORCHESTRATOR ********
    app.use("/production-line/orchestrator", productionLineRouter());
    app.use("/inventory/orchestrator", InventoryOrchestratorRouter());
    app.use("/client/orchestrator", ClientOrchestratorRouter());
    app.use("/product/orchestrator", ProductOrchestratorRouter());
    app.use("/location/orchestrator", locationOrchestratorRouter());

    // ******* QUERIES ******* 
    app.use("/query", ProductQueryRouter());
    app.use("/query", ItemQueryRouter());
    app.use("/query", ClientQueryRouter());
    app.use("/query", ProductionLineQueryRouter());
    app.use("/query", LocationQueryRouter());
    app.use("/query", InventoryQueryRouter());
    app.use("/query", PurchasedOrderProductQueryRouter());

    // ******* ERROR ******* 
    app.use(errorMiddleware);
    return app;
};

export default createApp;
