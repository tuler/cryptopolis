import type { PublicKey, SerializedSignature, SignatureScheme } from '../cryptography/index.js';
import type { SuiGraphQLClient } from '../graphql/client.js';
export declare function verifySignature(bytes: Uint8Array, signature: SerializedSignature): Promise<PublicKey>;
export declare function verifyPersonalMessage(message: Uint8Array, signature: SerializedSignature, options?: {
    client?: SuiGraphQLClient;
}): Promise<PublicKey>;
export declare function verifyTransactionBlock(transactionBlock: Uint8Array, signature: SerializedSignature): Promise<PublicKey>;
export declare function publicKeyFromRawBytes(signatureScheme: SignatureScheme, bytes: Uint8Array, options?: {
    client?: SuiGraphQLClient;
}): PublicKey;
