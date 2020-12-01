#!/bin/bash

BASE_URL="http://localhost:9090"
SHOP_NAME="automated-test-shop"
TESTS="$@"
if [ "$TESTS" == "" ]; then
  TESTS=$(ls -1 test-*.sh)
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
  [[ $test =~ ^test-with-dayslot-shop-.* ]]
  IS_DAYSLOT=$?
  [[ $test =~ ^test-with-timeslot-shop-.* ]]
  IS_TIMESLOT=$?
  if [ $IS_DAYSLOT -eq 0 ]; then
    source setup-dayslot-shop.sh
  elif [ $IS_TIMESLOT -eq 0 ]; then
    source setup-timeslot-shop.sh
  fi

  echo ""
  echo "$test ..."
  source $test

  if [ $IS_DAYSLOT -eq 0 ]; then
    source setup-shop-delete.sh
  elif [ $IS_TIMESLOT -eq 0 ]; then
    source setup-shop-delete.sh
  fi
done
