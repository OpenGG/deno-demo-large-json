import * as base64 from "https://denopkg.com/chiefbiiko/base64/mod.ts";

export const encodeBase64 = (u8: Uint8Array) => base64.fromUint8Array(u8);
