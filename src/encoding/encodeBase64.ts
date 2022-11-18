import * as base64 from "../base64/base64.ts";

export const encodeBase64 = (u8: Uint8Array) => base64.fromUint8Array(u8);
