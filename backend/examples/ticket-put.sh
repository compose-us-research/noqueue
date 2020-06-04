#!/bin/bash

BASE_URL=$(cat baseUrl.txt)
ID=fd199100-b100-497e-b878-d2a8a1afdb5c
DATA=$(cat ticket-put.json)

curl -v $BASE_URL/shop/default/ticket/$ID -X PUT -H "content-type: application/json" -H "accept: application/json" --data "$DATA"
