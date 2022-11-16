import process from "https://deno.land/std@0.164.0/node/process.ts";
import { read } from "./read.ts";
import { ShardSet } from "./ShardSet.ts";
import { SimpleParser } from "./SimpleParser.ts";

const SHARD_BUCKETS: number = parseInt(process.env.SHARD_BUCKETS || "", 10) || 256;

const distinct = async () => {
  const set = new ShardSet(SHARD_BUCKETS);

  const parser = new SimpleParser((str: string) => {
    set.add(str);
  });

  await read("data.json", (chunk) => {
    parser.push(chunk);
  });

  console.log(set.size());
  // console.log([...set]);
};

distinct();
