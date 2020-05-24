#!/bin/bash

BASE_URL=$(cat baseUrl.txt)
ID=fd199100-b100-497e-b878-d2a8a1afdb5c

curl -v $BASE_URL/shop/default/ticket/$ID -H "accept: application/json"
