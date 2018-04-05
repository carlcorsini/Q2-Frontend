baseURL = 'http://localhost:3000'

loggedIn = JSON.parse(localStorage.getItem('logged-in'))
id = JSON.parse(localStorage.getItem('user-id'))

// placeholders
updateLocation = document.querySelector('#update-location')
updateBio = document.querySelector('#bio-form')
updateInterests = document.querySelector('#interest-update')
updateProfilePic = document.querySelector('#update-profile-pic')

profPic = document.querySelector('#profile-pic')
// location = document.querySelector('#location')
friends = document.querySelector('#friends')
bio = document.querySelector('#bio-form')
interests = document.querySelector('#interest-update')
images = document.querySelectorAll('.card-img-top')
imageTitle = document.querySelectorAll('.card-title')
imageText = document.querySelectorAll('.card-text')
friendsPics = document.querySelectorAll('.friends-pics')
userName = document.querySelector('#user-name')


// console.log(images);

//Get user data
axios.get(`${baseURL}/vibe/${id}`)
  .then(response => {

    // console.log(result);
    userName.innerHTML = `${response.data.result[0].name}`
    profPic.src = `${response.data.result[0].profile_pic}`
    updateProfilePic.value = `${response.data.result[0].profile_pic}`
    updateLocation.value = `${response.data.result[0].location}`
    updateBio.value = `${response.data.result[0].bio}`
    updateInterests.value = `${response.data.result[0].interests}`
    friends.innerHTML = `${response.data.result[0].friends.length} Friends`
    // bio.innerHTML = `${response.data.result[0].bio}`
    // interests.innerHTML = `${response.data.result[0].interests}`

  })

// Get images for user
axios.get(`${baseURL}/vibe/images/${id}`)
  .then(response => {
    let imageArray = response.data.result
    images.forEach((a, idx) => {
      if (imageArray[idx] !== undefined)
        a.src = imageArray[idx].image_url

      else
        a.src = 'http://via.placeholder.com/275x275'
    })
    imageTitle.forEach((a, idx) => {
      if (imageArray[idx] !== undefined) {
        a.innerHTML = imageArray[idx].title
        // console.log(imageArray[idx].title);
      } else
        a.innerHTML = 'placeholder'
    })
    imageText.forEach((a, idx) => {
      if (imageArray[idx] !== undefined)
        a.innerHTML = imageArray[idx].description

      else
        a.innerHTML = 'placeholder'
    })
  })