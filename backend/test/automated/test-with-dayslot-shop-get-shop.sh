#!/bin/bash

testIt "Getting shop should look same" <(curl -s -w "\n___HEADER___\n%{http_code}\n" $BASE_URL/shop/$SHOP_NAME -H "accept: application/json") test-with-dayslot-shop-get-shop.expected
