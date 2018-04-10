baseURL = 'http://localhost:3000'

query = window.location.search
email = query.replace('?email=', '').replace('%40', '@').split('&').shift()
password = query.split('&').pop().replace('password=', '')
// var userId
loggedIn = JSON.parse(localStorage.getItem('logged-in'))
friend = JSON.parse(localStorage.getItem('friend-id'))
console.log(friend);
userId = JSON.parse(localStorage.getItem('user-id'))
console.log(userId);

document.addEventListener("DOMContentLoaded", (event) => {
  const userName = document.querySelector('#user-name')
  const profPic = document.querySelector('#profile-pic')
  const location = document.querySelector('#location')
  const friends = document.querySelector('#friends')
  const bio = document.querySelector('#bio')
  const interests = document.querySelector('#interests')
  const media = document.querySelectorAll('.card-img-top')
  const imageTitle = document.querySelectorAll('.card-title')
  const imageText = document.querySelectorAll('.card-text')
  const friendsPics = document.querySelectorAll('.friends-pics')
  const friendName = document.querySelectorAll('.friend-name')
  const followButton = document.querySelector('#follow-button')



  // ===============================================
  // GET user data
  // ===============================================

  axios.get(`${baseURL}/vibe/${friend}`)
    .then(response => {
      axios.get(`${baseURL}/vibe/friends/${friend}`).then(response2 => {
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

  axios.get(`${baseURL}/vibe/media/${friend}`)
    .then(response => {
      let imageArray = response.data.result
      media.forEach((a, idx) => {
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

  axios.get(`${baseURL}/vibe/friends/${friend}`).then(response => {
    let followee = response.data.result
    console.log(followee);
    let friendsPicsArray = []
    let friendsIdArray = []
    let friendNameArray = []
    followee.forEach(a => {
      if (a.follower_id === userId) {
        followButton.style.display = 'none'
      }
      axios.get(`${baseURL}/vibe/${a.follower_id}`).then(response => {
        friendsPicsArray.push(response.data.result[0].profile_pic)
        friendsIdArray.push(a.follower_id)
        console.log(friendsIdArray);
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
  friendsName = document.querySelectorAll('.friend-name')

  friendPics.forEach((a, idx) => {
    a.addEventListener('mouseover', (event) => {
      friendsName[idx].style.opacity = '100'
      setTimeout(function() {
        friendsName[idx].style.opacity = '0'
      }, 2500);
    }, false);
  })

  // friendPics.forEach((a, idx) => {
  //   a.addEventListener('mouseover', (event) => {
  //     $(friendsName[idx]).fadeIn(500).delay(2000).fadeOut(200)
  //   })
  // })


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

  axios.get(`${baseURL}/vibe/media/${friend}`)
    .then(response => {
      let imageArray = response.data.result
      let userMedia = document.querySelector('.user-media')

      imageArray.reverse()
      imageArray.forEach(image => {
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
        `)
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
    })

  // ===============================================
  // Follow button for friends
  // ===============================================

  followButton.addEventListener('click', (event) => {
    console.log(userId);
    axios.post(`${baseURL}/vibe/friends/`, {
        userId,
        friend
      })
      .then(result => {
        window.location.replace('view.html')
      })
  })

  // ===============================================
  // Signout button
  // ===============================================

  // const signOutButton = document.querySelector('#sign-out-button')
  // signOutButton.addEventListener('click', (event) => {
  //   localStorage.setItem('logged-in', JSON.stringify('no'))
  //   localStorage.setItem('user-id', JSON.stringify(''))
  // })
});