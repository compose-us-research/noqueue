#!/bin/bash

BASE_URL=$(cat baseUrl.txt)
DATA=$(cat put-slot.json)

curl -v $BASE_URL/shop/default/slot/1 -X PUT -H "content-type: application/json" -H "accept: application/json" --data "$DATA"
