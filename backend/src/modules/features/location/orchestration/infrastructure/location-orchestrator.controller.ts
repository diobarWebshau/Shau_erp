import { LocationProductionLineRepository } from "../../assigments/location-production-line/infrastructure/repository/location-production-line.repository";
import { LocationLocationTypeRepository } from "../../assigments/location-location-type/infrastructure/repository/location-location-type.repository";
import { ILocationProductionLineRepository } from "../../assigments/location-production-line/domain/location-production-line.repository.interface";
import { CreateLocationOrchestratorSchema, UpdateLocationOrchestratorSchema } from "./../application/dto/location-orchestrator.endpoint.schema"
import { ILocationLocationTypeRepository } from "../../assigments/location-location-type/domain/location-location-type.repository.interface";
import { mapLocationOrchestratorDomainToDto } from "@modules/query/location/infastructure/http/location-query.controller"
import { LocationQueryRepository } from "@modules/query/location/infastructure/repository/location-query.repository";
import { CreateLocationOrchestratorUseCase } from "../application/case-uses/create-location-orchestrator.usecase";
import { UpdateLocationOrchestratorUseCase } from "../application/case-uses/update-location-orchestrator.usecase";
import { ILocationQueryRepository } from "@modules/query/location/domain/location-query.repository.interface";
import { LocationRepository } from "@modules/core/location/infrastructure/repository/location.repository";
import { ILocationRepository } from "@modules/core/location/domain/location.repository.interface";
import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { LocationOrchestrator } from "../domain/location-orchestrator.types";

export class LocationOrchestratorController {
    private readonly locationRepo: ILocationRepository;
    private readonly locationLocationTypeRepo: ILocationLocationTypeRepository;
    private readonly locationProductionLineRepo: ILocationProductionLineRepository;
    private readonly locationQueryRepo: ILocationQueryRepository;
    private readonly createLocationOrchestratorUseCase: CreateLocationOrchestratorUseCase;
    private readonly updateLocationOrchestratorUseCase: UpdateLocationOrchestratorUseCase;


    constructor() {
        this.locationRepo = new LocationRepository();
        this.locationLocationTypeRepo = new LocationLocationTypeRepository();
        this.locationProductionLineRepo = new LocationProductionLineRepository();
        this.locationQueryRepo = new LocationQueryRepository();
        this.createLocationOrchestratorUseCase = new CreateLocationOrchestratorUseCase({
            locationLocationType: this.locationLocationTypeRepo,
            locationProductionLineType: this.locationProductionLineRepo,
            locationQueryRepo: this.locationQueryRepo,
            locationRepo: this.locationRepo
        });
        this.updateLocationOrchestratorUseCase = new UpdateLocationOrchestratorUseCase({
            locationLocationType: this.locationLocationTypeRepo,
            locationProductionLineType: this.locationProductionLineRepo,
            locationQueryRepo: this.locationQueryRepo,
            locationRepo: this.locationRepo
        });
    };

    create = async (req: ApiRequest<CreateLocationOrchestratorSchema>, res: ApiResponse<CreateLocationOrchestratorSchema>) => {
        const { payload }: CreateLocationOrchestratorSchema["body"] = req.body;
        const locationResponse: LocationOrchestrator = await this.createLocationOrchestratorUseCase.execute(payload);
        return res.status(201).json(mapLocationOrchestratorDomainToDto(locationResponse));
    };

    update = async (req: ApiRequest<UpdateLocationOrchestratorSchema>, res: ApiResponse<UpdateLocationOrchestratorSchema>) => {
        const { payload }: UpdateLocationOrchestratorSchema["body"] = req.body;
        const { id }: UpdateLocationOrchestratorSchema["params"] = req.params;
        const locationResponse: LocationOrchestrator = await this.updateLocationOrchestratorUseCase.execute(Number(id), payload);
        return res.status(200).json(mapLocationOrchestratorDomainToDto(locationResponse));
    };
};