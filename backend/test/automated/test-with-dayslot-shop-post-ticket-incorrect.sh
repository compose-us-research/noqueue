#!/bin/bash

source setup-dayslot.sh

DATA=$(cat test-with-dayslot-shop-post-ticket-without-slot.json)
RESULT=<(curl -s -w "\n___HEADER___\n%{http_code}\n" $BASE_URL/shop/$SHOP_NAME/ticket/ -X POST -H "content-type: application/json" -H "accept: application/json" --data "$DATA")
EXPECTED=<(cat test-with-dayslot-shop-post-ticket-without-slot.expected)

testIt "No slot should result in failure" $RESULT $EXPECTED

# Test for contact?
# Test for slot minDuration / maxDuration
