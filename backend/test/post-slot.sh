#!/bin/bash

BASE_URL=$(cat baseUrl.txt)
DATA1=$(cat post-slot1.json)
DATA2=$(cat post-slot2.json)
DATA3=$(cat post-slot3.json)

curl -v $BASE_URL/shop/default/slot -H "content-type: application/json" -H "accept: application/json" --data "$DATA1"
curl -v $BASE_URL/shop/default/slot -H "content-type: application/json" -H "accept: application/json" --data "$DATA1"
curl -v $BASE_URL/shop/default/slot -H "content-type: application/json" -H "accept: application/json" --data "$DATA1"
curl -v $BASE_URL/shop/default/slot -H "content-type: application/json" -H "accept: application/json" --data "$DATA2"
curl -v $BASE_URL/shop/default/slot -H "content-type: application/json" -H "accept: application/json" --data "$DATA2"
curl -v $BASE_URL/shop/default/slot -H "content-type: application/json" -H "accept: application/json" --data "$DATA3"
