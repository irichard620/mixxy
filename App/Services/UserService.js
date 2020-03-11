import storage from 'redux-persist/lib/storage'

function fetchUser() {
  return storage
    .getItem('user')
    .then((user) => {
      const userDetails = user ? JSON.parse(user) : {}
      // Add metric variable if needed
      if ('name' in userDetails) {
        if (!('premium' in userDetails)) {
          userDetails.premium = false
        }
      } else {
        userDetails.name = 'Mixxy User'
        userDetails.premium = false
      }
      storage.setItem('user', JSON.stringify(userDetails))
      return userDetails
    })
    .catch((error) => error)
}

export const userService = {
  fetchUser,
}
