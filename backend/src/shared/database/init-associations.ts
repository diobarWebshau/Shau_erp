
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
import { ProductionLineProductModel } from "@modules/features/production-line/assigments/production-line-product/infrastructure/orm/production-line-product.orm";

// ? PRODUCTS

import { InputTypeModel } from "@modules/core/input-type/infrastructure/orm/input-type.orm";
import { InputModel } from "@modules/core/input/infrastructure/orm/input.orm";

import { ProductDiscountRangeModel } from "@src/modules/features/products/assigments/product-discounts-ranges/infrastructure/orm/product-discount-range.orm";
import { ProductInputProcessModel } from "@modules/features/products/assigments/product-input-process/infrastructure/orm/product-input-process.orm";
import { ProductProcessModel } from "@src/modules/features/products/assigments/product-process/infrastructure/orm/product-process.orm";
import { ProductInputModel } from "@src/modules/features/products/assigments/product-input/infrastructure/orm/product-inputs.orm";
import { ProcessModel } from "@modules/core/process/infrastructure/orm/process.orm";
import { ProductModel } from "@modules/core/product/infrastructure/orm/product.orm";


// ? PURCHASED ORDER
import { PurchasedOrderProductModel } from "./../../modules/features/purchased-order/assigments/purchased-order-product/infrastructure/orm/purchased-order-product.orm";
import { AppliedProductDiscountClientModel } from "./../../modules/features/purchased-order/assigments/purchased-order-product/assigments/applied-product-discount-client/infrastructure/orm/applied-product-discount-client.orm";
import { AppliedProductDiscountRangeModel } from "./../../modules/features/purchased-order/assigments/purchased-order-product/assigments/applied-product-discount-range/infrastructure/orm/applied-product-discount-range.orm";
import { PurchasedOrderModel } from "./../../modules/features/purchased-order/infrastructure/orm/purchased-order.orm";



/*
    En Sequelize (y en cualquier ORM con asociaciones), la regla de oro es:

    El modelo que contiene la clave foránea (foreignKey) usa belongsTo.

    El modelo referenciado (la tabla “padre”) usa hasOne o hasMany dependiendo de la cardinalidad.

*/


