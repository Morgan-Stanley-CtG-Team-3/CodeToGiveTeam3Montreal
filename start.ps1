#!/usr/bin/env pwsh

param(
    [switch]$clean,
    [switch]$verbose,
    [switch]$v
)

if ($clean) {
    Write-Host "[INFO] Cleaning previous containers & volumes..."
    docker-compose down -v
}

Write-Host "[INFO] Starting database..."
docker-compose up -d --build db

Write-Host "[INFO] Waiting for database to initialize..."
Start-Sleep -Seconds 15

if ($VerboseMode) {
    docker-compose up --build app
} else {
    docker-compose up -d --build app
    Write-Host "[INFO] App running in detached mode."
}