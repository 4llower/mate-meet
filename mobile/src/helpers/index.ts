const MAXIMUM_TAGS = 4

export const generateTagsView = (tags: string[], maxTags: number = MAXIMUM_TAGS) => {
  return tags
    .map((tag) => tag.replace(' ', '_'))
    .map((tag) => '#' + tag)
    .sort((a, b) => (a.length > b.length ? 1 : -1))
    .slice(0, maxTags)
    .join(' ')
}
