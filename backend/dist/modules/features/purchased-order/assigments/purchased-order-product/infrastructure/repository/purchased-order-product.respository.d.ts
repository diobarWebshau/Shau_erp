import { PurchasedOrderProductCreateProps, PurchasedOrderProductProps, PurchasedOrderProductUpdateProps } from "../../domain/purchased-order-product.types";
import { IPurchasedOrderProductRepository } from "../../domain/purchased-order-product.respository.interface";
import { Transaction } from "sequelize";
export declare class PurchasedOrderProductRepository implements IPurchasedOrderProductRepository {
    findAll: (tx?: Transaction) => Promise<PurchasedOrderProductProps[]>;
    findById: (id: number, tx?: Transaction) => Promise<PurchasedOrderProductProps | null>;
    findByPurchasedId: (purchase_order_id: number, tx?: Transaction) => Promise<PurchasedOrderProductProps[]>;
    create: (data: PurchasedOrderProductCreateProps, tx?: Transaction) => Promise<PurchasedOrderProductProps>;
    update: (id: number, data: PurchasedOrderProductUpdateProps, tx?: Transaction) => Promise<PurchasedOrderProductProps>;
    delete: (id: number, tx?: Transaction) => Promise<void>;
}
