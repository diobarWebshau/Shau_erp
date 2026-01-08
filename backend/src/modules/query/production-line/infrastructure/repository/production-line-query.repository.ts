
import { ProductionLineProductModel } from "@modules/features/production-line/assigments/production-line-product/infrastructure/orm/production-line-product.orm";
import { ProductionLineFullQueryResult, ProductionLineSearchCriteria, } from "../../domain/production-line-query.types"
import { ProductionLineModel } from "@modules/core/production-line/infrastructure/orm/production-lines.orm";
import { IProductionLineQueryRepository } from "../../domain/production-line-query.respository.interface";
import { ProductionLineProps } from "@modules/core/production-line/domain/production-line.types";
import { ProductModel } from "@modules/core/product/infrastructure/orm/product.orm";
import { ProductionLineQueryAttributes } from "../orm/production-line-types.orm";
import { DecimalVO } from "@src/shared/domain/value-objects/decimal.vo";
import { Op, Transaction, WhereOptions } from "sequelize";

const mapProductionLineQueryModelToDomain = (model: ProductionLineModel): ProductionLineFullQueryResult => {
    const productionlineQueryAttributes: ProductionLineQueryAttributes = model.toJSON();
    const { production_line_products: plp, ...pl } = productionlineQueryAttributes;
    return ({
        ...pl,
        created_at: pl.created_at instanceof Date ? pl.created_at : new Date(pl.created_at),
        updated_at: pl.updated_at instanceof Date ? pl.updated_at : new Date(pl.updated_at),
        production_line_products: plp.map((plp) => ({
            ...plp,
            product: {
                ...plp.product,
                created_at: plp.product.created_at instanceof Date ? plp.product.created_at : new Date(plp.product.created_at),
                updated_at: plp.product.updated_at instanceof Date ? plp.product.updated_at : new Date(plp.product.updated_at),
                sale_price: plp.product.sale_price ? DecimalVO.from(plp.product.sale_price) : null,
                production_cost: plp.product.production_cost ? DecimalVO.from(plp.product.production_cost) : null
            }
        }))
    });
}

export class ProductionLineQueryRepository implements IProductionLineQueryRepository {

    // ********** SEQUELIZE **********
    getAllProductionLineFullQuery = async (query: ProductionLineSearchCriteria, tx?: Transaction): Promise<ProductionLineFullQueryResult[]> => {
        const { filter, exclude_ids, is_active, ...rest } = query;
        const where: WhereOptions<ProductionLineProps> = {
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
                        ],
                    }
                    : {}
            ),
        };
        const results: ProductionLineModel[] = await ProductionLineModel.findAll({
            where,
            transaction: tx,
            include: [
                {
                    model: ProductionLineProductModel,
                    as: "production_line_products",
                    include: [{
                        model: ProductModel,
                        as: "product"
                    }]
                },
            ]
        });
        if (!results.length) return [];
        const ProductionLines: ProductionLineFullQueryResult[] = results.map(mapProductionLineQueryModelToDomain);
        return ProductionLines;
    };

    getByIdProductionLineFullQuery = async (id: number, tx?: Transaction): Promise<ProductionLineFullQueryResult | null> => {
        const result: ProductionLineModel | null = await ProductionLineModel.findByPk(id, {
            transaction: tx,
            include: [
                {
                    model: ProductionLineProductModel,
                    as: "production_line_products",
                    include: [{
                        model: ProductModel,
                        as: "product"
                    }, {
                        model: ProductionLineModel,
                        as: "production_line"
                    }]
                },
            ]
        });
        if (!result) return null;
        const ProductionLine: ProductionLineFullQueryResult = mapProductionLineQueryModelToDomain(result);
        return ProductionLine;
    };
}
