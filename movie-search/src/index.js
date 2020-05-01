import slides from './modules/slides';
import filmsData from './modules/data';


const swiperWrapper = document.querySelector('.swiper-wrapper');

const loadCards = () => {
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

const getRatingIMDB = (id) => {
  const url = `https://www.omdbapi.com/?i=${id}&apikey=6fa14c59`;
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      debugger
      return data.imdbRating;
    })
};


const getMovies = (page, searchString) => {
  const url = `https://www.omdbapi.com/?s=${searchString}&page=${page}&apikey=6fa14c59`;
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      filmsData.length = 0;

      for (let i = 0; i < data.Search.length; i += 1) {
        let film = data.Search[i];
        let filmRating = getRatingIMDB(film.imdbID);
        filmsData.push({
          Title: film.Title,
          Year: film.Year,
          imdbID: film.imdbID,
          Poster: film.Poster,
          imdbRating: filmRating
        })

      }

      // data.Search.forEach((film) => {
      //   let filmRating = getRatingIMDB(film.imdbID);
      //   filmsData.push({
      //     Title: film.Title,
      //     Year: film.Year,
      //     imdbID: film.imdbID,
      //     Poster: film.Poster,
      //     imdbRating: filmRating
      //   })
      // })

      clearSlider();
      updateSlider();
    })
 }


document.querySelector('.search-button').addEventListener('click', (e) => {
  const searchString = document.querySelector('.search-input').value;
  getMovies(1, searchString);
});
