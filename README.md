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
% FILL_COUNT=5242880 ./scripts/fill.sh
5242880

real	0m33.415s
user	0m31.912s
sys	0m2.469s
% SHARD_BUCKET_COUNT=1024 ./scripts/distinct.sh
1

real	0m27.282s
user	0m28.513s
sys	0m0.822s
```
## deno
deno 1.28.1 (release, x86_64-unknown-linux-gnu)

v8 10.9.194.1

typescript 4.8.3

```bash
% FILL_COUNT=5242880 ./scripts/fill.sh
5242880

real	2m29.434s
user	2m20.963s
sys	1m31.933s
% SHARD_BUCKET_COUNT=1024 ./scripts/distinct.sh
5242880

real	0m25.430s
user	0m26.823s
sys	0m1.064s
```
## sort and uniq
```bash
% sort data.json | uniq | wc -l
5242882

real	0m12.588s
user	0m23.095s
sys	0m1.252s
```
