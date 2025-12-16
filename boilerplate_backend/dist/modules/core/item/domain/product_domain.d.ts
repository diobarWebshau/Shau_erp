interface IProductProps {
    id: number;
    name: string | null;
    description: string | null;
    type: string | null;
    custom_id: string | null;
    presentation: string | null;
    is_draft: boolean;
    sku: string | null;
    is_active: boolean;
    sale_price: number | null;
    photo: string | null;
    production_cost: number | null;
    barcode: number | null;
    storage_onditions: string | null;
    unit_of_measure: string | null;
    created_at: Date;
    updated_at: Date;
}
declare class ProductEntity {
    private readonly props;
    constructor(props: IProductProps);
    get id(): number;
    get name(): string | null;
    get sale_price(): number | null;
    isDraft(): boolean;
    isActive(): boolean;
    validateCreate(): void;
    toJSON(): IProductProps;
}
export type { IProductProps };
export { ProductEntity };
