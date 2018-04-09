baseURL = 'http://localhost:3000'

loggedIn = JSON.parse(localStorage.getItem('logged-in'))
id = JSON.parse(localStorage.getItem('user-id'))

// placeholders
updateLocation = document.querySelector('#update-location')
updateBio = document.querySelector('#bio-form')
updateInterests = document.querySelector('#interest-update')
updateProfilePic = document.querySelector('#update-profile-pic')

profPic = document.querySelector('#profile-pic')
bio = document.querySelector('#bio-form')
interests = document.querySelector('#interest-update')
userName = document.querySelector('#user-name')


// console.log(images);

//Get user data
axios.get(`${baseURL}/vibe/${id}`)
  .then(response => {
    userName.innerHTML = `${response.data.result[0].name}`
    profPic.src = `${response.data.result[0].profile_pic}`
    updateProfilePic.value = `${response.data.result[0].profile_pic}`
    updateLocation.value = `${response.data.result[0].location}`
    updateBio.value = `${response.data.result[0].bio}`
  })