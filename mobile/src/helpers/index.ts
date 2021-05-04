const MAXIMUM_TAGS = 4
const MAXIMUM_AVATAR_NAME_LENGTH = 25

export const generateTagsView = (tags: string[], maxTags: number = MAXIMUM_TAGS) => {
  return tags
    .map((tag) => tag.replace(' ', '_'))
    .map((tag) => '#' + tag)
    .sort((a, b) => (a.length > b.length ? 1 : -1))
    .slice(0, maxTags)
    .join(' ')
}

export const showFileName = (fileName?: string, fallback = 'Choose photo from gallery'): string => {
  if (!fileName) return fallback
  return (
    fileName.slice(0, MAXIMUM_AVATAR_NAME_LENGTH) +
    (fileName.length > MAXIMUM_AVATAR_NAME_LENGTH ? '...' : '')
  )
}
