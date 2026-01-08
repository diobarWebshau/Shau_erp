// import { LocationResponseDto } from "@src/modules/core/location/application/dto/location.model.schema"
// import { ItemQueryResponseDTO } from "../../item/application/dto/item-query.model.schema";
// import { LocationProps } from "@src/modules/core/location/domain/location.types";
// import { ItemQueryProps } from "../../item/domain/item-query.types"

import { DecimalVO } from "@src/shared/domain/value-objects/decimal.vo";

interface InventoryQueryProps {
    stock: DecimalVO,
    item_id: number,
    available: DecimalVO,
    commited: DecimalVO,
    item_name: string,
    item_type: "product" | "input",
    location_id: number,
    inventory_id: number,
    minimum_stock: DecimalVO,
    maximum_stock: DecimalVO,
    lead_time: number,
    location_name: string,
    qty: number,
}

// type InventoryFullQueryProps = InventoryQueryProps & {
//     location: LocationProps,
//     item: ItemQueryProps
// };

// type InventoryQueryResponseProps = InventoryQueryProps & {
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