import { AppliedProductDiscountClientCreateProps, AppliedProductDiscountClientProps, AppliedProductDiscountClientUpdateProps } from "../../domain/applied-product-discount-client.types";
import { IAppliedProductDiscountClientRepository } from "../../domain/applied-product-discount-client.repository.interface";
import { Transaction } from "sequelize";
export declare class AppliedProductDiscountClientRepository implements IAppliedProductDiscountClientRepository {
    findAll: (tx?: Transaction) => Promise<AppliedProductDiscountClientProps[]>;
    findById: (id: number, tx?: Transaction) => Promise<AppliedProductDiscountClientProps | null>;
    findByPopId: (purchase_order_product_id: number, tx?: Transaction) => Promise<AppliedProductDiscountClientProps | null>;
    create: (data: AppliedProductDiscountClientCreateProps, tx?: Transaction) => Promise<AppliedProductDiscountClientProps>;
    update: (id: number, data: AppliedProductDiscountClientUpdateProps, tx?: Transaction) => Promise<AppliedProductDiscountClientProps>;
    delete: (id: number, tx?: Transaction) => Promise<void>;
}
