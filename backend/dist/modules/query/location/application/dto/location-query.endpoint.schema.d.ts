import { EndpointSchema } from "@shared/typed-request-endpoint/endpoint.interface";
import z from "zod";
declare const getAllLocationOrchestratorSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{
        filter: z.ZodOptional<z.ZodString>;
        exclude_ids: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        name: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        description: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        email: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        phone: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        custom_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        is_active: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>>;
    }, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodArray<z.ZodObject<{
        location: z.ZodObject<{
            name: z.ZodNullable<z.ZodString>;
            description: z.ZodNullable<z.ZodString>;
            street: z.ZodNullable<z.ZodString>;
            custom_id: z.ZodNullable<z.ZodString>;
            location_manager: z.ZodNullable<z.ZodString>;
            street_number: z.ZodNullable<z.ZodNumber>;
            neighborhood: z.ZodNullable<z.ZodString>;
            city: z.ZodNullable<z.ZodString>;
            state: z.ZodNullable<z.ZodString>;
            country: z.ZodNullable<z.ZodString>;
            zip_code: z.ZodNullable<z.ZodNumber>;
            phone: z.ZodNullable<z.ZodString>;
            production_capacity: z.ZodNullable<z.ZodNumber>;
            is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
            id: z.ZodNumber;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, z.core.$strip>;
        location_location_types: z.ZodArray<z.ZodObject<{
            location_id: z.ZodNumber;
            location_type_id: z.ZodNumber;
            id: z.ZodNumber;
            location: z.ZodObject<{
                name: z.ZodNullable<z.ZodString>;
                description: z.ZodNullable<z.ZodString>;
                street: z.ZodNullable<z.ZodString>;
                custom_id: z.ZodNullable<z.ZodString>;
                location_manager: z.ZodNullable<z.ZodString>;
                street_number: z.ZodNullable<z.ZodNumber>;
                neighborhood: z.ZodNullable<z.ZodString>;
                city: z.ZodNullable<z.ZodString>;
                state: z.ZodNullable<z.ZodString>;
                country: z.ZodNullable<z.ZodString>;
                zip_code: z.ZodNullable<z.ZodNumber>;
                phone: z.ZodNullable<z.ZodString>;
                production_capacity: z.ZodNullable<z.ZodNumber>;
                is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
                id: z.ZodNumber;
                created_at: z.ZodString;
                updated_at: z.ZodString;
            }, z.core.$strip>;
            location_type: z.ZodObject<{
                name: z.ZodString;
                id: z.ZodNumber;
                created_at: z.ZodString;
                updated_at: z.ZodString;
            }, z.core.$strip>;
        }, z.core.$strip>>;
        location_production_lines: z.ZodArray<z.ZodObject<{
            location_id: z.ZodNumber;
            location_type_id: z.ZodNumber;
            id: z.ZodNumber;
            location: z.ZodObject<{
                name: z.ZodNullable<z.ZodString>;
                description: z.ZodNullable<z.ZodString>;
                street: z.ZodNullable<z.ZodString>;
                custom_id: z.ZodNullable<z.ZodString>;
                location_manager: z.ZodNullable<z.ZodString>;
                street_number: z.ZodNullable<z.ZodNumber>;
                neighborhood: z.ZodNullable<z.ZodString>;
                city: z.ZodNullable<z.ZodString>;
                state: z.ZodNullable<z.ZodString>;
                country: z.ZodNullable<z.ZodString>;
                zip_code: z.ZodNullable<z.ZodNumber>;
                phone: z.ZodNullable<z.ZodString>;
                production_capacity: z.ZodNullable<z.ZodNumber>;
                is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
                id: z.ZodNumber;
                created_at: z.ZodString;
                updated_at: z.ZodString;
            }, z.core.$strip>;
            production_line: z.ZodObject<{
                name: z.ZodString;
                custom_id: z.ZodString;
                is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
                id: z.ZodNumber;
                created_at: z.ZodString;
                updated_at: z.ZodString;
            }, z.core.$strip>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const getByIdLocationOrchestratorSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNullable<z.ZodObject<{
        location: z.ZodObject<{
            name: z.ZodNullable<z.ZodString>;
            description: z.ZodNullable<z.ZodString>;
            street: z.ZodNullable<z.ZodString>;
            custom_id: z.ZodNullable<z.ZodString>;
            location_manager: z.ZodNullable<z.ZodString>;
            street_number: z.ZodNullable<z.ZodNumber>;
            neighborhood: z.ZodNullable<z.ZodString>;
            city: z.ZodNullable<z.ZodString>;
            state: z.ZodNullable<z.ZodString>;
            country: z.ZodNullable<z.ZodString>;
            zip_code: z.ZodNullable<z.ZodNumber>;
            phone: z.ZodNullable<z.ZodString>;
            production_capacity: z.ZodNullable<z.ZodNumber>;
            is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
            id: z.ZodNumber;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, z.core.$strip>;
        location_location_types: z.ZodArray<z.ZodObject<{
            location_id: z.ZodNumber;
            location_type_id: z.ZodNumber;
            id: z.ZodNumber;
            location: z.ZodObject<{
                name: z.ZodNullable<z.ZodString>;
                description: z.ZodNullable<z.ZodString>;
                street: z.ZodNullable<z.ZodString>;
                custom_id: z.ZodNullable<z.ZodString>;
                location_manager: z.ZodNullable<z.ZodString>;
                street_number: z.ZodNullable<z.ZodNumber>;
                neighborhood: z.ZodNullable<z.ZodString>;
                city: z.ZodNullable<z.ZodString>;
                state: z.ZodNullable<z.ZodString>;
                country: z.ZodNullable<z.ZodString>;
                zip_code: z.ZodNullable<z.ZodNumber>;
                phone: z.ZodNullable<z.ZodString>;
                production_capacity: z.ZodNullable<z.ZodNumber>;
                is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
                id: z.ZodNumber;
                created_at: z.ZodString;
                updated_at: z.ZodString;
            }, z.core.$strip>;
            location_type: z.ZodObject<{
                name: z.ZodString;
                id: z.ZodNumber;
                created_at: z.ZodString;
                updated_at: z.ZodString;
            }, z.core.$strip>;
        }, z.core.$strip>>;
        location_production_lines: z.ZodArray<z.ZodObject<{
            location_id: z.ZodNumber;
            location_type_id: z.ZodNumber;
            id: z.ZodNumber;
            location: z.ZodObject<{
                name: z.ZodNullable<z.ZodString>;
                description: z.ZodNullable<z.ZodString>;
                street: z.ZodNullable<z.ZodString>;
                custom_id: z.ZodNullable<z.ZodString>;
                location_manager: z.ZodNullable<z.ZodString>;
                street_number: z.ZodNullable<z.ZodNumber>;
                neighborhood: z.ZodNullable<z.ZodString>;
                city: z.ZodNullable<z.ZodString>;
                state: z.ZodNullable<z.ZodString>;
                country: z.ZodNullable<z.ZodString>;
                zip_code: z.ZodNullable<z.ZodNumber>;
                phone: z.ZodNullable<z.ZodString>;
                production_capacity: z.ZodNullable<z.ZodNumber>;
                is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
                id: z.ZodNumber;
                created_at: z.ZodString;
                updated_at: z.ZodString;
            }, z.core.$strip>;
            production_line: z.ZodObject<{
                name: z.ZodString;
                custom_id: z.ZodString;
                is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
                id: z.ZodNumber;
                created_at: z.ZodString;
                updated_at: z.ZodString;
            }, z.core.$strip>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const getAllLocationtFullQuerySchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strip>;
    query: z.ZodObject<{
        filter: z.ZodOptional<z.ZodString>;
        exclude_ids: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        name: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        description: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        email: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        phone: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        custom_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        is_active: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>>;
    }, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodArray<z.ZodObject<{
        name: z.ZodNullable<z.ZodString>;
        description: z.ZodNullable<z.ZodString>;
        street: z.ZodNullable<z.ZodString>;
        custom_id: z.ZodNullable<z.ZodString>;
        location_manager: z.ZodNullable<z.ZodString>;
        street_number: z.ZodNullable<z.ZodNumber>;
        neighborhood: z.ZodNullable<z.ZodString>;
        city: z.ZodNullable<z.ZodString>;
        state: z.ZodNullable<z.ZodString>;
        country: z.ZodNullable<z.ZodString>;
        zip_code: z.ZodNullable<z.ZodNumber>;
        phone: z.ZodNullable<z.ZodString>;
        production_capacity: z.ZodNullable<z.ZodNumber>;
        is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
        location_production_lines: z.ZodArray<z.ZodObject<{
            location_id: z.ZodNumber;
            location_type_id: z.ZodNumber;
            id: z.ZodNumber;
            location: z.ZodObject<{
                name: z.ZodNullable<z.ZodString>;
                description: z.ZodNullable<z.ZodString>;
                street: z.ZodNullable<z.ZodString>;
                custom_id: z.ZodNullable<z.ZodString>;
                location_manager: z.ZodNullable<z.ZodString>;
                street_number: z.ZodNullable<z.ZodNumber>;
                neighborhood: z.ZodNullable<z.ZodString>;
                city: z.ZodNullable<z.ZodString>;
                state: z.ZodNullable<z.ZodString>;
                country: z.ZodNullable<z.ZodString>;
                zip_code: z.ZodNullable<z.ZodNumber>;
                phone: z.ZodNullable<z.ZodString>;
                production_capacity: z.ZodNullable<z.ZodNumber>;
                is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
                id: z.ZodNumber;
                created_at: z.ZodString;
                updated_at: z.ZodString;
            }, z.core.$strip>;
            production_line: z.ZodObject<{
                name: z.ZodString;
                custom_id: z.ZodString;
                is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
                id: z.ZodNumber;
                created_at: z.ZodString;
                updated_at: z.ZodString;
            }, z.core.$strip>;
        }, z.core.$strip>>;
        location_location_types: z.ZodArray<z.ZodObject<{
            location_id: z.ZodNumber;
            location_type_id: z.ZodNumber;
            id: z.ZodNumber;
            location: z.ZodObject<{
                name: z.ZodNullable<z.ZodString>;
                description: z.ZodNullable<z.ZodString>;
                street: z.ZodNullable<z.ZodString>;
                custom_id: z.ZodNullable<z.ZodString>;
                location_manager: z.ZodNullable<z.ZodString>;
                street_number: z.ZodNullable<z.ZodNumber>;
                neighborhood: z.ZodNullable<z.ZodString>;
                city: z.ZodNullable<z.ZodString>;
                state: z.ZodNullable<z.ZodString>;
                country: z.ZodNullable<z.ZodString>;
                zip_code: z.ZodNullable<z.ZodNumber>;
                phone: z.ZodNullable<z.ZodString>;
                production_capacity: z.ZodNullable<z.ZodNumber>;
                is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
                id: z.ZodNumber;
                created_at: z.ZodString;
                updated_at: z.ZodString;
            }, z.core.$strip>;
            location_type: z.ZodObject<{
                name: z.ZodString;
                id: z.ZodNumber;
                created_at: z.ZodString;
                updated_at: z.ZodString;
            }, z.core.$strip>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const getByIdLocationtFullQuerySchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNullable<z.ZodObject<{
        name: z.ZodNullable<z.ZodString>;
        description: z.ZodNullable<z.ZodString>;
        street: z.ZodNullable<z.ZodString>;
        custom_id: z.ZodNullable<z.ZodString>;
        location_manager: z.ZodNullable<z.ZodString>;
        street_number: z.ZodNullable<z.ZodNumber>;
        neighborhood: z.ZodNullable<z.ZodString>;
        city: z.ZodNullable<z.ZodString>;
        state: z.ZodNullable<z.ZodString>;
        country: z.ZodNullable<z.ZodString>;
        zip_code: z.ZodNullable<z.ZodNumber>;
        phone: z.ZodNullable<z.ZodString>;
        production_capacity: z.ZodNullable<z.ZodNumber>;
        is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
        location_production_lines: z.ZodArray<z.ZodObject<{
            location_id: z.ZodNumber;
            location_type_id: z.ZodNumber;
            id: z.ZodNumber;
            location: z.ZodObject<{
                name: z.ZodNullable<z.ZodString>;
                description: z.ZodNullable<z.ZodString>;
                street: z.ZodNullable<z.ZodString>;
                custom_id: z.ZodNullable<z.ZodString>;
                location_manager: z.ZodNullable<z.ZodString>;
                street_number: z.ZodNullable<z.ZodNumber>;
                neighborhood: z.ZodNullable<z.ZodString>;
                city: z.ZodNullable<z.ZodString>;
                state: z.ZodNullable<z.ZodString>;
                country: z.ZodNullable<z.ZodString>;
                zip_code: z.ZodNullable<z.ZodNumber>;
                phone: z.ZodNullable<z.ZodString>;
                production_capacity: z.ZodNullable<z.ZodNumber>;
                is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
                id: z.ZodNumber;
                created_at: z.ZodString;
                updated_at: z.ZodString;
            }, z.core.$strip>;
            production_line: z.ZodObject<{
                name: z.ZodString;
                custom_id: z.ZodString;
                is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
                id: z.ZodNumber;
                created_at: z.ZodString;
                updated_at: z.ZodString;
            }, z.core.$strip>;
        }, z.core.$strip>>;
        location_location_types: z.ZodArray<z.ZodObject<{
            location_id: z.ZodNumber;
            location_type_id: z.ZodNumber;
            id: z.ZodNumber;
            location: z.ZodObject<{
                name: z.ZodNullable<z.ZodString>;
                description: z.ZodNullable<z.ZodString>;
                street: z.ZodNullable<z.ZodString>;
                custom_id: z.ZodNullable<z.ZodString>;
                location_manager: z.ZodNullable<z.ZodString>;
                street_number: z.ZodNullable<z.ZodNumber>;
                neighborhood: z.ZodNullable<z.ZodString>;
                city: z.ZodNullable<z.ZodString>;
                state: z.ZodNullable<z.ZodString>;
                country: z.ZodNullable<z.ZodString>;
                zip_code: z.ZodNullable<z.ZodNumber>;
                phone: z.ZodNullable<z.ZodString>;
                production_capacity: z.ZodNullable<z.ZodNumber>;
                is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
                id: z.ZodNumber;
                created_at: z.ZodString;
                updated_at: z.ZodString;
            }, z.core.$strip>;
            location_type: z.ZodObject<{
                name: z.ZodString;
                id: z.ZodNumber;
                created_at: z.ZodString;
                updated_at: z.ZodString;
            }, z.core.$strip>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
type GetAllLocationOrchestratorSchema = EndpointSchema<z.infer<typeof getAllLocationOrchestratorSchema>["params"], z.infer<typeof getAllLocationOrchestratorSchema>["body"], z.infer<typeof getAllLocationOrchestratorSchema>["query"], z.infer<typeof getAllLocationOrchestratorSchema>["response"]>;
type GetByIdLocationOrchestratorSchema = EndpointSchema<z.infer<typeof getByIdLocationOrchestratorSchema>["params"], z.infer<typeof getByIdLocationOrchestratorSchema>["body"], z.infer<typeof getByIdLocationOrchestratorSchema>["query"], z.infer<typeof getByIdLocationOrchestratorSchema>["response"]>;
type GetAllLocationtFullQuerySchema = EndpointSchema<z.infer<typeof getAllLocationtFullQuerySchema>["params"], z.infer<typeof getAllLocationtFullQuerySchema>["body"], z.infer<typeof getAllLocationtFullQuerySchema>["query"], z.infer<typeof getAllLocationtFullQuerySchema>["response"]>;
type GetByIdLocationtFullQuerySchema = EndpointSchema<z.infer<typeof getByIdLocationtFullQuerySchema>["params"], z.infer<typeof getByIdLocationtFullQuerySchema>["body"], z.infer<typeof getByIdLocationtFullQuerySchema>["query"], z.infer<typeof getByIdLocationtFullQuerySchema>["response"]>;
export type { GetAllLocationOrchestratorSchema, GetByIdLocationOrchestratorSchema, GetAllLocationtFullQuerySchema, GetByIdLocationtFullQuerySchema };
export { getAllLocationOrchestratorSchema, getByIdLocationOrchestratorSchema, getAllLocationtFullQuerySchema, getByIdLocationtFullQuerySchema };
