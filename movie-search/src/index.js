import slides from './modules/slides';
import filmsData from './modules/data';


const swiperWrapper = document.querySelector('.swiper-wrapper');

const loadCards = () => {
  filmsData.Search.forEach((film)=>{
    swiperWrapper.innerHTML +=  
    `
    <div class="swiper-slide">
    <div class="movie-slide">
      <div class="movie-picture">
        <img src="${film.Poster}">
      </div>
      <div class="movie-description">
        <div class="movie-name">
          <h3>${film.Title}</h3>
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


loadCards();

slides.update();



