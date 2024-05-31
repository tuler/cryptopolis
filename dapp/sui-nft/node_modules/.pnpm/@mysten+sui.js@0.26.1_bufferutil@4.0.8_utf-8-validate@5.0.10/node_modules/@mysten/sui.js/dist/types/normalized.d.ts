import { Infer } from 'superstruct';
export type SuiMoveFunctionArgTypesResponse = Infer<typeof SuiMoveFunctionArgType>[];
export declare const SuiMoveFunctionArgType: import("superstruct").Struct<string | {
    Object: string;
}, null>;
export declare const SuiMoveFunctionArgTypes: import("superstruct").Struct<(string | {
    Object: string;
})[], import("superstruct").Struct<string | {
    Object: string;
}, null>>;
export type SuiMoveFunctionArgTypes = Infer<typeof SuiMoveFunctionArgTypes>;
export declare const SuiMoveModuleId: import("superstruct").Struct<{
    address: string;
    name: string;
}, {
    address: import("superstruct").Struct<string, null>;
    name: import("superstruct").Struct<string, null>;
}>;
export type SuiMoveModuleId = Infer<typeof SuiMoveModuleId>;
export declare const SuiMoveVisibility: import("superstruct").Struct<"Private" | "Public" | "Friend", null>;
export type SuiMoveVisibility = Infer<typeof SuiMoveVisibility>;
export declare const SuiMoveAbilitySet: import("superstruct").Struct<{
    abilities: string[];
}, {
    abilities: import("superstruct").Struct<string[], import("superstruct").Struct<string, null>>;
}>;
export type SuiMoveAbilitySet = Infer<typeof SuiMoveAbilitySet>;
export declare const SuiMoveStructTypeParameter: import("superstruct").Struct<{
    constraints: {
        abilities: string[];
    };
    is_phantom: boolean;
}, {
    constraints: import("superstruct").Struct<{
        abilities: string[];
    }, {
        abilities: import("superstruct").Struct<string[], import("superstruct").Struct<string, null>>;
    }>;
    is_phantom: import("superstruct").Struct<boolean, null>;
}>;
export type SuiMoveStructTypeParameter = Infer<typeof SuiMoveStructTypeParameter>;
export declare const SuiMoveNormalizedTypeParameterType: import("superstruct").Struct<{
    TypeParameter: number;
}, {
    TypeParameter: import("superstruct").Struct<number, null>;
}>;
export type SuiMoveNormalizedTypeParameterType = Infer<typeof SuiMoveNormalizedTypeParameterType>;
export type SuiMoveNormalizedType = string | SuiMoveNormalizedTypeParameterType | {
    Reference: SuiMoveNormalizedType;
} | {
    MutableReference: SuiMoveNormalizedType;
} | {
    Vector: SuiMoveNormalizedType;
} | SuiMoveNormalizedStructType;
export declare const SuiMoveNormalizedType: import("superstruct").Struct<SuiMoveNormalizedType, null>;
export type SuiMoveNormalizedStructType = {
    Struct: {
        address: string;
        module: string;
        name: string;
        type_arguments: SuiMoveNormalizedType[];
    };
};
export declare const SuiMoveNormalizedStructType: import("superstruct").Struct<SuiMoveNormalizedStructType, null>;
export declare const SuiMoveNormalizedFunction: import("superstruct").Struct<{
    visibility: "Private" | "Public" | "Friend";
    is_entry: boolean;
    type_parameters: {
        abilities: string[];
    }[];
    parameters: SuiMoveNormalizedType[];
    return_: SuiMoveNormalizedType[];
}, {
    visibility: import("superstruct").Struct<"Private" | "Public" | "Friend", null>;
    is_entry: import("superstruct").Struct<boolean, null>;
    type_parameters: import("superstruct").Struct<{
        abilities: string[];
    }[], import("superstruct").Struct<{
        abilities: string[];
    }, {
        abilities: import("superstruct").Struct<string[], import("superstruct").Struct<string, null>>;
    }>>;
    parameters: import("superstruct").Struct<SuiMoveNormalizedType[], import("superstruct").Struct<SuiMoveNormalizedType, null>>;
    return_: import("superstruct").Struct<SuiMoveNormalizedType[], import("superstruct").Struct<SuiMoveNormalizedType, null>>;
}>;
export type SuiMoveNormalizedFunction = Infer<typeof SuiMoveNormalizedFunction>;
export declare const SuiMoveNormalizedField: import("superstruct").Struct<{
    name: string;
    type_: SuiMoveNormalizedType;
}, {
    name: import("superstruct").Struct<string, null>;
    type_: import("superstruct").Struct<SuiMoveNormalizedType, null>;
}>;
export type SuiMoveNormalizedField = Infer<typeof SuiMoveNormalizedField>;
export declare const SuiMoveNormalizedStruct: import("superstruct").Struct<{
    fields: {
        name: string;
        type_: SuiMoveNormalizedType;
    }[];
    abilities: {
        abilities: string[];
    };
    type_parameters: {
        constraints: {
            abilities: string[];
        };
        is_phantom: boolean;
    }[];
}, {
    abilities: import("superstruct").Struct<{
        abilities: string[];
    }, {
        abilities: import("superstruct").Struct<string[], import("superstruct").Struct<string, null>>;
    }>;
    type_parameters: import("superstruct").Struct<{
        constraints: {
            abilities: string[];
        };
        is_phantom: boolean;
    }[], import("superstruct").Struct<{
        constraints: {
            abilities: string[];
        };
        is_phantom: boolean;
    }, {
        constraints: import("superstruct").Struct<{
            abilities: string[];
        }, {
            abilities: import("superstruct").Struct<string[], import("superstruct").Struct<string, null>>;
        }>;
        is_phantom: import("superstruct").Struct<boolean, null>;
    }>>;
    fields: import("superstruct").Struct<{
        name: string;
        type_: SuiMoveNormalizedType;
    }[], import("superstruct").Struct<{
        name: string;
        type_: SuiMoveNormalizedType;
    }, {
        name: import("superstruct").Struct<string, null>;
        type_: import("superstruct").Struct<SuiMoveNormalizedType, null>;
    }>>;
}>;
export type SuiMoveNormalizedStruct = Infer<typeof SuiMoveNormalizedStruct>;
export declare const SuiMoveNormalizedModule: import("superstruct").Struct<{
    address: string;
    name: string;
    file_format_version: number;
    friends: {
        address: string;
        name: string;
    }[];
    structs: Record<string, {
        fields: {
            name: string;
            type_: SuiMoveNormalizedType;
        }[];
        abilities: {
            abilities: string[];
        };
        type_parameters: {
            constraints: {
                abilities: string[];
            };
            is_phantom: boolean;
        }[];
    }>;
    exposed_functions: Record<string, {
        visibility: "Private" | "Public" | "Friend";
        is_entry: boolean;
        type_parameters: {
            abilities: string[];
        }[];
        parameters: SuiMoveNormalizedType[];
        return_: SuiMoveNormalizedType[];
    }>;
}, {
    file_format_version: import("superstruct").Struct<number, null>;
    address: import("superstruct").Struct<string, null>;
    name: import("superstruct").Struct<string, null>;
    friends: import("superstruct").Struct<{
        address: string;
        name: string;
    }[], import("superstruct").Struct<{
        address: string;
        name: string;
    }, {
        address: import("superstruct").Struct<string, null>;
        name: import("superstruct").Struct<string, null>;
    }>>;
    structs: import("superstruct").Struct<Record<string, {
        fields: {
            name: string;
            type_: SuiMoveNormalizedType;
        }[];
        abilities: {
            abilities: string[];
        };
        type_parameters: {
            constraints: {
                abilities: string[];
            };
            is_phantom: boolean;
        }[];
    }>, null>;
    exposed_functions: import("superstruct").Struct<Record<string, {
        visibility: "Private" | "Public" | "Friend";
        is_entry: boolean;
        type_parameters: {
            abilities: string[];
        }[];
        parameters: SuiMoveNormalizedType[];
        return_: SuiMoveNormalizedType[];
    }>, null>;
}>;
export type SuiMoveNormalizedModule = Infer<typeof SuiMoveNormalizedModule>;
export declare const SuiMoveNormalizedModules: import("superstruct").Struct<Record<string, {
    address: string;
    name: string;
    file_format_version: number;
    friends: {
        address: string;
        name: string;
    }[];
    structs: Record<string, {
        fields: {
            name: string;
            type_: SuiMoveNormalizedType;
        }[];
        abilities: {
            abilities: string[];
        };
        type_parameters: {
            constraints: {
                abilities: string[];
            };
            is_phantom: boolean;
        }[];
    }>;
    exposed_functions: Record<string, {
        visibility: "Private" | "Public" | "Friend";
        is_entry: boolean;
        type_parameters: {
            abilities: string[];
        }[];
        parameters: SuiMoveNormalizedType[];
        return_: SuiMoveNormalizedType[];
    }>;
}>, null>;
export type SuiMoveNormalizedModules = Infer<typeof SuiMoveNormalizedModules>;
export declare function extractMutableReference(normalizedType: SuiMoveNormalizedType): SuiMoveNormalizedType | undefined;
export declare function extractReference(normalizedType: SuiMoveNormalizedType): SuiMoveNormalizedType | undefined;
export declare function extractStructTag(normalizedType: SuiMoveNormalizedType): SuiMoveNormalizedStructType | undefined;
