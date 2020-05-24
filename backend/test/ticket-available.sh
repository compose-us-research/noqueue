#!/bin/bash

BASE_URL=$(cat baseUrl.txt)

curl -v "$BASE_URL/shop/default/ticket/available?start=2020-05-01T00%3A00%3A00&end=2020-05-30T00%3A00%3A00" -H "accept: application/json"
