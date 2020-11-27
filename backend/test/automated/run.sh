#!/bin/bash

BASE_URL="http://localhost:9090"
SHOP_NAME="automated-test-shop"
TESTS="$@"
if [ "$TESTS" == "" ]; then
  TESTS=$(ls -1 test-with-dayslot-shop-*.sh)
fi

testIt() {
  local message="$1"
  local result="$2"
  local expected="$3"

  diff $result $expected

  if [ "$?" -ne "0" ]; then
    echo "❌ $message"
  else
    echo "✅ $message"
  fi
}

echo "Running tests"
for test in $TESTS; do
  source setup-dayslot-shop.sh

  echo ""
  echo "$test ..."
  source $test

  source setup-shop-delete.sh
done
