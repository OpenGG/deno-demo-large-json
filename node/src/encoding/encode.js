const encoder = new TextEncoder();

export const encode = (str, buff) => {
    return encoder.encodeInto(str, buff);
};
