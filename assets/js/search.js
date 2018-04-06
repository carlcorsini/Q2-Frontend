// function myFunction() {
//   // Declare variables
//   var input, filter, ul, li, a, i;
//   input = document.getElementById('myInput');
//   filter = input.value.toUpperCase();
//   ul = document.getElementById("myUL");
//   li = ul.getElementsByTagName('li');
//
//   // Loop through all list items, and hide those who don't match the search query
//   for (i = 0; i < li.length; i++) {
//     a = li[i].getElementsByTagName("a")[0];
//     if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
//       li[i].style.display = "";
//     } else {
//       li[i].style.display = "none";
//     }
//   }
// }

baseURL = https://still-springs-97508.herokuapp.com/



document.addEventListener("DOMContentLoaded", (event) => {
  let searchButton = document.querySelector('#search-button')

  searchButton.addEventListener('click', event => {
    let input = document.querySelector('#search-input').value

    axios.get(`${baseURL}/vibe/search/${input}`).then(response => {
      let resultArray = response.data.result
      let resultList = document.querySelector('#result-list')

      resultArray.forEach(result => {
        $(resultList).append(`

            <li>
              <a data-friend="${result.id}" class="result-button" href="view.html">
                <img alt="Independence Day" src="${result.profile_pic}" />
              </a>
              <div class="info">
                <h2 class="title">${result.name}</h2>
                <p class="desc" id="black">${result.location}</p>
              </div>

            </li>

              `);
      })
      let resultButtonArray = document.querySelectorAll('.result-button')
      resultButtonArray.forEach((a, idx) => {
        a.addEventListener('click', (event) => {
          console.log('hey');

          localStorage.setItem('friend-id', JSON.stringify(Number(a.dataset.friend)))
        })
      })

    })
  })
})


let userMedia = document.querySelector('.user-media')