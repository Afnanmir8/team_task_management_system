const DEAD_API_HOST = 'teamtaskmanagementsystem-production.up.railway.app'

export function getApiBaseUrl() {
  const apiUrl = import.meta.env.VITE_API_URL?.trim() || ''

  if (!apiUrl) {
    return ''
  }

  try {
    const parsedUrl = new URL(apiUrl)

    if (parsedUrl.hostname === DEAD_API_HOST) {
      return ''
    }
  } catch {
    return ''
  }

  return apiUrl.replace(/\/api\/?$/, '')
}
