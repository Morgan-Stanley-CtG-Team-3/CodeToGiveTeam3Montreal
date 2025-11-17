#!/usr/bin/env bash

CLEAN=false
VERBOSE=false

for arg in "$@"; do
  case $arg in
    --clean)
      CLEAN=true
      ;;
    --verbose|-v)
      VERBOSE=true
      ;;
  esac
done

# If first arg is "--no-clean", skip cleanup
if [ "$CLEAN" = true ]; then
    echo "[INFO] Cleaning previous containers & volumes..."
    docker-compose down -v
fi

# Build and start database
echo "[INFO] Starting database..."
docker-compose up -d --build db

# Wait for initialization
echo "[INFO] Waiting for database to initialize..."
sleep 15

# Build and start app
if [ "$VERBOSE" = true ]; then
    docker-compose up --build app
else
    docker-compose up -d --build app
    echo "[INFO] App running in detached mode."
fi