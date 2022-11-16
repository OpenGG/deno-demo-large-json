export const readFile = async (
  filename: string,
  onChunk: (chunk: Uint8Array) => void,
) => {
  const file = await Deno.open(filename);

  try {
    await readReader(file, onChunk);
  } finally {
    file.close();
  }
};

const readReader = async (
  reader: Deno.Reader,
  onChunk: (chunk: Uint8Array) => void,
) => {
  let offset = 0;

  // read buffer 1MB
  const bufferLen = 1 * 1024 * 1024;
  const buffer = new ArrayBuffer(bufferLen);

  for (;;) {
    const bytesRead = await reader.read(
      new Uint8Array(buffer, offset, bufferLen - offset),
    );

    if (bytesRead === null) {
      return;
    }

    const res = new Uint8Array(buffer, offset, bytesRead);

    offset += bytesRead;

    if (bufferLen - offset < 100) {
      offset = 0;
    }

    onChunk(res);
  }
};
