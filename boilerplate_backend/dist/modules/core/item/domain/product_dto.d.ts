export interface ProductDTO {
    id: number;
    name: string;
    description: string | null;
    type: string | null;
    presentation: string | null;
    unit_of_measure: string | null;
    production_cost: number | null;
    storage_conditions: string | null;
    barcode: number | null;
    sku: string | null;
    sale_price: number | null;
    active: boolean;
    photo: string | null;
    custom_id: string | null;
    is_draft: boolean;
    created_at: string;
    updated_at: string;
}
export interface CreateProductBody {
    name: string;
    description?: string | null;
    type?: string | null;
    presentation?: string | null;
    unit_of_measure?: string | null;
    production_cost?: number | null;
    storage_conditions?: string | null;
    barcode?: number | null;
    sku?: string | null;
    sale_price?: number | null;
    active?: boolean;
    photo?: string | null;
    custom_id?: string | null;
    is_draft?: boolean;
}
export interface UpdateProductBody {
    id: number;
    name?: string;
    description?: string | null;
    type?: string | null;
    presentation?: string | null;
    unit_of_measure?: string | null;
    production_cost?: number | null;
    storage_conditions?: string | null;
    barcode?: number | null;
    sku?: string | null;
    sale_price?: number | null;
    active?: boolean;
    photo?: string | null;
    custom_id?: string | null;
    is_draft?: boolean;
}
