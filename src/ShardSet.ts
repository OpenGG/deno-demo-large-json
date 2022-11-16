export class ShardSet {
  private shardRoot: Map<number, Set<string>> = new Map();

  constructor(private shardBuckets: number) {
  }

  // https://chromium.googlesource.com/v8/v8.git/+/refs/tags/10.8.168.19/src/strings/string-hasher-inl.h#21
  private hash(buff: Uint8Array) {
    const { length } = buff;

    let runningHash = 0;

    for (let i = 0; i < length; i++) {
      const val = buff[i];
      runningHash += val;
      runningHash += runningHash << 10;
      runningHash ^= runningHash >> 6;
    }

    return runningHash;
  }

  private shardKey(buff: Uint8Array) {
    return this.hash(buff) % this.shardBuckets;
  }

  add(buff: Uint8Array, str: string) {
    const { shardRoot } = this;
    const shardKey = this.shardKey(buff);
    let sub = shardRoot.get(shardKey);
    if (!sub) {
      sub = new Set();
      shardRoot.set(shardKey, sub);
    }
    sub.add(str);
  }

  size() {
    let sum = 0;
    for (const set of this.shardRoot.values()) {
      sum += set.size;
    }
    return sum;
  }

  *[Symbol.iterator]() {
    for (const set of this.shardRoot.values()) {
      for (const str of set) {
        yield str;
      }
    }
  }
}
