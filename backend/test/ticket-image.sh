#!/bin/bash

BASE_URL=$(cat baseUrl.txt)

curl -v -H "accept: image/png" $BASE_URL/shop/default/ticket/1 > ticket.png