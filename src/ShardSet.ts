export class ShardSet {
  shardRoot: Record<string, Record<string, boolean>> = Object.create(null);

  constructor(private shardBuckets: number) {
  }

  // https://chromium.googlesource.com/v8/v8.git/+/refs/tags/10.8.168.19/src/strings/string-hasher-inl.h#21
  private hash(str: string) {
    const { length } = str;

    let runningHash = 0;

    for (let i = 0; i < length; i++) {
      const val = str.charCodeAt(i);
      runningHash += val;
      runningHash += runningHash << 10;
      runningHash ^= runningHash >> 6;
    }

    return runningHash;
  }

  private shardKey(str: string) {
    return this.hash(str) % this.shardBuckets;
  }

  add(str: string) {
    const { shardRoot } = this;
    const shardKey = this.shardKey(str);
    let sub = shardRoot[shardKey];
    if (!sub) {
      sub = shardRoot[shardKey] = Object.create(null);
    }
    sub[str] = true;
  }

  size() {
    return Object.values(this.shardRoot).reduce((c, sub) => {
      return c + Object.keys(sub).length;
    }, 0);
  }

  *[Symbol.iterator]() {
    for (const sub of Object.values(this.shardRoot)) {
      for (const k of Object.keys(sub)) {
        yield k;
      }
    }
  }
}
