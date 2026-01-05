import { GetByPopAppliedProductDiscountRangeUseCase } from "../../application/use-cases/get-by-pop-applied-product-discount-range.usecase";
import { GetByIdAppliedProductDiscountRangeUseCase } from "../../application/use-cases/get-by-id-applied-product-discount-range.usecase";
import { GetAllAppliedProductDiscountRangeUseCase } from "../../application/use-cases/get-all-applied-product-discount-range.usecase";
import { CreateAppliedProductDiscountRangeUseCase } from "../../application/use-cases/create-applied-product-discount-range.usecase";
import { DeleteAppliedProductDiscountRangeUseCase } from "../../application/use-cases/delete-applied-product-discount-range.usecase";
import { UpdateAppliedProductDiscountRangeUseCase } from "../../application/use-cases/update-applied-product-discount-range.usecase";
import { AppliedProductDiscountRangeResponseSchemaDto } from "../../application/dto/applied-product-discount-range.model.schema";
import { IAppliedProductDiscountRangeRepository } from "../../domain/applied-product-discount-range.repository.interface";
import { AppliedProductDiscountRangeRepository } from "../repository/applied-product-discount-range.repository";
import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import {
    CreateAppliedProductDiscountRangeSchema, DeleteAppliedProductDiscountRangeSchema,
    GetAllAppliedProductDiscountRangeSchema, GetByIdAppliedProductDiscountRangeSchema,
    GetByPopAppliedProductDiscountRangeSchema, UpdateAppliedProductDiscountRangeSchema
} from "./../../application/dto/applied-product-discount-range.endpoint.schema";

export class AppliedProductDiscountRangeController {

    private readonly appliedProductDiscountRangeRepo: IAppliedProductDiscountRangeRepository;
    private readonly createAppliedProductDiscountRangeRepo: CreateAppliedProductDiscountRangeUseCase;
    private readonly deleteAppliedProductDiscountRangeUseCase: DeleteAppliedProductDiscountRangeUseCase;
    private readonly updateAppliedProductDiscountRangeUseCase: UpdateAppliedProductDiscountRangeUseCase;
    private readonly getAllAppliedProductDiscountRangeUseCase: GetAllAppliedProductDiscountRangeUseCase;
    private readonly getByIdAppliedProductDiscountRangeUseCase: GetByIdAppliedProductDiscountRangeUseCase;
    private readonly getByPopAppliedProductDiscountRangeUseCase: GetByPopAppliedProductDiscountRangeUseCase;

    constructor() {
        this.appliedProductDiscountRangeRepo = new AppliedProductDiscountRangeRepository();
        this.createAppliedProductDiscountRangeRepo = new CreateAppliedProductDiscountRangeUseCase(this.appliedProductDiscountRangeRepo);
        this.deleteAppliedProductDiscountRangeUseCase = new DeleteAppliedProductDiscountRangeUseCase(this.appliedProductDiscountRangeRepo);
        this.updateAppliedProductDiscountRangeUseCase = new UpdateAppliedProductDiscountRangeUseCase(this.appliedProductDiscountRangeRepo);
        this.getAllAppliedProductDiscountRangeUseCase = new GetAllAppliedProductDiscountRangeUseCase(this.appliedProductDiscountRangeRepo);
        this.getByIdAppliedProductDiscountRangeUseCase = new GetByIdAppliedProductDiscountRangeUseCase(this.appliedProductDiscountRangeRepo);
        this.getByPopAppliedProductDiscountRangeUseCase = new GetByPopAppliedProductDiscountRangeUseCase(this.appliedProductDiscountRangeRepo);
    };


    getAll = async (_req: ApiRequest<GetAllAppliedProductDiscountRangeSchema>, res: ApiResponse<GetAllAppliedProductDiscountRangeSchema>): Promise<ApiResponse<GetAllAppliedProductDiscountRangeSchema>> => {
        const appliedProductDiscountRangeRepo: AppliedProductDiscountRangeResponseSchemaDto[] = await this.getAllAppliedProductDiscountRangeUseCase.execute();
        return res.status(201).json(appliedProductDiscountRangeRepo);
    }
    getById = async (req: ApiRequest<GetByIdAppliedProductDiscountRangeSchema>, res: ApiResponse<GetByIdAppliedProductDiscountRangeSchema>): Promise<ApiResponse<GetByIdAppliedProductDiscountRangeSchema>> => {
        const { id }: GetByIdAppliedProductDiscountRangeSchema["params"] = req.params;
        const appliedProductDiscountRangeRepo: AppliedProductDiscountRangeResponseSchemaDto | null = await this.getByIdAppliedProductDiscountRangeUseCase.execute(Number(id));
        return res.status(201).json(appliedProductDiscountRangeRepo);
    }
    getByPop = async (req: ApiRequest<GetByPopAppliedProductDiscountRangeSchema>, res: ApiResponse<GetByPopAppliedProductDiscountRangeSchema>) => {
        const { purchase_order_product_id }: GetByPopAppliedProductDiscountRangeSchema["params"] = req.params;
        const appliedProductDiscountRangeRepo: AppliedProductDiscountRangeResponseSchemaDto | null = await this.getByPopAppliedProductDiscountRangeUseCase.execute(Number(purchase_order_product_id));
        return res.status(201).json(appliedProductDiscountRangeRepo);
    }
    create = async (req: ApiRequest<CreateAppliedProductDiscountRangeSchema>, res: ApiResponse<CreateAppliedProductDiscountRangeSchema>): Promise<ApiResponse<CreateAppliedProductDiscountRangeSchema>> => {
        const body: CreateAppliedProductDiscountRangeSchema["body"] = req.body;
        const appliedProductDiscountRangeRepo: AppliedProductDiscountRangeResponseSchemaDto = await this.createAppliedProductDiscountRangeRepo.execute(body);
        return res.status(201).json(appliedProductDiscountRangeRepo);
    }
    update = async (req: ApiRequest<UpdateAppliedProductDiscountRangeSchema>, res: ApiResponse<UpdateAppliedProductDiscountRangeSchema>): Promise<ApiResponse<UpdateAppliedProductDiscountRangeSchema>> => {
        const body: UpdateAppliedProductDiscountRangeSchema["body"] = req.body;
        const { id }: UpdateAppliedProductDiscountRangeSchema["params"] = req.params;
        const appliedProductDiscountRangeRepo: AppliedProductDiscountRangeResponseSchemaDto = await this.updateAppliedProductDiscountRangeUseCase.execute(Number(id), body);
        return res.status(200).json(appliedProductDiscountRangeRepo);
    }
    delete = async (req: ApiRequest<DeleteAppliedProductDiscountRangeSchema>, res: ApiResponse<DeleteAppliedProductDiscountRangeSchema>): Promise<ApiResponse<DeleteAppliedProductDiscountRangeSchema>> => {
        const { id }: DeleteAppliedProductDiscountRangeSchema["params"] = req.params;
        await this.deleteAppliedProductDiscountRangeUseCase.execute(Number(id));
        return res.status(200).json(null);
    }
}; 