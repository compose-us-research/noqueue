#!/bin/bash

source setup-dayslot.sh
testIt "Dayslot should look same" <(curl -s -w "\n___HEADER___\n%{http_code}\n" $BASE_URL/shop/$SHOP_NAME/dayslot/ -H "accept: application/json") test-with-dayslot-shop-get-dayslot.expected
