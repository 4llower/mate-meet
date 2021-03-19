const MAXIMUM_AVATAR_NAME_LENGTH = 30

export const cutIfMaximumLengthExceeded = (
  str: string,
  maxLength: number = MAXIMUM_AVATAR_NAME_LENGTH,
) => {
  return str.slice(0, maxLength) + (str.length > maxLength ? '...' : '')
}
