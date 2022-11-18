import { encodeBase64 } from "./encoding/encodeBase64.js";
import {
    webcrypto as crypto
} from 'crypto'
export const randomStr = (buffer) => {
    crypto.getRandomValues(buffer);
    return encodeBase64(buffer);
};