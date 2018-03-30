// login/ DATE
let baseURL = 'http://localhost:3000'

var dateControl = document.querySelector('#example-date-input');
// dateControl.value = '2017-06-01';

const loginSubmit = document.querySelector('#login-submit')
const emailLogin = document.querySelector('#email-login').value
const passwordLogin = document.querySelector('#password-login').value

loginSubmit.addEventListener('submit', (event) => {
  preventDefault()
  console.log(emailLogin);
  axios.get(`${baseURL}/vibe/`).then(response => {
    let users = response.data.result
    console.log(users);
  })
})