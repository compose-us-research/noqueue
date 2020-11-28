#!/bin/bash

source setup-dayslot.sh

DATA=$(cat test-with-dayslot-shop-post-ticket.json)
RESULT=<(curl -s -w "%{http_code}" $BASE_URL/shop/$SHOP_NAME/ticket/ -X POST -H "content-type: application/json" -H "accept: application/json" --data "$DATA")
EXPECTED=<(echo -n "201")

testIt "Creating a ticket should work" $RESULT $EXPECTED
