import fs from "https://deno.land/std@0.164.0/node/fs.ts";

export const write = (filename: string, gen: () => Generator<string>): Promise<void> =>
  new Promise((resolve, reject) => {
    const ws = fs.createWriteStream(filename, "utf8");

    const iter = gen();

    const writeChunk = () => {
      const {
        done,
        value,
      } = iter.next();

      if (done) {
        ws.close();
        resolve();
        return
      }

      const canWrite = ws.write(value);

      if (canWrite) {
        writeChunk();
      }
    };

    ws.on("drain", writeChunk);
    ws.on("error", reject);

    if (ws.writable) {
      writeChunk();
    }
  });
