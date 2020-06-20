#!/bin/bash

BASE_URL=$(cat baseUrl.txt)
SHOP_ID="cozy-costumes"
ID=61c7bf25-8da0-42af-9352-cc0b18a722cb

curl -v -X DELETE $BASE_URL/shop/$SHOP_ID/ticket/$ID -H "accept: application/json"
