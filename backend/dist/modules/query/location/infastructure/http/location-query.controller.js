"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationQueryController = void 0;
const get_by_id_location_query_orchestrator_usecase_1 = require("../../application/use-cases/get-by-id-location-query-orchestrator.usecase");
const get_all_location_query_orchestrator_usecase_1 = require("../../application/use-cases/get-all-location-query-orchestrator.usecase");
const get_by_id_location_full_query_usecase_1 = require("../../application/use-cases/get-by-id-location-full-query.usecase");
const get_all_location_full_query_usecase_1 = require("../../application/use-cases/get-all-location-full-query.usecase");
const location_query_mapper_1 = require("@modules/core/location/infrastructure/http/location-query-mapper");
const location_query_repository_1 = require("../repository/location-query.repository");
class LocationQueryController {
    repo;
    getAllLocationOrchestratorUseCase;
    getAllLocationFullQueryUseCase;
    getByIdLocationFullQueryUseCase;
    getByIdLocationOrchestratorUseCase;
    constructor() {
        this.repo = new location_query_repository_1.LocationQueryRepository();
        this.getAllLocationFullQueryUseCase = new get_all_location_full_query_usecase_1.GetAllLocationFullQueryUseCase(this.repo);
        this.getAllLocationOrchestratorUseCase = new get_all_location_query_orchestrator_usecase_1.GetAllLocationQueryOrchestratorUseCase(this.repo);
        this.getByIdLocationFullQueryUseCase = new get_by_id_location_full_query_usecase_1.GetByIdLocationFullQueryUseCase(this.repo);
        this.getByIdLocationOrchestratorUseCase = new get_by_id_location_query_orchestrator_usecase_1.GetByIdLocationQueryOrchestratorUseCase(this.repo);
    }
    getAllLocationOrchestrator = async (req, res) => {
        const queryRequest = req.query;
        const query = (0, location_query_mapper_1.mapLocationQueryToCriteria)(queryRequest);
        const LocationResponses = await this.getAllLocationOrchestratorUseCase.execute(query);
        return res.status(200).json(LocationResponses);
    };
    getByIdLocationOrchestrator = async (req, res) => {
        const { id } = req.params;
        const LocationResponse = await this.getByIdLocationOrchestratorUseCase.execute(Number(id));
        return res.status(200).json(LocationResponse);
    };
    getAllLocationFullQuery = async (req, res) => {
        const queryRequest = req.query;
        const query = (0, location_query_mapper_1.mapLocationQueryToCriteria)(queryRequest);
        const LocationResponses = await this.getAllLocationFullQueryUseCase.execute(query);
        return res.status(200).json(LocationResponses);
    };
    getByIdLocationFullQuery = async (req, res) => {
        const { id } = req.params;
        const LocationResponse = await this.getByIdLocationFullQueryUseCase.execute(Number(id));
        return res.status(200).json(LocationResponse);
    };
}
exports.LocationQueryController = LocationQueryController;
;
