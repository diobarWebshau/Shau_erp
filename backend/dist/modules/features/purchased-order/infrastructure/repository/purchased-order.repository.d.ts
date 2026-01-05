import { PurchasedOrderCreateProps, PurchasedOrderProps, PurchasedOrderUpdateProps } from "../../domain/purchased-order.types";
import { IPurchasedOrderRepository } from "../../domain/purchased-order.repository.interface";
import { Transaction } from "sequelize";
export declare class PurchasedOrderRepository implements IPurchasedOrderRepository {
    findAll: (tx?: Transaction) => Promise<PurchasedOrderProps[]>;
    findById: (id: number, tx?: Transaction) => Promise<PurchasedOrderProps | null>;
    create: (data: PurchasedOrderCreateProps, tx?: Transaction) => Promise<PurchasedOrderProps>;
    update: (id: number, data: PurchasedOrderUpdateProps, tx?: Transaction) => Promise<PurchasedOrderProps>;
    delete: (id: number, tx?: Transaction) => Promise<void>;
}
