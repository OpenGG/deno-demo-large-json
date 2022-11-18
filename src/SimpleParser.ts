const charQuote = '"'.charCodeAt(0);

export class SimpleParser {
  private static NOT_STRING = 0;
  private static STRING = 1;

  private state = SimpleParser.NOT_STRING;

  // Key less than 1k
  private offset = 0;

  constructor(private buffer: Uint8Array) {
  }

  *parse(input: Uint8Array) {
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
          } else {
            this.buffer[this.offset] = ch;
            this.offset = Math.min(
              this.offset + 1,
              this.buffer.byteLength - 1,
            );
          }
          break;
      }
    }
  }
}
