import { format, differenceInMinutes, differenceInHours, differenceInDays } from 'date-fns'

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return format(d, 'MMM d, yyyy')
}

export function formatRelativeDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()

  const minutes = differenceInMinutes(now, d)
  if (minutes < 1) return 'just now'

  const hours = differenceInHours(now, d)
  if (hours < 1) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`

  const days = differenceInDays(now, d)
  if (days < 1) return `${hours} hour${hours === 1 ? '' : 's'} ago`
  if (days <= 7) return `${days} day${days === 1 ? '' : 's'} ago`

  return formatDate(d)
}

export function formatNumber(num: number): string {
  if (num < 1000) return String(num)
  if (num < 1_000_000) {
    const k = num / 1000
    return k % 1 === 0 ? `${k}k` : `${parseFloat(k.toFixed(1))}k`
  }
  const m = num / 1_000_000
  return m % 1 === 0 ? `${m}M` : `${parseFloat(m.toFixed(1))}M`
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 3) + '...'
}
