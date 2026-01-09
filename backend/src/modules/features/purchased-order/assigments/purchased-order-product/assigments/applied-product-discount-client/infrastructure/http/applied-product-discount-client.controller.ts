import { GetByPopAppliedProductDiscountClientUseCase } from "../../application/use-cases/get-by-pop-applied-product-discount-client.usecase";
import { GetByIdAppliedProductDiscountClientUseCase } from "../../application/use-cases/get-by-id-applied-product-discount-client.usecase";
import { GetAllAppliedProductDiscountClientUseCase } from "../../application/use-cases/get-all-applied-product-discount-client.usecase";
import { CreateAppliedProductDiscountClientUseCase } from "../../application/use-cases/create-applied-product-discount-client.usecase";
import { DeleteAppliedProductDiscountClientUseCase } from "../../application/use-cases/delete-applied-product-discount-client.usecase";
import { UpdateAppliedProductDiscountClientUseCase } from "../../application/use-cases/update-applied-product-discount-client.usecase";
import { AppliedProductDiscountClientResponseDto } from "../../application/dto/applied-product-discount-client.model.schema";
import { IAppliedProductDiscountClientRepository } from "../../domain/applied-product-discount-client.repository.interface";
import { AppliedProductDiscountClientRepository } from "../repository/applied-product-discount-client.repository";
import { AppliedProductDiscountClientProps } from "../../domain/applied-product-discount-client.types";
import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import {
    CreateAppliedProductDiscountClient, DeleteAppliedProductDiscountClient,
    GetAllAppliedProductDiscountClient, GetByIdAppliedProductDiscountClient,
    GetByPopIdAppliedProductDiscountClient, UpdateAppliedProductDiscountClient
} from "./../../application/dto/applied-product-discount-client.endpoint.schema";

const mapAppliedProductDiscountClientDomainToDto = (data: AppliedProductDiscountClientProps): AppliedProductDiscountClientResponseDto => {
    return ({
        ...data,
        discount_percentage: data.discount_percentage.toString(),
        created_at: data.created_at.toISOString(),
        updated_at: data.updated_at.toISOString(),
    });
};

export class AppliedProductDiscountClientController {

    private readonly appliedProductDiscountClientRepo: IAppliedProductDiscountClientRepository;
    private readonly createAppliedProductDiscountClientUseCase: CreateAppliedProductDiscountClientUseCase;
    private readonly deleteAppliedProductDiscountClientUseCase: DeleteAppliedProductDiscountClientUseCase;
    private readonly updateAppliedProductDiscountClientUseCase: UpdateAppliedProductDiscountClientUseCase;
    private readonly getAllAppliedProductDiscountClientUseCase: GetAllAppliedProductDiscountClientUseCase;
    private readonly getByIdAppliedProductDiscountClientUseCase: GetByIdAppliedProductDiscountClientUseCase;
    private readonly getByPopAppliedProductDiscountClientUseCase: GetByPopAppliedProductDiscountClientUseCase;

    constructor() {
        this.appliedProductDiscountClientRepo = new AppliedProductDiscountClientRepository();
        this.createAppliedProductDiscountClientUseCase = new CreateAppliedProductDiscountClientUseCase(this.appliedProductDiscountClientRepo);
        this.deleteAppliedProductDiscountClientUseCase = new DeleteAppliedProductDiscountClientUseCase(this.appliedProductDiscountClientRepo);
        this.updateAppliedProductDiscountClientUseCase = new UpdateAppliedProductDiscountClientUseCase(this.appliedProductDiscountClientRepo);
        this.getAllAppliedProductDiscountClientUseCase = new GetAllAppliedProductDiscountClientUseCase(this.appliedProductDiscountClientRepo);
        this.getByIdAppliedProductDiscountClientUseCase = new GetByIdAppliedProductDiscountClientUseCase(this.appliedProductDiscountClientRepo);
        this.getByPopAppliedProductDiscountClientUseCase = new GetByPopAppliedProductDiscountClientUseCase(this.appliedProductDiscountClientRepo);
    };

