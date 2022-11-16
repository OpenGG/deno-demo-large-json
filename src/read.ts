import fs from "https://deno.land/std@0.164.0/node/fs.ts";

export const read = (
    filename: string,
    onChunk: (chunk: string) => void,
  ): Promise<void> =>
    new Promise((resolve, reject) => {
      const rs = fs.createReadStream(filename, "utf8");

      rs.on("readable", () => {
        while (true) {
          const chunk = rs.read();

          if (chunk === null) {
            return;
          }

          onChunk(chunk);
        }
      });

      rs.on("error", reject);
      rs.on("end", resolve);
    });