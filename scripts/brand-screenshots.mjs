/**
 * Capture docs pages in light/dark for brand QA.
 * Usage: node scripts/brand-screenshots.mjs --out docs/qa/brand-alignment-2026-11-10/before
 * Env: THEME_STORAGE_KEY (default pinarkive_theme)
 */
import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

const BASE_URL = process.env.SCREENSHOT_BASE_URL || 'http://127.0.0.1:3000'
const THEME_STORAGE_KEY = process.env.THEME_STORAGE_KEY || 'pinarkive_theme'
const outArg = process.argv.find((a) => a.startsWith('--out='))
const OUT_DIR = outArg
  ? outArg.slice('--out='.length)
  : process.argv[process.argv.indexOf('--out') + 1] || 'docs/qa/brand-alignment-2026-11-10/after'

const PAGES = [
  { name: 'home', path: '/' },
  { name: 'quick-start', path: '/quickstart/quick-start' },
  { name: 'api-playground-doc', path: '/examples/api-playground' },
]

const VIEWPORTS = [
  { tag: 'desktop-1440', width: 1440, height: 900 },
  { tag: 'mobile-390', width: 390, height: 844 },
]

const THEMES = ['light', 'dark']

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true })
  const browser = await chromium.launch()

  for (const theme of THEMES) {
    for (const vp of VIEWPORTS) {
      for (const pageDef of PAGES) {
        const context = await browser.newContext({
          viewport: { width: vp.width, height: vp.height },
        })
        await context.addInitScript(
          ({ themeKey, themeVal }) => {
            localStorage.setItem(themeKey, themeVal)
            document.documentElement.classList.remove('light', 'dark')
            document.documentElement.classList.add(themeVal)
            document.documentElement.style.colorScheme = themeVal
          },
          { themeKey: THEME_STORAGE_KEY, themeVal: theme },
        )
        const page = await context.newPage()
        await page.goto(`${BASE_URL}${pageDef.path}`, { waitUntil: 'networkidle' })
        await page.waitForTimeout(600)
        const file = path.join(OUT_DIR, `${pageDef.name}_${theme}_${vp.tag}.png`)
        await page.screenshot({ path: file, fullPage: vp.tag.includes('mobile') })
        await context.close()
      }
    }
  }

  await browser.close()
  console.log('Wrote screenshots to', OUT_DIR)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
