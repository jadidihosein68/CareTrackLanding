# CareTrack Landing VPS Runbook (Caddy + Docker, Safe for Multi-Solution VPS)

This runbook is aligned with your current VPS layout under `/opt`:

```text
/opt/
  containerd
  irip
  shorterit-backend
  shorterit-frontend
  shorterit-landing
  tier-list-backend
```

CareTrack will be added as:

```text
/opt/caretrack-landing
```

The goal is to add CareTrack without breaking existing solutions.

## 1) Preflight Safety Checks (Do This First)

Run these checks before changing anything:

```bash
sudo ls -la /opt
docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'
sudo ls -la /etc/caddy
sudo ls -la /etc/caddy/sites || true
sudo caddy validate --config /etc/caddy/Caddyfile
sudo ss -ltnp '( sport = :80 or sport = :443 )'
```

Check existing Caddy domains (to avoid duplicate site blocks):

```bash
sudo grep -R --line-number "shorterit\\|irip\\|tier\\|caretrack" /etc/caddy 2>/dev/null || true
```

Backup Caddy config before any edit:

```bash
sudo cp /etc/caddy/Caddyfile /etc/caddy/Caddyfile.bak.$(date +%F-%H%M%S)
```

## 2) One-Time VPS Prerequisites

If already installed, these commands are safe:

```bash
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg git caddy
curl -fsSL https://get.docker.com | sudo sh
sudo systemctl enable --now docker
sudo systemctl enable --now caddy
```

Ensure deploy user exists and can run Docker:

```bash
id deploy || sudo adduser deploy
sudo usermod -aG sudo,docker deploy
```

## 3) Create CareTrack Folder on VPS

```bash
sudo mkdir -p /opt/caretrack-landing
sudo chown -R deploy:deploy /opt/caretrack-landing
sudo chmod 755 /opt/caretrack-landing
```

## 4) Create VPS Key for GitHub Pull (VPS -> GitHub)

Switch to deploy user:

```bash
sudo su - deploy
```

Create keypair:

```bash
mkdir -p ~/.ssh && chmod 700 ~/.ssh
ssh-keygen -t ed25519 -f ~/.ssh/id_caretrack_landing_deploy -N ""
cat ~/.ssh/id_caretrack_landing_deploy.pub
```

Copy the printed `.pub` key and add it in GitHub:

- Repo -> `Settings` -> `Deploy keys` -> `Add deploy key`
- Title: `caretrack-vps-deploy`
- Key: paste `.pub`
- Keep read-only unless write is required

Create SSH host alias:

```bash
cat >> ~/.ssh/config <<'EOF'
Host github-caretrack-landing
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_caretrack_landing_deploy
  IdentitiesOnly yes
EOF
chmod 600 ~/.ssh/config
```

Test SSH auth:

```bash
ssh -T git@github-caretrack-landing || true
```

## 5) Clone Repository into `/opt/caretrack-landing`

If first time:

```bash
cd /opt/caretrack-landing
git clone git@github-caretrack-landing:<YOUR_GITHUB_ORG_OR_USER>/<YOUR_REPO>.git .
```

If repo already exists:

```bash
cd /opt/caretrack-landing
git remote set-url origin git@github-caretrack-landing:<YOUR_GITHUB_ORG_OR_USER>/<YOUR_REPO>.git
git fetch --all --prune
git checkout main
git pull --ff-only origin main
```

## 6) Create `.env` for CareTrack

As `deploy` user:

```bash
cd /opt/caretrack-landing
cat > .env <<'EOF'
CARETRACK_LOCAL_BIND_PORT=18084
EOF
chmod 600 .env
```

## 7) Configure Caddy Safely (No Global Overwrite)

Ensure `/etc/caddy/Caddyfile` imports per-site files (add once only):

```bash
if ! sudo grep -qE '^\s*import\s+/etc/caddy/sites/\*\.caddy\s*$' /etc/caddy/Caddyfile; then
  printf '\nimport /etc/caddy/sites/*.caddy\n' | sudo tee -a /etc/caddy/Caddyfile >/dev/null
fi
```

Create CareTrack site file (replace domain):

```bash
sudo mkdir -p /etc/caddy/sites
sudo tee /etc/caddy/sites/caretrack-landing.caddy > /dev/null <<'EOF'
caretrack.example.com {
    reverse_proxy 127.0.0.1:18084
}

www.caretrack.example.com {
    redir https://caretrack.example.com{uri} permanent
}
EOF
```

Check there is no duplicate CareTrack domain:

```bash
sudo grep -R --line-number "caretrack.example.com" /etc/caddy 2>/dev/null || true
```

Validate and reload Caddy:

```bash
sudo caddy fmt --overwrite /etc/caddy/Caddyfile
sudo caddy fmt --overwrite /etc/caddy/sites/caretrack-landing.caddy
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
sudo systemctl status caddy --no-pager -l
```

## 8) Create CI Key for GitHub Actions (Local Machine -> VPS)

Run this on your local machine (not VPS):

```bash
ssh-keygen -t ed25519 -f ./caretrack_ci -N ""
cat ./caretrack_ci.pub
```

Add public key to VPS `deploy` user:

```bash
sudo su - deploy
mkdir -p ~/.ssh && chmod 700 ~/.ssh
echo "PASTE_CONTENT_OF_caretrack_ci.pub_HERE" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

Add repository secrets in GitHub:

- `VPS_HOST`
- `VPS_PORT`
- `VPS_USER` = `deploy`
- `VPS_SSH_KEY` = full private key content from `./caretrack_ci` (not `.pub`)

## 9) GitHub Actions Workflow (Already in Repo)

Workflow file:

- `.github/workflows/vps-deploy.yml`

It does:

1. SSH to VPS as `deploy`
2. `cd /opt/caretrack-landing`
3. `git pull --ff-only`
4. `chmod +x deploy.sh healthcheck.sh`
5. Run `./deploy.sh`
6. Run `./healthcheck.sh`

## 10) First Deploy

Trigger manually once:

- GitHub -> `Actions` -> `Deploy CareTrack Landing` -> `Run workflow`

Or push to `main`.

## 11) Post-Deploy Verification (CareTrack + Existing Solutions)

Check CareTrack container:
 
```bash 
cd /opt/caretrack-landing
docker compose --env-file .env -f deploy/docker-compose.vps.yml ps
docker compose --env-file .env -f deploy/docker-compose.vps.yml logs --tail=150
curl -fsS http://127.0.0.1:18084/health
```

Check Caddy and existing services are still healthy:

```bash
sudo caddy validate --config /etc/caddy/Caddyfile
docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'
```

Optional domain checks (replace with your real domains):

```bash
curl -I https://caretrack.example.com
curl -I https://shorterit.com
```

## 12) Rollback Plan

Rollback code:

```bash
cd /opt/caretrack-landing
git log --oneline -n 5
git checkout <KNOWN_GOOD_SHA>
./deploy.sh
./healthcheck.sh
```

Rollback Caddy:

```bash
sudo cp /etc/caddy/Caddyfile.bak.<TIMESTAMP> /etc/caddy/Caddyfile
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

Disable only CareTrack site (without touching other portals):

```bash
sudo mv /etc/caddy/sites/caretrack-landing.caddy /etc/caddy/sites/caretrack-landing.caddy.disabled
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
```
