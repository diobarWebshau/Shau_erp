import { locationProductionLineRouter } from "@modules/features/location/assigments/location-production-line/infrastructure/http/location-production-line.router";
import { locationLocationTypeRouter } from "@modules/features/location/assigments/location-location-type/infrastructure/http/location-location-type.router";
import { ProductDiscountRangeRouter } from "@modules/features/products/assigments/product-discounts-ranges/infrastructure/http/product-discount-range.router";
import { ProductDiscountClientRouter } from "@modules/features/client/assigments/product-discount-client/infrastructure/http/product-discount-client.router";
import { ProductProcessRouter } from "@modules/features/products/assigments/product-process/infrastructure/http/product-process.router";
import { ProductInputRouter } from "@modules/features/products/assigments/product-input/infrastructure/http/product-input.router";
import { ClientAddressRouter } from "@modules/features/client/assigments/client-addresses/infrastructure/http/client.router";
import { productionLineRouter } from "@modules/core/production-line/infrastructure/http/production-line.router";
import { LocationTypeRouter } from "@modules/core/location-type/infrastructure/http/location-type.router";
import { InputTypeRouter } from "@modules/core/input-type/infrastructure/http/input-type.router";
import { locationRouter } from "@modules/core/location/infrastructure/http/location.router";
import { ProcessRouter } from "@modules/core/process/infrastructure/http/process.router";
import { ProductRouter } from "@modules/core/product/infrastructure/http/product.router";
import { ClientRouter } from "@modules/core/client/infrastructure/http/client.router";
import { InputRouter } from "@modules/core/input/infrastructure/http/input.router";
import errorMiddleware from "@middlewares/error/error.middleware";
import express, { Express } from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import path from "node:path";

const createApp = (): Express => {

    const app: Express = express();

    app.use(cookieParser());
    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ extended: true, limit: "10mb" }));
    app.use("/uploads", express.static(path.resolve(__dirname, process.env.FILES_PATH)));
    app.use(compression({ threshold: 1024 }));

    // ******* CORE ******* 
    app.use("/production-line", productionLineRouter());
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

    // ******* PRODUCT ******* 
    app.use("/product", ProductRouter());
    app.use("/product-process", ProductProcessRouter());
    app.use("/product-input", ProductInputRouter());
    app.use("/product-discount-range", ProductDiscountRangeRouter());

    // ******* ERROR ******* 
    app.use(errorMiddleware);
    return app;
};

export default createApp;
