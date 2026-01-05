"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationOrchestratorController = void 0;
const location_production_line_repository_1 = require("../../assigments/location-production-line/infrastructure/repository/location-production-line.repository");
const location_location_type_repository_1 = require("../../assigments/location-location-type/infrastructure/repository/location-location-type.repository");
const location_query_repository_1 = require("@modules/query/location/infastructure/repository/location-query.repository");
const location_repository_1 = require("@modules/core/location/infrastructure/repository/location.repository");
const create_location_orchestrator_usecase_1 = require("../application/case-uses/create-location-orchestrator.usecase");
const update_location_orchestrator_usecase_1 = require("../application/case-uses/update-location-orchestrator.usecase");
class LocationOrchestratorController {
    locationRepo;
    locationLocationTypeRepo;
    locationProductionLineRepo;
    locationQueryRepo;
    createLocationOrchestratorUseCase;
    updateLocationOrchestratorUseCase;
    constructor() {
        this.locationRepo = new location_repository_1.LocationRepository();
        this.locationLocationTypeRepo = new location_location_type_repository_1.LocationLocationTypeRepository();
        this.locationProductionLineRepo = new location_production_line_repository_1.LocationProductionLineRepository();
        this.locationQueryRepo = new location_query_repository_1.LocationQueryRepository();
        this.createLocationOrchestratorUseCase = new create_location_orchestrator_usecase_1.CreateLocationOrchestratorUseCase({
            locationLocationType: this.locationLocationTypeRepo,
            locationProductionLineType: this.locationProductionLineRepo,
            locationQueryRepo: this.locationQueryRepo,
            locationRepo: this.locationRepo
        });
        this.updateLocationOrchestratorUseCase = new update_location_orchestrator_usecase_1.UpdateLocationOrchestratorUseCase({
            locationLocationType: this.locationLocationTypeRepo,
            locationProductionLineType: this.locationProductionLineRepo,
            locationQueryRepo: this.locationQueryRepo,
            locationRepo: this.locationRepo
        });
    }
    ;
    create = async (req, res) => {
        const { payload } = req.body;
        const locationResponse = await this.createLocationOrchestratorUseCase.execute(payload);
        return res.status(201).json(locationResponse);
    };
    update = async (req, res) => {
        const { payload } = req.body;
        const { id } = req.params;
        const locationResponse = await this.updateLocationOrchestratorUseCase.execute(Number(id), payload);
        return res.status(200).json(locationResponse);
    };
}
exports.LocationOrchestratorController = LocationOrchestratorController;
;
