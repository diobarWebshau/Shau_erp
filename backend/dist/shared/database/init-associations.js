"use strict";
// ? CLIENT
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAssociations = initAssociations;
const client_address_orm_1 = require("../../modules/features/client/assigments/client-addresses/infrastructure/orm/client-address.orm");
const clients_orm_1 = require("../../modules/core/client/infrastructure/orm/clients.orm");
const product_discount_client_orm_1 = require("../../modules/features/client/assigments/product-discount-client/infrastructure/orm/product-discount-client.orm");
// ? LOCATION
const location_orm_1 = require("../../modules/core/location/infrastructure/orm/location.orm");
const location_type_orm_1 = require("../../modules/core/location-type/infrastructure/orm/location-type.orm");
const location_location_type_orm_1 = require("../../modules/features/location/assigments/location-location-type/infrastructure/orm/location-location-type.orm");
const location_production_line_orm_1 = require("../../modules/features/location/assigments/location-production-line/infrastructure/orm/location-production-line.orm");
// ? PRODUCTION LINE
const production_lines_orm_1 = require("../../modules/core/production-line/infrastructure/orm/production-lines.orm");
// ? PRODUCTS
const input_type_orm_1 = require("../../modules/core/input-type/infrastructure/orm/input-type.orm");
const input_orm_1 = require("../../modules/core/input/infrastructure/orm/input.orm");
const product_discount_range_orm_1 = require("../../modules/features/products/assigments/product-discounts-ranges/infrastructure/orm/product-discount-range.orm");
const product_input_process_orm_1 = require("../../modules/features/products/assigments/product-input-process/infrastructure/orm/product-input-process.orm");
const product_process_orm_1 = require("../../modules/features/products/assigments/product-process/infrastructure/orm/product-process.orm");
const product_inputs_orm_1 = require("../../modules/features/products/assigments/product-input/infrastructure/orm/product-inputs.orm");
const process_orm_1 = require("../../modules/core/process/infrastructure/orm/process.orm");
const product_orm_1 = require("../../modules/core/product/infrastructure/orm/product.orm");
/*
    En Sequelize (y en cualquier ORM con asociaciones), la regla de oro es:

    El modelo que contiene la clave foránea (foreignKey) usa belongsTo.

    El modelo referenciado (la tabla “padre”) usa hasOne o hasMany dependiendo de la cardinalidad.

*/
function initAssociations() {
    // ******* PRODUCTS MODULE *******
    // product-product-discount-ranges
    product_orm_1.ProductModel.hasMany(product_discount_range_orm_1.ProductDiscountRangeModel, {
        foreignKey: "product_id",
        as: "product_discount_ranges",
        onDelete: "CASCADE"
    });
    product_discount_range_orm_1.ProductDiscountRangeModel.belongsTo(product_orm_1.ProductModel, {
        foreignKey: "product_id",
        as: "product"
    });
    // product-process
    product_orm_1.ProductModel.hasMany(product_process_orm_1.ProductProcessModel, {
        foreignKey: "product_id",
        as: "product_processes"
    });
    process_orm_1.ProcessModel.hasMany(product_process_orm_1.ProductProcessModel, {
        foreignKey: "process_id",
        as: "process_product"
    });
    product_process_orm_1.ProductProcessModel.belongsTo(product_orm_1.ProductModel, {
        foreignKey: "product_id",
        as: "product",
        onDelete: "CASCADE"
    });
    product_process_orm_1.ProductProcessModel.belongsTo(process_orm_1.ProcessModel, {
        foreignKey: "process_id",
        as: "process",
        onDelete: "CASCADE"
    });
    // product-input
    product_orm_1.ProductModel.hasMany(product_inputs_orm_1.ProductInputModel, {
        foreignKey: "product_id",
        as: "products_inputs",
    });
    input_orm_1.InputModel.hasMany(product_inputs_orm_1.ProductInputModel, {
        foreignKey: "input_id",
        as: "products_inputs",
    });
    product_inputs_orm_1.ProductInputModel.belongsTo(product_orm_1.ProductModel, {
        foreignKey: "product_id",
        as: "products",
        onDelete: "CASCADE"
    });
    product_inputs_orm_1.ProductInputModel.belongsTo(input_orm_1.InputModel, {
        foreignKey: "input_id",
        as: "inputs",
        onDelete: "CASCADE"
    });
    // input-input-type
    input_type_orm_1.InputTypeModel.hasMany(input_orm_1.InputModel, {
        foreignKey: "input_types_id",
        as: "inputs"
    });
    input_orm_1.InputModel.belongsTo(input_type_orm_1.InputTypeModel, {
        foreignKey: "input_types_id",
        as: "input_types",
        onDelete: "SET NULL"
    });
    // ******* LOCATION MODULE *******
    location_orm_1.LocationModel.hasMany(location_location_type_orm_1.LocationLocationTypeModel, {
        foreignKey: "location_id",
        as: "location_location_type"
    });
    location_type_orm_1.LocationTypeModel.hasMany(location_location_type_orm_1.LocationLocationTypeModel, {
        foreignKey: "location_type_id",
        as: "location_location_type"
    });
    location_location_type_orm_1.LocationLocationTypeModel.belongsTo(location_orm_1.LocationModel, {
        foreignKey: "location_id",
        as: "location",
        onDelete: "CASCADE"
    });
    location_location_type_orm_1.LocationLocationTypeModel.belongsTo(location_type_orm_1.LocationTypeModel, {
        foreignKey: "location_type_id",
        as: "location_type",
        onDelete: "CASCADE"
    });
    production_lines_orm_1.ProductionLineModel.hasOne(location_production_line_orm_1.LocationProductionLineModel, {
        foreignKey: "production_line_id",
        as: "location_production_line"
    });
    location_production_line_orm_1.LocationProductionLineModel.belongsTo(production_lines_orm_1.ProductionLineModel, {
        foreignKey: "production_line_id",
        as: "production_line",
        onDelete: "CASCADE"
    });
    location_orm_1.LocationModel.hasMany(location_production_line_orm_1.LocationProductionLineModel, {
        foreignKey: "location_id",
        as: "location_production_line",
    });
    location_production_line_orm_1.LocationProductionLineModel.belongsTo(location_orm_1.LocationModel, {
        foreignKey: "location_id",
        as: "location",
        onDelete: "CASCADE"
    });
    // ******* CLIENT MODULE *******
    clients_orm_1.ClientModel.hasMany(client_address_orm_1.ClientAddressModel, {
        foreignKey: "client_id",
        as: "addresses",
    });
    client_address_orm_1.ClientAddressModel.belongsTo(clients_orm_1.ClientModel, {
        foreignKey: "client_id",
        onDelete: "CASCADE",
        as: "client"
    });
    clients_orm_1.ClientModel.hasMany(product_discount_client_orm_1.ProductDiscountClientModel, {
        foreignKey: "client_id",
        as: "product_discounts_client",
    });
    product_discount_client_orm_1.ProductDiscountClientModel.belongsTo(clients_orm_1.ClientModel, {
        foreignKey: "client_id",
        as: "client",
        onDelete: "CASCADE"
    });
    // ? ******* ProductDiscountClient *******
    product_orm_1.ProductModel.hasMany(product_discount_client_orm_1.ProductDiscountClientModel, {
        foreignKey: "product_id",
        as: "product_discounts_clients",
    });
    product_discount_client_orm_1.ProductDiscountClientModel.belongsTo(product_orm_1.ProductModel, {
        foreignKey: "product_id",
        onDelete: "CASCADE",
        as: "product"
    });
    // ? ******* Product-Input-Process *******
    // Un registro de products_inputs_processes pertenece a un product_input
    product_input_process_orm_1.ProductInputProcessModel.belongsTo(product_inputs_orm_1.ProductInputModel, {
        foreignKey: "product_input_id",
        as: "product_input",
        onDelete: "CASCADE"
    });
    // Un registro de products_inputs_processes pertenece a un product_process
    product_input_process_orm_1.ProductInputProcessModel.belongsTo(product_process_orm_1.ProductProcessModel, {
        foreignKey: "product_process_id",
        as: "product_process",
        onDelete: "CASCADE"
    });
    // Y cada ProductInputProcess pertenece a un Product
    product_input_process_orm_1.ProductInputProcessModel.belongsTo(product_orm_1.ProductModel, {
        foreignKey: "product_id",
        as: "product",
        onDelete: "CASCADE"
    });
    // Un product_input puede estar en muchas relaciones products_inputs_processes
    product_inputs_orm_1.ProductInputModel.hasMany(product_input_process_orm_1.ProductInputProcessModel, {
        foreignKey: "product_input_id",
        as: "product_input_process",
        onDelete: "CASCADE"
    });
    // Un product_process puede estar en muchas relaciones products_inputs_processes
    product_process_orm_1.ProductProcessModel.hasMany(product_input_process_orm_1.ProductInputProcessModel, {
        foreignKey: "product_process_id",
        as: "product_input_process",
        onDelete: "CASCADE"
    });
    // Un Product tiene muchos ProductInputProcess
    product_orm_1.ProductModel.hasMany(product_input_process_orm_1.ProductInputProcessModel, {
        foreignKey: "product_id",
        as: "product_input_processes",
        onDelete: "CASCADE"
    });
}
;
