# deno-demo-large-json

```bash
# fill data.json with random string
FILL_COUNT=5242880 ./scripts/fill.sh

# count distinct strings
./scripts/distinct.sh

# compare performance with sort and uniq
./scripts/sortUniq.sh
```
## node
v18.12.0
```bash
% FILL_COUNT=2097152 ./scripts/fill.sh
2097152

real	0m10.318s
user	0m10.002s
sys	0m0.855s
% ./scripts/distinct.sh
1

real	0m9.437s
user	0m9.850s
sys	0m0.357s
```
## deno
deno 1.28.1 (release, x86_64-unknown-linux-gnu)

v8 10.9.194.1

typescript 4.8.3

```bash
% FILL_COUNT=2097152 ./scripts/fill.sh
2097152

real	0m50.408s
user	0m39.972s
sys	0m34.101s
% ./scripts/distinct.sh
2097152

real	0m8.909s
user	0m9.308s
sys	0m0.344s
```
## sort and uniq
```bash
% sort data.json | uniq | wc -l
2097154

real	0m3.766s
user	0m6.813s
sys	0m0.399s
```
