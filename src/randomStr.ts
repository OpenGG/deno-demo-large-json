import { encodeBase64 } from "./encoding/encodeBase64.ts";

export const randomStr = (buffer: Uint8Array): string => {
  crypto.getRandomValues(buffer);

  return encodeBase64(buffer);
};