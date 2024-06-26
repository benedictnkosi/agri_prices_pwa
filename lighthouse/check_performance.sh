URL=$1
CONFIG_PATH=$2

# Run Lighthouse CLI with custom configuration
lighthouse $URL --config-path=$CONFIG_PATH --output=json --output-path=report.json

# Extract the performance score using jq
performance_score=$(jq '.categories.performance.score' report.json)

# Convert the score to a percentage
performance_percentage=$(echo "$performance_score * 100" | bc)

# Check if the performance score is above 90
if (( $(echo "$performance_percentage > 90" | bc -l) )); then
  echo "Performance score is above 90: $performance_percentage"
  exit 0
else
  echo "Performance score is below 90: $performance_percentage"
  exit 1
fi
