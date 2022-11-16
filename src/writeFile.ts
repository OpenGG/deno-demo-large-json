export const writeFile = async (
  filename: string,
  gen: () => Generator<string>,
) => {
  const file = await Deno.open(filename, {
    write: true,
  });

  try {
    const writer = file.writable.getWriter();

    const iter = gen();

    const encoder = new TextEncoder();

    let buffer = new ArrayBuffer(10);

    for (;;) {
      const {
        done,
        value,
      } = iter.next();

      if (done) {
        break;
      }

      let {
        read,
        written,
      } = encoder.encodeInto(value, new Uint8Array(buffer));

      if (read !== value.length) {
        buffer = new ArrayBuffer(value.length * 3);

        ({
          read,
          written,
        } = encoder.encodeInto(value, new Uint8Array(buffer)));

        if (read !== value.length) {
          throw new Error("Unexpected: failed to encode string");
        }
      }

      await writer.write(new Uint8Array(buffer, 0, written));
    }
  } finally {
    file.close();
  }
};
