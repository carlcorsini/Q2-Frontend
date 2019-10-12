baseURL = 'https://still-springs-97508.herokuapp.com'

// ===============================================
// Create Profile
// ===============================================

const createButton = document.querySelector('#create-button')
createButton.addEventListener('click', (event) => {
  const createFirstName = document.querySelector('#create-first-name').value
  const createLastName = document.querySelector('#create-last-name').value
  const createEmail = document.querySelector('#create-email').value
  const createPassword = document.querySelector('#create-password').value
  const name = createFirstName + ' ' + createLastName
  axios.post(`${baseURL}/vibe/profile`, {
    name,
    createEmail,
    createPassword
  }).then(response => {
    window.location.replace('login.html')
  })
})