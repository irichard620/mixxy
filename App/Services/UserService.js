import storage from 'redux-persist/lib/storage'


// const userApiClient = axios.create({
//   /**
//    * Import the config from the App/Config/index.js file
//    */
//   baseURL: Config.API_URL,
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
//   timeout: 3000,
// })

function fetchUser() {
  // // Simulate an error 50% of the time just for testing purposes
  // if (Math.random() > 0.5) {
  //   return new Promise(function(resolve, reject) {
  //     resolve(null)
  //   })
  // }

  return storage.getItem('user')
    .then((user) => {
      const userDetails = user ? JSON.parse(user) : {};
      // Add metric variable if needed
      if (('name' in userDetails)) {
        if (!('premium' in userDetails)) {
          userDetails.premium = false;
        }
      } else {
        userDetails.name = "Mixxy User"
        userDetails.premium = false;
      }
      storage.setItem('user', JSON.stringify(userDetails));
      return userDetails
    })
    .catch(error => error);

  // return userApiClient.get(number.toString()).then((response) => {
  //   if (in200s(response.status)) {
  //     return response.data
  //   }
  //
  //   return null
  // })
}

export const userService = {
  fetchUser,
}
