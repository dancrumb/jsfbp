#!/bin/bash
for ip_count in 1000 5000 10000 50000; do
    for copiers in 0 1 2 4 8 16 32 64 128 256 512 1024; do
        for round in `seq 0 20`; do
            node examples/fbptestvl.js $ip_count $copiers
        done
    done
done >> perf.csv
