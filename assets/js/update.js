baseURL = 'http://localhost:3000'
loggedIn = JSON.parse(localStorage.getItem('logged-in'))
id = JSON.parse(localStorage.getItem('user-id'))
saveButton = document.querySelector('#save-button')
console.log(id);

saveButton.addEventListener('click', (event) => {
  let bioForm = document.querySelector('#bio-form').value
  let updateProfilePic = document.querySelector('#update-profile-pic').value
  let interestUpdate = document.querySelector('#interest-update').value
  let imageUrl = document.querySelector('#upload-image').value
  console.log(imageUrl);
  let videoUrl = document.querySelector('#upload-video').value
  let uploadMediaTitle = document.querySelector('#upload-media-title').value
  let uploadMediaDescription = document.querySelector('#upload-media-description').value
  axios.put(`${baseURL}/vibe/${id}`, {
    bio: bioForm,
    profile_pic: updateProfilePic,
    interests: interestUpdate
  }).then(response => {})
  // if (imageUrl.length < 1 && videoUrl.length < 1) window.location.replace(index.html)
  // if (videoUrl.length < 1) {
  axios.post(`${baseURL}/vibe/images/${id}`, {
    url: imageUrl,
    title: uploadMediaTitle,
    description: uploadMediaDescription,
    user_id: id
  }).then(response => {
    window.location.replace('index.html')
  })
  // }
  // if (imageUrl.length < 1) {
  //   axios.post(`${baseURL}/vibe/images/${id}`, {
  //     url: videoUrl,
  //     title: uploadMediaTitle,
  //     description: uploadMediaDescription,
  //     user_id: id
  //   }).then(response => {
  //     window.location.replace('index.html')
  //   })
  // }
})