import type { AppProps } from 'next/app'
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
