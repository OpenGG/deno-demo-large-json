# deno-demo-large-json

```bash
# fill data.json with random string
FILL_COUNT=5242880 ./scripts/fill.sh

# count distinct strings
time ./scripts/distinct.sh

# compare performance with sort and uniq
time ./scripts/sortUniq.sh
```
