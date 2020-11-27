#!/bin/bash

curl -s -o /dev/null $BASE_URL/shop/$SHOP_NAME/admin/delete -H "accept: application/json"
