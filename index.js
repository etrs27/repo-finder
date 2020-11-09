

function displayResults(responseJson, maxResults) {
  $('#results-list').empty();

  console.log(responseJson);
  if (responseJson.length === 0 || responseJson.message === "Not Found"){
    $('#js-error-message').text(`No results found for that user. Please try again.`);
    } 

  // iterate through the repo array, stopping at the max number of results
  for (let i = 0; i < responseJson.length && i<maxResults; i++){
    $('#results-list').append(
      `<li><h3><a href="${responseJson[i].url}">${responseJson[i].name}</a></h3>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};


const getRepos = (username, maxResults) => {
    fetch(`https://api.github.com/users/${username}/repos?per_page=${maxResults}`)
    .then(response=> response.json())
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const username = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();

    $('#js-search-term').val('');
    $('#js-max-results').val('');


    getRepos(username, maxResults);
  });
}

$(watchForm);