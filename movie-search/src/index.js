import slides from './modules/slides';
import filmsData from './modules/data';

const swiperWrapper = document.querySelector('.swiper-wrapper');

const state = {
  word: '',
  totalPages: 0,
  currentPage: 0,
  newWord: false
}

const loadCards = () => {
  clearSlider();
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

const getMovies = () => {
  const url = `https://www.omdbapi.com/?s=${state.word}&page=${state.currentPage}&apikey=6fa14c59`;
  
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      if (state.newWord) {
        filmsData.length = 0;
        state.newWord = false;
        state.totalPages = Math.ceil(data.totalResults / 10);
      }
      let promises = [];
      data.Search.forEach((movie) => {
        promises.push(
          fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=6fa14c59`)
            .then(res => res.json())
        );
      })
      return Promise.all(promises);
    })
    .then(dat => {
      dat.forEach((film)=> {
        if (film.Poster === 'N/A') {
          film.Poster = 'assets/img/noposter.png';
        };
        filmsData.push({
          Title: film.Title,
          Year: film.Year,
          imdbID: film.imdbID,
          Poster: film.Poster,
          imdbRating: film.imdbRating
        })
      })
      updateSlider();  
    }) 
    .catch(()=> alert('no results for you request'));
 }

const translate = (word) => {
  let url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200429T145834Z.39eedef9eb007185.f7576a6c50e6c8be4c765d01a48e95e180e427f4&text=${word}&lang=ru-en`;
  return fetch(url)
    .then(res => res.json())
    .then(result => {
      state.word = result.text[0];
    })
}


const onSearch = () => {
  const searchString = document.querySelector('.search-input').value;
  if (searchString) {
    clearSlider();
    state.currentPage = 1;
    state.newWord = true;
    if (/[а-яё]+/gi.test(searchString)) {
      translate(searchString).then(() => {
          getMovies(state.currentPage, state.word);
      });
    } else {
      state.word = searchString;
      getMovies(state.currentPage, state.word);
    }
  }
}

document.querySelector('.search-button').addEventListener('click', onSearch);


document.querySelector('.clear-img').addEventListener('click', () => {
  document.querySelector('.search-input').value = '';
})

document.addEventListener('keyup', (key)=>{
  if (key.code === 'Enter') {
    onSearch();
  }
});


const addSlidesFromAPI = () => {
  if (state.currentPage < state.totalPages) {
    state.currentPage += 1;
    getMovies()
  }
};

slides.on('reachEnd', addSlidesFromAPI);