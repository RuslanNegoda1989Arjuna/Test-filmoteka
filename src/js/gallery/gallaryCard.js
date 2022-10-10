import { URL_POSTER } from '../api/baseUrls';
import MoviesApiService from '../api/api';
import { createPagination } from '../pagination/pagination';

const homeCardsContainer = document.querySelector('.cards__list--home');

const moviesApiService = new MoviesApiService();

//  ЖАНРИ ДО LOCALSTORAGE
moviesApiService
  .fetchGenres()
  .then(({ genres }) => {
    for (const { id, name } of genres) {
      localStorage.setItem(`genre_${id}`, name);
    }
  })
  .catch(error => console.log(error));

// ВІДОБРАЖЕННЯ РОЗМІТКИ
moviesApiService
  .fetchTrendingMovies()
  .then(({ results, total_results }) => {
    makingMarkup(results);
    createPagination(total_results);
    for (const result of results) {
      localStorage.setItem(`film_${result.id}`, JSON.stringify(result));
    }
  })
  .catch(error => console.log(error));

function genresList(array) {
  let genre_names = '';

  for (const id of array) {
    const genre_name = localStorage.getItem(`genre_${id}`);
    if (!genre_name) {
      continue;
    }
    if (genre_names) {
      genre_names += ', ';
    }
    genre_names += genre_name;
  }
  return genre_names;
}
// РОЗМІТКА
export default function makingMarkup(results) {
  const markup = results
    .map(({ title, name, poster_path, genre_ids, id }) => {
      return `<div class="movie-card">

                <img width="280" height="402" class="movie-card__img" src="${URL_POSTER}/${poster_path}" alt="" data-id="${id}" loading="lazy"/>
                
                <div class="info">
                    <p class="info-item">
                        <b>${title || name}</b>
                    </p>
                    <p class="info-item">
                        <b>Views ${genresList(genre_ids)}</b>
                    </p>
                    <p class="info-item">
                        <b>Comments</b>
                    </p>
                    <p class="info-item">
                        <b>Downloads</b>
                    </p>
                </div>
            </div>`;
    })
    .join('');
  return insertFilmsMarkup(markup);
}

// Функція для вставки розмітки в контейнер
function insertFilmsMarkup(filmsMarkup) {
  homeCardsContainer.insertAdjacentHTML('beforeend', filmsMarkup);
}
