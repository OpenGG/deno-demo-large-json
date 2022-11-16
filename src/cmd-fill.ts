import process from "https://deno.land/std@0.164.0/node/process.ts";
import crypto from "https://deno.land/std@0.164.0/node/crypto.ts";
import { write } from "./write.ts";

const FILL_COUNT: number = parseInt(process.env.FILL_COUNT || "", 10) || 1024 * 1024;

const randomStr = () => crypto.randomBytes(32).toString("base64");

const fill = async () => {
  await write("data.json", function* () {
    yield "[\n";

    for (let i = 0; i < FILL_COUNT; i++) {
      const line = `  "${randomStr()}",\n`;
      yield line;
    }

    yield "]";
  });
};

fill();
