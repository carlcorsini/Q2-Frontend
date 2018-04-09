baseURL = 'http://localhost:3000'

const loginForm = document.querySelector('#login-form')
const emailLogin = document.querySelector('#email-login')
const passwordLogin = document.querySelector('#password-login')
const createButton = document.querySelector('#create-button')


loginForm.addEventListener('submit', (event) => {
  preventDefault()
  axios.get(`${baseURL}/vibe/`).then(response => {
    let users = response.data.result
  })
})

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