#!/bin/bash

BASE_URL=$(cat baseUrl.txt)

curl -v "$BASE_URL/shop/cozy-costumes/ticket/available?start=2020-11-23T00%3A00%3A00&end=2020-11-28T00%3A00%3A00" -H "accept: application/json"
