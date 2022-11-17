import { base64 } from "https://deno.land/x/b64@1.1.25/src/base64.js";

import { getEnvInt } from "./env.ts";
import { writeFile } from "./writeFile.ts";

const FILL_COUNT = getEnvInt("FILL_COUNT", 1024 * 1024);

const buffer = new Uint8Array(32);
const randomStr = (): string => {
  crypto.getRandomValues(buffer);

  return base64.fromArrayBuffer(buffer.buffer);
};

const commandFill = async () => {
  await writeFile("data.json", function* () {
    yield "[\n";

    for (let i = 0; i < FILL_COUNT; i++) {
      const line = `  "${randomStr()}",\n`;
      yield line;
    }

    yield "]";
  });
};

commandFill();
