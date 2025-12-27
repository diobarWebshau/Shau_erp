import { productQuerySchema } from "../../../../core/product/application/dto/product.model.schema";
import { z } from "zod";
declare const productOrchestratorCreateSchema: z.ZodObject<{
    product: z.ZodObject<{
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        custom_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        presentation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        unit_of_measure: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        storage_conditions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        barcode: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        photo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        sale_price: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
        production_cost: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
        is_active: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
        is_draft: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
    }, z.core.$strip>;
    products_inputs: z.ZodArray<z.ZodObject<{
        input_id: z.ZodNumber;
        equivalence: z.ZodNumber;
        product_id: z.ZodOptional<z.ZodUndefined>;
    }, z.core.$strict>>;
    product_processes: z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
        sort_order: z.ZodNumber;
        process_id: z.ZodNumber;
        product_input_process: z.ZodDefault<z.ZodArray<z.ZodObject<{
            qty: z.ZodNumber;
            product_input: z.ZodObject<{
                input_id: z.ZodNumber;
                equivalence: z.ZodNumber;
                product_id: z.ZodOptional<z.ZodUndefined>;
            }, z.core.$strict>;
        }, z.core.$strip>>>;
    }, z.core.$strip>, z.ZodObject<{
        sort_order: z.ZodNumber;
        process: z.ZodObject<{
            name: z.ZodString;
            description: z.ZodString;
        }, z.core.$strip>;
        process_id: z.ZodOptional<z.ZodUndefined>;
        product_input_process: z.ZodDefault<z.ZodArray<z.ZodObject<{
            qty: z.ZodNumber;
            product_input: z.ZodObject<{
                input_id: z.ZodNumber;
                equivalence: z.ZodNumber;
                product_id: z.ZodOptional<z.ZodUndefined>;
            }, z.core.$strict>;
        }, z.core.$strip>>>;
    }, z.core.$strip>]>>;
    product_discount_ranges: z.ZodArray<z.ZodObject<{
        unit_price: z.ZodNumber;
        min_qty: z.ZodNumber;
        max_qty: z.ZodNumber;
        product_id: z.ZodOptional<z.ZodUndefined>;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const productOrchestratorCreateRequestSchema: z.ZodObject<{
    payload: z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<any, string>>, z.ZodObject<{
        product: z.ZodObject<{
            name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            custom_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            presentation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            unit_of_measure: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            storage_conditions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            barcode: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            photo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            sale_price: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
            production_cost: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
            is_active: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
            is_draft: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
        }, z.core.$strip>;
        products_inputs: z.ZodArray<z.ZodObject<{
            input_id: z.ZodNumber;
            equivalence: z.ZodNumber;
            product_id: z.ZodOptional<z.ZodUndefined>;
        }, z.core.$strict>>;
        product_processes: z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
            sort_order: z.ZodNumber;
            process_id: z.ZodNumber;
            product_input_process: z.ZodDefault<z.ZodArray<z.ZodObject<{
                qty: z.ZodNumber;
                product_input: z.ZodObject<{
                    input_id: z.ZodNumber;
                    equivalence: z.ZodNumber;
                    product_id: z.ZodOptional<z.ZodUndefined>;
                }, z.core.$strict>;
            }, z.core.$strip>>>;
        }, z.core.$strip>, z.ZodObject<{
            sort_order: z.ZodNumber;
            process: z.ZodObject<{
                name: z.ZodString;
                description: z.ZodString;
            }, z.core.$strip>;
            process_id: z.ZodOptional<z.ZodUndefined>;
            product_input_process: z.ZodDefault<z.ZodArray<z.ZodObject<{
                qty: z.ZodNumber;
                product_input: z.ZodObject<{
                    input_id: z.ZodNumber;
                    equivalence: z.ZodNumber;
                    product_id: z.ZodOptional<z.ZodUndefined>;
                }, z.core.$strict>;
            }, z.core.$strip>>>;
        }, z.core.$strip>]>>;
        product_discount_ranges: z.ZodArray<z.ZodObject<{
            unit_price: z.ZodNumber;
            min_qty: z.ZodNumber;
            max_qty: z.ZodNumber;
            product_id: z.ZodOptional<z.ZodUndefined>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
    photo: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const productOrchestratorUpdateSchema: z.ZodObject<{
    product: z.ZodObject<{
        name: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        custom_id: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        type: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        description: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        presentation: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        unit_of_measure: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        storage_conditions: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        barcode: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNumber>>>;
        sku: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        photo: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        sale_price: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>>;
        production_cost: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>>;
        is_active: z.ZodOptional<z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>>;
        is_draft: z.ZodOptional<z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>>;
    }, z.core.$strip>;
    products_inputs_manager: z.ZodObject<{
        added: z.ZodArray<z.ZodObject<{
            input_id: z.ZodNumber;
            equivalence: z.ZodNumber;
            product_id: z.ZodOptional<z.ZodUndefined>;
        }, z.core.$strict>>;
        updated: z.ZodArray<z.ZodObject<{
            product_id: z.ZodOptional<z.ZodNumber>;
            input_id: z.ZodOptional<z.ZodNumber>;
            equivalence: z.ZodOptional<z.ZodNumber>;
            id: z.ZodNumber;
        }, z.core.$strip>>;
        deleted: z.ZodArray<z.ZodObject<{
            product_id: z.ZodNumber;
            input_id: z.ZodNumber;
            equivalence: z.ZodNumber;
            id: z.ZodNumber;
        }, z.core.$strip>>;
    }, z.core.$strip>;
    product_processes_manager: z.ZodObject<{
        added: z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
            sort_order: z.ZodNumber;
            process_id: z.ZodNumber;
            product_input_process: z.ZodDefault<z.ZodArray<z.ZodObject<{
                qty: z.ZodNumber;
                product_input: z.ZodObject<{
                    input_id: z.ZodNumber;
                    equivalence: z.ZodNumber;
                    product_id: z.ZodOptional<z.ZodUndefined>;
                }, z.core.$strict>;
            }, z.core.$strip>>>;
        }, z.core.$strip>, z.ZodObject<{
            sort_order: z.ZodNumber;
            process: z.ZodObject<{
                name: z.ZodString;
                description: z.ZodString;
            }, z.core.$strip>;
            process_id: z.ZodOptional<z.ZodUndefined>;
            product_input_process: z.ZodDefault<z.ZodArray<z.ZodObject<{
                qty: z.ZodNumber;
                product_input: z.ZodObject<{
                    input_id: z.ZodNumber;
                    equivalence: z.ZodNumber;
                    product_id: z.ZodOptional<z.ZodUndefined>;
                }, z.core.$strict>;
            }, z.core.$strip>>>;
        }, z.core.$strip>]>>;
        updated: z.ZodArray<z.ZodObject<{
            product_id: z.ZodOptional<z.ZodNumber>;
            process_id: z.ZodOptional<z.ZodNumber>;
            sort_order: z.ZodOptional<z.ZodNumber>;
            id: z.ZodNumber;
            product_input_process_updated: z.ZodOptional<z.ZodObject<{
                added: z.ZodArray<z.ZodObject<{
                    qty: z.ZodNumber;
                    product_input: z.ZodObject<{
                        input_id: z.ZodNumber;
                        equivalence: z.ZodNumber;
                        product_id: z.ZodOptional<z.ZodUndefined>;
                    }, z.core.$strict>;
                }, z.core.$strip>>;
                updated: z.ZodArray<z.ZodObject<{
                    product_id: z.ZodOptional<z.ZodNumber>;
                    product_input_id: z.ZodOptional<z.ZodNumber>;
                    product_process_id: z.ZodOptional<z.ZodNumber>;
                    qty: z.ZodOptional<z.ZodNumber>;
                    id: z.ZodNumber;
                }, z.core.$strip>>;
                deleted: z.ZodArray<z.ZodObject<{
                    product_id: z.ZodNumber;
                    product_input_id: z.ZodNumber;
                    product_process_id: z.ZodNumber;
                    qty: z.ZodNumber;
                    id: z.ZodNumber;
                }, z.core.$strip>>;
            }, z.core.$strip>>;
        }, z.core.$strip>>;
        deleted: z.ZodArray<z.ZodObject<{
            product_id: z.ZodNumber;
            process_id: z.ZodNumber;
            sort_order: z.ZodNumber;
            id: z.ZodNumber;
        }, z.core.$strip>>;
    }, z.core.$strip>;
    product_discount_ranges_manager: z.ZodObject<{
        added: z.ZodArray<z.ZodObject<{
            unit_price: z.ZodNumber;
            min_qty: z.ZodNumber;
            max_qty: z.ZodNumber;
            product_id: z.ZodOptional<z.ZodUndefined>;
        }, z.core.$strip>>;
        updated: z.ZodArray<z.ZodObject<{
            product_id: z.ZodOptional<z.ZodNumber>;
            unit_price: z.ZodOptional<z.ZodNumber>;
            min_qty: z.ZodOptional<z.ZodNumber>;
            max_qty: z.ZodOptional<z.ZodNumber>;
            id: z.ZodNumber;
        }, z.core.$strip>>;
        deleted: z.ZodArray<z.ZodObject<{
            product_id: z.ZodNumber;
            unit_price: z.ZodNumber;
            min_qty: z.ZodNumber;
            max_qty: z.ZodNumber;
            id: z.ZodNumber;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, z.core.$strip>>;
    }, z.core.$strip>;
}, z.core.$strip>;
declare const productOrchestratorUpdateRequestSchema: z.ZodObject<{
    payload: z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<any, string>>, z.ZodObject<{
        product: z.ZodObject<{
            name: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
            custom_id: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
            type: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
            description: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
            presentation: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
            unit_of_measure: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
            storage_conditions: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
            barcode: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNumber>>>;
            sku: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
            photo: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
            sale_price: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>>;
            production_cost: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>>;
            is_active: z.ZodOptional<z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>>;
            is_draft: z.ZodOptional<z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>>;
        }, z.core.$strip>;
        products_inputs_manager: z.ZodObject<{
            added: z.ZodArray<z.ZodObject<{
                input_id: z.ZodNumber;
                equivalence: z.ZodNumber;
                product_id: z.ZodOptional<z.ZodUndefined>;
            }, z.core.$strict>>;
            updated: z.ZodArray<z.ZodObject<{
                product_id: z.ZodOptional<z.ZodNumber>;
                input_id: z.ZodOptional<z.ZodNumber>;
                equivalence: z.ZodOptional<z.ZodNumber>;
                id: z.ZodNumber;
            }, z.core.$strip>>;
            deleted: z.ZodArray<z.ZodObject<{
                product_id: z.ZodNumber;
                input_id: z.ZodNumber;
                equivalence: z.ZodNumber;
                id: z.ZodNumber;
            }, z.core.$strip>>;
        }, z.core.$strip>;
        product_processes_manager: z.ZodObject<{
            added: z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
                sort_order: z.ZodNumber;
                process_id: z.ZodNumber;
                product_input_process: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    qty: z.ZodNumber;
                    product_input: z.ZodObject<{
                        input_id: z.ZodNumber;
                        equivalence: z.ZodNumber;
                        product_id: z.ZodOptional<z.ZodUndefined>;
                    }, z.core.$strict>;
                }, z.core.$strip>>>;
            }, z.core.$strip>, z.ZodObject<{
                sort_order: z.ZodNumber;
                process: z.ZodObject<{
                    name: z.ZodString;
                    description: z.ZodString;
                }, z.core.$strip>;
                process_id: z.ZodOptional<z.ZodUndefined>;
                product_input_process: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    qty: z.ZodNumber;
                    product_input: z.ZodObject<{
                        input_id: z.ZodNumber;
                        equivalence: z.ZodNumber;
                        product_id: z.ZodOptional<z.ZodUndefined>;
                    }, z.core.$strict>;
                }, z.core.$strip>>>;
            }, z.core.$strip>]>>;
            updated: z.ZodArray<z.ZodObject<{
                product_id: z.ZodOptional<z.ZodNumber>;
                process_id: z.ZodOptional<z.ZodNumber>;
                sort_order: z.ZodOptional<z.ZodNumber>;
                id: z.ZodNumber;
                product_input_process_updated: z.ZodOptional<z.ZodObject<{
                    added: z.ZodArray<z.ZodObject<{
                        qty: z.ZodNumber;
                        product_input: z.ZodObject<{
                            input_id: z.ZodNumber;
                            equivalence: z.ZodNumber;
                            product_id: z.ZodOptional<z.ZodUndefined>;
                        }, z.core.$strict>;
                    }, z.core.$strip>>;
                    updated: z.ZodArray<z.ZodObject<{
                        product_id: z.ZodOptional<z.ZodNumber>;
                        product_input_id: z.ZodOptional<z.ZodNumber>;
                        product_process_id: z.ZodOptional<z.ZodNumber>;
                        qty: z.ZodOptional<z.ZodNumber>;
                        id: z.ZodNumber;
                    }, z.core.$strip>>;
                    deleted: z.ZodArray<z.ZodObject<{
                        product_id: z.ZodNumber;
                        product_input_id: z.ZodNumber;
                        product_process_id: z.ZodNumber;
                        qty: z.ZodNumber;
                        id: z.ZodNumber;
                    }, z.core.$strip>>;
                }, z.core.$strip>>;
            }, z.core.$strip>>;
            deleted: z.ZodArray<z.ZodObject<{
                product_id: z.ZodNumber;
                process_id: z.ZodNumber;
                sort_order: z.ZodNumber;
                id: z.ZodNumber;
            }, z.core.$strip>>;
        }, z.core.$strip>;
        product_discount_ranges_manager: z.ZodObject<{
            added: z.ZodArray<z.ZodObject<{
                unit_price: z.ZodNumber;
                min_qty: z.ZodNumber;
                max_qty: z.ZodNumber;
                product_id: z.ZodOptional<z.ZodUndefined>;
            }, z.core.$strip>>;
            updated: z.ZodArray<z.ZodObject<{
                product_id: z.ZodOptional<z.ZodNumber>;
                unit_price: z.ZodOptional<z.ZodNumber>;
                min_qty: z.ZodOptional<z.ZodNumber>;
                max_qty: z.ZodOptional<z.ZodNumber>;
                id: z.ZodNumber;
            }, z.core.$strip>>;
            deleted: z.ZodArray<z.ZodObject<{
                product_id: z.ZodNumber;
                unit_price: z.ZodNumber;
                min_qty: z.ZodNumber;
                max_qty: z.ZodNumber;
                id: z.ZodNumber;
                created_at: z.ZodString;
                updated_at: z.ZodString;
            }, z.core.$strip>>;
        }, z.core.$strip>;
    }, z.core.$strip>>;
    photo: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const productOrchestratorResponseSchema: z.ZodObject<{
    product: z.ZodObject<{
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        custom_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        presentation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        unit_of_measure: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        storage_conditions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        barcode: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        photo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        sale_price: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
        production_cost: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
        is_active: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
        is_draft: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>;
    products_inputs: z.ZodArray<z.ZodObject<{
        product_id: z.ZodNumber;
        input_id: z.ZodNumber;
        equivalence: z.ZodNumber;
        id: z.ZodNumber;
    }, z.core.$strip>>;
    product_processes: z.ZodArray<z.ZodObject<{
        product_id: z.ZodNumber;
        process_id: z.ZodNumber;
        sort_order: z.ZodNumber;
        id: z.ZodNumber;
        product_input_process: z.ZodOptional<z.ZodArray<z.ZodObject<{
            product_id: z.ZodNumber;
            product_input_id: z.ZodNumber;
            product_process_id: z.ZodNumber;
            qty: z.ZodNumber;
            id: z.ZodNumber;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
    product_discount_ranges: z.ZodArray<z.ZodObject<{
        product_id: z.ZodNumber;
        unit_price: z.ZodNumber;
        min_qty: z.ZodNumber;
        max_qty: z.ZodNumber;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
type ProductOrchestratorUpdateDTO = z.infer<typeof productOrchestratorUpdateSchema>;
type ProductOrchestratorCreateDTO = z.infer<typeof productOrchestratorCreateSchema>;
type ProductOrchestratorReponseDTO = z.infer<typeof productOrchestratorResponseSchema>;
type ProductOrchestratorPayloadDTO = z.infer<typeof productOrchestratorCreateRequestSchema>;
export type { ProductOrchestratorCreateDTO, ProductOrchestratorUpdateDTO, ProductOrchestratorReponseDTO, ProductOrchestratorPayloadDTO };
export { productOrchestratorCreateSchema, productOrchestratorUpdateSchema, productOrchestratorResponseSchema, productQuerySchema, productOrchestratorCreateRequestSchema, productOrchestratorUpdateRequestSchema };
