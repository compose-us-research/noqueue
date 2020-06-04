#!/bin/bash

BASE_URL=$(cat baseUrl.txt)

curl -v $BASE_URL/shop/happy-nails -H "accept: application/json"
