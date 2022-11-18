import { getEnvInt } from "./env.ts";
import { ReadFileHandle } from "./fs/ReadFileHandle.ts";
import { SimpleParser } from "./SimpleParser.ts";
import { ShardSet } from "./ShardSet.ts";
import { decodeASCII } from "./encoding/decodeASCII.ts";

const SHARD_BUCKET_COUNT: number = getEnvInt("SHARD_BUCKETS", 256);

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

  readFileHandle.close()

  console.log(set.size());

  // console.log([...set].slice(10));
};

commandDistinct();
