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
% ./scripts/fill.sh
1048576

real	0m5.748s
user	0m5.472s
sys	0m0.574s
% ./scripts/distinct.sh
1

real	0m5.654s
user	0m5.770s
sys	0m0.183s
```
## deno
deno 1.28.1 (release, x86_64-unknown-linux-gnu)

v8 10.9.194.1

typescript 4.8.3

```bash
% ./scripts/fill.sh
[0m[32mDownload[0m https://denopkg.com/chiefbiiko/base64/mod.ts
[0m[32mDownload[0m https://denopkg.com/chiefbiiko/base64@master/mod.ts
[0m[32mDownload[0m https://denopkg.com/chiefbiiko/base64@master/base.ts
1048576

real	0m28.070s
user	0m21.593s
sys	0m19.120s
% ./scripts/distinct.sh
1048576

real	0m5.295s
user	0m5.539s
sys	0m0.220s
```
## sort and uniq
```bash
% sort data.json | uniq | wc -l
1048578

real	0m2.095s
user	0m3.782s
sys	0m0.235s
```
