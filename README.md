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

real	0m6.969s
user	0m6.549s
sys	0m0.606s
% ./scripts/distinct.sh
1

real	0m5.086s
user	0m5.416s
sys	0m0.181s
```
## deno
deno 1.28.1 (release, x86_64-unknown-linux-gnu)

v8 10.9.194.1

typescript 4.8.3

```bash
% ./scripts/fill.sh
1048576

real	0m30.891s
user	0m26.132s
sys	0m19.954s
% ./scripts/distinct.sh
1048576

real	0m4.691s
user	0m4.911s
sys	0m0.232s
```
## sort and uniq
```bash
% sort data.json | uniq | wc -l
1048578

real	0m2.076s
user	0m3.506s
sys	0m0.248s
```
