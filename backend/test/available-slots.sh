#!/bin/bash

BASE_URL=$(cat baseUrl.txt)

curl -v $BASE_URL/shop/default/slot/available -H "accept: application/json"
