import { useFilmDataContext } from '../contexts/FilmDataContext'

export default function FilmGallery() {
  const { configApi, errors, filmsData, isLoading } = useFilmDataContext()

  if (isLoading) return <div>Loading...</div>
  if (errors.length > 0) return <div>Errors: {errors.join(', ')}</div>
  if (!filmsData) return <div>Not data!</div>

  const imageURL = (size = 0) => {
    return `${configApi.images.base_url}${configApi.images.poster_sizes[size]}`
  }

  return (
    <ul>
      {filmsData.results.map((film) => {
        return (
          <li
            style={{
              border: '1px solid #333',
              listStyle: 'none',
            }}
            key={film.id}
          >
            <h3>{film.title}</h3>
            <img
              src={`${imageURL()}${film.poster_path}`}
              alt={film.title}
            />
            <p>Popularity: {film.popularity}</p>
          </li>
        )
      })}
    </ul>
  )
}
