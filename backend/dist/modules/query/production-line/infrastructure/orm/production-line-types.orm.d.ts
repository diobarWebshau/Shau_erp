import { ProductionLineProductAttributes } from "@modules/features/production-line/assigments/production-line-product/infrastructure/orm/production-line-product.orm";
import { ProductionLineAttributes } from "@modules/core/production-line/infrastructure/orm/production-lines.orm";
import { ProductAttributes } from "@modules/core/product/infrastructure/orm/product.orm";
interface ProductionLineProductQueryAttributes extends ProductionLineProductAttributes {
    product: ProductAttributes;
    production_line: ProductionLineAttributes;
}
interface ProductionLineQueryAttributes extends ProductionLineAttributes {
    production_line_products: Array<ProductionLineProductQueryAttributes>;
}
export type { ProductionLineQueryAttributes, ProductionLineProductQueryAttributes };
