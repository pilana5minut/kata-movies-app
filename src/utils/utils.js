export const getImageURL = (configApi, size = 0) => {
  return `${configApi.images.base_url}${configApi.images.poster_sizes[size]}`
}

export const trimText = (text, maxLength) => {
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
