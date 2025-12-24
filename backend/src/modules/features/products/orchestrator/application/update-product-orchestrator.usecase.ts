// import { CreateProductDiscountRangeUseCase } from "@modules/features/products/assigments/product-discounts-ranges/application/use-cases/create-product-discount-range.usecase";
// import { DeleteProductDiscountRangeUseCase } from "@modules/features/products/assigments/product-discounts-ranges/application/use-cases/delete-product-discount-range.usecase";
// import { UpdateProductDiscountRangeUseCase } from "@modules/features/products/assigments/product-discounts-ranges/application/use-cases/update-product-discount-range.usecase";
// import {
//     ProductOrchestratorUpdate, ProductInputProcessManager,
//     ProductProcessManager, ProductInputManager,
//     ProductInputCreateOrchestrated, ProductDiscountRangeCreateOrchestrated
// } from "../domain/product-orchestrator.types";
// import { CreateProductProcessUseCase } from "@modules/features/products/assigments/product-process/application/use-cases/create-product-process.usecase";
// import { UpdateProductProcessUseCase } from "@modules/features/products/assigments/product-process/application/use-cases/update-product-process.usecase";
// import { DeleteProductProcessUseCase } from "@modules/features/products/assigments/product-process/application/use-cases/delete-product-process.usecase";
// import { DeleteProductInputUseCase } from "@modules/features/products/assigments/product-input/application/use-cases/delete-product-input.usecase";
// import { CreateProductInputUseCase } from "@modules/features/products/assigments/product-input/application/use-cases/create-product-input.usecase";
// import { UpdateProductInputUseCase } from "@modules/features/products/assigments/product-input/application/use-cases/update-product-input.usecase";
// import { IProductDiscountRangeRepository } from "../../assigments/product-discounts-ranges/domain/product-discount-range.repository.interface";
// import { ProductDiscountRangeProps } from "../../assigments/product-discounts-ranges/domain/product-discount-range.types";
// import { IProductProcessRepository } from "../../assigments/product-process/domain/product-process.repository.interface";
// import { IProductInputRepository } from "../../assigments/product-input/domain/product-input.repository.interface";
// import { UpdateProductUseCase } from "@modules/core/product/application/use-cases/update-product.usecase";
// import { ProductProcessProps } from "../../assigments/product-process/domain/product-process.types";
// import { IProductRepository } from "@modules/core/product/domain/product.repository.interface";
// import { ProductInputProps } from "../../assigments/product-input/domain/product-input.types";
// import { ProductProps } from "@modules/core/product/domain/product.types";

// interface UpdateProductOrchestratorUseCaseProps {
//     productRepo: IProductRepository,
//     productProcessRepo: IProductProcessRepository,
//     productInputRepo: IProductInputRepository,
//     discountRangeRepo: IProductDiscountRangeRepository,
// }

// export class UpdateProductOrchestratorUseCase {

//     private updateProductUseCase: UpdateProductUseCase;
//     private createProductInputUseCase: CreateProductInputUseCase;
//     private deleteProductInputUseCase: DeleteProductInputUseCase;
//     private updateProductInputUseCase: UpdateProductInputUseCase;
//     private createProductProcessUseCase: CreateProductProcessUseCase;
//     private deleteProductProcessUseCase: DeleteProductProcessUseCase;
//     private updateProductProcessUseCase: UpdateProductProcessUseCase;
//     private createProductDiscountRangeUseCase: CreateProductDiscountRangeUseCase;
//     private deleteProductDiscountRangeUseCase: DeleteProductDiscountRangeUseCase;
//     private updateProductDiscountRangeUseCase: UpdateProductDiscountRangeUseCase;

//     constructor({ productInputRepo, discountRangeRepo, productProcessRepo, productRepo }: UpdateProductOrchestratorUseCaseProps) {
//         this.createProductDiscountRangeUseCase = new CreateProductDiscountRangeUseCase(discountRangeRepo);
//         this.updateProductDiscountRangeUseCase = new UpdateProductDiscountRangeUseCase(discountRangeRepo);
//         this.deleteProductDiscountRangeUseCase = new DeleteProductDiscountRangeUseCase(discountRangeRepo);
//         this.createProductProcessUseCase = new CreateProductProcessUseCase(productProcessRepo);
//         this.updateProductProcessUseCase = new UpdateProductProcessUseCase(productProcessRepo);
//         this.deleteProductProcessUseCase = new DeleteProductProcessUseCase(productProcessRepo);
//         this.createProductInputUseCase = new CreateProductInputUseCase(productInputRepo);
//         this.deleteProductInputUseCase = new DeleteProductInputUseCase(productInputRepo);
//         this.updateProductInputUseCase = new UpdateProductInputUseCase(productInputRepo);
//         this.updateProductUseCase = new UpdateProductUseCase(productRepo);
//     };

