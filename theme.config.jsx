import { useRouter } from 'next/router'
import BrandLogo from './components/BrandLogo'
import DocsNavbarLinks from './components/DocsNavbarLinks'
import { APP_URL, DOCS_REPO_URL, GITHUB_ORG_URL, MARKETING_URL, SITE_URL, OG_IMAGE } from './config/site.js'

const DEFAULT_TITLE = 'PinArkive — Your decentralized storage solution.'
const DEFAULT_DESCRIPTION =
  'Documentation for PinArkive: upload, pin and manage IPFS content using clusters and gateways. Your decentralized storage solution.'
const OG_IMAGE_ABSOLUTE = `${SITE_URL}${OG_IMAGE}`

export default {
  logo: (
    <span className="nx-flex nx-items-center">
      <BrandLogo />
    </span>
  ),
  logoLink: '/',
  project: {
    link: DOCS_REPO_URL,
  },
  docsRepositoryBase: `${DOCS_REPO_URL}/tree/main/pages`,
  feedback: {
    content: 'Question? Give us feedback →',
    labels: 'feedback',
  },
  editLink: {
    content: 'Edit this page on GitHub',
  },
  navbar: {
    extraContent: <DocsNavbarLinks />,
  },
  useNextSeoProps() {
    const { asPath } = useRouter()
    const canonical = asPath === '/' ? SITE_URL : `${SITE_URL}${asPath}`
    return {
      titleTemplate: '%s | PinArkive Docs',
      defaultTitle: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      canonical,
      openGraph: {
        type: 'website',
        url: canonical,
        images: [{ url: OG_IMAGE_ABSOLUTE, alt: DEFAULT_TITLE }],
        siteName: 'PinArkive Docs',
        locale: 'en',
      },
      twitter: {
        cardType: 'summary_large_image',
        image: OG_IMAGE_ABSOLUTE,
      },
    }
  },
  head: (
    <>
      <meta name="description" content={DEFAULT_DESCRIPTION} />
      <meta name="keywords" content="PinArkive, IPFS, decentralized storage, pinning, clusters, gateways, documentation, API, CLI" />
      <link rel="icon" href="/img/favicon.ico" sizes="any" />
      <link rel="icon" href="/img/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/img/apple-touch-icon.png" />
      <meta name="theme-color" content="#0b6e78" media="(prefers-color-scheme: light)" />
      <meta name="theme-color" content="#0a1517" media="(prefers-color-scheme: dark)" />
      <meta property="og:image" content={OG_IMAGE_ABSOLUTE} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="PinArkive Docs" />
      <meta property="og:locale" content="en" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={OG_IMAGE_ABSOLUTE} />
    </>
  ),
  /** Arkive Teal — hue/sat tuned to land on #0b6e78 (light) and #4cc3cc (dark) under Nextra primary scale */
  primaryHue: { dark: 186, light: 186 },
  primarySaturation: { dark: 55, light: 83 },
  nextThemes: {
    defaultTheme: 'system',
    storageKey: 'pinarkive_theme',
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  footer: {
    text: (
      <div className="pk-docs-footer">
        <p className="nx-mb-2">© {new Date().getFullYear()} PinArkive</p>
        <nav className="pk-docs-footer-links" aria-label="Site">
          <a href={MARKETING_URL} target="_blank" rel="noopener noreferrer">
            pinarkive.com
          </a>
          <a href={APP_URL} target="_blank" rel="noopener noreferrer">
            app.pinarkive.com
          </a>
          <a href={SITE_URL}>docs.pinarkive.com</a>
          <a href={GITHUB_ORG_URL} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </nav>
      </div>
    ),
  },
  toc: {
    backToTop: true,
  },
}
