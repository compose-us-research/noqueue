#!/bin/bash

BASE_URL=$(cat baseUrl.txt)
DATA1=$(cat timeslot1-post.json)
DATA2=$(cat timeslot2-post.json)

curl -v $BASE_URL/shop/default/timeslot -H "content-type: application/json" -H "accept: application/json" --data "$DATA1"
curl -v $BASE_URL/shop/default/timeslot -H "content-type: application/json" -H "accept: application/json" --data "$DATA2"
