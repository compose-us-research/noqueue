#!/bin/bash

source setup-timeslot.sh
DATA=$(cat test-with-timeslot-shop-ticket-available-with-holidays.json)
RESULT=<(curl -s -w "%{http_code}" $BASE_URL/shop/$SHOP_NAME/dayslot/ -X PUT -H "content-type: application/json" -H "accept: application/json" --data "$DATA")

testIt "Adding holidays works" $RESULT <(echo -n "201")

RESULT=<(curl -s -w "\n__HEADER__\n%{http_code}\n" "$BASE_URL/shop/$SHOP_NAME/ticket/available?start=2020-12-01T00:00:00Z&end=2020-12-05T23:00:00Z" -X GET -H "accept: application/json")
EXPECTED=<(cat test-with-timeslot-shop-ticket-available-with-holidays.expected)

testIt "Available tickets with holidays should work" "$RESULT" "$EXPECTED"
