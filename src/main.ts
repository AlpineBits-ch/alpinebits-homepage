import './style.css'

declare function gtag(...args: unknown[]): void

const CONSENT_KEY = 'alpinebits_consent'

function readConsent(): string | null {
  try {
    return localStorage.getItem(CONSENT_KEY)
  } catch {
    return null
  }
}

function writeConsent(value: string): void {
  try {
    localStorage.setItem(CONSENT_KEY, value)
  } catch {
    // Storage blocked: the choice holds for this page view only.
  }
}

function grantAnalytics(): void {
  if (typeof gtag !== 'function') return
  gtag('consent', 'update', {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    analytics_storage: 'granted',
  })
}

function setupConsentBanner(): void {
  const banner = document.getElementById('cookie-banner')
  if (!banner) return

  const consent = readConsent()
  if (consent === 'true') {
    grantAnalytics()
    return
  }
  if (consent === 'necessary') return

  banner.hidden = false
  banner.querySelector('[data-consent="accept"]')?.addEventListener('click', () => {
    writeConsent('true')
    grantAnalytics()
    banner.hidden = true
  })
  banner.querySelector('[data-consent="necessary"]')?.addEventListener('click', () => {
    writeConsent('necessary')
    banner.hidden = true
  })
}

function setupHeader(): void {
  const header = document.querySelector<HTMLElement>('[data-header]')
  if (!header) return
  const update = () => header.toggleAttribute('data-scrolled', window.scrollY > 24)
  update()
  window.addEventListener('scroll', update, { passive: true })
}

setupConsentBanner()
setupHeader()
