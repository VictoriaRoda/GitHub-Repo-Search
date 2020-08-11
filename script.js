'use strict';



function formatQueryParams(params){
  let queryItems= Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();

  for(let i=0; i<responseJson.length; i++){
    $('#results-list').append(`
    <li><h3><a href='${responseJson[i].html_url}'>${responseJson[i].name}</a></h3>
    </li>`
  )};
  $('#results').removeClass('hidden');
};

function getRepos(query){
  let apiKey = "";
  let searchURL = `https://api.github.com/users/${query}/repos`;
  let params = {
    /*USERNAME: query*/
  };

  let queryString= formatQueryParams(params)
  let url= searchURL + '?' + queryString;

  console.log(url);

  let options= { 
    headers: new Headers({Accept: 'application/vnd.github.v3+json'})
  };

  fetch(url,options)
    .then(response => {
      if(response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
};

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    let userHandle=$('#js-user-handle').val();
    getRepos(userHandle);
  });
};

$(watchForm);