    getAll = async (_req: ApiRequest<GetAllAppliedProductDiscountClient>, res: ApiResponse<GetAllAppliedProductDiscountClient>): Promise<ApiResponse<GetAllAppliedProductDiscountClient>> => {
        const appliedProductDiscountClietResponse: AppliedProductDiscountClientProps[] = await this.getAllAppliedProductDiscountClientUseCase.execute();
        const appliedProductDiscountClietResult = appliedProductDiscountClietResponse.map(mapAppliedProductDiscountClientDomainToDto);
        return res.status(201).json(appliedProductDiscountClietResult);
    }
    getById = async (req: ApiRequest<GetByIdAppliedProductDiscountClient>, res: ApiResponse<GetByIdAppliedProductDiscountClient>): Promise<ApiResponse<GetByIdAppliedProductDiscountClient>> => {
        const { id }: GetByIdAppliedProductDiscountClient["params"] = req.params;
        const appliedProductDiscountClietResponse: AppliedProductDiscountClientProps | null = await this.getByIdAppliedProductDiscountClientUseCase.execute(Number(id));
        if (!appliedProductDiscountClietResponse) return res.status(404).json(null);
        const appliedProductDiscountClietResult = mapAppliedProductDiscountClientDomainToDto(appliedProductDiscountClietResponse);
        return res.status(201).json(appliedProductDiscountClietResult);
    }
    getByPop = async (req: ApiRequest<GetByPopIdAppliedProductDiscountClient>, res: ApiResponse<GetByPopIdAppliedProductDiscountClient>) => {
        const { purchase_order_product_id }: GetByPopIdAppliedProductDiscountClient["params"] = req.params;
        const appliedProductDiscountClietResponse: AppliedProductDiscountClientProps | null = await this.getByPopAppliedProductDiscountClientUseCase.execute(Number(purchase_order_product_id));
        if (!appliedProductDiscountClietResponse) return res.status(404).json(null);
        const appliedProductDiscountClietResult = mapAppliedProductDiscountClientDomainToDto(appliedProductDiscountClietResponse);
        return res.status(201).json(appliedProductDiscountClietResult);
    }
    create = async (req: ApiRequest<CreateAppliedProductDiscountClient>, res: ApiResponse<CreateAppliedProductDiscountClient>): Promise<ApiResponse<CreateAppliedProductDiscountClient>> => {
        const body: CreateAppliedProductDiscountClient["body"] = req.body;
        const appliedProductDiscountClietResponse: AppliedProductDiscountClientProps = await this.createAppliedProductDiscountClientUseCase.execute(body);
        const appliedProductDiscountClietResult = mapAppliedProductDiscountClientDomainToDto(appliedProductDiscountClietResponse);
        return res.status(201).json(appliedProductDiscountClietResult);
    }
    update = async (req: ApiRequest<UpdateAppliedProductDiscountClient>, res: ApiResponse<UpdateAppliedProductDiscountClient>): Promise<ApiResponse<UpdateAppliedProductDiscountClient>> => {
        const body: UpdateAppliedProductDiscountClient["body"] = req.body;
        const { id }: UpdateAppliedProductDiscountClient["params"] = req.params;
        const appliedProductDiscountClietResponse: AppliedProductDiscountClientProps = await this.updateAppliedProductDiscountClientUseCase.execute(Number(id), body);
        const appliedProductDiscountClietResult = mapAppliedProductDiscountClientDomainToDto(appliedProductDiscountClietResponse);
        return res.status(200).json(appliedProductDiscountClietResult);
    }
    delete = async (req: ApiRequest<DeleteAppliedProductDiscountClient>, res: ApiResponse<DeleteAppliedProductDiscountClient>): Promise<ApiResponse<DeleteAppliedProductDiscountClient>> => {
        const { id }: DeleteAppliedProductDiscountClient["params"] = req.params;
        await this.deleteAppliedProductDiscountClientUseCase.execute(Number(id));
        return res.status(200).json(null);
    }
};