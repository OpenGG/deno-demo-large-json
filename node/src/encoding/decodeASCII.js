const decoder = new TextDecoder("ascii");

export const decodeASCII = (buff) => {
    return decoder.decode(buff);
};