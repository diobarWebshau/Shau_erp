import { EndpointSchema } from "@shared/typed-request-endpoint/endpoint.interface";
import z from "zod";
declare const createClientOrchestratorSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
        payload: z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<any, string>>, z.ZodObject<{
            client: z.ZodObject<{
                company_name: z.ZodString;
                tax_id: z.ZodString;
                email: z.ZodString;
                phone: z.ZodString;
                city: z.ZodString;
                state: z.ZodString;
                country: z.ZodString;
                street: z.ZodString;
                street_number: z.ZodNumber;
                neighborhood: z.ZodString;
                payment_terms: z.ZodNullable<z.ZodString>;
                zip_code: z.ZodNumber;
                credit_limit: z.ZodNullable<z.ZodNumber>;
                tax_regimen: z.ZodNullable<z.ZodString>;
                cfdi: z.ZodString;
                payment_method: z.ZodNullable<z.ZodString>;
                is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
            }, z.core.$strip>;
            addresses: z.ZodArray<z.ZodObject<{
                city: z.ZodString;
                state: z.ZodString;
                country: z.ZodString;
                street: z.ZodString;
                street_number: z.ZodNumber;
                neighborhood: z.ZodString;
                zip_code: z.ZodNumber;
                client_id: z.ZodOptional<z.ZodUndefined>;
            }, z.core.$strict>>;
            discounts: z.ZodArray<z.ZodObject<{
                discount_percentage: z.ZodNumber;
                product_id: z.ZodNumber;
                client_id: z.ZodOptional<z.ZodUndefined>;
            }, z.core.$strict>>;
        }, z.core.$strip>>;
    }, z.core.$strip>;
    response: z.ZodObject<{
        client: z.ZodObject<{
            company_name: z.ZodString;
            tax_id: z.ZodString;
            email: z.ZodString;
            phone: z.ZodString;
            city: z.ZodString;
            state: z.ZodString;
            country: z.ZodString;
            street: z.ZodString;
            street_number: z.ZodNumber;
            neighborhood: z.ZodString;
            payment_terms: z.ZodNullable<z.ZodString>;
            zip_code: z.ZodNumber;
            credit_limit: z.ZodNullable<z.ZodNumber>;
            tax_regimen: z.ZodNullable<z.ZodString>;
            cfdi: z.ZodString;
            payment_method: z.ZodNullable<z.ZodString>;
            is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
            id: z.ZodNumber;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, z.core.$strip>;
        addresses: z.ZodArray<z.ZodObject<{
            client_id: z.ZodNumber;
            city: z.ZodString;
            state: z.ZodString;
            country: z.ZodString;
            street: z.ZodString;
            street_number: z.ZodNumber;
            neighborhood: z.ZodString;
            zip_code: z.ZodNumber;
            id: z.ZodNumber;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, z.core.$strip>>;
        discounts: z.ZodArray<z.ZodObject<{
            product_id: z.ZodNumber;
            client_id: z.ZodNumber;
            discount_percentage: z.ZodNumber;
            id: z.ZodNumber;
            created_at: z.ZodString;
            updated_at: z.ZodString;
            product: z.ZodObject<{
                name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                custom_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                presentation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                unit_of_measure: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                storage_conditions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                barcode: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
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
        }, z.core.$strip>>;
    }, z.core.$strip>;
}, z.core.$strip>;
type ClientCreateOrchestratorSchema = EndpointSchema<z.infer<typeof createClientOrchestratorSchema>["params"], z.infer<typeof createClientOrchestratorSchema>["body"], z.infer<typeof createClientOrchestratorSchema>["query"], z.infer<typeof createClientOrchestratorSchema>["response"]>;
declare const updateClientOrchestratorSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
        payload: z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<any, string>>, z.ZodObject<{
            client: z.ZodObject<{
                company_name: z.ZodOptional<z.ZodString>;
                tax_id: z.ZodOptional<z.ZodString>;
                email: z.ZodOptional<z.ZodString>;
                phone: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                street: z.ZodOptional<z.ZodString>;
                street_number: z.ZodOptional<z.ZodNumber>;
                neighborhood: z.ZodOptional<z.ZodString>;
                payment_terms: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                zip_code: z.ZodOptional<z.ZodNumber>;
                credit_limit: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                tax_regimen: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                cfdi: z.ZodOptional<z.ZodString>;
                payment_method: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                is_active: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>>;
            }, z.core.$strip>;
            addresses_manager: z.ZodObject<{
                added: z.ZodArray<z.ZodObject<{
                    city: z.ZodString;
                    state: z.ZodString;
                    country: z.ZodString;
                    street: z.ZodString;
                    street_number: z.ZodNumber;
                    neighborhood: z.ZodString;
                    zip_code: z.ZodNumber;
                    client_id: z.ZodOptional<z.ZodUndefined>;
                }, z.core.$strict>>;
                updated: z.ZodArray<z.ZodObject<{
                    client_id: z.ZodOptional<z.ZodNumber>;
                    city: z.ZodOptional<z.ZodString>;
                    state: z.ZodOptional<z.ZodString>;
                    country: z.ZodOptional<z.ZodString>;
                    street: z.ZodOptional<z.ZodString>;
                    street_number: z.ZodOptional<z.ZodNumber>;
                    neighborhood: z.ZodOptional<z.ZodString>;
                    zip_code: z.ZodOptional<z.ZodNumber>;
                    id: z.ZodNumber;
                }, z.core.$strip>>;
                deleted: z.ZodArray<z.ZodObject<{
                    client_id: z.ZodNumber;
                    city: z.ZodString;
                    state: z.ZodString;
                    country: z.ZodString;
                    street: z.ZodString;
                    street_number: z.ZodNumber;
                    neighborhood: z.ZodString;
                    zip_code: z.ZodNumber;
                    id: z.ZodNumber;
                    created_at: z.ZodString;
                    updated_at: z.ZodString;
                }, z.core.$strip>>;
            }, z.core.$strip>;
            discounts_manager: z.ZodObject<{
                added: z.ZodArray<z.ZodObject<{
                    discount_percentage: z.ZodNumber;
                    product_id: z.ZodNumber;
                    client_id: z.ZodOptional<z.ZodUndefined>;
                }, z.core.$strict>>;
                updated: z.ZodArray<z.ZodObject<{
                    product_id: z.ZodOptional<z.ZodNumber>;
                    client_id: z.ZodOptional<z.ZodNumber>;
                    discount_percentage: z.ZodOptional<z.ZodNumber>;
                    id: z.ZodNumber;
                }, z.core.$strip>>;
                deleted: z.ZodArray<z.ZodObject<{
                    product_id: z.ZodNumber;
                    client_id: z.ZodNumber;
                    discount_percentage: z.ZodNumber;
                    id: z.ZodNumber;
                    created_at: z.ZodString;
                    updated_at: z.ZodString;
                }, z.core.$strip>>;
            }, z.core.$strip>;
        }, z.core.$strip>>;
    }, z.core.$strip>;
    response: z.ZodObject<{
        client: z.ZodObject<{
            company_name: z.ZodString;
            tax_id: z.ZodString;
            email: z.ZodString;
            phone: z.ZodString;
            city: z.ZodString;
            state: z.ZodString;
            country: z.ZodString;
            street: z.ZodString;
            street_number: z.ZodNumber;
            neighborhood: z.ZodString;
            payment_terms: z.ZodNullable<z.ZodString>;
            zip_code: z.ZodNumber;
            credit_limit: z.ZodNullable<z.ZodNumber>;
            tax_regimen: z.ZodNullable<z.ZodString>;
            cfdi: z.ZodString;
            payment_method: z.ZodNullable<z.ZodString>;
            is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
            id: z.ZodNumber;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, z.core.$strip>;
        addresses: z.ZodArray<z.ZodObject<{
            client_id: z.ZodNumber;
            city: z.ZodString;
            state: z.ZodString;
            country: z.ZodString;
            street: z.ZodString;
            street_number: z.ZodNumber;
            neighborhood: z.ZodString;
            zip_code: z.ZodNumber;
            id: z.ZodNumber;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, z.core.$strip>>;
        discounts: z.ZodArray<z.ZodObject<{
            product_id: z.ZodNumber;
            client_id: z.ZodNumber;
            discount_percentage: z.ZodNumber;
            id: z.ZodNumber;
            created_at: z.ZodString;
            updated_at: z.ZodString;
            product: z.ZodObject<{
                name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                custom_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                presentation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                unit_of_measure: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                storage_conditions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                barcode: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
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
        }, z.core.$strip>>;
    }, z.core.$strip>;
}, z.core.$strip>;
type ClientUpdateOrchestratorSchema = EndpointSchema<z.infer<typeof updateClientOrchestratorSchema>["params"], z.infer<typeof updateClientOrchestratorSchema>["body"], z.infer<typeof updateClientOrchestratorSchema>["query"], z.infer<typeof updateClientOrchestratorSchema>["response"]>;
export { updateClientOrchestratorSchema, createClientOrchestratorSchema };
export type { ClientCreateOrchestratorSchema, ClientUpdateOrchestratorSchema };
