#!/bin/bash

# Execute a command with a timeout
# Usage: ./exec-with-timeout.sh [timeout_seconds] [command]

# Default timeout is 60 seconds
TIMEOUT=${1:-60}
shift

# Check if timeout is a number
if ! [[ "$TIMEOUT" =~ ^[0-9]+$ ]]; then
  echo "Error: Timeout must be a number"
  exit 1
fi

# Check if command is provided
if [ $# -eq 0 ]; then
  echo "Error: No command provided"
  echo "Usage: $0 [timeout_seconds] [command]"
  exit 1
fi

# Execute command with timeout
echo "Executing command with ${TIMEOUT}s timeout: $@"

# Create a background process
"$@" &
CMD_PID=$!

# Wait for command to complete or timeout
( sleep $TIMEOUT && kill -9 $CMD_PID 2>/dev/null && echo "Command timed out after ${TIMEOUT}s" && exit 124 ) &
TIMEOUT_PID=$!

# Wait for the command to finish
wait $CMD_PID
CMD_EXIT_CODE=$?

# Kill the timeout process if it's still running
kill -9 $TIMEOUT_PID 2>/dev/null

# Check if command completed successfully
if [ $CMD_EXIT_CODE -eq 0 ]; then
  echo "Command completed successfully"
  exit 0
elif [ $CMD_EXIT_CODE -eq 124 ]; then
  echo "Command timed out after ${TIMEOUT}s"
  exit 124
else
  echo "Command failed with exit code $CMD_EXIT_CODE"
  exit $CMD_EXIT_CODE
fi