import { AppliedProductDiscountClientCreateProps, AppliedProductDiscountClientProps, AppliedProductDiscountClientUpdateProps } from "./applied-product-discount-client.types";
import { Transaction } from "sequelize";
export interface IAppliedProductDiscountClientRepository {
    findAll: (tx?: Transaction) => Promise<AppliedProductDiscountClientProps[]>;
    findById: (id: number, tx?: Transaction) => Promise<AppliedProductDiscountClientProps | null>;
    findByPopId: (purchase_order_product_id: number, tx?: Transaction) => Promise<AppliedProductDiscountClientProps | null>;
    create: (data: AppliedProductDiscountClientCreateProps, tx?: Transaction) => Promise<AppliedProductDiscountClientProps>;
    update: (id: number, data: AppliedProductDiscountClientUpdateProps, tx?: Transaction) => Promise<AppliedProductDiscountClientProps>;
    delete: (id: number, tx?: Transaction) => Promise<void>;
}
