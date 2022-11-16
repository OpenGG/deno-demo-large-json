const charQuote = '"'.charCodeAt(0);

export class SimpleParser {
  static INIT = 0;
  static STRING = 1;

  state = SimpleParser.INIT;

  // Key less than 1k
  buffer = new ArrayBuffer(1024);
  view = new Uint8Array(this.buffer);
  offset = 0;

  constructor(private onChunk: (chunk: Uint8Array) => void) {
  }

  push(chunk: Uint8Array) {
    for (const ch of chunk) {
      switch (this.state) {
        case SimpleParser.INIT:
          if (ch === charQuote) {
            this.state = SimpleParser.STRING;
            this.offset = 0;
          }
          break;
        case SimpleParser.STRING:
          if (ch === charQuote) {
            this.state = SimpleParser.INIT;
            const chunk = new Uint8Array(this.buffer, 0, this.offset);
            this.onChunk(chunk);
            this.offset = 0;
          } else {
            this.view[this.offset] = ch;
            this.offset += 1;
          }
          break;
      }
    }
  }
}
