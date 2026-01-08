"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationQueryController = exports.mapLocationFullQueryDomainToDto = exports.mapLocationOrchestratorDomainToDto = void 0;
const get_by_id_location_query_orchestrator_usecase_1 = require("../../application/use-cases/get-by-id-location-query-orchestrator.usecase");
const get_all_location_query_orchestrator_usecase_1 = require("../../application/use-cases/get-all-location-query-orchestrator.usecase");
const get_by_id_location_full_query_usecase_1 = require("../../application/use-cases/get-by-id-location-full-query.usecase");
const get_all_location_full_query_usecase_1 = require("../../application/use-cases/get-all-location-full-query.usecase");
const location_query_mapper_1 = require("@modules/core/location/infrastructure/http/location-query-mapper");
const location_query_repository_1 = require("../repository/location-query.repository");
const mapLocationOrchestratorDomainToDto = (data) => {
    const { location, location_location_types, location_production_lines } = data;
    return ({
        location: {
            ...location,
            created_at: location.created_at.toISOString(),
            updated_at: location.updated_at.toISOString(),
        },
        location_location_types: location_location_types.map((llt) => ({
            ...llt,
            location: {
                ...llt.location,
                created_at: llt.location.created_at.toISOString(),
                updated_at: llt.location.updated_at.toISOString(),
            },
            location_type: {
                ...llt.location_type,
                created_at: llt.location_type.created_at.toISOString(),
                updated_at: llt.location_type.updated_at.toISOString(),
            }
        })),
        location_production_lines: location_production_lines.map((lpl) => ({
            ...lpl,
            location: {
                ...lpl.location,
                created_at: lpl.location.created_at.toISOString(),
                updated_at: lpl.location.updated_at.toISOString(),
            },
            production_line: {
                ...lpl.production_line,
                created_at: lpl.production_line.created_at.toISOString(),
                updated_at: lpl.production_line.updated_at.toISOString(),
            }
        }))
    });
};
exports.mapLocationOrchestratorDomainToDto = mapLocationOrchestratorDomainToDto;
const mapLocationFullQueryDomainToDto = (data) => {
    const { location_production_lines, location_location_types, ...client } = data;
    return ({
        ...client,
        created_at: client.created_at.toISOString(),
        updated_at: client.updated_at.toISOString(),
        location_location_types: location_location_types.map((llt) => ({
            ...llt,
            location: {
                ...llt.location,
                created_at: llt.location.created_at.toISOString(),
                updated_at: llt.location.updated_at.toISOString(),
            },
            location_type: {
                ...llt.location_type,
                created_at: llt.location_type.created_at.toISOString(),
                updated_at: llt.location_type.updated_at.toISOString(),
            }
        })),
        location_production_lines: location_production_lines.map((lpl) => ({
            ...lpl,
            location: {
                ...lpl.location,
                created_at: lpl.location.created_at.toISOString(),
                updated_at: lpl.location.updated_at.toISOString(),
            },
            production_line: {
                ...lpl.production_line,
                created_at: lpl.production_line.created_at.toISOString(),
                updated_at: lpl.production_line.updated_at.toISOString(),
            }
        }))
    });
};
exports.mapLocationFullQueryDomainToDto = mapLocationFullQueryDomainToDto;
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
        const locationResponses = await this.getAllLocationOrchestratorUseCase.execute(query);
        const locationResult = locationResponses.map(exports.mapLocationOrchestratorDomainToDto);
        return res.status(200).json(locationResult);
    };
    getByIdLocationOrchestrator = async (req, res) => {
        const { id } = req.params;
        const locationResponse = await this.getByIdLocationOrchestratorUseCase.execute(Number(id));
        if (!locationResponse)
            return res.status(204).json(null);
        const locationResult = (0, exports.mapLocationOrchestratorDomainToDto)(locationResponse);
        return res.status(200).json(locationResult);
    };
    getAllLocationFullQuery = async (req, res) => {
        const queryRequest = req.query;
        const query = (0, location_query_mapper_1.mapLocationQueryToCriteria)(queryRequest);
        const locationResponses = await this.getAllLocationFullQueryUseCase.execute(query);
        const locationResult = locationResponses.map(exports.mapLocationFullQueryDomainToDto);
        return res.status(200).json(locationResult);
    };
    getByIdLocationFullQuery = async (req, res) => {
        const { id } = req.params;
        const locationResponse = await this.getByIdLocationFullQueryUseCase.execute(Number(id));
        if (!locationResponse)
            return res.status(204).json(null);
        const locationResult = (0, exports.mapLocationFullQueryDomainToDto)(locationResponse);
        return res.status(200).json(locationResult);
    };
}
exports.LocationQueryController = LocationQueryController;
;
