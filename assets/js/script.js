const apiKey = '012677871emshec1ab5c8c564da5p1d4694jsne7cae10ab98f'; // Replace with your actual API key
const apiUrl = 'https://streaming-availability.p.rapidapi.com/search/title?title=hook&country=us&show_type=all&output_language=en';

// Set up the headers with the API key
const headers = new Headers({
    'X-RapidAPI-Key': '012677871emshec1ab5c8c564da5p1d4694jsne7cae10ab98f',
    'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
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
  .then(data => {
    console.log(data)
    
    for (let i = 0; i < data.result.length; i++) {
      //console.log(data.result[i])
      if (data.result[i].streamingInfo.us) {
        //console.log(data.result[i].streamingInfo.us)
        var us = data.result[i].streamingInfo.us
        for (let j = 0; j < us.length; j++) {
        console.log(us[j].service)
        }
        }
      

    }
    
  })
  .catch(error => {
   console.error('Fetch error:', error);
  });

 




