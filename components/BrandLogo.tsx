import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

type BrandLogoProps = {
  className?: string
  variant?: 'full' | 'icon'
}

const defaultFull = 'nx-h-8 nx-w-auto sm:nx-h-9 nx-max-h-12 nx-object-contain nx-object-left'
const defaultIcon = 'nx-h-8 nx-w-8 sm:nx-h-9 sm:nx-w-9 nx-object-contain'

/**
 * PinArkive A1 lockup (wordmark in SVG only — no duplicate text).
 * Theme-aware via next-themes resolved class on <html>.
 */
export default function BrandLogo({ className, variant = 'full' }: BrandLogoProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const sizeClass = className ?? (variant === 'icon' ? defaultIcon : defaultFull)
  const isDark = mounted && resolvedTheme === 'dark'
  const src =
    variant === 'icon'
      ? isDark
        ? '/img/icon-A1-dark.svg'
        : '/img/icon-A1-light.svg'
      : isDark
        ? '/img/logo-A1-dark.svg'
        : '/img/logo-A1-light.svg'

  if (!mounted) {
    return (
      <span
        className={sizeClass}
        style={{ display: 'inline-block', width: variant === 'icon' ? 36 : 160, height: variant === 'icon' ? 36 : 40 }}
        aria-hidden
      />
    )
  }

  return (
    <img
      src={src}
      alt="PinArkive"
      className={sizeClass}
      width={variant === 'icon' ? 36 : 180}
      height={variant === 'icon' ? 36 : 48}
      decoding="async"
    />
  )
}
