const encoder = new TextEncoder();
export const encode = (str: string, buff: Uint8Array) => {
  return encoder.encodeInto(str, buff);
};
