export function getApiBaseUrl() {
  // Try to get from environment variable
  let apiUrl = import.meta.env.VITE_API_URL?.trim() || ''

  // Fallback: if in production and env var not set, use Railway backend
  if (!apiUrl && import.meta.env.PROD) {
    apiUrl = 'https://teamtaskmanagementsystem-production.up.railway.app'
  }

  // If still empty, return empty (will use relative URLs)
  if (!apiUrl) {
    return ''
  }

  try {
    // Ensure it's a valid URL
    new URL(apiUrl)
  } catch {
    return ''
  }

  // Remove trailing /api if present, so we can add it back consistently in api.jsx
  return apiUrl.replace(/\/api\/?$/, '')
}
