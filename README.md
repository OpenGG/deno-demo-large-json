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

real	0m24.273s
user	0m22.881s
sys	0m2.001s
% ./scripts/distinct.sh
1

real	0m21.740s
user	0m23.088s
sys	0m0.478s
```
## deno
deno 1.28.1 (release, x86_64-unknown-linux-gnu)

v8 10.9.194.1

typescript 4.8.3

```bash
% FILL_COUNT=5242880 ./scripts/fill.sh
5242880

real	2m20.400s
user	1m56.097s
sys	1m33.678s
% ./scripts/distinct.sh
5242880

real	0m19.145s
user	0m20.064s
sys	0m0.698s
```
## sort and uniq
```bash
% sort data.json | uniq | wc -l
5242882

real	0m9.855s
user	0m17.847s
sys	0m1.176s
```
