import { encode } from "../encoding/encode.js";
import fs from 'fs/promises'
export const WriteFileHandle = async (filename) => {
    const file = await fs.open(filename, 'w+');
    const stream = file.createWriteStream()
    const writeString = (str, encodeBuff) => {
        const { read, written, } = encode(str, encodeBuff);
        if (read !== str.length) {
            throw new Error("Encode buffer overflow");
        }
        const view = new Uint8Array(encodeBuff.buffer, 0, written);
        return write(view);
    };
    const write = (buff) => stream.write(buff);
    const close = () => file.close();
    return {
        writeString,
        write,
        close,
    };
};