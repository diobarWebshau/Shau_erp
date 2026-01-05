import { PurchasedOrderCreateProps, PurchasedOrderProps, PurchasedOrderUpdateProps } from "./purchased-order.types";
import { Transaction } from "sequelize";

export interface IPurchasedOrderRepository {
    findAll: (tx?: Transaction) => Promise<PurchasedOrderProps[]>,
    findById: (id: number, tx?: Transaction) => Promise<PurchasedOrderProps | null>,
    create: (data: PurchasedOrderCreateProps, tx?: Transaction) => Promise<PurchasedOrderProps>,
    update: (id: number, data: PurchasedOrderUpdateProps, tx?: Transaction) => Promise<PurchasedOrderProps>,
    delete: (id: number, tx?: Transaction) => Promise<void>,
};