export function initAssociations() {

    // --------------------------------------------------
    // 🔹 PRODUCT MODULE                                |
    // --------------------------------------------------

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
        as: "product_inputs",
    });
    InputModel.hasMany(ProductInputModel, {
        foreignKey: "input_id",
        as: "product_inputs",
    });
    ProductInputModel.belongsTo(ProductModel, {
        foreignKey: "product_id",
        as: "product",
        onDelete: "CASCADE"
    });
    ProductInputModel.belongsTo(InputModel, {
        foreignKey: "input_id",
        as: "input",
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

    // ? ******* Product-Input-Process *******

    // Un registro de products_inputs_processes pertenece a un product_input
    ProductInputProcessModel.belongsTo(ProductInputModel, {
        foreignKey: "product_input_id",
        as: "product_input",
        onDelete: "CASCADE"
    });

    // Un registro de products_inputs_processes pertenece a un product_process
    ProductInputProcessModel.belongsTo(ProductProcessModel, {
        foreignKey: "product_process_id",
        as: "product_process",
        onDelete: "CASCADE"
    });

    // Y cada ProductInputProcess pertenece a un Product
    ProductInputProcessModel.belongsTo(ProductModel, {
        foreignKey: "product_id",
        as: "product",
        onDelete: "CASCADE"
    });


    // Un product_input puede estar en muchas relaciones products_inputs_processes
    ProductInputModel.hasMany(ProductInputProcessModel, {
        foreignKey: "product_input_id",
        as: "product_input_process",
        onDelete: "CASCADE"
    });

    // Un product_process puede estar en muchas relaciones products_inputs_processes
    ProductProcessModel.hasMany(ProductInputProcessModel, {
        foreignKey: "product_process_id",
        as: "product_input_process",
        onDelete: "CASCADE"
    });

    // Un Product tiene muchos ProductInputProcess
    ProductModel.hasMany(ProductInputProcessModel, {
        foreignKey: "product_id",
        as: "product_input_processes",
        onDelete: "CASCADE"
    });

    // --------------------------------------------------
    // 🔹 PRODUCTION LINE MODULE                        |
    // --------------------------------------------------

    ProductionLineModel.hasMany(
        ProductionLineProductModel, {
        foreignKey: "production_line_id",
        as: "production_line_products"
    })

    ProductModel.hasMany(
        ProductionLineProductModel, {
        foreignKey: "product_id",
        as: "production_line_products"
    });

    ProductionLineProductModel.belongsTo(
        ProductionLineModel, {
        foreignKey: "production_line_id",
        as: "production_line"
    });

    ProductionLineProductModel.belongsTo(
        ProductModel, {
        foreignKey: "product_id",
        as: "product"
    });

    // --------------------------------------------------
    // 🔹 LOCATION MODULE                               |
    // --------------------------------------------------

    LocationModel.hasMany(LocationLocationTypeModel, {
        foreignKey: "location_id",
        as: "location_location_types"
    })

    LocationTypeModel.hasMany(LocationLocationTypeModel, {
        foreignKey: "location_type_id",
        as: "location_location_types"
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
        as: "location_production_lines"
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
        as: "location_production_lines",
    });

    LocationProductionLineModel.belongsTo(
        LocationModel, {
        foreignKey: "location_id",
        as: "location",
        onDelete: "CASCADE"
    });

    // --------------------------------------------------
    // 🔹 CLIENT  MODULE                                |
    // --------------------------------------------------

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
        as: "discounts",
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


    // --------------------------------------------------
    // 🔹 Purchased Order MODULE                        |
    // --------------------------------------------------


    /* PurchasedOrderModel- ClientModel
* Un cliente puede tener muchas ordenes de compra
* Una orden de compra pertenece a un cliente
*/

    ClientModel.hasMany(
        PurchasedOrderModel, {
        foreignKey: "client_id",
        as: "purchase_orders",
    });

    PurchasedOrderModel.belongsTo(
        ClientModel, {
        foreignKey: "client_id",
        onDelete: "SET NULL",
        as: "client"
    });

    /* PurchasedOrderModel-ClientAddresses
    * Una PurchasedOrderModel solamente puede tener una clientAddresses
    * Un clientAddresses puede tener muchas PurchasedOrderModel
    */

    ClientAddressModel.hasMany(
        PurchasedOrderModel, {
        foreignKey: "client_address_id",
        as: "purchased_order"
    });

    PurchasedOrderModel.belongsTo(
        ClientAddressModel, {
        foreignKey: "client_address_id",
        onDelete: "SET NULL",
        as: "client_address"
    });


    /* PurchasedOrder-Product (PurchaseOrderProduct)
    * Una purchasedOrder puede tener muchos purchasedOrderProduct, pero
    una purchasedOrderProduct solo puede tener una purchaseOrder
    * Un product puede tener muchos purchasedOrderProducts, pero una
    purchasedOrderProduct solo puede tener un product
    */
    ProductModel.hasMany(
        PurchasedOrderProductModel, {
        foreignKey: "product_id",
        as: "purchase_order_products",
        onDelete: "SET NULL"
    });

    PurchasedOrderProductModel.belongsTo(
        ProductModel, {
        foreignKey: "product_id",
        as: "product"
    });

    PurchasedOrderModel.hasMany(
        PurchasedOrderProductModel, {
        foreignKey: "purchase_order_id",
        as: "purchase_order_products",
        onDelete: "CASCADE"
    })

    PurchasedOrderProductModel.belongsTo(
        PurchasedOrderModel, {
        foreignKey: "purchase_order_id",
        as: "purchase_order"
    })


    /* PurchasedOrderProduct-ProductDiscountClient (AppliedProductDiscountClient)
    * Un PurchasedOrderProduct puede tener solo un AppliedProductDiscountClient,
    pero AppliedProducDiscountClient puede aplicarse a muchos
    PurchasedOrderProduct
    * Un ProductDiscountClient puede tener muchos AppliedProductDiscountClient,
    pero AppliedProducDiscountClient pero solo puede tener un
    ProductDiscountsClient 
    */

    PurchasedOrderProductModel.hasOne(
        AppliedProductDiscountClientModel, {
        foreignKey: "purchase_order_product_id",
        as: "applied_product_discount_client",
    });

    ProductDiscountClientModel.hasMany(
        AppliedProductDiscountClientModel, {
        foreignKey: "product_discount_client_id",
        as: "applied_product_discount_client",
    });

    AppliedProductDiscountClientModel.belongsTo(
        PurchasedOrderProductModel, {
        foreignKey: "purchase_order_product_id",
        as: "purchased_order_product",
        onDelete: "CASCADE"
    });

    AppliedProductDiscountClientModel.belongsTo(
        ProductDiscountClientModel, {
        foreignKey: "product_discount_client_id",
        as: "product_discount_client",
        onDelete: "SET NULL"
    });


    /* ProductDiscountRanges-PurchaseOrderProducts (AppliedProductDiscountRanges)
    * Un PurchaseOrderProduct tiene un solo AppliedProductDiscountsRanges, y 
    AppliedProductDiscountRanges solo puede tener un purchase order porduct
    * Un productDiscountRange puede tener muchos AppliedProductDiscountRange,
    pero un AppliedProductDiscountRange solo puede tener un productDiscountRange
    */

    PurchasedOrderProductModel.hasOne(
        AppliedProductDiscountRangeModel, {
        foreignKey: "purchase_order_product_id",
        as: "applied_product_discount_range",
        onDelete: "SET NULL"
    });

    AppliedProductDiscountRangeModel.belongsTo(
        PurchasedOrderProductModel, {
        foreignKey: "purchase_order_product_id",
        as: "purchase_order_product"
    });

    ProductDiscountRangeModel.hasMany(
        AppliedProductDiscountRangeModel, {
        foreignKey: "product_discount_range_id",
        as: "applied_product_discount_range",
        onDelete: "SET NULL"
    });

    AppliedProductDiscountRangeModel.belongsTo(
        ProductDiscountRangeModel, {
        foreignKey: "product_discount_range_id",
        as: "product_discount_range"
    })

};