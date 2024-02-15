const apiKey = '30c8fccff0mshc16db0f46b38b94p10afdejsne26d80c5c3a8'; // Replace with your actual API key
const apiUrl = 'https://imdb-top-100-movies.p.rapidapi.com/';
var storedHistory = JSON.parse(localStorage.getItem('storedHistory') )|| []
var recentSearches = document.querySelector(".searchHistory")
for (let i = 0; i < storedHistory.length; i++) {
  var li = document.createElement('li')
  var br = document.createElement('br')
  var p = document.createElement('p')
  li.textContent = storedHistory[i].title 
  p.textContent = storedHistory[i].location
  
  recentSearches.appendChild(li);
  recentSearches.appendChild(p);
  recentSearches.appendChild(br);
  
}
// Set up the headers with the API key
const headers = new Headers({
    'X-RapidAPI-Key': '30c8fccff0mshc16db0f46b38b94p10afdejsne26d80c5c3a8',
    'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
});

// Create the request with the headers
const request = new Request(apiUrl, {

  method: 'GET', // Adjust the HTTP method as needed (e.g., 'POST' for some APIs)
  headers: headers,
});

document.getElementById('button').addEventListener('click',function(){
  getMovies()
})

// Make the fetch request
function getMovies(){
  var movieList = JSON.parse(localStorage.getItem('movieList'));
  if (movieList == null){  
    fetch(request)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(movies => {
      console.log(movies);
      localStorage.setItem('movieList', JSON.stringify(movies));
      var randomMovie = getRandomMovie(movies);
      displayMovie(randomMovie)
      console.log(randomMovie)
    })
    .catch(error => {
     console.error('Fetch error:', error);
    });

  }
  else{
    var randomMovie =  getRandomMovie(movieList)
    displayMovie(randomMovie)
    console.log(randomMovie)
  }
}

function getRandomMovie(movies){
  var randomIndex = Math.floor(Math.random() * movies.length);
  return movies[randomIndex]
}
async function displayMovie(movie){
  var poster = document.getElementById('poster');
  var title = document.getElementById('title');
  var year = document.getElementById('year');
  var genre = document.getElementById('genre');
  var streaming = document.getElementById('streaming');
  var streamingText = await whereToWatch(movie.title)
console.log(movie.title)



storedHistory.push({title: movie.title, location: streamingText})
localStorage.setItem('storedHistory',JSON.stringify(storedHistory))
recentSearches.innerHTML=""
for (let i = 0; i < storedHistory.length; i++) {
  var li = document.createElement('li')
  var br = document.createElement('br')
  var p = document.createElement('p')
  li.textContent = storedHistory[i].title 
  p.textContent = storedHistory[i].location
  
  recentSearches.appendChild(li);
  recentSearches.appendChild(p);
  recentSearches.appendChild(br);
  
}

  title.innerText = movie.title;
  year.innerText = movie.year;
  genre.innerText = movie.genre;
  poster.src = movie.big_image;
  streaming.innerText = streamingText;
  
}

async function whereToWatch(title) {
  const apiKey = '012677871emshec1ab5c8c564da5p1d4694jsne7cae10ab98f'; // Replace with your actual API key
  const apiUrl = `https://streaming-availability.p.rapidapi.com/search/title?title=${title}&country=us&show_type=all&output_language=en`;

  const headers = new Headers({
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
  });

  const request = new Request(apiUrl, {
    method: 'GET', // Adjust the HTTP method as needed (e.g., 'POST' for some APIs)
    headers: headers,
  });

  try {
    const response = await fetch(request);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const us = data.result[0].streamingInfo.us;
    const unique = [...new Set(us.map(item => item.service))];
    const text = "Streaming on: " + unique.join(', ');

    return text;
  } catch (error) {
    console.error('Fetch error:', error);
    return null; // or handle the error as needed
  }
}
