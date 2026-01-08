import type { ProductDiscountRangeCreateProps, ProductDiscountRangeUpdateProps, ProductDiscountRangeProps } from "../../assigments/product-discounts-ranges/domain/product-discount-range.types";
import type { ProductInputProcessCreateProps, ProductInputProcessProps, ProductInputProcessUpdateProps } from "../../assigments/product-input-process/domain/product-input-process.types";
import type { ProductProcessCreateProps, ProductProcessUpdateProps, ProductProcessProps } from "../../assigments/product-process/domain/product-process.types";
import type { ProductInputCreateProps, ProductInputUpdateProps, ProductInputProps } from "../../assigments/product-input/domain/product-input.types";
import { ProductDiscountRangeResponseDto } from "../../assigments/product-discounts-ranges/application/dto/product-discount-range.model.schema";
import { ProductProcessResponseDto } from "../../assigments/product-process/application/dto/product-process.model.schema";
import type { ProcessCreateProps, ProcessProps, ProcessSearchCriteria } from "@modules/core/process/domain/process.types";
import type { ProductCreateProps, ProductUpdateProps, ProductProps } from "@modules/core/product/domain/product.types";
import { ProductInputResponseDto } from "../../assigments/product-input/application/dto/product-input.model.schema";
import { ProductResponseDto } from "@src/modules/core/product/application/dto/product.model.schema";
import type { InputProps } from "@modules/core/input/domain/input.types";
import { InputResponseDto } from "@src/modules/core/input/application/dto/input.model.schema";
import { ProcessResponseDto } from "@src/modules/core/process/application/dto/process.model.schema";
import { ProductInputProcessResponseDto } from "../../assigments/product-input-process/application/dto/product-input-process.model.schema";
type NoProductId = {
    product_id?: never;
};
type UpdateById<TPatch> = {
    id: number;
} & TPatch;
type ProductInputOrchestratorProps = ProductInputProps & {
    input: InputProps;
    product: ProductProps;
};
type ProductProcessOrchestratorPropsLean = ProductProcessProps & {
    process: ProcessProps;
    product: ProductProps;
};
type ProductInputProcessOrchestratorProps = ProductInputProcessProps & {
    product: ProductProps;
    product_input: ProductInputOrchestratorProps;
    product_process: ProductProcessOrchestratorPropsLean;
};
type ProductProcessOrchestratorProps = ProductProcessOrchestratorPropsLean & {
    product_input_process: ProductInputProcessOrchestratorProps[];
};
type ProductDiscountRangeOrchestratorProps = ProductDiscountRangeProps & {
    product: ProductProps;
};
type ProductInputOrchestratorCreateProps = NoProductId & Omit<ProductInputCreateProps, "product_id"> & {
    input: InputProps;
    product?: ProductProps;
};
type ProductInputProcessOrchestratorCreateProps = Omit<ProductInputProcessCreateProps, "product_id" | "product_input_id" | "product_process_id"> & {
    qty: ProductInputProcessCreateProps["qty"];
    product_input: ProductInputOrchestratorCreateProps;
};
type ProductProcessOrchestratorAssignExistingProps = NoProductId & Omit<ProductProcessCreateProps, "product_id"> & {
    process_id: number;
    process?: ProcessProps;
    product?: ProductProps;
    product_input_process: ProductInputProcessOrchestratorCreateProps[];
};
type ProductProcessOrchestratorCreateNewProps = NoProductId & Omit<ProductProcessCreateProps, "product_id" | "process_id"> & {
    process: ProcessCreateProps;
    process_id?: never;
    product?: ProductProps;
    product_input_process: ProductInputProcessOrchestratorCreateProps[];
};
type ProductProcessOrchestratorCreateProps = ProductProcessOrchestratorAssignExistingProps | ProductProcessOrchestratorCreateNewProps;
type ProductDiscountRangeOrchestratorCreateProps = NoProductId & Omit<ProductDiscountRangeCreateProps, "product_id">;
interface ProductOrchestratorCreateProps {
    product: ProductCreateProps;
    products_inputs: ProductInputOrchestratorCreateProps[];
    product_processes: ProductProcessOrchestratorCreateProps[];
    product_discount_ranges: ProductDiscountRangeOrchestratorCreateProps[];
}
type ProductInputProcessOrchestratorUpdateProps = UpdateById<ProductInputProcessUpdateProps>;
interface ProductInputProcessManager {
    added: ProductInputProcessOrchestratorCreateProps[];
    updated: Array<ProductInputProcessOrchestratorUpdateProps>;
    deleted: Array<ProductInputProcessProps>;
}
type ProductProcessOrchestratorUpdateProps = UpdateById<ProductProcessUpdateProps> & {
    product_input_process_updated?: ProductInputProcessManager;
};
interface ProductProcessManager {
    added: Array<ProductProcessOrchestratorCreateProps>;
    updated: Array<ProductProcessOrchestratorUpdateProps>;
    deleted: Array<ProductProcessProps>;
}
type ProductInputOrchestratorUpdateProps = UpdateById<ProductInputUpdateProps>;
interface ProductInputManager {
    added: Array<ProductInputOrchestratorCreateProps>;
    updated: Array<ProductInputOrchestratorUpdateProps>;
    deleted: Array<ProductInputProps>;
}
type ProductDiscountRangeOrchestratorUpdateProps = UpdateById<ProductDiscountRangeUpdateProps>;
interface ProductDiscountRangeManager {
    added: ProductDiscountRangeOrchestratorCreateProps[];
    updated: Array<ProductDiscountRangeOrchestratorUpdateProps>;
    deleted: Array<ProductDiscountRangeProps>;
}
interface ProductOrchestratorUpdateProps {
    product: ProductUpdateProps;
    products_inputs_manager: ProductInputManager;
    product_processes_manager: ProductProcessManager;
    product_discount_ranges_manager: ProductDiscountRangeManager;
}
interface ProductOrchestrator {
    product: ProductProps;
    products_inputs: ProductInputOrchestratorProps[];
    product_processes: ProductProcessOrchestratorProps[];
    product_discount_ranges: ProductDiscountRangeOrchestratorProps[];
}
type ProductInputOrchestratorResponseProp = ProductInputResponseDto & {
    input: InputResponseDto;
    product: ProductResponseDto;
};
type ProductProcessOrchestratorResponseProps = ProductProcessResponseDto & {
    process: ProcessResponseDto;
    product: ProductResponseDto;
    product_input_process: ProductInputProcessResponseDto[];
};
type ProductDiscountRangeOrchestratorResponseProps = ProductDiscountRangeResponseDto & {
    product: ProductResponseDto;
};
interface ProductOrchestratorResponseProps {
    product: ProductResponseDto;
    products_inputs: ProductInputOrchestratorResponseProp[];
    product_processes: ProductProcessOrchestratorResponseProps[];
    product_discount_ranges: ProductDiscountRangeOrchestratorResponseProps[];
}
export type { ProductInputOrchestratorProps, ProductProcessOrchestratorPropsLean, ProductProcessOrchestratorProps, ProductDiscountRangeOrchestratorProps, ProductInputProcessOrchestratorProps, ProductInputOrchestratorCreateProps, ProductInputProcessOrchestratorCreateProps, ProductProcessOrchestratorAssignExistingProps, ProductProcessOrchestratorCreateNewProps, ProductProcessOrchestratorCreateProps, ProductDiscountRangeOrchestratorCreateProps, ProductOrchestratorCreateProps, ProductProcessOrchestratorResponseProps, ProductInputProcessManager, ProductProcessManager, ProductInputManager, ProductDiscountRangeManager, ProductOrchestratorUpdateProps, ProductInputProcessOrchestratorUpdateProps, ProductInputProcessProps, ProductProcessOrchestratorUpdateProps, ProductProcessProps, ProductInputOrchestratorUpdateProps, ProductInputProps, ProductDiscountRangeOrchestratorUpdateProps, ProductDiscountRangeProps, ProcessSearchCriteria, ProductOrchestrator, ProductOrchestratorResponseProps, };
