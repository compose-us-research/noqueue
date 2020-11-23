#!/bin/bash

BASE_URL=$(cat baseUrl.txt)
DATA=$(cat dayslot-put.json)

curl -v $BASE_URL/shop/cozy-costumes/dayslot/ -X PUT -H "content-type: application/json" -H "accept: application/json" --data "$DATA"
