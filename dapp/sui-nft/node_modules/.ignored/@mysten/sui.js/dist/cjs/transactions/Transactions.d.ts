import type { Infer, Struct } from 'superstruct';
import type { TypeTag } from '../bcs/index.js';
export declare const TransactionBlockInput: Struct<{
    index: number;
    kind: "Input";
    value?: any;
    type?: "object" | undefined;
} | {
    index: number;
    kind: "Input";
    type: "pure";
    value?: any;
}, null>;
export type TransactionBlockInput = Infer<typeof TransactionBlockInput>;
export declare const TransactionArgument: Struct<{
    index: number;
    kind: "Input";
    value?: any;
    type?: "object" | undefined;
} | {
    index: number;
    kind: "Input";
    type: "pure";
    value?: any;
} | {
    kind: "GasCoin";
} | {
    index: number;
    kind: "Result";
} | {
    index: number;
    resultIndex: number;
    kind: "NestedResult";
}, null>;
export type TransactionArgument = Infer<typeof TransactionArgument>;
export declare const MoveCallTransaction: Struct<{
    kind: "MoveCall";
    arguments: ({
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    })[];
    target: `${string}::${string}::${string}`;
    typeArguments: string[];
}, {
    kind: Struct<"MoveCall", "MoveCall">;
    target: Struct<`${string}::${string}::${string}`, null>;
    typeArguments: Struct<string[], Struct<string, null>>;
    arguments: Struct<({
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    })[], Struct<{
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    }, null>>;
}>;
export type MoveCallTransaction = Infer<typeof MoveCallTransaction>;
export declare const TransferObjectsTransaction: Struct<{
    address: {
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    };
    kind: "TransferObjects";
    objects: ({
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    })[];
}, {
    kind: Struct<"TransferObjects", "TransferObjects">;
    objects: Struct<({
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    })[], Struct<{
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    }, null>>;
    address: Struct<{
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    }, null>;
}>;
export type TransferObjectsTransaction = Infer<typeof TransferObjectsTransaction>;
export declare const SplitCoinsTransaction: Struct<{
    kind: "SplitCoins";
    coin: {
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    };
    amounts: ({
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    })[];
}, {
    kind: Struct<"SplitCoins", "SplitCoins">;
    coin: Struct<{
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    }, null>;
    amounts: Struct<({
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    })[], Struct<{
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    }, null>>;
}>;
export type SplitCoinsTransaction = Infer<typeof SplitCoinsTransaction>;
export declare const MergeCoinsTransaction: Struct<{
    kind: "MergeCoins";
    destination: {
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    };
    sources: ({
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    })[];
}, {
    kind: Struct<"MergeCoins", "MergeCoins">;
    destination: Struct<{
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    }, null>;
    sources: Struct<({
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    })[], Struct<{
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    }, null>>;
}>;
export type MergeCoinsTransaction = Infer<typeof MergeCoinsTransaction>;
export declare const MakeMoveVecTransaction: Struct<{
    kind: "MakeMoveVec";
    type: {
        Some: TypeTag;
    } | {
        None: true | null;
    };
    objects: ({
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    })[];
}, {
    kind: Struct<"MakeMoveVec", "MakeMoveVec">;
    type: Struct<{
        Some: TypeTag;
    } | {
        None: true | null;
    }, unknown>;
    objects: Struct<({
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    })[], Struct<{
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    }, null>>;
}>;
export type MakeMoveVecTransaction = Infer<typeof MakeMoveVecTransaction>;
export declare const PublishTransaction: Struct<{
    kind: "Publish";
    modules: number[][];
    dependencies: string[];
}, {
    kind: Struct<"Publish", "Publish">;
    modules: Struct<number[][], Struct<number[], Struct<number, null>>>;
    dependencies: Struct<string[], Struct<string, null>>;
}>;
export type PublishTransaction = Infer<typeof PublishTransaction>;
export declare enum UpgradePolicy {
    COMPATIBLE = 0,
    ADDITIVE = 128,
    DEP_ONLY = 192
}
export declare const UpgradeTransaction: Struct<{
    kind: "Upgrade";
    modules: number[][];
    dependencies: string[];
    packageId: string;
    ticket: {
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    };
}, {
    kind: Struct<"Upgrade", "Upgrade">;
    modules: Struct<number[][], Struct<number[], Struct<number, null>>>;
    dependencies: Struct<string[], Struct<string, null>>;
    packageId: Struct<string, null>;
    ticket: Struct<{
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    }, null>;
}>;
export type UpgradeTransaction = Infer<typeof UpgradeTransaction>;
export declare const TransactionType: Struct<{
    kind: "MoveCall";
    arguments: ({
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    })[];
    target: `${string}::${string}::${string}`;
    typeArguments: string[];
} | {
    address: {
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    };
    kind: "TransferObjects";
    objects: ({
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    })[];
} | {
    kind: "SplitCoins";
    coin: {
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    };
    amounts: ({
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    })[];
} | {
    kind: "MergeCoins";
    destination: {
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    };
    sources: ({
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    })[];
} | {
    kind: "Publish";
    modules: number[][];
    dependencies: string[];
} | {
    kind: "Upgrade";
    modules: number[][];
    dependencies: string[];
    packageId: string;
    ticket: {
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    };
} | {
    kind: "MakeMoveVec";
    type: {
        Some: TypeTag;
    } | {
        None: true | null;
    };
    objects: ({
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    })[];
}, null>;
export type TransactionType = Infer<typeof TransactionType>;
export declare function getTransactionType(data: unknown): Struct<{
    kind: "MoveCall";
    arguments: ({
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    })[];
    target: `${string}::${string}::${string}`;
    typeArguments: string[];
}, {
    kind: Struct<"MoveCall", "MoveCall">;
    target: Struct<`${string}::${string}::${string}`, null>;
    typeArguments: Struct<string[], Struct<string, null>>;
    arguments: Struct<({
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    })[], Struct<{
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    }, null>>;
}> | Struct<{
    address: {
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    };
    kind: "TransferObjects";
    objects: ({
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    })[];
}, {
    kind: Struct<"TransferObjects", "TransferObjects">;
    objects: Struct<({
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    })[], Struct<{
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    }, null>>;
    address: Struct<{
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    }, null>;
}> | Struct<{
    kind: "SplitCoins";
    coin: {
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    };
    amounts: ({
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    })[];
}, {
    kind: Struct<"SplitCoins", "SplitCoins">;
    coin: Struct<{
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    }, null>;
    amounts: Struct<({
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    })[], Struct<{
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    }, null>>;
}> | Struct<{
    kind: "MergeCoins";
    destination: {
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    };
    sources: ({
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    })[];
}, {
    kind: Struct<"MergeCoins", "MergeCoins">;
    destination: Struct<{
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    }, null>;
    sources: Struct<({
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    })[], Struct<{
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    }, null>>;
}> | Struct<{
    kind: "Publish";
    modules: number[][];
    dependencies: string[];
}, {
    kind: Struct<"Publish", "Publish">;
    modules: Struct<number[][], Struct<number[], Struct<number, null>>>;
    dependencies: Struct<string[], Struct<string, null>>;
}> | Struct<{
    kind: "Upgrade";
    modules: number[][];
    dependencies: string[];
    packageId: string;
    ticket: {
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    };
}, {
    kind: Struct<"Upgrade", "Upgrade">;
    modules: Struct<number[][], Struct<number[], Struct<number, null>>>;
    dependencies: Struct<string[], Struct<string, null>>;
    packageId: Struct<string, null>;
    ticket: Struct<{
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    }, null>;
}> | Struct<{
    kind: "MakeMoveVec";
    type: {
        Some: TypeTag;
    } | {
        None: true | null;
    };
    objects: ({
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    })[];
}, {
    kind: Struct<"MakeMoveVec", "MakeMoveVec">;
    type: Struct<{
        Some: TypeTag;
    } | {
        None: true | null;
    }, unknown>;
    objects: Struct<({
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    })[], Struct<{
        index: number;
        kind: "Input";
        value?: any;
        type?: "object" | undefined;
    } | {
        index: number;
        kind: "Input";
        type: "pure";
        value?: any;
    } | {
        kind: "GasCoin";
    } | {
        index: number;
        kind: "Result";
    } | {
        index: number;
        resultIndex: number;
        kind: "NestedResult";
    }, null>>;
}>;
/**
 * Simple helpers used to construct transactions:
 */
