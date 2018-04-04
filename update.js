baseURL = 'http://localhost:3000'
loggedIn = JSON.parse(localStorage.getItem('logged-in'))
id = JSON.parse(localStorage.getItem('user-id'))
saveButton = document.querySelector('#save-button')


saveButton.addEventListener('click', (event) => {
  let bioForm = document.querySelector('#bio-form').value
  let updateProfilePic = document.querySelector('#update-profile-pic').value
  let interestUpdate = document.querySelector('#interest-update').value
  axios.put(`${baseURL}/vibe/${id}`, {
    bio: bioForm,
    profile_pic: updateProfilePic,
    interests: interestUpdate


  }).then(response => {




    window.location.replace('index.html')
  })
})