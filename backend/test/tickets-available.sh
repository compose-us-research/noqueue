#!/bin/bash

BASE_URL=$(cat baseUrl.txt)
SHOP_ID="cozy-costumes"

curl -v $BASE_URL/shop/$SHOP_ID/ticket/available -H "accept: application/json"
