var numSteps = 20.0;
var stepStar = .15;
var stepEnd = .85;
var targets;
var prevRatio = 0.0;

const showMovieList = (selector, movieList) => {
    
    movieList.Search.forEach((movie) => {
      selector.append( `
        <div class="card mb-3" style="height: 23rem;">
          <div class="d-flex flex-row h-100">
            <img class="img-fluid col-3 my-2" src="${movie.Poster}" alt="Card image">
            <div class="card-body d-flex flex-column justify-content-between col-9">
              <h5 class="card-title">${movie.Title}</h5>
              <h6>${movie.Year}</h6>
              <button id="${movie.imdbID}" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">Read more</button>
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

function createObserver() {
  var observer;

  var options = {
    root: null,
    rootMargin: "0px",
    threshold: buildThresholdList()
  };

  observer = new IntersectionObserver(handleIntersect, options);
  targets.forEach(function (target) {
    observer.observe(target)
  })

}


function buildThresholdList() {
  var thresholds = [];

  for (var i=1.0; i<=numSteps; i++) {
    var ratio = i/numSteps;
    thresholds.push(ratio);
  }

  thresholds.push(0);
  return thresholds;
}

function handleIntersect(entries, observer) {

  entries.forEach(function(entry) {
    
    entry.target.style.opacity = entry.intersectionRatio;
    

    prevRatio = entry.intersectionRatio;
  });
}

const callApi = async () => {
    const URL = `http://www.omdbapi.com/?s=${search()}&apikey=128da5ac`;
    const url_test ="https://www.omdbapi.com/?i=tt3896198&apikey=128da5ac";
    const selector = $(".container");
    const response = await fetch(URL);
    const text = await response.json();
    console.log(text);
    list = text;
    console.log(list);
    showMovieList(selector, list);
    targets = $('.card').toArray();
    createObserver();
    getIdOmdb($('.card .btn').toArray());

  }
//callApi(url_test);
const openModal = async (id) => {
  
}

$('.input-group-append .btn').click(callApi);


$('#exampleModalCenter').on('show.bs.modal', async (event) => {
  var id = $(event.relatedTarget).attr('id'); // Button that triggered the modal
  const URL = `https://www.omdbapi.com/?i=${id}&apikey=128da5ac`;
  const response = await fetch(URL);
  const text = await response.json();
  
  var modal = $(this);
  console.log(text);
  $('.modal-title').text(`${text.Title}`)
  $('.modal-img').attr('src',`${text.Poster}`)
  $('.modal-text p').text(`${text.Plot}`)
  $('.modal-text h6').text(`${text.Released}`)
})