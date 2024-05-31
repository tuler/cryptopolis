import type { Struct } from 'superstruct';
import type { SuiMoveNormalizedType } from '../client/index.js';
export declare function create<T, S>(value: T, struct: Struct<T, S>): T;
export declare function extractMutableReference(normalizedType: SuiMoveNormalizedType): SuiMoveNormalizedType | undefined;
export declare function extractReference(normalizedType: SuiMoveNormalizedType): SuiMoveNormalizedType | undefined;
export declare function extractStructTag(normalizedType: SuiMoveNormalizedType): Extract<SuiMoveNormalizedType, {
    Struct: unknown;
}> | undefined;
