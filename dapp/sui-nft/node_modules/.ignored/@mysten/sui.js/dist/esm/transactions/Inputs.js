import { isSerializedBcs } from "@mysten/bcs";
import { array, bigint, boolean, integer, number, object, string, union } from "superstruct";
import { bcs } from "../bcs/index.js";
import { normalizeSuiAddress } from "../utils/sui-types.js";
const SuiObjectRef = object({
  /** Base64 string representing the object digest */
  digest: string(),
  /** Hex code as string representing the object id */
  objectId: string(),
  /** Object version */
  version: union([number(), string(), bigint()])
});
const ObjectArg = union([
  object({ ImmOrOwned: SuiObjectRef }),
  object({
    Shared: object({
      objectId: string(),
      initialSharedVersion: union([integer(), string()]),
      mutable: boolean()
    })
  }),
  object({ Receiving: SuiObjectRef })
]);
const PureCallArg = object({ Pure: array(integer()) });
const ObjectCallArg = object({ Object: ObjectArg });
const BuilderCallArg = union([PureCallArg, ObjectCallArg]);
function Pure(data, type) {
  return {
    Pure: Array.from(
      data instanceof Uint8Array ? data : isSerializedBcs(data) ? data.toBytes() : (
        // NOTE: We explicitly set this to be growable to infinity, because we have maxSize validation at the builder-level:
        bcs.ser(type, data, { maxSize: Infinity }).toBytes()
      )
    )
  };
}
const Inputs = {
  Pure,
  ObjectRef({ objectId, digest, version }) {
    return {
      Object: {
        ImmOrOwned: {
          digest,
          version,
          objectId: normalizeSuiAddress(objectId)
        }
      }
    };
  },
  SharedObjectRef({ objectId, mutable, initialSharedVersion }) {
    return {
      Object: {
        Shared: {
          mutable,
          initialSharedVersion,
          objectId: normalizeSuiAddress(objectId)
        }
      }
    };
  },
  ReceivingRef({ objectId, digest, version }) {
    return {
      Object: {
        Receiving: {
          digest,
          version,
          objectId: normalizeSuiAddress(objectId)
        }
      }
    };
  }
};
function getIdFromCallArg(arg) {
  if (typeof arg === "string") {
    return normalizeSuiAddress(arg);
  }
  if ("ImmOrOwned" in arg.Object) {
    return normalizeSuiAddress(arg.Object.ImmOrOwned.objectId);
  }
  if ("Receiving" in arg.Object) {
    return normalizeSuiAddress(arg.Object.Receiving.objectId);
  }
  return normalizeSuiAddress(arg.Object.Shared.objectId);
}
function getSharedObjectInput(arg) {
  return typeof arg === "object" && "Object" in arg && "Shared" in arg.Object ? arg.Object.Shared : void 0;
}
function isSharedObjectInput(arg) {
  return !!getSharedObjectInput(arg);
}
function isMutableSharedObjectInput(arg) {
  return getSharedObjectInput(arg)?.mutable ?? false;
}
export {
  BuilderCallArg,
  Inputs,
  ObjectCallArg,
  PureCallArg,
  SuiObjectRef,
  getIdFromCallArg,
  getSharedObjectInput,
  isMutableSharedObjectInput,
  isSharedObjectInput
};
//# sourceMappingURL=Inputs.js.map
