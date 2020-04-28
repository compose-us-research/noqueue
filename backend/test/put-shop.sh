#!/bin/bash

BASE_URL=$(cat baseUrl.txt)
DATA=$(cat put-shop.json)

curl -v $BASE_URL/shop/default/ -X PUT -H "content-type: application/json" -H "accept: application/json" --data "$DATA"
