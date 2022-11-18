const decoder = new TextDecoder("ascii");

export const decodeASCII = (buff: Uint8Array) => {
  return decoder.decode(buff);
};
