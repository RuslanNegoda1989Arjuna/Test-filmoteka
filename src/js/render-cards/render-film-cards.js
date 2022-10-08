let scr = `
<li class="card__film">
     <div class="thumb">
      <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title} ${name}" width="100%" data-id="${id}" />
      <span class="card__vote_average">${vote_average}</span>
   </div>
   <h2 class="card__title">${title} ${name}</h2>
   <p class="card__text">
      <span> ${name} </span> | <span>${release_date}</span>
   </p>
</li>
`;
