baseURL = 'https://still-springs-97508.herokuapp.com'


loggedIn = JSON.parse(localStorage.getItem('logged-in'))
id = JSON.parse(localStorage.getItem('user-id'))
saveButton = document.querySelector('#save-button')
console.log(id);

// ===============================================
// Save button after making edits
// ===============================================

saveButton.addEventListener('click', (event) => {
  let bioForm = document.querySelector('#bio-form').value
  let updateProfilePic = document.querySelector('#update-profile-pic').value
  let imageUrl = document.querySelector('#upload-image').value
  let videoUrl = document.querySelector('#upload-video').value
  let uploadMediaTitle = document.querySelector('#upload-media-title').value
  let uploadMediaDescription = document.querySelector('#upload-media-description').value

  axios.put(`${baseURL}/vibe/${id}`, {
    bio: bioForm,
    profile_pic: updateProfilePic
  }).then(response => {
    setTimeout(() => {
      if (imageUrl.length < 1 && videoUrl.length < 1) {
        window.location.replace('index.html')
      }
    }, 5000)
  })
  if (imageUrl.length < 1 && videoUrl.length < 1) {
    window.location.replace('index.html')
  }
  if (videoUrl.length < 1) {
    axios.post(`${baseURL}/vibe/images/${id}`, {
      url: imageUrl,
      type: 'image',
      title: uploadMediaTitle,
      description: uploadMediaDescription,
      user_id: id
    }).then(response => {
      window.location.replace('index.html')
    })
  }
  if (imageUrl.length < 1) {
    axios.post(`${baseURL}/vibe/images/${id}`, {
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

axios.get(`${baseURL}/vibe/images/${id}`)
  .then(response => {
    let imageArray = response.data.result
    let userMedia = document.querySelector('.user-media')
    imageArray.reverse()
    imageArray.forEach(image => {
      if (image.type === 'video') {
        $(userMedia).append(`
          <div class="col-md-6 col-lg-4">
            <div class="card mb-3">
              <iframe width="350" height="205" src="${image.url.replace(/watch\?v=/, 'embed/')}" frameborder="0"  allowfullscreen></iframe>
              <div class="card-body">
                <h4 class="card-title">${image.title}</h4>
                <p class="card-text">${image.description}</p>
                <button class="btn btn-block btn-danger delete-button" data-id="${image.id}">Remove</button>
              </div>
            </div>
          </div>
        `);
      } else {
        $(userMedia).append(`
          <div class="col-md-6 col-lg-4">
            <div class="card mb-3">
              <img width="360" height="215" class="card-img-top" src="${image.url}" alt="media">
              <div class="card-body">
                <h4 class="card-title">${image.title}</h4>
                <p class="card-text">${image.description}</p>
                <button class="btn btn-block btn-danger delete-button" data-id="${image.id}">Remove</button>
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
        axios.delete(`${baseURL}/vibe/images/${a.dataset.id}`).then(response => {
          window.location.replace('edit.html')
        })
      })
    })
  })