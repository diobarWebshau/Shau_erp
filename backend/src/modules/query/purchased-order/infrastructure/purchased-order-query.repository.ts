// import { AppliedProductDiscountClientModel } from "@modules/features/purchased-order/assigments/purchased-order-product/assigments/applied-product-discount-client/infrastructure/orm/applied-product-discount-client.orm";
// import { AppliedProductDiscountRangeModel } from "@modules/features/purchased-order/assigments/purchased-order-product/assigments/applied-product-discount-range/infrastructure/orm/applied-product-discount-range.orm";
// import { PurchasedOrderProductModel } from "@modules/features/purchased-order/assigments/purchased-order-product/infrastructure/orm/purchased-order-product.orm";
// import { ProductDiscountRangeModel } from "@modules/features/products/assigments/product-discounts-ranges/infrastructure/orm/product-discount-range.orm";
// import { ProductDiscountClientModel } from "@modules/features/client/assigments/product-discount-client/infrastructure/orm/product-discount-client.orm";
// import { PurchasedOrderFullQueryResult, PurchasedOrderSearchCriteria } from "../domain/purchased-order-query.types";
// import { PurchasedOrderAttributes, PurchasedOrderModel } from "@modules/features/purchased-order/infrastructure/orm/purchased-order.orm";
// import { IPurchasedOrderQueryRepository } from "../domain/purchased-order-query.repository.interface";
// import { Op, Transaction, WhereOptions } from "sequelize";
// import { PurchasedOrderProps } from "@src/modules/features/purchased-order/domain/purchased-order.types";

// export class PurchasedOrderQueryRepository implements IPurchasedOrderQueryRepository {


//     // ********** SEQUELIZE **********
//     getAllPurchasedOrderFullQueryResult = async (query: PurchasedOrderSearchCriteria, tx?: Transaction): Promise<PurchasedOrderFullQueryResult[]> => {
//         const { filter, exclude_ids, ...rest } = query;
//         const where: WhereOptions<PurchasedOrderModel> = {
//             ...(
//                 exclude_ids?.length
//                     ? { id: { [Op.notIn]: exclude_ids } }
//                     : {}
//             ),
//             ...Object.fromEntries(
//                 Object.entries(rest)
//                     .filter(([, v]) => v !== undefined)
//                     .map(([k, v]) => [
//                         k,
//                         Array.isArray(v) ? { [Op.notIn]: v } : v,
//                     ])
//             ),
//             ...(
//                 filter
//                     ? {
//                         [Op.or]: [
//                             { company_name: { [Op.like]: `%${filter}%` } },
//                             { email: { [Op.like]: `%${filter}%` } },
//                             { tax_id: { [Op.like]: `%${filter}%` } },
//                             { cfdi: { [Op.like]: `%${filter}%` } },
//                         ],
//                     }
//                     : {}
//             ),
//         };
//         const results = await PurchasedOrderModel.findAll({
//             where,
//             transaction: tx,
//             include: [
//                 {
//                     model: PurchasedOrderProductModel,
//                     as: "purchased_order_products",
//                     include: [
//                         {
//                             model: AppliedProductDiscountRangeModel,
//                             as: "applied_product_discount_range",
//                             include: [{
//                                 model: ProductDiscountRangeModel,
//                                 as: "product_discount_range"
//                             }]
//                         },
//                         {
//                             model: AppliedProductDiscountClientModel,
//                             as: "applied_product_discount_client",
//                             include: [{
//                                 model: ProductDiscountClientModel,
//                                 as: "product_discount_client"
//                             }]
//                         }
//                     ]
//                 },
//             ]
//         });
//         if (!results.length) return [];
//         const products: PurchasedOrderFullQueryResult[] = results.map(m => m.toJSON() as PurchasedOrderFullQueryResult); return products;
//     };

//     getByIdPurchasedOrderFullQueryResult = async (id: number, tx?: Transaction): Promise<PurchasedOrderFullQueryResult | null> => {
//         const result = await PurchasedOrderModel.findByPk(id, {
//             transaction: tx,
//             include: [{
//                 model: PurchasedOrderProductModel,
//                 as: "purchased_oder_products",
//                 include: [
//                     {
//                         model: AppliedProductDiscountRangeModel,
//                         as: "applied_product_discount_range",
//                         include: [{
//                             model: ProductDiscountRangeModel,
//                             as: "product_discount_range"
//                         }]
//                     },
//                     {
//                         model: AppliedProductDiscountClientModel,
//                         as: "applied_product_discount_client",
//                         include: [{
//                             model: ProductDiscountClientModel,
//                             as: "product_discount_client"
//                         }]
//                     }
//                 ]
//             }]
//         });
//         if (!result) return null;
//         const purchasedOrder: PurchasedOrderFullQueryResult = result.toJSON();
//         return purchasedOrder;
//     };
// };