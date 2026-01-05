import { IPurchasedOrderProductQueryRespository } from "../domain/purchased-order-product-query.repository";
import { PurchasedOrderProductQueryProps } from "../domain/purchased-order-product-query.type";
import { Transaction } from "sequelize";
export declare class PurchasedOrderProductQueryRepository implements IPurchasedOrderProductQueryRespository {
    getAll: (tx?: Transaction) => Promise<PurchasedOrderProductQueryProps[]>;
    getById: (id: number, tx?: Transaction) => Promise<PurchasedOrderProductQueryProps | null>;
    getByPurchasedOrderId: (purchase_order_id: number, tx?: Transaction) => Promise<PurchasedOrderProductQueryProps[]>;
}
