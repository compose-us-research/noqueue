#!/bin/bash

source setup-timeslot.sh
RESULT=<(curl -s -w "\n__HEADER__\n%{http_code}\n" "$BASE_URL/shop/$SHOP_NAME/ticket/available?start=2020-12-01T00:00:00Z&end=2020-12-05T23:00:00Z" -X GET -H "accept: application/json")
EXPECTED=<(cat test-with-timeslot-shop-ticket-available.expected)

testIt "Available tickets should work" "$RESULT" "$EXPECTED"
