import { Transaction } from "sequelize";
import { PurchasedOrderProductCreateProps, PurchasedOrderProductProps, PurchasedOrderProductUpdateProps } from "./purchased-order-product.types";
export interface IPurchasedOrderProductRepository {
    findAll: (tx?: Transaction) => Promise<PurchasedOrderProductProps[]>;
    findById: (id: number, tx?: Transaction) => Promise<PurchasedOrderProductProps | null>;
    findByPurchasedId: (purchase_order_id: number, tx?: Transaction) => Promise<PurchasedOrderProductProps[]>;
    create: (data: PurchasedOrderProductCreateProps, tx?: Transaction) => Promise<PurchasedOrderProductProps>;
    update: (id: number, data: PurchasedOrderProductUpdateProps, tx?: Transaction) => Promise<PurchasedOrderProductProps>;
    delete: (id: number, tx?: Transaction) => Promise<void>;
}
