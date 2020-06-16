#!/bin/bash

BASE_URL=$(cat baseUrl.txt)
DATA=$(cat shop-post.json)

curl -v $BASE_URL/shop/ -X POST -H "content-type: application/json" -H "accept: application/json" --data "$DATA"
