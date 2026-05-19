#!/usr/bin/env bash
set -euo pipefail

if [[ ! -f ".env" ]]; then
  echo "Missing .env file."
  exit 1
fi

PORT="$(awk -F= '/^CARETRACK_LOCAL_BIND_PORT=/{print $2}' .env | tail -n 1)"
PORT="${PORT:-18084}"

READY=0
for attempt in $(seq 1 20); do
  if curl -fsS "http://127.0.0.1:${PORT}/health" >/dev/null; then
    READY=1
    break
  fi
  sleep 2
done

if [[ "${READY}" != "1" ]]; then
  echo "Health check failed on http://127.0.0.1:${PORT}/health"
  docker compose --env-file .env -f deploy/docker-compose.vps.yml logs --tail=200 caretrack-landing || true
  exit 1
fi

echo "CareTrack healthcheck OK on 127.0.0.1:${PORT}"
