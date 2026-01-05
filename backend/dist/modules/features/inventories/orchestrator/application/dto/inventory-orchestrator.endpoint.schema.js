"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransferInventoryOrchestratorSchema = exports.createInventoryOrchestratorSchema = void 0;
const inventory_orchestrator_model_schema_1 = require("./inventory-orchestrator.model.schema");
const zod_1 = __importDefault(require("zod"));
const createInventoryOrchestratorSchema = zod_1.default.object({
    params: zod_1.default.object({}).strict(),
    query: zod_1.default.object({}).strict(),
    body: inventory_orchestrator_model_schema_1.inventoryOrchestratorCreateSchema,
    response: inventory_orchestrator_model_schema_1.inventoryOrchestratorResponseSchema,
});
exports.createInventoryOrchestratorSchema = createInventoryOrchestratorSchema;
const createTransferInventoryOrchestratorSchema = zod_1.default.object({
    params: zod_1.default.object({}).strict(),
    query: zod_1.default.object({}).strict(),
    body: inventory_orchestrator_model_schema_1.inventoryTransferCreateSchema,
    response: inventory_orchestrator_model_schema_1.inventoryTransferResponseSchema,
});
exports.createTransferInventoryOrchestratorSchema = createTransferInventoryOrchestratorSchema;