export declare const Transactions: {
    MoveCall(input: Omit<{
        kind: "MoveCall";
        arguments: ({
            index: number;
            kind: "Input";
            value?: any;
            type?: "object" | undefined;
        } | {
            index: number;
            kind: "Input";
            type: "pure";
            value?: any;
        } | {
            kind: "GasCoin";
        } | {
            index: number;
            kind: "Result";
        } | {
            index: number;
            resultIndex: number;
            kind: "NestedResult";
        })[];
        target: `${string}::${string}::${string}`;
        typeArguments: string[];
    }, "kind" | "arguments" | "typeArguments"> & {
        arguments?: ({
            index: number;
            kind: "Input";
            value?: any;
            type?: "object" | undefined;
        } | {
            index: number;
            kind: "Input";
            type: "pure";
            value?: any;
        } | {
            kind: "GasCoin";
        } | {
            index: number;
            kind: "Result";
        } | {
            index: number;
            resultIndex: number;
            kind: "NestedResult";
        })[] | undefined;
        typeArguments?: string[] | undefined;
    }): MoveCallTransaction;
    TransferObjects(objects: TransactionArgument[], address: TransactionArgument): TransferObjectsTransaction;
    SplitCoins(coin: TransactionArgument, amounts: TransactionArgument[]): SplitCoinsTransaction;
    MergeCoins(destination: TransactionArgument, sources: TransactionArgument[]): MergeCoinsTransaction;
    Publish({ modules, dependencies, }: {
        modules: number[][] | string[];
        dependencies: string[];
    }): PublishTransaction;
    Upgrade({ modules, dependencies, packageId, ticket, }: {
        modules: number[][] | string[];
        dependencies: string[];
        packageId: string;
        ticket: TransactionArgument;
    }): UpgradeTransaction;
    MakeMoveVec({ type, objects, }: Omit<{
        kind: "MakeMoveVec";
        type: {
            Some: TypeTag;
        } | {
            None: true | null;
        };
        objects: ({
            index: number;
            kind: "Input";
            value?: any;
            type?: "object" | undefined;
        } | {
            index: number;
            kind: "Input";
            type: "pure";
            value?: any;
        } | {
            kind: "GasCoin";
        } | {
            index: number;
            kind: "Result";
        } | {
            index: number;
            resultIndex: number;
            kind: "NestedResult";
        })[];
    }, "kind" | "type"> & {
        type?: string | undefined;
    }): MakeMoveVecTransaction;
};
