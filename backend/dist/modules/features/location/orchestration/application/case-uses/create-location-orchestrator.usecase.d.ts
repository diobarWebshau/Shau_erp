import { LocationResponseOrchestratorDto } from "../dto/location-orchestrator.model.schema";
import { ILocationProductionLineRepository } from "../../../assigments/location-production-line/domain/location-production-line.repository.interface";
import { ILocationLocationTypeRepository } from "../../../assigments/location-location-type/domain/location-location-type.repository.interface";
import { ILocationQueryRepository } from "@src/modules/query/location/domain/location-query.repository.interface";
import { ILocationRepository } from "@src/modules/core/location/domain/location.repository.interface";
import { LocationCreateOrchestrator } from "../../domain/location-orchestrator.types";
interface ICreateLocationOrchestratorUseCase {
    locationRepo: ILocationRepository;
    locationLocationType: ILocationLocationTypeRepository;
    locationProductionLineType: ILocationProductionLineRepository;
    locationQueryRepo: ILocationQueryRepository;
}
export declare class CreateLocationOrchestratorUseCase {
    private readonly locationRepo;
    private readonly locationLocationTypeRepo;
    private readonly locationProductionLineRepo;
    private readonly locationQueryRepo;
    constructor({ locationLocationType, locationProductionLineType, locationRepo, locationQueryRepo }: ICreateLocationOrchestratorUseCase);
    execute: (data: LocationCreateOrchestrator) => Promise<LocationResponseOrchestratorDto>;
}
export {};
