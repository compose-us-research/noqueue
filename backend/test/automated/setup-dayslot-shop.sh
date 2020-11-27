#!/bin/bash

DATA=$(cat setup-dayslot-shop.json)

curl -s -o /dev/null $BASE_URL/shop/ -X POST -H "content-type: application/json" -H "accept: application/json" --data "$DATA"
