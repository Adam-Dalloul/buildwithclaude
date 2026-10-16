/**
 * Slug-safe last segment of an official registry name (`com.example/weather` -> `weather`).
 */
export function getShortName(name: string): string {
  if (!name) return 'unknown'
  const baseName = name.includes('/') ? name.split('/').pop() : name
  return (baseName || 'unknown').toLowerCase().replace(/[^a-z0-9-]/g, '-')
}

/**
 * Map each official registry name to the name its slug is built from.
 *
 * Registry names are unique, but their last segments are not: many servers are published
 * as `<namespace>/mcp`. Servers that share a short name would share a slug and overwrite
 * each other's row, so a shared short name falls back to the full registry name. A short
 * name that only one server uses is kept, so existing slugs do not change.
 */
export function assignShortNames(names: string[]): Map<string, string> {
  const counts = new Map<string, number>()
  for (const name of names) {
    const shortName = getShortName(name)
    counts.set(shortName, (counts.get(shortName) || 0) + 1)
  }

  const shortNames = new Map<string, string>()
  for (const name of names) {
    const shortName = getShortName(name)
    shortNames.set(name, counts.get(shortName) === 1 ? shortName : name.toLowerCase().replace(/[^a-z0-9-]/g, '-'))
  }
  return shortNames
}
