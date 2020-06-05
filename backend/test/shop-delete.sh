#!/bin/bash

BASE_URL=$(cat baseUrl.txt)

curl -v $BASE_URL/shop/happy-nails/admin/delete -H "accept: application/json"
