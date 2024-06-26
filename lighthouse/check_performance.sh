#!/bin/bash

URL=$1
CONFIG_PATH=$2

# Run Lighthouse CLI with custom configuration
lighthouse "$URL" --config-path="$CONFIG_PATH" --output=json --output-path=report.json

# Extract the performance score using jq
performance_score=$(jq -r '.categories.performance.score' report.json)

# Convert the score to a percentage using awk
performance_percentage=$(awk "BEGIN { printf \"%.2f\", $performance_score * 100 }")

# Check if the performance score is above 90
if (( $(awk "BEGIN { print ($performance_percentage > 99) }") )); then
  echo "Performance score is above 90: $performance_percentage"
  exit 0
else
  echo "Performance score is below 90: $performance_percentage"
  exit 1
fi
