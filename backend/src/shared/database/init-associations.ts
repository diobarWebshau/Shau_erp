
// ? CLIENT

import { ClientAddressModel } from "@modules/features/client/assigments/client-addresses/infrastructure/orm/client-address.orm";
import { ClientModel } from "@modules/core/client/infrastructure/orm/clients.orm";
import { ProductDiscountClientModel } from "@modules/features/client/assigments/product-discount-client/infrastructure/orm/product-discount-client.orm";

// ? LOCATION

import { LocationModel } from "@modules/core/location/infrastructure/orm/location.orm";
import { LocationTypeModel } from "@modules/core/location-type/infrastructure/orm/location-type.orm";
import { LocationLocationTypeModel } from "@modules/features/location/assigments/location-location-type/infrastructure/orm/location-location-type.orm";
import { LocationProductionLineModel } from "@modules/features/location/assigments/location-production-line/infrastructure/orm/location-production-line.orm";

// ? PRODUCTION LINE

import { ProductionLineModel } from "@modules/core/production-line/infrastructure/orm/production-lines.orm";

// ? PRODUCTS

import { InputTypeModel } from "@modules/core/input-type/infrastructure/orm/input-type.orm";
import { InputModel } from "@modules/core/input/infrastructure/orm/input.orm";

import { ProductDiscountRangeModel } from "@src/modules/features/products/assigments/product-discounts-ranges/infrastructure/orm/product-discount-range.orm";
import { ProductProcessModel } from "@src/modules/features/products/assigments/product-process/infrastructure/orm/product-process.orm";
import { ProductInputModel } from "@src/modules/features/products/assigments/product-input/infrastructure/orm/product-inputs.orm";
import { ProcessModel } from "@modules/core/process/infrastructure/orm/process.orm";
import { ProductModel } from "@modules/core/product/infrastructure/orm/product.orm";

export function initAssociations() {

    // ******* PRODUCTS MODULE *******

    // product-product-discount-ranges
    ProductModel.hasMany(ProductDiscountRangeModel, {
        foreignKey: "product_id",
        as: "product_discount_ranges",
        onDelete: "CASCADE"
    });
    ProductDiscountRangeModel.belongsTo(ProductModel, {
        foreignKey: "product_id",
        as: "product"
    });

    // product-process
    ProductModel.hasMany(ProductProcessModel, {
        foreignKey: "product_id",
        as: "product_processes"
    });
    ProcessModel.hasMany(ProductProcessModel, {
        foreignKey: "process_id",
        as: "process_product"
    });
    ProductProcessModel.belongsTo(ProductModel, {
        foreignKey: "product_id",
        as: "product",
        onDelete: "CASCADE"
    });
    ProductProcessModel.belongsTo(ProcessModel, {
        foreignKey: "process_id",
        as: "process",
        onDelete: "CASCADE"
    });

    // product-input
    ProductModel.hasMany(ProductInputModel, {
        foreignKey: "product_id",
        as: "products_inputs",
    });
    InputModel.hasMany(ProductInputModel, {
        foreignKey: "input_id",
        as: "products_inputs",
    });
    ProductInputModel.belongsTo(ProductModel, {
        foreignKey: "product_id",
        as: "products",
        onDelete: "CASCADE"
    });
    ProductInputModel.belongsTo(InputModel, {
        foreignKey: "input_id",
        as: "inputs",
        onDelete: "CASCADE"
    });

    // input-input-type
    InputTypeModel.hasMany(InputModel, {
        foreignKey: "input_types_id",
        as: "inputs"
    });
    InputModel.belongsTo(InputTypeModel, {
        foreignKey: "input_types_id",
        as: "input_types",
        onDelete: "SET NULL"
    });

    // ******* LOCATION MODULE *******
    LocationModel.hasMany(LocationLocationTypeModel, {
        foreignKey: "location_id",
        as: "location_location_type"
    })

    LocationTypeModel.hasMany(LocationLocationTypeModel, {
        foreignKey: "location_type_id",
        as: "location_location_type"
    });

    LocationLocationTypeModel.belongsTo(LocationModel, {
        foreignKey: "location_id",
        as: "location",
        onDelete: "CASCADE"
    });

    LocationLocationTypeModel.belongsTo(LocationTypeModel, {
        foreignKey: "location_type_id",
        as: "location_type",
        onDelete: "CASCADE"
    });

    ProductionLineModel.hasOne(
        LocationProductionLineModel, {
        foreignKey: "production_line_id",
        as: "location_production_line"
    });

    LocationProductionLineModel.belongsTo(
        ProductionLineModel, {
        foreignKey: "production_line_id",
        as: "production_line",
        onDelete: "CASCADE"
    });

    LocationModel.hasMany(
        LocationProductionLineModel, {
        foreignKey: "location_id",
        as: "location_production_line",
    });

    LocationProductionLineModel.belongsTo(
        LocationModel, {
        foreignKey: "location_id",
        as: "location",
        onDelete: "CASCADE"
    });



    // ******* CLIENT MODULE *******

    ClientModel.hasMany(
        ClientAddressModel, {
        foreignKey: "client_id",
        as: "addresses",
    });

    ClientAddressModel.belongsTo(
        ClientModel, {
        foreignKey: "client_id",
        onDelete: "CASCADE",
        as: "client"
    });

    ClientModel.hasMany(
        ProductDiscountClientModel, {
        foreignKey: "client_id",
        as: "product_discounts_client",
    });

    ProductDiscountClientModel.belongsTo(
        ClientModel, {
        foreignKey: "client_id",
        as: "client",
        onDelete: "CASCADE"
    });


    // ? ******* ProductDiscountClient *******

    ProductModel.hasMany(
        ProductDiscountClientModel, {
        foreignKey: "product_id",
        as: "product_discounts_clients",
    });

    ProductDiscountClientModel.belongsTo(
        ProductModel, {
        foreignKey: "product_id",
        onDelete: "CASCADE",
        as: "product"
    });
};