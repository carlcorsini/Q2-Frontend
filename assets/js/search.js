baseURL = 'http://localhost:3000'

document.addEventListener("DOMContentLoaded", (event) => {
  let searchButton = document.querySelector('#search-button')
  // select search button
  searchButton.addEventListener('click', event => {
    let input = document.querySelector('#search-input').value
    // grab input from text box
    axios.get(`${baseURL}/vibe/search/${input}`).then(response => {
      // make get request using input from text box
      let resultArray = response.data.result
      // store results in an array
      let resultList = document.querySelector('#result-list')
      // select div from DOM
      // append results to div in the form of a card with clickable picture
      resultArray.forEach(result => {
        $(resultList).append(`

          <li>
            <img alt="Workplace" usemap="#workmap" src="${result.profile_pic}"/>
          <div class="info">
            <h2 class="title">${result.name}</h2>
            <p class="desc" id="black">${result.location}</p>
          </div>
        </li>
        <map name="workmap">
          <area data-friend="${result.id}" shape="rect" coords="34,44,270,350" alt="Computer" class="result-button" href="view.html"">
        </map>
          `);
      })
      let resultButtonArray = document.querySelectorAll('.result-button')
      resultButtonArray.forEach((a, idx) => {
        a.addEventListener('click', (event) => {

          localStorage.setItem('friend-id', JSON.stringify(Number(a.dataset.friend)))
        })
      })

    })
  })
})


let userMedia = document.querySelector('.user-media')