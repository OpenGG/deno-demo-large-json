import { randomStr } from "./randomStr.js";
import { getEnvInt } from "./env.js";
import { WriteFileHandle } from "./fs/WriteFileHandle.js";
const FILL_COUNT = getEnvInt("FILL_COUNT", 1024 * 1024);
console.log(FILL_COUNT);
const commandFill = async () => {
    const writeFileHandle = await WriteFileHandle("data.json");
    const encodeBuff = new Uint8Array(1024);
    await writeFileHandle.writeString("[\n", encodeBuff);
    const randomBuff = new Uint8Array(32);
    for (let i = 0; i < FILL_COUNT; i++) {
        const line = `  "${randomStr(randomBuff)}",\n`;
        await writeFileHandle.writeString(line, encodeBuff);
    }
    await writeFileHandle.writeString("]", encodeBuff);
    await writeFileHandle.close();
};
commandFill();