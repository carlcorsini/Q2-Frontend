let baseURL = 'http://localhost:3000'
let stashedVariable = 3
document.addEventListener("DOMContentLoaded", function(event) {
  const userName = document.querySelector('#user-name')
  const profPic = document.querySelector('#profile-pic')
  const location = document.querySelector('#location')
  const friends = document.querySelector('#friends')
  const bio = document.querySelector('#bio')
  const interests = document.querySelector('#interests')
  const images = document.querySelectorAll('.card-img-top')
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
      let imageUrls = response.data.result
      images.forEach((a, idx) => {
        if (imageUrls[idx] !== undefined)
          a.src = imageUrls[idx].image_url
        else
          a.src = 'http://via.placeholder.com/275x275'
      })
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