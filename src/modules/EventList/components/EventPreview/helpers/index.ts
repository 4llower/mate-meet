const MAXIMUM_AVATAR_NAME_LENGTH = 30
const MAXIMUM_TAGS = 4

export const cutIfMaximumLengthExceeded = (
  str: string,
  maxLength: number = MAXIMUM_AVATAR_NAME_LENGTH,
) => {
  return str.slice(0, maxLength) + (str.length > maxLength ? '...' : '')
}

export const generateTagsView = (tags: string[]) => {
  return tags
    .map((tag) => tag.replace(' ', '_'))
    .map((tag) => '#' + tag)
    .sort((a, b) => (a.length > b.length ? 1 : -1))
    .slice(0, MAXIMUM_TAGS)
    .join(' ')
}
