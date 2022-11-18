import fs from 'fs/promises'
export const ReadFileHandle = async (
    filename,
  ) => {
    const file = await fs.open(filename);

    const read = async (buff) => {
        const {
            bytesRead,
        } = await file.read({ buffer: buff });

        if (bytesRead === 0) {
            return null
        }

        return bytesRead
    }

    const close = () => file.close();

    return {
      read,
      close,
    };
  };
