export const encodeBase64 = (u8) => Buffer.from(u8.buffer, u8.byteOffset, u8.byteLength).toString('base64')
