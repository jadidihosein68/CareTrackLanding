#!/usr/bin/env bash
set -euo pipefail

if [[ ! -f ".env" ]]; then
  echo "Missing .env file. Expected CARETRACK_LOCAL_BIND_PORT."
  exit 1
fi

docker compose --env-file .env -f deploy/docker-compose.vps.yml pull || true
docker compose --env-file .env -f deploy/docker-compose.vps.yml up -d --build --remove-orphans
docker compose --env-file .env -f deploy/docker-compose.vps.yml ps
