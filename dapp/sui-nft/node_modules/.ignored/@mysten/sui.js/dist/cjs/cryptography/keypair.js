"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var keypair_exports = {};
__export(keypair_exports, {
  Keypair: () => Keypair,
  LEGACY_PRIVATE_KEY_SIZE: () => LEGACY_PRIVATE_KEY_SIZE,
  PRIVATE_KEY_SIZE: () => PRIVATE_KEY_SIZE,
  SUI_PRIVATE_KEY_PREFIX: () => SUI_PRIVATE_KEY_PREFIX,
  Signer: () => Signer,
  decodeSuiPrivateKey: () => decodeSuiPrivateKey,
  encodeSuiPrivateKey: () => encodeSuiPrivateKey
});
module.exports = __toCommonJS(keypair_exports);
var import_bcs = require("@mysten/bcs");
var import_blake2b = require("@noble/hashes/blake2b");
var import_bech32 = require("bech32");
var import_intent = require("./intent.js");
var import_signature_scheme = require("./signature-scheme.js");
var import_signature = require("./signature.js");
const PRIVATE_KEY_SIZE = 32;
const LEGACY_PRIVATE_KEY_SIZE = 64;
const SUI_PRIVATE_KEY_PREFIX = "suiprivkey";
class Signer {
  /**
   * Sign messages with a specific intent. By combining the message bytes with the intent before hashing and signing,
   * it ensures that a signed message is tied to a specific purpose and domain separator is provided
   */
  async signWithIntent(bytes, intent) {
    const intentMessage = (0, import_intent.messageWithIntent)(intent, bytes);
    const digest = (0, import_blake2b.blake2b)(intentMessage, { dkLen: 32 });
    const signature = (0, import_signature.toSerializedSignature)({
      signature: await this.sign(digest),
      signatureScheme: this.getKeyScheme(),
      publicKey: this.getPublicKey()
    });
    return {
      signature,
      bytes: (0, import_bcs.toB64)(bytes)
    };
  }
  /**
   * Signs provided transaction block by calling `signWithIntent()` with a `TransactionData` provided as intent scope
   */
  async signTransactionBlock(bytes) {
    return this.signWithIntent(bytes, import_intent.IntentScope.TransactionData);
  }
  /**
   * Signs provided personal message by calling `signWithIntent()` with a `PersonalMessage` provided as intent scope
   */
  async signPersonalMessage(bytes) {
    return this.signWithIntent(
      import_bcs.bcs.vector(import_bcs.bcs.u8()).serialize(bytes).toBytes(),
      import_intent.IntentScope.PersonalMessage
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
  const { prefix, words } = import_bech32.bech32.decode(value);
  if (prefix !== SUI_PRIVATE_KEY_PREFIX) {
    throw new Error("invalid private key prefix");
  }
  const extendedSecretKey = new Uint8Array(import_bech32.bech32.fromWords(words));
  const secretKey = extendedSecretKey.slice(1);
  const signatureScheme = import_signature_scheme.SIGNATURE_FLAG_TO_SCHEME[extendedSecretKey[0]];
  return {
    schema: signatureScheme,
    secretKey
  };
}
function encodeSuiPrivateKey(bytes, scheme) {
  if (bytes.length !== PRIVATE_KEY_SIZE) {
    throw new Error("Invalid bytes length");
  }
  const flag = import_signature_scheme.SIGNATURE_SCHEME_TO_FLAG[scheme];
  const privKeyBytes = new Uint8Array(bytes.length + 1);
  privKeyBytes.set([flag]);
  privKeyBytes.set(bytes, 1);
  return import_bech32.bech32.encode(SUI_PRIVATE_KEY_PREFIX, import_bech32.bech32.toWords(privKeyBytes));
}
//# sourceMappingURL=keypair.js.map
