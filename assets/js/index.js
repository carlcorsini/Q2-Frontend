// login/ DATE
baseURL = 'http://localhost:3000'


// var dateControl = document.querySelector('#example-date-input');
// dateControl.value = '2017-06-01';

const loginForm = document.querySelector('#login-form')
console.log(loginForm);
const emailLogin = document.querySelector('#email-login')
const passwordLogin = document.querySelector('#password-login')
const createButton = document.querySelector('#create-button')


loginForm.addEventListener('submit', (event) => {
  preventDefault()
  console.log(emailLogin);
  axios.get(`${baseURL}/vibe/`).then(response => {
    let users = response.data.result
    console.log(users);
  })
})

createButton.addEventListener('click', (event) => {
  const createFirstName = document.querySelector('#create-first-name').value
  const createLastName = document.querySelector('#create-last-name').value
  const createEmail = document.querySelector('#create-email').value
  const createPassword = document.querySelector('#create-password').value
  const name = createFirstName + ' ' + createLastName
  console.log(typeof name);
  // localStorage.setItem('user-id', JSON.stringify())
  // localStorage.setItem('logged-in', JSON.stringify('yes'))

  axios.post(`${baseURL}/vibe/profile`, {
    name,
    createEmail,
    createPassword
  }).then(response => {
    window.location.replace('login.html')
  })
})