
import { ProductDiscountRangeModel } from "@modules/features/products/assigments/product-discounts-ranges/infrastructure/orm/product-discount-range.orm";
import { ProductProcessModel } from "@modules/features/products/assigments/product-process/infrastructure/orm/product-process.orm";
import { ProductInputModel } from "@modules/features/products/assigments/product-input/infrastructure/orm/product-inputs.orm";
import { ProductFullQueryResult, ProductOrchestratorQuery, ProductSearchCriteria } from "../domain/product-query.type"
import { ProductModel } from "@modules/core/product/infrastructure/orm/product.orm";
import { IProductQueryRepository } from "../domain/product-query.repository";
import { ProductProps } from "@modules/core/product/domain/product.types";
import { Op, Transaction, WhereOptions } from "sequelize";

export class ProductQueryRepository implements IProductQueryRepository {

    // ********** SEQUELIZE **********
    getAllProductFullQueryResult = async (query: ProductSearchCriteria, tx?: Transaction): Promise<ProductFullQueryResult[]> => {
        const { filter, exclude_ids, is_active, ...rest } = query;
        const where: WhereOptions<ProductProps> = {
            ...(
                exclude_ids?.length
                    ? { id: { [Op.notIn]: exclude_ids } }
                    : {}
            ),
            ...(is_active !== undefined ? { is_active } : {}),
            ...Object.fromEntries(
                Object.entries(rest)
                    .filter(([, v]) => v !== undefined)
                    .map(([k, v]) => [
                        k,
                        Array.isArray(v) ? { [Op.notIn]: v } : v,
                    ])
            ),
            ...(
                filter
                    ? {
                        [Op.or]: [
                            { company_name: { [Op.like]: `%${filter}%` } },
                            { email: { [Op.like]: `%${filter}%` } },
                            { tax_id: { [Op.like]: `%${filter}%` } },
                            { cfdi: { [Op.like]: `%${filter}%` } },
                        ],
                    }
                    : {}
            ),
        };
        const results: ProductModel[] = await ProductModel.findAll({
            where,
            transaction: tx,
            include: [
                { model: ProductInputModel, as: "products_inputs" },
                { model: ProductProcessModel, as: "product_processes" },
                { model: ProductDiscountRangeModel, as: "product_discount_ranges" },
            ]
        });
        if (!results.length) return [];
        const products: ProductFullQueryResult[] = results.map(p => p.toJSON());
        return products;
    };

    getByIdProductFullQueryResult = async (id: number, tx?: Transaction): Promise<ProductFullQueryResult | null> => {
        const result = await ProductModel.findByPk(id, {
            transaction: tx,
            include: [
                { model: ProductInputModel, as: "products_inputs" },
                { model: ProductProcessModel, as: "product_processes" },
                { model: ProductDiscountRangeModel, as: "product_discount_ranges" },
            ]
        });
        if (!result) return null;
        const product: ProductFullQueryResult = result.toJSON();
        return product;
    };

    // ********** ORCHESTRATOR **********
    getAllProductOrchestratorResult = async (query: ProductSearchCriteria, tx?: Transaction): Promise<ProductOrchestratorQuery[]> => {
        const { filter, exclude_ids, is_active, ...rest } = query;
        const where: WhereOptions<ProductProps> = {
            ...(
                exclude_ids?.length
                    ? { id: { [Op.notIn]: exclude_ids } }
                    : {}
            ),
            ...(is_active !== undefined ? { is_active } : {}),
            ...Object.fromEntries(
                Object.entries(rest)
                    .filter(([, v]) => v !== undefined)
                    .map(([k, v]) => [
                        k,
                        Array.isArray(v) ? { [Op.notIn]: v } : v,
                    ])
            ),
            ...(
                filter
                    ? {
                        [Op.or]: [
                            { company_name: { [Op.like]: `%${filter}%` } },
                            { email: { [Op.like]: `%${filter}%` } },
                            { tax_id: { [Op.like]: `%${filter}%` } },
                            { cfdi: { [Op.like]: `%${filter}%` } },
                        ],
                    }
                    : {}
            ),
        };
        const results = await ProductModel.findAll({
            where,
            transaction: tx,
            include: [
                { model: ProductInputModel, as: "products_inputs" },
                { model: ProductProcessModel, as: "product_processes" },
                { model: ProductDiscountRangeModel, as: "product_discount_ranges" },
            ]
        });
        if (!results.length) return [];
        const products: ProductFullQueryResult[] = results.map(p => p.toJSON());
        const productsResultOrchestrator: ProductOrchestratorQuery[] = [];
        for (const p of products) {
            const { products_inputs, product_processes, product_discount_ranges, ...rest } = p;
            const productResultOrch: ProductOrchestratorQuery = {
                product: rest,
                products_inputs: products_inputs ?? [],
                product_discount_ranges: product_discount_ranges ?? [],
                product_processes: product_processes ?? []
            };
            productsResultOrchestrator.push(productResultOrch);
        }
        return productsResultOrchestrator;
    };
    getByIdProductOrchestratorResult = async (id: number, tx?: Transaction): Promise<ProductOrchestratorQuery | null> => {
        const result = await ProductModel.findByPk(id, {
            transaction: tx,
            include: [
                { model: ProductInputModel, as: "products_inputs" },
                { model: ProductProcessModel, as: "product_processes" },
                { model: ProductDiscountRangeModel, as: "product_discount_ranges" },
            ]
        });
        if (!result) return null;
        const product: ProductFullQueryResult = result.toJSON();
        const { products_inputs, product_processes, product_discount_ranges, ...rest } = product;
        const productResultOrch: ProductOrchestratorQuery = {
            product: rest,
            products_inputs: products_inputs ?? [],
            product_discount_ranges: product_discount_ranges ?? [],
            product_processes: product_processes ?? []
        };
        return productResultOrch;
    };
}
