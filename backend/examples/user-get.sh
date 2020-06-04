#!/bin/bash

BASE_URL=$(cat baseUrl.txt)

curl -v $BASE_URL/shop/default/user/owner -H "accept: application/json"
