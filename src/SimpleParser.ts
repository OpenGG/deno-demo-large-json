export class SimpleParser {
  static INIT = 0;
  static STRING = 1;

  state = SimpleParser.INIT;
  buffer: string[] = [];

  constructor(private onString: (s: string) => void) {
  }

  push(chunk: string) {
    for (const ch of chunk) {
      switch (this.state) {
        case SimpleParser.INIT:
          if (ch === '"') {
            this.state = SimpleParser.STRING;
          }
          break;
        case SimpleParser.STRING:
          if (ch === '"') {
            this.state = SimpleParser.INIT;

            const string = this.buffer.join("");
            this.buffer = [];

            this.onString(string);
          } else {
            this.buffer.push(ch);
          }
          break;
      }
    }
  }
}
