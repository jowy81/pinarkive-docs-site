#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PAGES_DIR = path.join(__dirname, '..', 'pages')

function mdxExists(href) {
  const segments = href.replace(/^\/|\/$/g, '').split('/').filter(Boolean)
  if (segments.length === 0) {
    return fs.existsSync(path.join(PAGES_DIR, 'index.mdx'))
  }
  const asIndex = path.join(PAGES_DIR, ...segments, 'index.mdx')
  if (fs.existsSync(asIndex)) return true
  if (segments.length === 1) {
    return fs.existsSync(path.join(PAGES_DIR, `${segments[0]}.mdx`))
  }
  const asLeaf = path.join(PAGES_DIR, ...segments.slice(0, -1), `${segments.at(-1)}.mdx`)
  return fs.existsSync(asLeaf)
}

const re = /\]\((\/[^)#?]+)\)/g
const broken = []

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name)
    if (ent.isDirectory()) walk(full)
    else if (ent.name.endsWith('.mdx')) {
      const text = fs.readFileSync(full, 'utf8')
      let m
      while ((m = re.exec(text)) !== null) {
        const href = m[1]
        if (!mdxExists(href)) {
          broken.push({ href, from: path.relative(PAGES_DIR, full) })
        }
      }
    }
  }
}

walk(PAGES_DIR)

if (broken.length === 0) {
  console.log('OK: no broken internal doc links')
} else {
  for (const b of broken) {
    console.log(`BROKEN ${b.href} (in ${b.from})`)
  }
  process.exit(1)
}