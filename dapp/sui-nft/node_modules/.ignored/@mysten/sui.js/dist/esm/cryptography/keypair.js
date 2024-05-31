import { bcs, toB64 } from "@mysten/bcs";
import { blake2b } from "@noble/hashes/blake2b";
import { bech32 } from "bech32";
import { IntentScope, messageWithIntent } from "./intent.js";
import { SIGNATURE_FLAG_TO_SCHEME, SIGNATURE_SCHEME_TO_FLAG } from "./signature-scheme.js";
import { toSerializedSignature } from "./signature.js";
const PRIVATE_KEY_SIZE = 32;
const LEGACY_PRIVATE_KEY_SIZE = 64;
const SUI_PRIVATE_KEY_PREFIX = "suiprivkey";
class Signer {
  /**
   * Sign messages with a specific intent. By combining the message bytes with the intent before hashing and signing,
   * it ensures that a signed message is tied to a specific purpose and domain separator is provided
   */
  async signWithIntent(bytes, intent) {
    const intentMessage = messageWithIntent(intent, bytes);
    const digest = blake2b(intentMessage, { dkLen: 32 });
    const signature = toSerializedSignature({
      signature: await this.sign(digest),
      signatureScheme: this.getKeyScheme(),
      publicKey: this.getPublicKey()
    });
    return {
      signature,
      bytes: toB64(bytes)
    };
  }
  /**
   * Signs provided transaction block by calling `signWithIntent()` with a `TransactionData` provided as intent scope
   */
  async signTransactionBlock(bytes) {
    return this.signWithIntent(bytes, IntentScope.TransactionData);
  }
  /**
   * Signs provided personal message by calling `signWithIntent()` with a `PersonalMessage` provided as intent scope
   */
  async signPersonalMessage(bytes) {
    return this.signWithIntent(
      bcs.vector(bcs.u8()).serialize(bytes).toBytes(),
      IntentScope.PersonalMessage
    );
  }
  toSuiAddress() {
    return this.getPublicKey().toSuiAddress();
  }
}
class Keypair extends Signer {
  /**
   * @deprecated use {@link Keypair.getSecretKey} instead
   * This returns an exported keypair object, schema is the signature
   * scheme name, and the private key field is a Bech32 encoded string
   * of 33-byte `flag || private_key` that starts with `suiprivkey`.
   */
  export() {
    return {
      schema: this.getKeyScheme(),
      privateKey: this.getSecretKey()
    };
  }
}
function decodeSuiPrivateKey(value) {
  const { prefix, words } = bech32.decode(value);
  if (prefix !== SUI_PRIVATE_KEY_PREFIX) {
    throw new Error("invalid private key prefix");
  }
  const extendedSecretKey = new Uint8Array(bech32.fromWords(words));
  const secretKey = extendedSecretKey.slice(1);
  const signatureScheme = SIGNATURE_FLAG_TO_SCHEME[extendedSecretKey[0]];
  return {
    schema: signatureScheme,
    secretKey
  };
}
function encodeSuiPrivateKey(bytes, scheme) {
  if (bytes.length !== PRIVATE_KEY_SIZE) {
    throw new Error("Invalid bytes length");
  }
  const flag = SIGNATURE_SCHEME_TO_FLAG[scheme];
  const privKeyBytes = new Uint8Array(bytes.length + 1);
  privKeyBytes.set([flag]);
  privKeyBytes.set(bytes, 1);
  return bech32.encode(SUI_PRIVATE_KEY_PREFIX, bech32.toWords(privKeyBytes));
}
export {
  Keypair,
  LEGACY_PRIVATE_KEY_SIZE,
  PRIVATE_KEY_SIZE,
  SUI_PRIVATE_KEY_PREFIX,
  Signer,
  decodeSuiPrivateKey,
  encodeSuiPrivateKey
};
//# sourceMappingURL=keypair.js.map
