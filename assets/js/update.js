baseURL = 'http://localhost:3000'
loggedIn = JSON.parse(localStorage.getItem('logged-in'))
id = JSON.parse(localStorage.getItem('user-id'))
saveButton = document.querySelector('#save-button')
updateLocation = document.querySelector('#update-location')
updateBio = document.querySelector('#bio-form')
updateInterests = document.querySelector('#interest-update')
updateProfilePic = document.querySelector('#update-profile-pic')
userName = document.querySelector('#user-name')
profPic = document.querySelector('#profile-pic')
saveMediaButton =

  // ===============================================
  // Fill in form data
  // ===============================================

  axios.get(`${baseURL}/vibe/${id}`)
  .then(response => {
    userName.innerHTML = `${response.data.result[0].name}`
    profPic.src = `${response.data.result[0].profile_pic}`
    updateProfilePic.value = `${response.data.result[0].profile_pic}`
    updateLocation.value = `${response.data.result[0].location}`
    updateBio.value = `${response.data.result[0].bio}`
  })

// ===============================================
// Save button after making edits
// ===============================================

saveButton.addEventListener('click', (event) => {
  let bioForm = document.querySelector('#bio-form').value
  let updateProfilePic = document.querySelector('#update-profile-pic').value
  let mediaUrl = document.querySelector('#upload-image').value
  let videoUrl = document.querySelector('#upload-video').value
  let uploadMediaTitle = document.querySelector('#upload-media-title').value
  let uploadMediaDescription = document.querySelector('#upload-media-description').value

  axios.put(`${baseURL}/vibe/${id}`, {
    bio: bioForm,
    profile_pic: updateProfilePic
  }).then(response => {})
  if (mediaUrl.length < 1 && videoUrl.length < 1) window.location.replace('index.html')
})

// ===============================================
// Save button for media
// ===============================================

saveButton.addEventListener('click', (event) => {
  if (videoUrl.length > 1) {
    axios.post(`${baseURL}/vibe/media/${id}`, {
      url: mediaUrl,
      type: 'image',
      title: uploadMediaTitle,
      description: uploadMediaDescription,
      user_id: id
    }).then(response => {
      window.location.replace('index.html')
    })
  }
  if (mediaUrl.length > 1) {
    axios.post(`${baseURL}/vibe/media/${id}`, {
      url: videoUrl,
      type: 'video',
      title: uploadMediaTitle,
      description: uploadMediaDescription,
      user_id: id
    }).then(response => {
      window.location.replace('index.html')
    })
  }
})

// ===============================================
// GET media for user
// ===============================================

axios.get(`${baseURL}/vibe/media/${id}`)
  .then(response => {
    let mediaArray = response.data.result
    let userMedia = document.querySelector('.user-media')
    mediaArray.reverse()
    mediaArray.forEach(media => {
      if (media.type === 'video') {
        $(userMedia).append(`
          <div class="col-md-6 col-lg-4">
            <div class="card mb-3">
              <iframe width="350" height="205" src="${media.url.replace(/watch\?v=/, 'embed/')}" frameborder="0"  allowfullscreen></iframe>
              <div class="card-body">
                <h4 class="card-title">${media.title}</h4>
                <p class="card-text">${media.description}</p>
                <button class="btn btn-block btn-danger delete-button" data-id="${media.id}">Remove</button>
              </div>
            </div>
          </div>
        `);
      } else {
        $(userMedia).append(`
          <div class="col-md-6 col-lg-4">
            <div class="card mb-3">
              <img width="360" height="215" class="card-img-top" src="${media.url}" alt="media">
              <div class="card-body">
                <h4 class="card-title">${media.title}</h4>
                <p class="card-text">${media.description}</p>
                <button class="btn btn-block btn-danger delete-button" data-id="${media.id}">Remove</button>
              </div>
            </div>
          </div>
        `);
      }
    })

    // ===============================================
    // DESTROY media
    // ===============================================

    let deleteButton = document.querySelectorAll('.delete-button')
    deleteButton.forEach(a => {
      a.addEventListener('click', (event) => {
        axios.delete(`${baseURL}/vibe/media/${a.dataset.id}`).then(response => {
          window.location.replace('edit.html')
        })
      })
    })
  })