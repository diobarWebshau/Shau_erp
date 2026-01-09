import { ProductDiscountRangeAttributes } from "@modules/features/products/assigments/product-discounts-ranges/infrastructure/orm/product-discount-range.orm";
import { ProductInputProcessAttributes } from "@modules/features/products/assigments/product-input-process/infrastructure/orm/product-input-process.orm";
import { ProductProcessAttributes } from "@modules/features/products/assigments/product-process/infrastructure/orm/product-process.orm";
import { ProductInputAttributes } from "@modules/features/products/assigments/product-input/infrastructure/orm/product-inputs.orm";
import { ProcessAttributes } from "@modules/core/process/infrastructure/orm/process.orm";
import { ProductAttributes } from "@modules/core/product/infrastructure/orm/product.orm";
import { InputAttributes } from "@modules/core/input/infrastructure/orm/input.orm";
interface ProductInputQueryAttributes extends ProductInputAttributes {
    product: ProductAttributes;
    input: InputAttributes;
}
interface ProductInputQueryAttributes extends ProductInputAttributes {
    input: InputAttributes;
}
interface ProductInputProcessQueryAttributes extends ProductInputProcessAttributes {
    product_input: ProductInputAttributes;
    product_process: ProductProcessAttributes;
    product: ProductAttributes;
}
interface ProductDiscountRangeQueryAttributes extends ProductDiscountRangeAttributes {
    product: ProductAttributes;
}
interface ProductProcessQueryAttributes extends ProductProcessAttributes {
    product: ProductAttributes;
    process: ProcessAttributes;
    product_input_process: Array<ProductInputProcessQueryAttributes>;
}
interface ProductQueryAttributes extends ProductAttributes {
    product_discount_ranges: Array<ProductDiscountRangeQueryAttributes>;
    product_processes: Array<ProductProcessQueryAttributes>;
    product_inputs: Array<ProductInputQueryAttributes>;
}
export { ProductDiscountRangeQueryAttributes, ProductProcessQueryAttributes, ProductInputQueryAttributes, ProductQueryAttributes };
