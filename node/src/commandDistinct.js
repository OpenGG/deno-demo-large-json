import { getEnvInt } from "./env.js";
import { ReadFileHandle } from "./fs/ReadFileHandle.js";
import { SimpleParser } from "./SimpleParser.js";
import { ShardSet } from "./ShardSet.js";
import { decodeASCII } from "./encoding/decodeASCII.js";
const SHARD_BUCKET_COUNT = getEnvInt("SHARD_BUCKETS", 256);
const commandDistinct = async () => {
    const set = new ShardSet(SHARD_BUCKET_COUNT);
    const parseBuff = new Uint8Array(1024);
    const parser = new SimpleParser(parseBuff);
    const readFileHandle = await ReadFileHandle("data.json");
    const readBuff = new Uint8Array(16 * 1024);
    for (;;) {
        const readBytes = await readFileHandle.read(readBuff);
        const endOfFile = readBytes === null;
        if (endOfFile) {
            break;
        }
        const readView = new Uint8Array(readBuff.buffer, 0, readBytes);
        for (const chunk of parser.parse(readView)) {
            set.add(chunk, decodeASCII(chunk));
        }
    }
    await readFileHandle.close();
    console.log(set.size());
    // console.log([...set].slice(10));
};
commandDistinct();