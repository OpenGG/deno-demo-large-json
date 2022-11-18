import { encode } from "../encoding/encode.ts";

export const WriteFileHandle = async (
  filename: string,
) => {
  const file = await Deno.open(filename, {
    write: true,
    create: true,
    truncate: true,
  });

  const writeString = (
    str: string,
    encodeBuff: Uint8Array,
  ) => {
    const {
      read,
      written,
    } = encode(str, encodeBuff);

    if (read !== str.length) {
      throw new Error("Encode buffer overflow");
    }

    const view = new Uint8Array(encodeBuff.buffer, 0, written);

    return write(view);
  };

  const write = (buff: Uint8Array) => file.write(buff);

  const close = () => file.close()

  return {
    writeString,
    write,
    close,
  };
};
