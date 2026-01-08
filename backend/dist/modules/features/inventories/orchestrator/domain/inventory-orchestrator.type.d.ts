import { InventoryLocationItemCreateProps, InventoryLocationItemProps } from "../../posicition/domain/inventory-location-item.types";
import { InventoryLocationItemResponseDto } from "../../posicition/application/dto/inventory-location-item.model.schema";
import { InventoryTransferCreateProps } from "@modules/features/inventories/transfers/domain/inventory-tranfer.types";
import { inventoryResponseDto } from "@modules/core/inventory/application/dto/inventory.model.schema";
import { InventoryCreateProps, InventoryProps } from "@modules/core/inventory/domain/inventory.types";
type NoInventoryId = {
    inventory_id?: never;
};
type InventoryLocationItemOrchestratorCreateProps = NoInventoryId & Omit<InventoryLocationItemCreateProps, "inventory_id">;
interface InventoryOrchestratorCreateProps {
    inventory: InventoryCreateProps;
    inventory_location_item: InventoryLocationItemOrchestratorCreateProps;
}
type InventoryOrchestratorCreateBatchProps = InventoryOrchestratorCreateProps[];
interface InventoryOrchestrator {
    inventory: InventoryProps;
    inventory_location_item: InventoryLocationItemProps;
}
interface InventoryOrchestratorResponseProps {
    inventory: inventoryResponseDto;
    inventory_location_item: InventoryLocationItemResponseDto;
}
type InventoryOrchestratorResponseBatchProps = InventoryOrchestratorResponseProps[];
export { InventoryOrchestratorCreateProps, InventoryOrchestrator, InventoryOrchestratorResponseBatchProps, InventoryOrchestratorCreateBatchProps, InventoryOrchestratorResponseProps, InventoryTransferCreateProps };
