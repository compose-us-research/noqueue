#!/bin/bash

BASE_URL=$(cat baseUrl.txt)

curl -v $BASE_URL/admin/delete -H "accept: application/json"
