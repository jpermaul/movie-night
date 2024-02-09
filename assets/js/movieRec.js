const apiKey = '30c8fccff0mshc16db0f46b38b94p10afdejsne26d80c5c3a8'; // Replace with your actual API key
const apiUrl = 'https://imdb-top-100-movies.p.rapidapi.com/';

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

// Make the fetch request
fetch(request)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(movies => {
    console.log(movies)
    
    for (let i = 0; i < movies.length; i++) {
        console.log(movies[i]);
      //if (movies[i]) {}
        //console.log(movies.result[i].streamingInfo.us)
        // var us = movies.result[i].streamingInfo.us
        // for (let j = 0; j < us.length; j++) {
        // console.log(us[j].service)
        // }
        // }
    }})

    
    
  
  .catch(error => {
   console.error('Fetch error:', error);
  });