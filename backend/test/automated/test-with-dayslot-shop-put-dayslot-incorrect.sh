#!/bin/bash

source setup-dayslot.sh

DATA=$(cat test-with-dayslot-shop-put-dayslot-incorrect-times.json)
RESULT=<(curl -s -w "\n___HEADER___\n%{http_code}\n" $BASE_URL/shop/$SHOP_NAME/dayslot/ -X PUT -H "content-type: application/json" -H "accept: application/json" --data "$DATA")
EXPECTED=<(cat test-with-dayslot-shop-put-dayslot-incorrect-times.expected)
testIt "Trying to put dayslot with times fails with 400" $RESULT $EXPECTED

DATA=$(cat test-with-dayslot-shop-put-dayslot-incorrect-overlap-same.json)
RESULT=<(curl -s -w "\n___HEADER___\n%{http_code}\n" $BASE_URL/shop/$SHOP_NAME/dayslot/ -X PUT -H "content-type: application/json" -H "accept: application/json" --data "$DATA")
EXPECTED=<(cat test-with-dayslot-shop-put-dayslot-incorrect-overlap-same.expected)
testIt "Trying to put dayslot with overlap on same day fails with 400" $RESULT $EXPECTED

DATA=$(cat test-with-dayslot-shop-put-dayslot-incorrect-overlap-inside.json)
RESULT=<(curl -s -w "\n___HEADER___\n%{http_code}\n" $BASE_URL/shop/$SHOP_NAME/dayslot/ -X PUT -H "content-type: application/json" -H "accept: application/json" --data "$DATA")
EXPECTED=<(cat test-with-dayslot-shop-put-dayslot-incorrect-overlap-inside.expected)
testIt "Trying to put dayslot with one range overlapping the other completely fails with 400" $RESULT $EXPECTED

DATA=$(cat test-with-dayslot-shop-put-dayslot-incorrect-overlap.json)
RESULT=<(curl -s -w "\n___HEADER___\n%{http_code}\n" $BASE_URL/shop/$SHOP_NAME/dayslot/ -X PUT -H "content-type: application/json" -H "accept: application/json" --data "$DATA")
EXPECTED=<(cat test-with-dayslot-shop-put-dayslot-incorrect-overlap.expected)
testIt "Trying to put dayslot with general overlap fails with 400" $RESULT $EXPECTED
