const charQuote = '"'.charCodeAt(0);
export class SimpleParser {
    constructor(buffer) {
        this.buffer = buffer;
        this.state = SimpleParser.NOT_STRING;
        // Key less than 1k
        this.offset = 0;
    }
    *parse(input) {
        for (const ch of input) {
            switch (this.state) {
                case SimpleParser.NOT_STRING:
                    if (ch === charQuote) {
                        this.state = SimpleParser.STRING;
                        this.offset = 0;
                    }
                    break;
                case SimpleParser.STRING:
                    if (ch === charQuote) {
                        this.state = SimpleParser.NOT_STRING;
                        const chunk = new Uint8Array(this.buffer.buffer, 0, this.offset);
                        yield chunk;
                        this.offset = 0;
                    }
                    else {
                        this.buffer[this.offset] = ch;
                        this.offset = Math.min(this.offset + 1, this.buffer.byteLength - 1);
                    }
                    break;
            }
        }
    }
}
SimpleParser.NOT_STRING = 0;
SimpleParser.STRING = 1;