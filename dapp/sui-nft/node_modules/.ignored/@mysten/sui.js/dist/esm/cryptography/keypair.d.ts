import { IntentScope } from './intent.js';
import type { PublicKey } from './publickey.js';
import type { SignatureScheme } from './signature-scheme.js';
import type { SerializedSignature } from './signature.js';
export declare const PRIVATE_KEY_SIZE = 32;
export declare const LEGACY_PRIVATE_KEY_SIZE = 64;
export declare const SUI_PRIVATE_KEY_PREFIX = "suiprivkey";
export type ParsedKeypair = {
    schema: SignatureScheme;
    secretKey: Uint8Array;
};
/** @deprecated use string instead. See {@link Keypair.getSecretKey} */
export type ExportedKeypair = {
    schema: SignatureScheme;
    privateKey: string;
};
export interface SignatureWithBytes {
    bytes: string;
    signature: SerializedSignature;
}
/**
 * TODO: Document
 */
export declare abstract class Signer {
    abstract sign(bytes: Uint8Array): Promise<Uint8Array>;
    /**
     * Sign messages with a specific intent. By combining the message bytes with the intent before hashing and signing,
     * it ensures that a signed message is tied to a specific purpose and domain separator is provided
     */
    signWithIntent(bytes: Uint8Array, intent: IntentScope): Promise<SignatureWithBytes>;
    /**
     * Signs provided transaction block by calling `signWithIntent()` with a `TransactionData` provided as intent scope
     */
    signTransactionBlock(bytes: Uint8Array): Promise<SignatureWithBytes>;
    /**
     * Signs provided personal message by calling `signWithIntent()` with a `PersonalMessage` provided as intent scope
     */
    signPersonalMessage(bytes: Uint8Array): Promise<SignatureWithBytes>;
    toSuiAddress(): string;
    /**
     * Return the signature for the data.
     * Prefer the async version {@link sign}, as this method will be deprecated in a future release.
     */
    abstract signData(data: Uint8Array): Uint8Array;
    /**
     * Get the key scheme of the keypair: Secp256k1 or ED25519
     */
    abstract getKeyScheme(): SignatureScheme;
    /**
     * The public key for this keypair
     */
    abstract getPublicKey(): PublicKey;
}
export declare abstract class Keypair extends Signer {
    /**
     * This returns the Bech32 secret key string for this keypair.
     */
    abstract getSecretKey(): string;
    /**
     * @deprecated use {@link Keypair.getSecretKey} instead
     * This returns an exported keypair object, schema is the signature
     * scheme name, and the private key field is a Bech32 encoded string
     * of 33-byte `flag || private_key` that starts with `suiprivkey`.
     */
    export(): ExportedKeypair;
}
/**
 * This returns an ParsedKeypair object based by validating the
 * 33-byte Bech32 encoded string starting with `suiprivkey`, and
 * parse out the signature scheme and the private key in bytes.
 */
export declare function decodeSuiPrivateKey(value: string): ParsedKeypair;
/**
 * This returns a Bech32 encoded string starting with `suiprivkey`,
 * encoding 33-byte `flag || bytes` for the given the 32-byte private
 * key and its signature scheme.
 */
export declare function encodeSuiPrivateKey(bytes: Uint8Array, scheme: SignatureScheme): string;
