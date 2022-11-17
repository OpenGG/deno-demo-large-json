import { decodeASCII } from "./decodeASCII.ts";
import { getEnvInt } from "./env.ts";
import { readFile } from "./readFile.ts";
import { ShardSet } from "./ShardSet.ts";
import { SimpleParser } from "./SimpleParser.ts";

const SHARD_BUCKETS: number = getEnvInt("SHARD_BUCKETS", 256);

const commandDistinct = async () => {
  const set = new ShardSet(SHARD_BUCKETS);

  // get strings from data.json
  const parser = new SimpleParser((res: Uint8Array) => {
    const str = decodeASCII(res)
    // add into ShardSet()
    set.add(res, str);
  });

  await readFile("data.json", (chunk) => {
    parser.push(chunk);
  });

  console.log(set.size());
  // console.log([...set].slice(10));
};

commandDistinct();
