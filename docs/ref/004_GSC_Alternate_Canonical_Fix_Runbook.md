# 004 - GSC Alternate Canonical Fix Runbook

## Context
- Date: June 2, 2026
- Property: `https://thecaretracks.com`
- Reported by Google Search Console: `Alternate page with proper canonical tag`

## What this means
- This status usually means Google found duplicate URL variants and chose one canonical URL to index.
- This is not always a hard error, but it becomes a quality/crawl-budget problem if too many duplicate variants are crawlable as `200`.

## Observed site behavior (root cause)
- Canonical tags were present and consistent on primary URLs.
- Robots meta was `index, follow` on indexable pages.
- Sitemap was already using canonical HTTPS host.
- But duplicate URL variants were still returning `200`:
- `/path` and `/path/`
- `/path/index.html`
- This allowed multiple duplicate crawl paths for the same content.

## Fix applied
- File updated: `deploy/nginx/default.conf`
- Added canonical 301 redirects so only one URL format is indexable.

### Rules added
```nginx
# Canonicalize index documents to clean URLs.
location = /index.html {
  return 301 /$is_args$args;
}

location ~ ^/(.+)/index\.html$ {
  return 301 /$1$is_args$args;
}

# Canonicalize trailing slash variants (except root and explicit routes above).
location ~ ^/(.+)/+$ {
  return 301 /$1$is_args$args;
}
```

## Why this fix is correct
- Canonical tags are a strong hint, but redirects are a stronger canonicalization signal.
- If duplicate URLs still return `200`, Google can keep classifying many pages as alternates.
- Redirecting all non-preferred variants to one preferred URL reduces duplicate indexing signals.

## Deploy steps
1. Deploy latest code to VPS (normal pipeline).
2. Ensure container rebuilt with updated nginx config.
3. Confirm live behavior with curl checks.

## Verification commands
```bash
curl -I https://thecaretracks.com/faq/
curl -I https://thecaretracks.com/faq/index.html
curl -I https://thecaretracks.com/playground/gecko/
curl -I https://thecaretracks.com/playground/gecko/index.html
```

Expected:
- `301` redirect to slashless canonical URL (for non-root paths).
- Canonical URLs themselves should return `200`.

## Post-deploy Search Console steps
1. Open Page indexing report issue: `Alternate page with proper canonical tag`.
2. Inspect sample affected URLs.
3. Confirm Google-selected canonical matches preferred canonical URL.
4. Click `Validate Fix`.
5. Wait for recrawl/reprocessing window (can take days to weeks).

## If issue persists: additional fixes
1. Enforce canonicalization at Caddy layer too (host/protocol/slash/index) before proxying to nginx.
2. Ensure all internal links always use canonical slashless URLs only.
3. Keep sitemap limited to canonical URLs only (already done, must stay consistent).
4. Avoid linking query-parameter variants from navigation/content unless needed.
5. If tracking params are required, keep canonical tag pointing to clean URL and avoid parameter links in templates.
6. Check for external backlinks hitting `/path/` and `/index.html`; redirects should handle this, but monitor crawl logs.
7. Re-submit `https://thecaretracks.com/sitemap.xml` after major URL normalization changes.

## Rollback
- Remove the added canonical redirect blocks in `deploy/nginx/default.conf`.
- Redeploy container.
- Only rollback if redirect behavior breaks valid routes.

## Notes
- Localhost healthcheck URLs using `http://127.0.0.1` are expected and unrelated to this SEO issue.
- XML namespace URLs using `http://` in sitemap/SVG are standards-based and not canonical SEO mistakes.
