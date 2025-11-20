import { formatDistance } from 'date-fns/formatDistance'

/**
 * Return date argument to string date with SQL format.
 * Uses current date if no argument is passed.
 */
export function formatDbDate(date = new Date()): string {
  return date.toISOString().split('T')[0]
}

export function formatAge(date: Date): string {
  const relativeTime = formatDistance(date, new Date())
  if (relativeTime === 'less than a minute') return 'Just now'
  return relativeTime
    .replace(/almost |about |over /, '')
    .replace(/ minutes?/, 'm')
    .replace(/ hours?/, 'h')
    .replace(/ days?/, 'd')
    .replace(/ months?/, 'mo')
    .replace(/ years?/, 'yr')
}
