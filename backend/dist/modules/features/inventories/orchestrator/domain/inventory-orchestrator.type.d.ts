import { InventoryLocationItemResponseSchemaDto } from "../../posicition/application/dto/inventory-location-item.model.schema";
import { inventoryResponseDto } from "@src/modules/core/inventory/application/dto/inventory.model.schema";
import { InventoryLocationItemCreateProps } from "../../posicition/domain/inventory-location-item.types";
import { InventoryCreateProps } from "@modules/core/inventory/domain/inventory.types";
import { InventoryTransferCreateProps } from "@src/modules/features/inventories/transfers/domain/inventory-tranfer.types";
type NoInventoryId = {
    inventory_id?: never;
};
type InventoryLocationItemOrchestratorCreateProps = NoInventoryId & Omit<InventoryLocationItemCreateProps, "inventory_id">;
interface inventoryOrchestratorCreateProps {
    inventory: InventoryCreateProps;
    inventory_location_item: InventoryLocationItemOrchestratorCreateProps;
}
interface inventoryOrchestratorResponseProps {
    inventory: inventoryResponseDto;
    inventory_location_item: InventoryLocationItemResponseSchemaDto;
}
export { inventoryOrchestratorCreateProps, inventoryOrchestratorResponseProps, InventoryTransferCreateProps };
