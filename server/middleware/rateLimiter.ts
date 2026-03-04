const requests = new Map()

export default defineEventHandler((event) => {

  const ip = getRequestIP(event) || "unknown"
  const now = Date.now()

  const windowTime = 60 * 1000
  const maxRequests = 20

  if (!requests.has(ip)) {
    requests.set(ip, [])
  }

  const timestamps = requests.get(ip).filter(
    (t: number) => now - t < windowTime
  )

  timestamps.push(now)

  requests.set(ip, timestamps)

  if (timestamps.length > maxRequests) {
    throw createError({
      statusCode: 429,
      statusMessage: "Too many requests"
    })
  }

})