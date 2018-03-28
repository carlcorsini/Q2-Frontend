let baseURL = 'http://localhost:3000'

let stashedVariable = 2
document.addEventListener("DOMContentLoaded", function(event) {

  const userName = document.querySelector('#user-name')
  const profPic = document.querySelector('#profile-pic')
  const location = document.querySelector('#location')
  const friends = document.querySelector('#friends')
  const bio = document.querySelector('#bio')
  const interests = document.querySelector('#interests')
  const images = document.querySelectorAll('.card-img-top')
  const imageTitle = document.querySelectorAll('.card-title')
  const imageText = document.querySelectorAll('.card-text')
  console.log(images);

  //Get user data

  axios.get(`${baseURL}/vibe/${stashedVariable}`)
    .then(response => {
      // console.log(result);
      userName.innerHTML = `
        ${response.data.result[0].name}
      `
      profPic.src = `
        ${response.data.result[0].profile_pic}
      `
      location.innerHTML = `
        ${response.data.result[0].location}
      `
      friends.innerHTML = `
        ${response.data.result[0].friends.length} Friends
      `
      bio.innerHTML = `
        ${response.data.result[0].bio}
      `
      interests.innerHTML = `
        ${response.data.result[0].interests}
      `
    })

  // Get images for user

  axios.get(`${baseURL}/vibe/images/${stashedVariable}`)
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
          console.log(imageArray[idx].title);
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

  // get user friends

  axios.get(`${baseURL}/vibe/friends/${stashedVariable}`)
    .then(response => {
      let friends = response.data.result[0].friends
      // console.log(friends);
      let friendsPics = []
      friends.forEach(a => {
        axios.get(`${baseURL}/vibe/${a}`).then(response => {
          friendsPics.push(response.data.result[0].profile_pic)
        })
      })
      // console.log(friendsPics);
    })
});


// document.querySelector('#test-button').addEventListener('click', () => {
//   const container = document.querySelector('#test-p')
//   axios.get(`${baseURL}/vibe`)
//     .then(result => {
//       container.innerHTML = `
//         <code>${result.data.users[0].name}</code>
//       `
//     })
// })