#!/bin/bash

DATA=$(cat setup-dayslot.json)
curl -s -o /dev/null $BASE_URL/shop/$SHOP_NAME/dayslot/ -X PUT -H "content-type: application/json" -H "accept: application/json" --data "$DATA"
