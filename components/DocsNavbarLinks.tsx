import { APP_URL, MARKETING_URL } from '../config/site.js'

const linkClass =
  'pk-nav-link nx-hidden md:nx-inline-flex nx-items-center nx-rounded-lg nx-px-3 nx-py-2 nx-text-sm nx-font-medium nx-transition-colors'

export default function DocsNavbarLinks() {
  return (
    <>
      <a href={MARKETING_URL} className={linkClass} target="_blank" rel="noopener noreferrer">
        pinarkive.com
      </a>
      <a
        href={APP_URL}
        className={`${linkClass} pk-btn-primary nx-ml-1`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open app
      </a>
    </>
  )
}
