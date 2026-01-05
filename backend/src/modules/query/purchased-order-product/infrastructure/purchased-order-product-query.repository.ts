import { AppliedProductDiscountClientModel } from "@src/modules/features/purchased-order/assigments/purchased-order-product/assigments/applied-product-discount-client/infrastructure/orm/applied-product-discount-client.orm";
import { AppliedProductDiscountRangeModel } from "@src/modules/features/purchased-order/assigments/purchased-order-product/assigments/applied-product-discount-range/infrastructure/orm/applied-product-discount-range.orm";
import { PurchasedOrderProductModel } from "@src/modules/features/purchased-order/assigments/purchased-order-product/infrastructure/orm/purchased-order-product.orm";
import { ProductDiscountRangeModel } from "@src/modules/features/products/assigments/product-discounts-ranges/infrastructure/orm/product-discount-range.orm";
import { ProductDiscountClientModel } from "@src/modules/features/client/assigments/product-discount-client/infrastructure/orm/product-discount-client.orm";
import { IPurchasedOrderProductQueryRespository } from "../domain/purchased-order-product-query.repository";
import { PurchasedOrderProductQueryProps } from "../domain/purchased-order-product-query.type";
import { ProductModel } from "@src/modules/core/product/infrastructure/orm/product.orm";
import { Transaction } from "sequelize";


const map = (pop: PurchasedOrderProductModel): PurchasedOrderProductQueryProps => {
    const json: PurchasedOrderProductQueryProps = pop.toJSON();
    return {
        ...json,
        applied_product_discount_client: json.applied_product_discount_client ?? null,
        applied_product_discount_range: json.applied_product_discount_range ?? null,
    };
};

export class PurchasedOrderProductQueryRepository implements IPurchasedOrderProductQueryRespository {
    getAll = async (tx?: Transaction): Promise<PurchasedOrderProductQueryProps[]> => {
        const purchasedOrderProductQueryResponse = await PurchasedOrderProductModel.findAll({
            transaction: tx,
            include: [
                {
                    model: ProductModel,
                    as: "product",
                    required: true
                },
                {
                    model: AppliedProductDiscountClientModel,
                    as: "applied_product_discount_client",
                    include: [
                        {
                            model: ProductDiscountClientModel,
                            as: "product_discount_client"
                        }
                    ]
                },
                {
                    model: AppliedProductDiscountRangeModel,
                    as: "applied_product_discount_range",
                    include: [
                        {
                            model: ProductDiscountRangeModel,
                            as: "product_discount_range"
                        }
                    ]
                }
            ]
        })
        const PurchasedOrderProductQueryResponseFormatted: PurchasedOrderProductQueryProps[] = purchasedOrderProductQueryResponse.map(map);
        return PurchasedOrderProductQueryResponseFormatted;
    }
    getById = async (id: number, tx?: Transaction): Promise<PurchasedOrderProductQueryProps | null> => {
        const purchasedOrderProductQueryResponse: PurchasedOrderProductModel | null = await PurchasedOrderProductModel.findOne({
            where: { id: id },
            transaction: tx,
            include: [
                {
                    model: ProductModel,
                    as: "product",
                    required: true
                },
                {
                    model: AppliedProductDiscountClientModel,
                    as: "applied_product_discount_client",
                    include: [
                        {
                            model: ProductDiscountClientModel,
                            as: "product_discount_client"
                        }
                    ]
                },
                {
                    model: AppliedProductDiscountRangeModel,
                    as: "applied_product_discount_range",
                    include: [
                        {
                            model: ProductDiscountRangeModel,
                            as: "product_discount_range"
                        }
                    ]
                }
            ]
        })
        if (!purchasedOrderProductQueryResponse) return null;
        const PurchasedOrderProductQueryResponseFormatted: PurchasedOrderProductQueryProps = map(purchasedOrderProductQueryResponse);
        return PurchasedOrderProductQueryResponseFormatted;

    }
    getByPurchasedOrderId = async (purchase_order_id: number, tx?: Transaction): Promise<PurchasedOrderProductQueryProps[]> => {
        const purchasedOrderProductQueryResponse: PurchasedOrderProductModel[] = await PurchasedOrderProductModel.findAll({
            where: { purchase_order_id: purchase_order_id },
            transaction: tx,
            include: [
                {
                    model: ProductModel,
                    as: "product",
                    required: true
                },
                {
                    model: AppliedProductDiscountClientModel,
                    as: "applied_product_discount_client",
                    include: [
                        {
                            model: ProductDiscountClientModel,
                            as: "product_discount_client"
                        }
                    ]
                },
                {
                    model: AppliedProductDiscountRangeModel,
                    as: "applied_product_discount_range",
                    include: [
                        {
                            model: ProductDiscountRangeModel,
                            as: "product_discount_range"
                        }
                    ]
                }
            ]
        })
        const PurchasedOrderProductQueryResponseFormatted: PurchasedOrderProductQueryProps[] = purchasedOrderProductQueryResponse.map(map);
        return PurchasedOrderProductQueryResponseFormatted;
    }
}