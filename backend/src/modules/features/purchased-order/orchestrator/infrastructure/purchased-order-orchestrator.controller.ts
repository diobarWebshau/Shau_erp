// import { ApiRequest, ApiResponse } from "@src/shared/typed-request-endpoint/typed-request.interface";
// import { IAppliedProductDiscountClientRepository } from "../../assigments/purchased-order-product/assigments/applied-product-discount-client/domain/applied-product-discount-client.repository.interface";
// import { AppliedProductDiscountClientRepository } from "../../assigments/purchased-order-product/assigments/applied-product-discount-client/infrastructure/repository/applied-product-discount-client.repository";
// import { IAppliedProductDiscountRangeRepository } from "../../assigments/purchased-order-product/assigments/applied-product-discount-range/domain/applied-product-discount-range.repository.interface";
// import { AppliedProductDiscountRangeRepository } from "../../assigments/purchased-order-product/assigments/applied-product-discount-range/infrastructure/repository/applied-product-discount-range.repository";
// import { IPurchasedOrderProductRepository } from "../../assigments/purchased-order-product/domain/purchased-order-product.respository.interface";
// import { IPurchasedOrderRepository } from "../../domain/purchased-order.repository.interface";
// import { PurchasedOrderRepository } from "../../infrastructure/repository/purchased-order.repository";
// import { CreatePurchasedOrderOrchestratorSchema, UpdatePurchasedOrderOrchestratorSchema } from "./../application/dto/purchased-order-orchestrator.model.endpoint.schema";
// import { IClientRepository } from "@src/modules/core/client/domain/client.repository.interface";
// import { IClientAddressRepository } from "@src/modules/features/client/assigments/client-addresses/domain/client-address.repository.interface";
// import { ClientAddressRepository } from "@src/modules/features/client/assigments/client-addresses/infrastructure/repository/client-address.repository";
// import { ClientRepository } from "@src/modules/core/client/infrastructure/repository/client.repository";

// export class PurchasedOrderOrchestratorController {

//     private readonly purchasedOrderRepo: IPurchasedOrderRepository;
//     private readonly purchasedOrderProductRepo: IPurchasedOrderProductRepository;
//     private readonly appliedProductDiscountRangeRepo: IAppliedProductDiscountRangeRepository;
//     private readonly appliedProductDiscountClientRepo: IAppliedProductDiscountClientRepository;
//     private readonly clientRepo: IClientRepository;
//     private readonly clientAddressRepo: IClientAddressRepository;


//     constructor() {
//         this.purchasedOrderRepo = new PurchasedOrderRepository();
//         this.appliedProductDiscountClientRepo = new AppliedProductDiscountClientRepository();
//         this.appliedProductDiscountRangeRepo = new AppliedProductDiscountRangeRepository();
//         this.purchasedOrderRepo = new PurchasedOrderRepository();
//         this.clientAddressRepo = new ClientAddressRepository();
//         this.clientRepo = new ClientRepository();
//     };

//     create = async (req: ApiRequest<CreatePurchasedOrderOrchestratorSchema>, res: ApiResponse<CreatePurchasedOrderOrchestratorSchema>): Promise<ApiResponse<CreatePurchasedOrderOrchestratorSchema>> => { };
//     update = async (req: ApiRequest<UpdatePurchasedOrderOrchestratorSchema>, res: ApiResponse<UpdatePurchasedOrderOrchestratorSchema>): Promise<ApiResponse<UpdatePurchasedOrderOrchestratorSchema>> => {
//         const { id }: UpdatePurchasedOrderOrchestratorSchema["params"] = req.params;
//     };
// };