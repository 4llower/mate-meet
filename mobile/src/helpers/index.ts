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

export const parseDescriptionToDescriptionAndGeo = (
  description: string,
): { description: string; geo?: string } => {
  const separator = '|||'

  const separatorIndex = description.indexOf(separator)

  if (separatorIndex === -1)
    return {
      description,
    }

  const newDescription = description.slice(0, separatorIndex - 1)
  const geo = description.slice(separatorIndex + separator.length)

  return {
    description: newDescription,
    geo,
  }
}
