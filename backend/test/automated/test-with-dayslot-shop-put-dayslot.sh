#!/bin/bash

source setup-dayslot.sh
DATA=$(cat test-with-dayslot-shop-put-dayslot.json)

RESULT=<(curl -s -w "%{http_code}" $BASE_URL/shop/$SHOP_NAME/dayslot/ -X PUT -H "content-type: application/json" -H "accept: application/json" --data "$DATA")

testIt "Putting dayslot works" $RESULT <(echo -n "201")
