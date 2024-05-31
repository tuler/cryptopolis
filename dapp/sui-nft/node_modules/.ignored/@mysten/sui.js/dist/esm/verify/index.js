import { parseSerializedSignature } from "../cryptography/index.js";
import { Ed25519PublicKey } from "../keypairs/ed25519/publickey.js";
import { Secp256k1PublicKey } from "../keypairs/secp256k1/publickey.js";
import { Secp256r1PublicKey } from "../keypairs/secp256r1/publickey.js";
import { MultiSigPublicKey } from "../multisig/publickey.js";
import { ZkLoginPublicIdentifier } from "../zklogin/publickey.js";
async function verifySignature(bytes, signature) {
  const parsedSignature = parseSignature(signature);
  if (!await parsedSignature.publicKey.verify(bytes, parsedSignature.serializedSignature)) {
    throw new Error(`Signature is not valid for the provided data`);
  }
  return parsedSignature.publicKey;
}
async function verifyPersonalMessage(message, signature, options = {}) {
  const parsedSignature = parseSignature(signature, options);
  if (!await parsedSignature.publicKey.verifyPersonalMessage(
    message,
    parsedSignature.serializedSignature
  )) {
    throw new Error(`Signature is not valid for the provided message`);
  }
  return parsedSignature.publicKey;
}
async function verifyTransactionBlock(transactionBlock, signature) {
  const parsedSignature = parseSignature(signature);
  if (!await parsedSignature.publicKey.verifyTransactionBlock(
    transactionBlock,
    parsedSignature.serializedSignature
  )) {
    throw new Error(`Signature is not valid for the provided TransactionBlock`);
  }
  return parsedSignature.publicKey;
}
function parseSignature(signature, options = {}) {
  const parsedSignature = parseSerializedSignature(signature);
  if (parsedSignature.signatureScheme === "MultiSig") {
    return {
      ...parsedSignature,
      publicKey: new MultiSigPublicKey(parsedSignature.multisig.multisig_pk)
    };
  }
  const publicKey = publicKeyFromRawBytes(
    parsedSignature.signatureScheme,
    parsedSignature.publicKey,
    options
  );
  return {
    ...parsedSignature,
    publicKey
  };
}
function publicKeyFromRawBytes(signatureScheme, bytes, options = {}) {
  switch (signatureScheme) {
    case "ED25519":
      return new Ed25519PublicKey(bytes);
    case "Secp256k1":
      return new Secp256k1PublicKey(bytes);
    case "Secp256r1":
      return new Secp256r1PublicKey(bytes);
    case "MultiSig":
      return new MultiSigPublicKey(bytes);
    case "ZkLogin":
      return new ZkLoginPublicIdentifier(bytes, options);
    default:
      throw new Error(`Unsupported signature scheme ${signatureScheme}`);
  }
}
export {
  publicKeyFromRawBytes,
  verifyPersonalMessage,
  verifySignature,
  verifyTransactionBlock
};
//# sourceMappingURL=index.js.map
