baseURL = 'http://localhost:3000'

query = window.location.search
email = query.replace('?email=', '').replace('%40', '@').split('&').shift()
password = query.split('&').pop().replace('password=', '')
var userId
loggedIn = JSON.parse(localStorage.getItem('logged-in'))
id = JSON.parse(localStorage.getItem('user-id'))

document.addEventListener("DOMContentLoaded", (event) => {
  axios.get(`${baseURL}/vibe`).then(response => {
    if (loggedIn === 'yes') {
      userId = id
    } else if (loggedIn != 'yes') {
      let users = response.data.users
      users.forEach(a => {
        if (a.email === email && a.password === password) {
          userId = a.id
          localStorage.setItem('user-id', JSON.stringify(a.id))
          localStorage.setItem('logged-in', JSON.stringify('yes'))
        }
      })
      if (userId == undefined) {
        window.location.replace('login.html')
        localStorage.setItem('logged-in', JSON.stringify('no'))
        localStorage.setItem('user-id', JSON.stringify(''))
      }
    }
    const userName = document.querySelector('#user-name')
    const profPic = document.querySelector('#profile-pic')
    const location = document.querySelector('#location')
    const friends = document.querySelector('#friends')
    const bio = document.querySelector('#bio')
    const interests = document.querySelector('#interests')
    const mediaTitle = document.querySelectorAll('.card-title')
    const mediaText = document.querySelectorAll('.card-text')
    const friendsPics = document.querySelectorAll('.friends-pics')
    const friendName = document.querySelectorAll('.friend-name')

    // ===============================================
    // GET user data
    // ===============================================

    axios.get(`${baseURL}/vibe/${userId}`)
      .then(response => {
        axios.get(`${baseURL}/vibe/friends/${userId}`).then(response2 => {
          userName.innerHTML = `${response.data.result[0].name}`
          profPic.src = `${response.data.result[0].profile_pic}`
          location.innerHTML = `${response.data.result[0].location}`
          friends.innerHTML = `Followers ${response2.data.result.length}`
          bio.innerHTML = `${response.data.result[0].bio}`
        })
      })

    // ===============================================
    // GET media for user
    // ===============================================

    axios.get(`${baseURL}/vibe/media/${userId}`)
      .then(response => {
        let mediaArray = response.data.result
        let userMedia = document.querySelector('.user-media')

        mediaArray.reverse()
        mediaArray.forEach(media => {
          if (media.type === 'video') {
            $(userMedia).append(`
          <div class="col-md-6 col-lg-4">
            <div class="card mb-3">
              <div class="embed-responsive embed-responsive-4by3">
                <iframe class="embed-responsive-item" src="${media.url.replace(/watch\?v=/, 'embed/')}"></iframe>
              </div>
              <div class="card-body">
                <h4 class="card-title">${media.title}</h4>
                <p class="card-text">${media.description}</p>
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
              </div>
            </div>
          </div>
        `);
          }
        })
      })

    // ===============================================
    // GET user friends
    // ===============================================

    axios.get(`${baseURL}/vibe/friends/${userId}`).then(response => {
      let followee = response.data.result
      let friendsPicsArray = []
      let friendsIdArray = []
      let friendNameArray = []
      followee.forEach(a => {
        axios.get(`${baseURL}/vibe/${a.follower_id}`).then(response => {
          friendsPicsArray.push(response.data.result[0].profile_pic)
          friendsIdArray.push(a.follower_id)
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

    friendPic = document.querySelectorAll('.friends-pics')
    friendsName = document.querySelectorAll('.friend-name')

    friendPic.forEach((a, idx) => {
      a.addEventListener('mouseover', (event) => {
        friendsName[idx].style.opacity = '100'
        setTimeout(function() {
          friendsName[idx].style.opacity = '0'
        }, 2500);
      }, false);
    })

    // ===============================================
    // Click to view user friend's profile
    // ===============================================

    // add event listener on click, local storage set item with their user id from html data-followee=""
    friendPic.forEach(a => {
      a.addEventListener('click', (event) => {
        localStorage.setItem('friend-id', JSON.stringify(Number(a.dataset.followee)))
      })
    })

    // ===============================================
    // Signout button
    // ===============================================

    const signOutButton = document.querySelector('#sign-out-button')
    signOutButton.addEventListener('click', (event) => {
      localStorage.setItem('logged-in', JSON.stringify('no'))
      localStorage.setItem('user-id', JSON.stringify('0'))
      window.location.replace('login.html')
    })
  })
});