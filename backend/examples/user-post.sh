#!/bin/bash

BASE_URL=$(cat baseUrl.txt)
DATA=$(cat user-post.json)

curl -v $BASE_URL/shop/default/user/ -X POST -H "content-type: application/json" -H "accept: application/json" --data "$DATA"
