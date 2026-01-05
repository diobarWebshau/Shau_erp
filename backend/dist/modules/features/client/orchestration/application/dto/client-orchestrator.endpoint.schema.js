"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientOrchestratorSchema = exports.updateClientOrchestratorSchema = void 0;
const client_orchestrator_model_schema_1 = require("./client-orchestrator.model.schema");
const zod_1 = __importDefault(require("zod"));
const createClientOrchestratorSchema = zod_1.default.object({
    params: zod_1.default.object({}).strict(),
    query: zod_1.default.object({}).strict(),
    body: client_orchestrator_model_schema_1.clientCreateRequestOrchestratorSchema,
    response: client_orchestrator_model_schema_1.clientResponseOrchestratorSchema
});
exports.createClientOrchestratorSchema = createClientOrchestratorSchema;
const updateClientOrchestratorSchema = zod_1.default.object({
    params: zod_1.default.object({ id: zod_1.default.string() }).strict(),
    query: zod_1.default.object({}).strict(),
    body: client_orchestrator_model_schema_1.clientUpdateRequestOrchestratorSchema,
    response: client_orchestrator_model_schema_1.clientResponseOrchestratorSchema
});
exports.updateClientOrchestratorSchema = updateClientOrchestratorSchema;
