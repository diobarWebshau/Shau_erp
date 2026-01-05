"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchasedOrderProductQueryRepository = void 0;
const applied_product_discount_client_orm_1 = require("@src/modules/features/purchased-order/assigments/purchased-order-product/assigments/applied-product-discount-client/infrastructure/orm/applied-product-discount-client.orm");
const applied_product_discount_range_orm_1 = require("@src/modules/features/purchased-order/assigments/purchased-order-product/assigments/applied-product-discount-range/infrastructure/orm/applied-product-discount-range.orm");
const purchased_order_product_orm_1 = require("@src/modules/features/purchased-order/assigments/purchased-order-product/infrastructure/orm/purchased-order-product.orm");
const product_discount_range_orm_1 = require("@src/modules/features/products/assigments/product-discounts-ranges/infrastructure/orm/product-discount-range.orm");
const product_discount_client_orm_1 = require("@src/modules/features/client/assigments/product-discount-client/infrastructure/orm/product-discount-client.orm");
const product_orm_1 = require("@src/modules/core/product/infrastructure/orm/product.orm");
const map = (pop) => {
    const json = pop.toJSON();
    return {
        ...json,
        applied_product_discount_client: json.applied_product_discount_client ?? null,
        applied_product_discount_range: json.applied_product_discount_range ?? null,
    };
};
class PurchasedOrderProductQueryRepository {
    getAll = async (tx) => {
        const purchasedOrderProductQueryResponse = await purchased_order_product_orm_1.PurchasedOrderProductModel.findAll({
            transaction: tx,
            include: [
                {
                    model: product_orm_1.ProductModel,
                    as: "product",
                    required: true
                },
                {
                    model: applied_product_discount_client_orm_1.AppliedProductDiscountClientModel,
                    as: "applied_product_discount_client",
                    include: [
                        {
                            model: product_discount_client_orm_1.ProductDiscountClientModel,
                            as: "product_discount_client"
                        }
                    ]
                },
                {
                    model: applied_product_discount_range_orm_1.AppliedProductDiscountRangeModel,
                    as: "applied_product_discount_range",
                    include: [
                        {
                            model: product_discount_range_orm_1.ProductDiscountRangeModel,
                            as: "product_discount_range"
                        }
                    ]
                }
            ]
        });
        const PurchasedOrderProductQueryResponseFormatted = purchasedOrderProductQueryResponse.map(map);
        return PurchasedOrderProductQueryResponseFormatted;
    };
    getById = async (id, tx) => {
        const purchasedOrderProductQueryResponse = await purchased_order_product_orm_1.PurchasedOrderProductModel.findOne({
            where: { id: id },
            transaction: tx,
            include: [
                {
                    model: product_orm_1.ProductModel,
                    as: "product",
                    required: true
                },
                {
                    model: applied_product_discount_client_orm_1.AppliedProductDiscountClientModel,
                    as: "applied_product_discount_client",
                    include: [
                        {
                            model: product_discount_client_orm_1.ProductDiscountClientModel,
                            as: "product_discount_client"
                        }
                    ]
                },
                {
                    model: applied_product_discount_range_orm_1.AppliedProductDiscountRangeModel,
                    as: "applied_product_discount_range",
                    include: [
                        {
                            model: product_discount_range_orm_1.ProductDiscountRangeModel,
                            as: "product_discount_range"
                        }
                    ]
                }
            ]
        });
        if (!purchasedOrderProductQueryResponse)
            return null;
        const PurchasedOrderProductQueryResponseFormatted = map(purchasedOrderProductQueryResponse);
        return PurchasedOrderProductQueryResponseFormatted;
    };
    getByPurchasedOrderId = async (purchase_order_id, tx) => {
        const purchasedOrderProductQueryResponse = await purchased_order_product_orm_1.PurchasedOrderProductModel.findAll({
            where: { purchase_order_id: purchase_order_id },
            transaction: tx,
            include: [
                {
                    model: product_orm_1.ProductModel,
                    as: "product",
                    required: true
                },
                {
                    model: applied_product_discount_client_orm_1.AppliedProductDiscountClientModel,
                    as: "applied_product_discount_client",
                    include: [
                        {
                            model: product_discount_client_orm_1.ProductDiscountClientModel,
                            as: "product_discount_client"
                        }
                    ]
                },
                {
                    model: applied_product_discount_range_orm_1.AppliedProductDiscountRangeModel,
                    as: "applied_product_discount_range",
                    include: [
                        {
                            model: product_discount_range_orm_1.ProductDiscountRangeModel,
                            as: "product_discount_range"
                        }
                    ]
                }
            ]
        });
        const PurchasedOrderProductQueryResponseFormatted = purchasedOrderProductQueryResponse.map(map);
        return PurchasedOrderProductQueryResponseFormatted;
    };
}
exports.PurchasedOrderProductQueryRepository = PurchasedOrderProductQueryRepository;
