import type { AppProps } from 'next/app'
import '../styles/pinarkive-brand.css'
import { JsonLd } from '../components/JsonLd'
import CookieAnalytics from '../components/CookieAnalytics'
import DocsAnalyticsEvents from '../components/DocsAnalyticsEvents'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <JsonLd />
      <Component {...pageProps} />
      <DocsAnalyticsEvents />
      <CookieAnalytics />
    </>
  )
}
