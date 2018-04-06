baseURL = 'http://localhost:3000'
query = window.location.search
email = query.replace('?email=', '').replace('%40', '@').split('&').shift()
password = query.split('&').pop().replace('password=', '')
var stashedVariable
loggedIn = JSON.parse(localStorage.getItem('logged-in'))
friend = JSON.parse(localStorage.getItem('friend-id'))
userId = JSON.parse(localStorage.getItem('user-id'))

document.addEventListener("DOMContentLoaded", (event) => {
  stashedVariable = friend
  const userName = document.querySelector('#user-name')
  const profPic = document.querySelector('#profile-pic')
  const location = document.querySelector('#location')
  const friends = document.querySelector('#friends')
  const bio = document.querySelector('#bio')
  const interests = document.querySelector('#interests')
  const images = document.querySelectorAll('.card-img-top')
  const imageTitle = document.querySelectorAll('.card-title')
  const imageText = document.querySelectorAll('.card-text')
  const friendsPics = document.querySelectorAll('.friends-pics')
  const friendName = document.querySelectorAll('.friend-name')

  // ===============================================
  // GET user data
  // ===============================================

  axios.get(`${baseURL}/vibe/${stashedVariable}`)
    .then(response => {
      axios.get(`${baseURL}/vibe/friends/${stashedVariable}`).then(response2 => {
        userName.innerHTML = `${response.data.result[0].name}`
        profPic.src = `${response.data.result[0].profile_pic}`
        location.innerHTML = `${response.data.result[0].location}`
        friends.innerHTML = `Followers ${response2.data.result.length}`
        bio.innerHTML = `${response.data.result[0].bio}`
      })
    })

  // ===============================================
  // GET images for user
  // ===============================================

  axios.get(`${baseURL}/vibe/images/${stashedVariable}`)
    .then(response => {
      let imageArray = response.data.result
      images.forEach((a, idx) => {
        if (imageArray[idx] !== undefined)
          a.src = imageArray[idx].url

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

  // ===============================================
  // GET user friends
  // ===============================================

  axios.get(`${baseURL}/vibe/friends/${stashedVariable}`).then(response => {
    let followee = response.data.result
    let friendsPicsArray = []
    let friendsIdArray = []
    let friendNameArray = []
    followee.forEach(a => {
      axios.get(`${baseURL}/vibe/${a.followee_id}`).then(response => {
        friendsPicsArray.push(response.data.result[0].profile_pic)
        friendsIdArray.push(a.followee_id)
        friendNameArray.push(response.data.result[0].name)
        friendsPics.forEach((b, idx) => {
          if (friendsPicsArray[idx] !== undefined) {
            b.src = friendsPicsArray[idx]
            b.dataset.followee = friendsIdArray[idx]
          } else {
            b.src = ''
          }
        })
        friendName.forEach((b, idx) => {
          if (friendsPicsArray[idx] !== undefined) {
            b.innerHTML = friendNameArray[idx]
          } else {
            b.src = ''
          }
        })
      })
    })
  })

  // ===============================================
  // Hover over friend name
  // ===============================================

  friendPics = document.querySelectorAll('.friends-pics')
  console.log('this is the friends pic stuff === ', friendsPics);
  friendsName = document.querySelectorAll('.friend-name')

  friendPics.forEach((a, idx) => {
    console.log(idx);
    a.addEventListener('mouseover', (event) => {
      console.log('hey');

      friendsName[idx].style.display = 'block';
      setTimeout(function() {
        friendsName[idx].style.display = 'none';
      }, 2000);
    }, false);
  })


  // ===============================================
  // Click to view user friend's profile
  // ===============================================

  // add event listener on click, local storage set item with their user id from html data-followee=""
  friendPics.forEach((a, idx) => {
    a.addEventListener('click', (event) => {
      localStorage.setItem('friend-id', JSON.stringify(Number(a.dataset.followee)))
    })
  })

  // ===============================================
  // GET media for user
  // ===============================================

  axios.get(`${baseURL}/vibe/images/${stashedVariable}`)
    .then(response => {
      let imageArray = response.data.result
      let userMedia = document.querySelector('.user-media')

      imageArray.reverse()
      imageArray.forEach(image => {
        console.log(image.url)
        console.log(image.type)
        if (image.type === 'video') {
          $(userMedia).append(`
          <div class="col-md-6 col-lg-4">
            <div class="card mb-3">
              <iframe width="360" height="215" src="${image.url.replace(/watch\?v=/, 'embed/')}" frameborder="0"  allowfullscreen></iframe>
              <div class="card-body">
                <h4 class="card-title">${image.title}</h4>
                <p class="card-text">${image.description}</p>
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
              </div>
            </div>
          </div>
        `);
        }
      })

      imageTitle.forEach((a, idx) => {
        if (imageArray[idx] !== undefined) {
          a.innerHTML = imageArray[idx].title
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

  // ===============================================
  // Follow button for friends
  // ===============================================

  const followButton = document.querySelector('#follow-button')
  followButton.addEventListener('click', (event) => {
    axios.post(`${baseURL}/vibe/friends/`, {
        friend,
        userId
      })
      .then(result => {
        window.location.replace('view.html')
      })
  })

  // ===============================================
  // Signout button
  // ===============================================

  const signOutButton = document.querySelector('#sign-out-button')
  signOutButton.addEventListener('click', (event) => {
    localStorage.setItem('logged-in', JSON.stringify('no'))
    localStorage.setItem('user-id', JSON.stringify(''))
  })
});