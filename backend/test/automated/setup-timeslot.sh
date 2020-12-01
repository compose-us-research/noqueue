#!/bin/bash

DATA=$(cat setup-timeslot.json)
curl -s -o /dev/null $BASE_URL/shop/$SHOP_NAME/timeslot/ -X PUT -H "content-type: application/json" -H "accept: application/json" --data "$DATA"
