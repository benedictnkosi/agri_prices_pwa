#!/bin/bash

URL=$1
CONFIG_PATH=$2

# Run Lighthouse CLI with custom configuration
lighthouse "$URL" --config-path="$CONFIG_PATH" --output=json --output-path=report.json

# Extract the performance score using jq
performance_score=$(jq -r '.categories.performance.score' report.json)
accessibility_score=$(jq -r '.categories.accessibility.score' report.json)
best_practices_score=$(jq -r '.categories["best-practices"].score' report.json)

# Convert the score to a percentage using awk
performance_percentage=$(awk "BEGIN { printf \"%.2f\", $performance_score * 100 }")
accessibility_percentage=$(awk "BEGIN { printf \"%.2f\", $performance_score * 100 }")
best_practice_percentage=$(awk "BEGIN { printf \"%.2f\", $performance_score * 100 }")

# Check if the performance score is above 90
if (( $(awk "BEGIN { print ($performance_percentage > 90 && $accessibility_percentage > 90 && $best_practice_percentage > 90) }") )); then
  echo "Lighthouse score is great"
  exit 0
else
  echo "Lighthouse score failed"
  exit 1
fi