//     async execute(id: number, data: ProductOrchestratorUpdate) {
//         const { product, product_discount_ranges_manager, product_processes_manager, products_inputs_manager } = data
//         const productUpdateResponse: ProductProps = await this.updateProductUseCase.execute(id, product);
//         const isChangeProductDiscountRange: boolean =
//             product_discount_ranges_manager.added?.length > 0 ||
//             product_discount_ranges_manager.updated?.length > 0 ||
//             product_discount_ranges_manager.deleted?.length > 0;

//         const isChangeProductInput: boolean =
//             products_inputs_manager.added?.length > 0 ||
//             products_inputs_manager.updated?.length > 0 ||
//             products_inputs_manager.deleted?.length > 0;

//         const isChangeProductProcess: boolean =
//             product_processes_manager.added?.length > 0 ||
//             product_processes_manager.updated?.length > 0 ||
//             product_processes_manager.deleted?.length > 0;

//         if (isChangeProductDiscountRange) {
//             const adds: ProductDiscountRangeCreateOrchestrated[] = product_discount_ranges_manager.added ?? [];
//             const deletes: ProductDiscountRangeProps[] = product_discount_ranges_manager.deleted ?? [];
//             const uptates: ProductDiscountRangeOrchestratorUpdate[] = product_discount_ranges_manager.updated ?? [];

//             if (adds.length) {
//                 const newProductDiscountRange = adds.map((pdr) => ({
//                     ...pdr,
//                     product_id: productUpdateResponse.id
//                 }))
//                 for (const pdr of newProductDiscountRange) await this.createProductDiscountRangeUseCase.execute(pdr);
//             };

//             if (uptates.length) {
//                 for (const pdr of uptates) {
//                     const { id, ...rest } = pdr;
//                     await this.updateProductDiscountRangeUseCase.execute(id, rest);
//                 };
//             }
//             if (deletes.length) {
//                 for (const pdr of uptates) {
//                     const { id, ...rest } = pdr;
//                     await this.updateProductDiscountRangeUseCase.execute(id, rest);
//                 };
//             }
//         }
//         if (isChangeProductInput) {
//             const adds: ProductInputOrchestratorCreate[] = products_inputs_manager.added ?? [];
//             const deletes: ProductInputProps[] = products_inputs_manager.deleted ?? [];
//             const uptates: ProductInputOrchestratorUpdate[] = products_inputs_manager.updated ?? [];
//             if (adds.length) {
//                 const newProductInput: ProductInputOrchestratorCreate[] = adds.map((pi) => ({
//                     ...pi,
//                     product_id: productUpdateResponse.id
//                 }));
//                 for (const pi of newProductInput) await this.createProductInputUseCase.execute(pi);
//             };
//             if (uptates.length) {
//                 for (const pdr of uptates) {
//                     const { id, ...rest } = pdr;
//                     await this.updateProductDiscountRangeUseCase.execute(id, rest);
//                 };
//             }
//             if (deletes.length) {
//                 for (const pdr of uptates) {
//                     const { id, ...rest } = pdr;
//                     await this.updateProductDiscountRangeUseCase.execute(id, rest);
//                 };
//             }
//         }
//         if (isChangeProductProcess) {
//             const adds: ProductProcessOrchestratorCreate[] = product_processes_manager.added ?? [];
//             const deletes: ProductProcessProps[] = product_processes_manager.deleted ?? [];
//             const uptates: ProductProcessOrchestratorUpdate[] = product_processes_manager.updated ?? [];
//             if (adds.length) {
//                 const newProductProces = adds.map((pp) => ({
//                     ...pp,
//                     product_id: productUpdateResponse.id
//                 }))
//                 for (const pp of newProductProces) await this.createProductProcessUseCase.execute(pp);
//             };
//             if (uptates.length) {
//                 for (const pdr of uptates) {
//                     const { id, ...rest } = pdr;
//                     await this.updateProductProcessUseCase.execute(id, rest);
//                 };
//             }
//             if (deletes.length) {
//                 for (const pdr of uptates) {
//                     const { id } = pdr;
//                     await this.deleteProductProcessUseCase.execute(id);
//                 };
//             }
//         }
//     }
// };