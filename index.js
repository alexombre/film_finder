const showMovieList = (selector, movieList) => {
    
    movieList.Search.forEach((movie) => {
      selector.append( `
        <div class="card mb-3" style="height: 23rem;">
          <div class="d-flex flex-row h-100">
            <img class="img-fluid col-3 my-2" src="${movie.Poster}" alt="Card image">
            <div class="card-body d-flex flex-column justify-content-between col-9">
              <h5 class="card-title">${movie.Title}</h5>
              <h6>${movie.Released}</h6>
              <button type="button" class="btn btn-primary">Primary</button>
            </div>
          </div>  
        </div>
    `)
    })
    
}
const search = () => {
  const text = $('.form-control').val();
  console.log(text);  
  $('.form-control').val("");
  return text;
  
}




var testing;
const callApi = async () => {
    const URL = `http://www.omdbapi.com/?s=${search()}&apikey=128da5ac`;
    const url_test ="http://www.omdbapi.com/?i=tt3896198&apikey=128da5ac";
    const selector = $(".container");
    const response = await fetch(URL);
    const text = await response.json();
    console.log(text);
    list = text;
    console.log(list);
    showMovieList(selector, list)
  }
//callApi(url_test);
$('.input-group-append .btn').click(callApi);