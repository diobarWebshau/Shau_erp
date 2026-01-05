import { GetByPopAppliedProductDiscountClientUseCase } from "../../application/use-cases/get-by-pop-applied-product-discount-client.usecase";
import { GetByIdAppliedProductDiscountClientUseCase } from "../../application/use-cases/get-by-id-applied-product-discount-client.usecase";
import { GetAllAppliedProductDiscountClientUseCase } from "../../application/use-cases/get-all-applied-product-discount-client.usecase";
import { CreateAppliedProductDiscountClientUseCase } from "../../application/use-cases/create-applied-product-discount-client.usecase";
import { DeleteAppliedProductDiscountClientUseCase } from "../../application/use-cases/delete-applied-product-discount-client.usecase";
import { UpdateAppliedProductDiscountClientUseCase } from "../../application/use-cases/update-applied-product-discount-client.usecase";
import { AppliedProductDiscountClientResponseSchemaDto } from "../../application/dto/applied-product-discount-client.model.schema";
import { IAppliedProductDiscountClientRepository } from "../../domain/applied-product-discount-client.repository.interface";
import { AppliedProductDiscountClientRepository } from "../repository/applied-product-discount-client.repository";
import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import {
    CreateAppliedProductDiscountClient, DeleteAppliedProductDiscountClient,
    GetAllAppliedProductDiscountClient, GetByIdAppliedProductDiscountClient,
    GetByPopIdAppliedProductDiscountClient, UpdateAppliedProductDiscountClient
} from "./../../application/dto/applied-product-discount-client.endpoint.schema";

export class AppliedProductDiscountClientController {

    private readonly appliedProductDiscountClientRepo: IAppliedProductDiscountClientRepository;
    private readonly createAppliedProductDiscountClientRepo: CreateAppliedProductDiscountClientUseCase;
    private readonly deleteAppliedProductDiscountClientUseCase: DeleteAppliedProductDiscountClientUseCase;
    private readonly updateAppliedProductDiscountClientUseCase: UpdateAppliedProductDiscountClientUseCase;
    private readonly getAllAppliedProductDiscountClientUseCase: GetAllAppliedProductDiscountClientUseCase;
    private readonly getByIdAppliedProductDiscountClientUseCase: GetByIdAppliedProductDiscountClientUseCase;
    private readonly getByPopAppliedProductDiscountClientUseCase: GetByPopAppliedProductDiscountClientUseCase;

    constructor() {
        this.appliedProductDiscountClientRepo = new AppliedProductDiscountClientRepository();
        this.createAppliedProductDiscountClientRepo = new CreateAppliedProductDiscountClientUseCase(this.appliedProductDiscountClientRepo);
        this.deleteAppliedProductDiscountClientUseCase = new DeleteAppliedProductDiscountClientUseCase(this.appliedProductDiscountClientRepo);
        this.updateAppliedProductDiscountClientUseCase = new UpdateAppliedProductDiscountClientUseCase(this.appliedProductDiscountClientRepo);
        this.getAllAppliedProductDiscountClientUseCase = new GetAllAppliedProductDiscountClientUseCase(this.appliedProductDiscountClientRepo);
        this.getByIdAppliedProductDiscountClientUseCase = new GetByIdAppliedProductDiscountClientUseCase(this.appliedProductDiscountClientRepo);
        this.getByPopAppliedProductDiscountClientUseCase = new GetByPopAppliedProductDiscountClientUseCase(this.appliedProductDiscountClientRepo);
    };


    getAll = async (_req: ApiRequest<GetAllAppliedProductDiscountClient>, res: ApiResponse<GetAllAppliedProductDiscountClient>): Promise<ApiResponse<GetAllAppliedProductDiscountClient>> => {
        const appliedProductDiscountClientRepo: AppliedProductDiscountClientResponseSchemaDto[] = await this.getAllAppliedProductDiscountClientUseCase.execute();
        return res.status(201).json(appliedProductDiscountClientRepo);
    }
    getById = async (req: ApiRequest<GetByIdAppliedProductDiscountClient>, res: ApiResponse<GetByIdAppliedProductDiscountClient>): Promise<ApiResponse<GetByIdAppliedProductDiscountClient>> => {
        const { id }: GetByIdAppliedProductDiscountClient["params"] = req.params;
        const appliedProductDiscountClientRepo: AppliedProductDiscountClientResponseSchemaDto | null = await this.getByIdAppliedProductDiscountClientUseCase.execute(Number(id));
        return res.status(201).json(appliedProductDiscountClientRepo);
    }
    getByPop = async (req: ApiRequest<GetByPopIdAppliedProductDiscountClient>, res: ApiResponse<GetByPopIdAppliedProductDiscountClient>) => {
        const { purchase_order_product_id }: GetByPopIdAppliedProductDiscountClient["params"] = req.params;
        const appliedProductDiscountClientRepo: AppliedProductDiscountClientResponseSchemaDto | null = await this.getByPopAppliedProductDiscountClientUseCase.execute(Number(purchase_order_product_id));
        return res.status(201).json(appliedProductDiscountClientRepo);
    }
    create = async (req: ApiRequest<CreateAppliedProductDiscountClient>, res: ApiResponse<CreateAppliedProductDiscountClient>): Promise<ApiResponse<CreateAppliedProductDiscountClient>> => {
        const body: CreateAppliedProductDiscountClient["body"] = req.body;
        const appliedProductDiscountClientRepo: AppliedProductDiscountClientResponseSchemaDto = await this.createAppliedProductDiscountClientRepo.execute(body);
        return res.status(201).json(appliedProductDiscountClientRepo);
    }
    update = async (req: ApiRequest<UpdateAppliedProductDiscountClient>, res: ApiResponse<UpdateAppliedProductDiscountClient>): Promise<ApiResponse<UpdateAppliedProductDiscountClient>> => {
        const body: UpdateAppliedProductDiscountClient["body"] = req.body;
        const { id }: UpdateAppliedProductDiscountClient["params"] = req.params;
        const appliedProductDiscountClientRepo: AppliedProductDiscountClientResponseSchemaDto = await this.updateAppliedProductDiscountClientUseCase.execute(Number(id), body);
        return res.status(200).json(appliedProductDiscountClientRepo);
    }
    delete = async (req: ApiRequest<DeleteAppliedProductDiscountClient>, res: ApiResponse<DeleteAppliedProductDiscountClient>): Promise<ApiResponse<DeleteAppliedProductDiscountClient>> => {
        const { id }: DeleteAppliedProductDiscountClient["params"] = req.params;
        await this.deleteAppliedProductDiscountClientUseCase.execute(Number(id));
        return res.status(200).json(null);
    }
};