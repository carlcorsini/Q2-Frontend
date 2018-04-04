// login/ DATE
baseURL = 'http://localhost:3000'


// var dateControl = document.querySelector('#example-date-input');
// dateControl.value = '2017-06-01';

const loginForm = document.querySelector('#login-form')
console.log(loginForm);
const emailLogin = document.querySelector('#email-login')
const passwordLogin = document.querySelector('#password-login')

loginForm.addEventListener('submit', (event) => {
  preventDefault()
  console.log(emailLogin);
  axios.get(`${baseURL}/vibe/`).then(response => {
    let users = response.data.result
    console.log(users);
  })
})