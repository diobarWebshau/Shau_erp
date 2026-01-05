import { LocationResponseOrchestratorDto } from "../dto/location-orchestrator.model.schema";
import { ILocationProductionLineRepository } from "../../../assigments/location-production-line/domain/location-production-line.repository.interface";
import { ILocationLocationTypeRepository } from "../../../assigments/location-location-type/domain/location-location-type.repository.interface";
import { ILocationQueryRepository } from "@modules/query/location/domain/location-query.repository.interface";
import { ILocationRepository } from "@modules/core/location/domain/location.repository.interface";
import { LocationUpdateOrchestrator } from "../../domain/location-orchestrator.types";
interface IUpdateLocationOrchestratorUseCase {
    locationRepo: ILocationRepository;
    locationLocationType: ILocationLocationTypeRepository;
    locationProductionLineType: ILocationProductionLineRepository;
    locationQueryRepo: ILocationQueryRepository;
}
export declare class UpdateLocationOrchestratorUseCase {
    private readonly locationRepo;
    private readonly locationLocationTypeRepo;
    private readonly locationProductionLineRepo;
    private readonly locationQueryRepo;
    constructor({ locationLocationType, locationProductionLineType, locationRepo, locationQueryRepo }: IUpdateLocationOrchestratorUseCase);
    execute: (id: number, data: LocationUpdateOrchestrator) => Promise<LocationResponseOrchestratorDto>;
}
export {};
