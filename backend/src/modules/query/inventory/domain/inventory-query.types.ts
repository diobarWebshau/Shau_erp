// import { LocationResponseDto } from "@src/modules/core/location/application/dto/location.model.schema"
// import { ItemQueryResponseDTO } from "../../item/application/dto/item-query.model.schema";
// import { LocationProps } from "@src/modules/core/location/domain/location.types";
// import { ItemQueryProps } from "../../item/domain/item-query.types"

interface InventoryQueryProps {
    stock: number,
    item_id: number,
    available: number,
    commited: number,
    item_name: string,
    item_type: "product" | "input",
    location_id: number,
    inventory_id: number,
    minimum_stock: number,
    maximum_stock: number,
    lead_time: number,
    location_name: string,
    qty: number,
}

// type InventoryQueryProps = InventoryDetailProps & {
//     location: LocationProps,
//     item: ItemQueryProps
// };

// type InventoryQueryResponseProps = InventoryDetailProps & {
//     location: LocationResponseDto,
//     item: ItemQueryResponseDTO
// };

interface InventorySearchQueryProp {
    filter: string
}


export type {
    // InventoryQueryResponseProps,
    InventoryQueryProps,
    InventorySearchQueryProp
    // InventoryQueryProps
};