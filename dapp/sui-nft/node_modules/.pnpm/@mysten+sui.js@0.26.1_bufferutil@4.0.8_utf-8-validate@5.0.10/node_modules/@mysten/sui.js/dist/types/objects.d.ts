import { Infer } from 'superstruct';
import { ObjectId, ObjectOwner, TransactionDigest } from './common';
export declare const ObjectType: import("superstruct").Struct<"moveObject" | "package", null>;
export type ObjectType = Infer<typeof ObjectType>;
export declare const SuiObjectRef: import("superstruct").Struct<{
    digest: string;
    objectId: string;
    version: number;
}, {
    /** Base64 string representing the object digest */
    digest: import("superstruct").Struct<string, null>;
    /** Hex code as string representing the object id */
    objectId: import("superstruct").Struct<string, null>;
    /** Object version */
    version: import("superstruct").Struct<number, null>;
}>;
export type SuiObjectRef = Infer<typeof SuiObjectRef>;
export declare const SuiObjectInfo: import("superstruct").Struct<{
    digest: string;
    objectId: string;
    version: number;
    type: string;
    owner: {
        AddressOwner: string;
    } | {
        ObjectOwner: string;
    } | {
        Shared: {
            initial_shared_version: number;
        };
    } | "Immutable";
    previousTransaction: string;
}, {
    type: import("superstruct").Struct<string, null>;
    owner: import("superstruct").Struct<{
        AddressOwner: string;
    } | {
        ObjectOwner: string;
    } | {
        Shared: {
            initial_shared_version: number;
        };
    } | "Immutable", null>;
    previousTransaction: import("superstruct").Struct<string, null>;
    digest: import("superstruct").Struct<string, null>;
    objectId: import("superstruct").Struct<string, null>;
    version: import("superstruct").Struct<number, null>;
}>;
export type SuiObjectInfo = Infer<typeof SuiObjectInfo>;
export declare const ObjectContentFields: import("superstruct").Struct<Record<string, any>, null>;
export type ObjectContentFields = Infer<typeof ObjectContentFields>;
export declare const MovePackageContent: import("superstruct").Struct<Record<string, string>, null>;
export type MovePackageContent = Infer<typeof MovePackageContent>;
export declare const SuiMoveObject: import("superstruct").Struct<{
    type: string;
    fields: Record<string, any>;
    has_public_transfer?: boolean | undefined;
}, {
    /** Move type (e.g., "0x2::coin::Coin<0x2::sui::SUI>") */
    type: import("superstruct").Struct<string, null>;
    /** Fields and values stored inside the Move object */
    fields: import("superstruct").Struct<Record<string, any>, null>;
    has_public_transfer: import("superstruct").Struct<boolean | undefined, null>;
}>;
export type SuiMoveObject = Infer<typeof SuiMoveObject>;
export declare const SuiMovePackage: import("superstruct").Struct<{
    disassembled: Record<string, string>;
}, {
    /** A mapping from module name to disassembled Move bytecode */
    disassembled: import("superstruct").Struct<Record<string, string>, null>;
}>;
export type SuiMovePackage = Infer<typeof SuiMovePackage>;
export declare const SuiData: import("superstruct").Struct<{
    type: string;
    fields: Record<string, any>;
    dataType: "moveObject";
    has_public_transfer?: boolean | undefined;
} | {
    disassembled: Record<string, string>;
    dataType: "package";
}, null>;
export type SuiData = Infer<typeof SuiData>;
export declare const MIST_PER_SUI: bigint;
export declare const SuiObject: import("superstruct").Struct<{
    data: {
        type: string;
        fields: Record<string, any>;
        dataType: "moveObject";
        has_public_transfer?: boolean | undefined;
    } | {
        disassembled: Record<string, string>;
        dataType: "package";
    };
    owner: {
        AddressOwner: string;
    } | {
        ObjectOwner: string;
    } | {
        Shared: {
            initial_shared_version: number;
        };
    } | "Immutable";
    previousTransaction: string;
    storageRebate: number;
    reference: {
        digest: string;
        objectId: string;
        version: number;
    };
}, {
    /** The meat of the object */
    data: import("superstruct").Struct<{
        type: string;
        fields: Record<string, any>;
        dataType: "moveObject";
        has_public_transfer?: boolean | undefined;
    } | {
        disassembled: Record<string, string>;
        dataType: "package";
    }, null>;
    /** The owner of the object */
    owner: import("superstruct").Struct<{
        AddressOwner: string;
    } | {
        ObjectOwner: string;
    } | {
        Shared: {
            initial_shared_version: number;
        };
    } | "Immutable", null>;
    /** The digest of the transaction that created or last mutated this object */
    previousTransaction: import("superstruct").Struct<string, null>;
    /**
     * The amount of SUI we would rebate if this object gets deleted.
     * This number is re-calculated each time the object is mutated based on
     * the present storage gas price.
     */
    storageRebate: import("superstruct").Struct<number, null>;
    reference: import("superstruct").Struct<{
        digest: string;
        objectId: string;
        version: number;
    }, {
        /** Base64 string representing the object digest */
        digest: import("superstruct").Struct<string, null>;
        /** Hex code as string representing the object id */
        objectId: import("superstruct").Struct<string, null>;
        /** Object version */
        version: import("superstruct").Struct<number, null>;
    }>;
}>;
export type SuiObject = Infer<typeof SuiObject>;
export declare const ObjectStatus: import("superstruct").Struct<"Exists" | "NotExists" | "Deleted", null>;
export type ObjectStatus = Infer<typeof ObjectStatus>;
export declare const GetOwnedObjectsResponse: import("superstruct").Struct<{
    digest: string;
    objectId: string;
    version: number;
    type: string;
    owner: {
        AddressOwner: string;
    } | {
        ObjectOwner: string;
    } | {
        Shared: {
            initial_shared_version: number;
        };
    } | "Immutable";
    previousTransaction: string;
}[], import("superstruct").Struct<{
    digest: string;
    objectId: string;
    version: number;
    type: string;
    owner: {
        AddressOwner: string;
    } | {
        ObjectOwner: string;
    } | {
        Shared: {
            initial_shared_version: number;
        };
    } | "Immutable";
    previousTransaction: string;
}, {
    type: import("superstruct").Struct<string, null>;
    owner: import("superstruct").Struct<{
        AddressOwner: string;
    } | {
        ObjectOwner: string;
    } | {
        Shared: {
            initial_shared_version: number;
        };
    } | "Immutable", null>;
    previousTransaction: import("superstruct").Struct<string, null>;
    digest: import("superstruct").Struct<string, null>;
    objectId: import("superstruct").Struct<string, null>;
    version: import("superstruct").Struct<number, null>;
}>>;
export type GetOwnedObjectsResponse = Infer<typeof GetOwnedObjectsResponse>;
export declare const GetObjectDataResponse: import("superstruct").Struct<{
    status: "Exists" | "NotExists" | "Deleted";
    details: string | {
        digest: string;
        objectId: string;
        version: number;
    } | {
        data: {
            type: string;
            fields: Record<string, any>;
            dataType: "moveObject";
            has_public_transfer?: boolean | undefined;
        } | {
            disassembled: Record<string, string>;
            dataType: "package";
        };
        owner: {
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: number;
            };
        } | "Immutable";
        previousTransaction: string;
        storageRebate: number;
        reference: {
            digest: string;
            objectId: string;
            version: number;
        };
    };
}, {
    status: import("superstruct").Struct<"Exists" | "NotExists" | "Deleted", null>;
    details: import("superstruct").Struct<string | {
        digest: string;
        objectId: string;
        version: number;
    } | {
        data: {
            type: string;
            fields: Record<string, any>;
            dataType: "moveObject";
            has_public_transfer?: boolean | undefined;
        } | {
            disassembled: Record<string, string>;
            dataType: "package";
        };
        owner: {
            AddressOwner: string;
        } | {
            ObjectOwner: string;
        } | {
            Shared: {
                initial_shared_version: number;
            };
        } | "Immutable";
        previousTransaction: string;
        storageRebate: number;
        reference: {
            digest: string;
            objectId: string;
            version: number;
        };
    }, null>;
}>;
export type GetObjectDataResponse = Infer<typeof GetObjectDataResponse>;
export type ObjectDigest = string;
export type Order = 'ascending' | 'descending';
export declare function getObjectExistsResponse(resp: GetObjectDataResponse): SuiObject | undefined;
export declare function getObjectDeletedResponse(resp: GetObjectDataResponse): SuiObjectRef | undefined;
export declare function getObjectNotExistsResponse(resp: GetObjectDataResponse): ObjectId | undefined;
export declare function getObjectReference(resp: GetObjectDataResponse): SuiObjectRef | undefined;
export declare function getObjectId(data: GetObjectDataResponse | SuiObjectRef): ObjectId;
export declare function getObjectVersion(data: GetObjectDataResponse | SuiObjectRef): number | undefined;
export declare function getObjectType(resp: GetObjectDataResponse): ObjectType | undefined;
export declare function getObjectPreviousTransactionDigest(resp: GetObjectDataResponse): TransactionDigest | undefined;
export declare function getObjectOwner(resp: GetObjectDataResponse): ObjectOwner | undefined;
export declare function getSharedObjectInitialVersion(resp: GetObjectDataResponse): number | undefined;
export declare function isSharedObject(resp: GetObjectDataResponse): boolean;
export declare function isImmutableObject(resp: GetObjectDataResponse): boolean;
export declare function getMoveObjectType(resp: GetObjectDataResponse): string | undefined;
export declare function getObjectFields(resp: GetObjectDataResponse | SuiMoveObject): ObjectContentFields | undefined;
export declare function getMoveObject(data: GetObjectDataResponse | SuiObject): SuiMoveObject | undefined;
export declare function hasPublicTransfer(data: GetObjectDataResponse | SuiObject): boolean;
export declare function getMovePackageContent(data: GetObjectDataResponse | SuiMovePackage): MovePackageContent | undefined;
