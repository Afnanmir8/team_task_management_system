export function getApiBaseUrl() {
  const apiUrl = import.meta.env.VITE_API_URL?.trim() || ''

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
