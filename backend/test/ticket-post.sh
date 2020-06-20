#!/bin/bash

BASE_URL=$(cat baseUrl.txt)
SHOP_ID="cozy-costumes"
DATA1=$(cat ticket1-post.json)
DATA2=$(cat ticket2-post.json)
DATA3=$(cat ticket3-post.json)

curl -v $BASE_URL/shop/$SHOP_ID/ticket -H "content-type: application/json" -H "accept: application/json" --data "$DATA1"
curl -v $BASE_URL/shop/$SHOP_ID/ticket -H "content-type: application/json" -H "accept: application/json" --data "$DATA1"
curl -v $BASE_URL/shop/$SHOP_ID/ticket -H "content-type: application/json" -H "accept: application/json" --data "$DATA1"
curl -v $BASE_URL/shop/$SHOP_ID/ticket -H "content-type: application/json" -H "accept: application/json" --data "$DATA2"
curl -v $BASE_URL/shop/$SHOP_ID/ticket -H "content-type: application/json" -H "accept: application/json" --data "$DATA2"
curl -v $BASE_URL/shop/$SHOP_ID/ticket -H "content-type: application/json" -H "accept: application/json" --data "$DATA3"
