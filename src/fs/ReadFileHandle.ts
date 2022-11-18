export const ReadFileHandle = async (
  filename: string,
) => {
  const file = await Deno.open(filename, {
    read: true,
  });

  const read = (buff: Uint8Array) => file.read(buff);

  const close = () => file.close();

  return {
    read,
    close,
  };
};
