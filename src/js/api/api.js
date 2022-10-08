const galleryRef = document.querySelector('.gallery');
const URL_TRENDING_FILMS =
  'https://api.themoviedb.org/3/trending/all/day?api_key=74cf07cbcff58397c32fe332f07646fa';
const URL_GENRES =
  'https://api.themoviedb.org/3/genre/movie/list?api_key=74cf07cbcff58397c32fe332f07646fa&language=en-US';

async function getPopularFilms() {
  try {
    const responseFilms = await fetch(URL_TRENDING_FILMS);
    const responseGenres = await fetch(URL_GENRES);
    // debugger;
    const dataFilms = await responseFilms.json();
    const dataGenres = await responseGenres.json();
    //console.log(dataFilms.results.length, dataGenres.genres.length);
    saveDataToLocalStorage(dataGenres.genres, 'genres');

    if (!dataFilms.results.length) {
      console.log('Нет популярных фильмов');
      return;
    }

    render(dataFilms.results);
  } catch (error) {
    console.log(error, 'Что-то пошло не так');
  }
}

function render(data) {
  //debugger;

  const genres = getDataFromLocalStorage('genres');
  // console.log(...genres);
  // const idGeneres = genres.map(name => {
  //   console.log(name.id);
  //   return name.name;
  // });
  // console.log(idGeneres);

  // _________________!!!!!

  const markup = data
    .map(
      ({
        poster_path,
        backdrop_path,
        title,
        name,
        release_date,
        first_air_date,
        genre_ids,
      }) => {
        let str = `<div class="photo-card"><a class="link" href=""><img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="" loading="lazy" /></a>
           <div class="info"><p class="film-name">${title}</p><p class="genre">${genre_ids} | ${release_date}</p></div></div>`;
        return str;
      }
    )
    .join('');
  // console.log(markup);
  galleryRef.insertAdjacentHTML('beforeend', markup);
}

function saveDataToLocalStorage(data, key) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}

function getDataFromLocalStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return data === null ? undefined : JSON.parse(data);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}

getPopularFilms();

//  _________________________________
// фетч жанрів

function fetchGenres() {
  const url = URL_GENRES;
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      return data.genres;
    });
}
console.log(fetchGenres());

// function insertGenresToMovieObj() {
//   return this.fetchPopularArticles().then(data => {
//     return this.fetchGenres().then(genresList => {
//       return data.map(movie => ({
//         ...movie,
//         release_date: movie.release_date.split('-')[0],
//         genres: movie.genre_ids
//           .map(id => genresList.filter(el => el.id === id))
//           .flat(),
//       }));
//     });
//   });
// }
// console.log(insertGenresToMovieObj());
