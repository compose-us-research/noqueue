#!/bin/bash

BASE_URL=$(cat baseUrl.txt)
DATA=$(cat timeslot-put.json)

curl -v $BASE_URL/shop/default/timeslot/ -X PUT -H "content-type: application/json" -H "accept: application/json" --data "$DATA"
