export function getImageURL(configApi, size = 0) {
  return `${configApi.images.base_url}${configApi.images.poster_sizes[size]}`
}

export function trimText(text, maxLength) {
  if (text.length <= maxLength) return text
  const lastSpaceIndex = text.lastIndexOf(' ', maxLength)
  if (lastSpaceIndex === -1) return text.slice(0, maxLength)
  return text.slice(0, lastSpaceIndex)
}

export function debounce(delay, fn) {
  let timerId
  return (...args) => {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

export function getGenreListById(genreList, film) {
  return genreList.genres.filter((genre) => {
    return film.genre_ids.some((id) => id === genre.id)
  })
}

export function replacementOfRatedFilms(searchedFilmList, ratedFilmList) {
  const targetList = searchedFilmList.results
  const checkableList = ratedFilmList.results

  const resultsReplacement = targetList.map((tgFilm) => {
    if (checkableList.some((chFilm) => chFilm.id === tgFilm.id)) {
      const resultingRating = checkableList.find((chFilm) => chFilm.id === tgFilm.id).rating
      tgFilm.rating = resultingRating
      return tgFilm
    }
    return tgFilm
  })

  searchedFilmList.results = resultsReplacement
  return searchedFilmList
}
