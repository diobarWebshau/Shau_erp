
import { ProductDiscountRangeModel } from "@modules/features/products/assigments/product-discounts-ranges/infrastructure/orm/product-discount-range.orm";
import { ProductProcessModel } from "@modules/features/products/assigments/product-process/infrastructure/orm/product-process.orm";
import { ProductInputModel } from "@modules/features/products/assigments/product-input/infrastructure/orm/product-inputs.orm";
import { ProductAttributes, ProductModel } from "@modules/core/product/infrastructure/orm/product.orm";
import { ProductFullQueryResult, ProductSearchCriteria } from "../../domain/product-query.type"
import { ProcessModel } from "@src/modules/core/process/infrastructure/orm/process.orm";
import { InputModel } from "@src/modules/core/input/infrastructure/orm/input.orm";
import { IProductQueryRepository } from "../../domain/product-query.repository";
import { ProductQueryAttributes } from "../orm/product-query-types.orm";
import { DecimalVO } from "@src/shared/domain/value-objects/decimal.vo";
import { Op, Transaction, WhereOptions } from "sequelize";

const mapProductQueryModelToDomain = (model: ProductModel): ProductFullQueryResult => {
    const productQueryAttributes: ProductQueryAttributes = model.toJSON();
    const { product_discount_ranges, product_processes, products_inputs, ...productRest } = productQueryAttributes;
    return {
        ...productRest,
        sale_price: productRest.sale_price ? DecimalVO.from(productRest.sale_price) : null,
        production_cost: productRest.production_cost ? DecimalVO.from(productRest.production_cost) : null,
        created_at: (productRest.created_at instanceof Date) ? productRest.created_at : new Date(productRest.created_at),
        updated_at: (productRest.updated_at instanceof Date) ? productRest.updated_at : new Date(productRest.updated_at),
        product_discount_ranges: product_discount_ranges.map((pdr) => ({
            ...pdr,
            max_qty: DecimalVO.from(pdr.max_qty),
            min_qty: DecimalVO.from(pdr.min_qty),
            unit_price: DecimalVO.from(pdr.unit_price),
            created_at: (pdr.created_at instanceof Date) ? pdr.created_at : new Date(pdr.created_at),
            updated_at: (pdr.updated_at instanceof Date) ? pdr.updated_at : new Date(pdr.updated_at),
            product: {
                ...pdr.product,
                production_cost: pdr.product.production_cost ? DecimalVO.from(pdr.product.production_cost) : null,
                sale_price: pdr.product.sale_price ? DecimalVO.from(pdr.product.sale_price) : null,
                created_at: (pdr.product.created_at instanceof Date) ? pdr.product.created_at : new Date(pdr.product.created_at),
                updated_at: (pdr.product.updated_at instanceof Date) ? pdr.product.updated_at : new Date(pdr.product.updated_at),
            }
        })),
        product_processes: product_processes.map((pp) => ({
            ...pp,
            process: {
                ...pp.process,
                created_at: (pp.process.created_at instanceof Date) ? pp.process.created_at : new Date(pp.process.created_at),
                updated_at: (pp.process.updated_at instanceof Date) ? pp.process.updated_at : new Date(pp.process.updated_at),
            },
            product: {
                ...pp.product,
                production_cost: pp.product.production_cost ? DecimalVO.from(pp.product.production_cost) : null,
                sale_price: pp.product.sale_price ? DecimalVO.from(pp.product.sale_price) : null,
                created_at: (pp.product.created_at instanceof Date) ? pp.product.created_at : new Date(pp.product.created_at),
                updated_at: (pp.product.updated_at instanceof Date) ? pp.product.updated_at : new Date(pp.product.updated_at),
            },
            product_input_process: pp.product_input_process.map((pip) => ({
                ...pip,
                qty: DecimalVO.from(pip.qty)
            }))
        })),
        products_inputs: products_inputs.map((pi) => ({
            ...pi,
            equivalence: DecimalVO.from(pi.equivalence),
            product: {
                ...pi.product,
                production_cost: pi.product.production_cost ? DecimalVO.from(pi.product.production_cost) : null,
                sale_price: pi.product.sale_price ? DecimalVO.from(pi.product.sale_price) : null,
                created_at: (pi.product.created_at instanceof Date) ? pi.product.created_at : new Date(pi.product.created_at),
                updated_at: (pi.product.updated_at instanceof Date) ? pi.product.updated_at : new Date(pi.product.updated_at),
            },
        }))
    }
}

export class ProductQueryRepository implements IProductQueryRepository {

    // ********** SEQUELIZE **********
    getAllProductFullQueryResult = async (query: ProductSearchCriteria, tx?: Transaction): Promise<ProductFullQueryResult[]> => {
        const { filter, exclude_ids, is_active, ...rest } = query;
        const where: WhereOptions<ProductAttributes> = {
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
                            { name: { [Op.like]: `%${filter}%` } },
                            { custom_id: { [Op.like]: `%${filter}%` } },
                            { barcode: { [Op.like]: `%${filter}%` } },
                            { description: { [Op.like]: `%${filter}%` } },
                            { presentation: { [Op.like]: `%${filter}%` } },
                            { sku: { [Op.like]: `%${filter}%` } },
                        ],
                    }
                    : {}
            ),
        };
        const results: ProductModel[] = await ProductModel.findAll({
            where,
            transaction: tx,
            include: [
                {
                    model: ProductInputModel,
                    as: "products_inputs",
                    include: [
                        { model: ProductModel, as: "product" },
                        { model: InputModel, as: "input" }
                    ]
                },
                {
                    model: ProductProcessModel,
                    as: "product_processes",
                    include: [
                        { model: ProductModel, as: "product" },
                        { model: ProcessModel, as: "process" }
                    ]
                },
                {
                    model: ProductDiscountRangeModel,
                    as: "product_discount_ranges",
                    include: [
                        { model: ProductModel, as: "product" }
                    ]
                },
            ]
        });
        if (!results.length) return [];
        const products: ProductFullQueryResult[] = results.map(mapProductQueryModelToDomain);
        return products;
    };

    getByIdProductFullQueryResult = async (id: number, tx?: Transaction): Promise<ProductFullQueryResult | null> => {
        const result = await ProductModel.findByPk(id, {
            transaction: tx,
            include: [
                {
                    model: ProductInputModel,
                    as: "products_inputs",
                    include: [
                        { model: ProductModel, as: "product" },
                        { model: InputModel, as: "input" }
                    ]
                },
                {
                    model: ProductProcessModel,
                    as: "product_processes",
                    include: [
                        { model: ProductModel, as: "product" },
                        { model: ProcessModel, as: "process" }
                    ]
                },
                {
                    model: ProductDiscountRangeModel,
                    as: "product_discount_ranges",
                    include: [
                        { model: ProductModel, as: "product" }
                    ]
                },
            ]
        });
        if (!result) return null;
        const product: ProductFullQueryResult = mapProductQueryModelToDomain(result)
        return product;
    };
}
