import { nanoid } from 'nanoid'

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
    .slice(0, 50)
}

export async function generateUniqueSlug(
  name: string,
  checkExists: (slug: string) => Promise<boolean>,
): Promise<string> {
  const base = slugify(name)
  if (!(await checkExists(base))) return base

  let counter = 2
  while (await checkExists(`${base}-${counter}`)) {
    counter++
  }
  return `${base}-${counter}`
}

export function generateApiKey(): string {
  return `ak_${nanoid(21)}`
}
