baseURL = 'http://localhost:3000'
loggedIn = JSON.parse(localStorage.getItem('logged-in'))
id = JSON.parse(localStorage.getItem('user-id'))
saveButton = document.querySelector('#save-button')
console.log(id);

saveButton.addEventListener('click', (event) => {
  // event.preventDefault()
  // console.log('yooooooo');
  axios.put(`${baseURL}/vibe/${id}`).then(response => {
    console.log('hihihihhi');
    window.location.replace('index.html')
  })
})