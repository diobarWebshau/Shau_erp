"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLocationOrchestratorUseCase = void 0;
const sequelize_1 = require("sequelize");
const http_error_1 = __importDefault(require("@shared/errors/http/http-error"));
const sequelize_2 = require("@config/mysql/sequelize");
class UpdateLocationOrchestratorUseCase {
    locationRepo;
    locationLocationTypeRepo;
    locationProductionLineRepo;
    locationQueryRepo;
    constructor({ locationLocationType, locationProductionLineType, locationRepo, locationQueryRepo }) {
        this.locationRepo = locationRepo;
        this.locationLocationTypeRepo = locationLocationType;
        this.locationProductionLineRepo = locationProductionLineType;
        this.locationQueryRepo = locationQueryRepo;
    }
    ;
    execute = async (id, data) => {
        const tx = await sequelize_2.sequelize.transaction({
            isolationLevel: sequelize_1.Transaction.ISOLATION_LEVELS.REPEATABLE_READ
        });
        try {
            const { location_location_types_manager, location_production_lines_manager, location } = data;
            const locationResponse = await this.locationRepo.update(id, location, tx);
            const isChangeLocationLocationType = (location_location_types_manager?.added ?? []).length > 0 ||
                (location_location_types_manager?.deleted ?? []).length > 0 ||
                (location_location_types_manager?.updated ?? []).length > 0;
            const isChangeLocationProductionLine = (location_production_lines_manager?.added ?? []).length > 0 ||
                (location_production_lines_manager?.deleted ?? []).length > 0 ||
                (location_production_lines_manager?.updated ?? []).length > 0;
            if (isChangeLocationLocationType) {
                const added = location_location_types_manager?.added ?? [];
                const updated = location_location_types_manager?.updated ?? [];
                const deleted = location_location_types_manager?.deleted ?? [];
                if (added.length) {
                    for (const llt of added) {
                        const lltNew = {
                            ...llt,
                            location_id: locationResponse.id
                        };
                        await this.locationLocationTypeRepo.create(lltNew, tx);
                    }
                }
                if (updated.length) {
                    for (const llt of updated) {
                        const { id, ...rest } = llt;
                        await this.locationLocationTypeRepo.update(id, rest, tx);
                    }
                }
                if (deleted.length) {
                    for (const llt of updated) {
                        const { id } = llt;
                        await this.locationLocationTypeRepo.delete(id, tx);
                    }
                }
            }
            ;
            if (isChangeLocationProductionLine) {
                const added = location_production_lines_manager?.added ?? [];
                const updated = location_production_lines_manager?.updated ?? [];
                const deleted = location_production_lines_manager?.deleted ?? [];
                if (added.length) {
                    for (const lpl of added) {
                        const lplNew = {
                            ...lpl,
                            location_id: locationResponse.id
                        };
                        await this.locationProductionLineRepo.create(lplNew, tx);
                    }
                }
                if (updated.length) {
                    for (const lpl of updated) {
                        const { id, ...rest } = lpl;
                        await this.locationProductionLineRepo.update(id, rest, tx);
                    }
                }
                if (deleted.length) {
                    for (const lpl of updated) {
                        const { id } = lpl;
                        await this.locationProductionLineRepo.delete(id, tx);
                    }
                }
            }
            ;
            const locationQueryResponse = await this.locationQueryRepo.getByIdLocationFullQuery(locationResponse.id, tx);
            if (!locationQueryResponse)
                throw new http_error_1.default(500, "No se pudo acceder a la locación despues de haber sido actualizada.");
            const { location_location_types: llt_query, location_production_lines: lpl_query, ...location_query } = locationQueryResponse;
            const locationFullResult = {
                location: location_query,
                location_location_types: llt_query,
                location_production_lines: lpl_query
            };
            await tx.commit();
            return locationFullResult;
        }
        catch (error) {
            await tx.rollback();
            throw error;
        }
    };
}
exports.UpdateLocationOrchestratorUseCase = UpdateLocationOrchestratorUseCase;
;
