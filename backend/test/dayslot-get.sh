#!/bin/bash

BASE_URL=$(cat baseUrl.txt)

curl -v $BASE_URL/shop/cozy-costumes/dayslot/ -H "accept: application/json"
