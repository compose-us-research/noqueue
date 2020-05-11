#!/bin/bash

BASE_URL=$(cat baseUrl.txt)
DATA=$(cat put-ticket.json)

curl -v $BASE_URL/shop/default/ticket/1 -X PUT -H "content-type: application/json" -H "accept: application/json" --data "$DATA"
