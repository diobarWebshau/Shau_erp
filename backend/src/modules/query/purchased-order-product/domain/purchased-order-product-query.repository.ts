import { PurchasedOrderProductQueryProps } from "./purchased-order-product-query.type";
import { Transaction } from "sequelize";

export interface IPurchasedOrderProductQueryRespository {
    getAll: (tx?: Transaction) => Promise<PurchasedOrderProductQueryProps[]>,
    getByPurchasedOrderId: (purchase_order_id: number, tx?: Transaction) => Promise<PurchasedOrderProductQueryProps[]>,
    getById: (id: number, tx?: Transaction) => Promise<PurchasedOrderProductQueryProps | null>,
};