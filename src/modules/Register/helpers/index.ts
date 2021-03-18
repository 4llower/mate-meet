const MAXIMUM_AVATAR_NAME_LENGTH = 25

export const showAvatarName = (avatarName?: string): string => {
  if (!avatarName) return 'Choose avatar from gallery'
  return (
    avatarName.slice(0, MAXIMUM_AVATAR_NAME_LENGTH) +
    (avatarName.length > MAXIMUM_AVATAR_NAME_LENGTH ? '...' : '')
  )
}
