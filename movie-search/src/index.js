import slides from './modules/slides';
import filmsData from './modules/data';

const swiperWrapper = document.querySelector('.swiper-wrapper');

const loadCards = () => {
  debugger
  filmsData.forEach((film)=>{
    swiperWrapper.innerHTML +=  
    `
    <div class="swiper-slide">
    <div class="movie-slide">
    <div class = "link">
    <a href="https://www.imdb.com/title/${film.imdbID}/" target="_blank"></a>
    </div>
      <div class="movie-picture">
        <img src="${film.Poster}">
      </div>
      <div class="movie-description">
        <div class="movie-name">
          <h4>${film.Title}</h4>
        </div>
        <div class="movie-year">
          <h4>${film.Year}</h4>
          <span class="imdb">${film.imdbRating}</span>
        </div>
      </div>
    </div>
    </div>
    `
  });
}

const updateSlider = () => {
  loadCards();
  slides.update();
};


const clearSlider = () => {
  swiperWrapper.innerHTML = '';
};

updateSlider();

const getMovies = (page, searchString) => {
  const url = `https://www.omdbapi.com/?s=${searchString}&page=${page}&apikey=6fa14c59`;
  
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      filmsData.length = 0;
      let promises = [];
      data.Search.forEach((film) => {
        promises.push(
          fetch(`https://www.omdbapi.com/?i=${film.imdbID}&apikey=6fa14c59`)
            .then(res => res.json())
        );
      })
      return Promise.all(promises);
    })
    .then(dat => {
      dat.forEach((film)=> {
        filmsData.push({
          Title: film.Title,
          Year: film.Year,
          imdbID: film.imdbID,
          Poster: film.Poster,
          imdbRating: film.imdbRating
        })
      })
      clearSlider();
      updateSlider();  
    }) 
 }


document.querySelector('.search-button').addEventListener('click', (e) => {
  const searchString = document.querySelector('.search-input').value;
  getMovies(1, searchString);
});
