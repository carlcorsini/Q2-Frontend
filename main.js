const baseURL = 'http://localhost:3000'

document.querySelector('#test-button').addEventListener('click', () => {
  const container = document.querySelector('#test-p')
  axios.get(`${baseURL}/vibe`)
    .then(result => {
      container.innerHTML = `
        <code>${result.data.users[0].name}</code>
      `
    })
})