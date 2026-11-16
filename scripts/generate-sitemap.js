#!/usr/bin/env node
/**
 * Generate public/sitemap.xml with <lastmod> from file mtimes.
 * Run after doc changes: node scripts/generate-sitemap.js
 * Or: npm run build (sitemap is generated in postbuild if needed).
 */

const fs = require('fs')
const path = require('path')

const SITE_URL = 'https://docs.pinarkive.com'
const PAGES_DIR = path.join(__dirname, '..', 'pages')

const ROUTES = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: 'quickstart/introduction', priority: '0.9', changefreq: 'monthly' },
  { path: 'quickstart/quick-start', priority: '0.9', changefreq: 'monthly' },
  { path: 'quickstart/upload-first-file', priority: '0.9', changefreq: 'monthly' },
  { path: 'authentication', priority: '0.9', changefreq: 'monthly' },
  { path: 'api-reference/post-files', priority: '0.8', changefreq: 'monthly' },
  { path: 'api-reference/upload-directory', priority: '0.8', changefreq: 'monthly' },
  { path: 'api-reference/post-pin', priority: '0.8', changefreq: 'monthly' },
  { path: 'api-reference/get-files', priority: '0.8', changefreq: 'monthly' },
  { path: 'api-reference/delete-file', priority: '0.8', changefreq: 'monthly' },
  { path: 'api-reference/get-clusters', priority: '0.8', changefreq: 'monthly' },
  { path: 'account/clusters', priority: '0.8', changefreq: 'monthly' },
  { path: 'account/profile', priority: '0.8', changefreq: 'monthly' },
  { path: 'account/tokens', priority: '0.8', changefreq: 'monthly' },
  { path: 'account/plans', priority: '0.8', changefreq: 'monthly' },
  { path: 'reference/errors', priority: '0.7', changefreq: 'monthly' },
  { path: 'reference/rate-limits', priority: '0.7', changefreq: 'monthly' },
  { path: 'reference/status-codes', priority: '0.7', changefreq: 'monthly' },
  { path: 'concepts', priority: '0.85', changefreq: 'monthly' },
  { path: 'concepts/gateways', priority: '0.8', changefreq: 'monthly' },
  { path: 'concepts/clusters', priority: '0.8', changefreq: 'monthly' },
  { path: 'concepts/environments', priority: '0.8', changefreq: 'monthly' },
  { path: 'concepts/timelocks', priority: '0.8', changefreq: 'monthly' },
  { path: 'cli/installation', priority: '0.8', changefreq: 'monthly' },
  { path: 'cli/commands', priority: '0.8', changefreq: 'monthly' },
  { path: 'examples/upload-playground', priority: '0.7', changefreq: 'monthly' },
  { path: 'examples/encrypted-share', priority: '0.7', changefreq: 'monthly' },
  { path: 'examples/api-playground', priority: '0.7', changefreq: 'monthly' },
]

function resolveMdxPath(routePath) {
  if (!routePath) {
    return path.join(PAGES_DIR, 'index.mdx')
  }
  const segments = routePath.split('/')
  const asIndex = path.join(PAGES_DIR, ...segments, 'index.mdx')
  if (fs.existsSync(asIndex)) {
    return asIndex
  }
  const asLeaf = path.join(
    PAGES_DIR,
    ...segments.slice(0, -1),
    `${segments[segments.length - 1]}.mdx`
  )
  if (fs.existsSync(asLeaf)) {
    return asLeaf
  }
  return null
}

function getLastmod(routePath) {
  const fullPath = resolveMdxPath(routePath)
  if (fullPath && fs.existsSync(fullPath)) {
    return new Date(fs.statSync(fullPath).mtime).toISOString().split('T')[0]
  }
  return new Date().toISOString().split('T')[0]
}

const included = []
const skipped = []

for (const route of ROUTES) {
  const mdx = resolveMdxPath(route.path)
  if (!mdx) {
    skipped.push(route.path || '(home)')
    continue
  }
  included.push(route)
}

if (skipped.length > 0) {
  console.warn('Skipping sitemap entries (no MDX):', skipped.join(', '))
}

const urls = included.map(({ path: p, priority, changefreq }) => {
  const loc = p ? `${SITE_URL}/${p}` : `${SITE_URL}/`
  const lastmod = getLastmod(p)
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
})

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`

const outPath = path.join(__dirname, '..', 'public', 'sitemap.xml')
fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.writeFileSync(outPath, xml, 'utf8')
console.log('Wrote', outPath)
console.log('URLs:', included.length)