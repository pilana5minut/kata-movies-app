import { useFilmDataContext } from '../contexts/FilmDataContext'

export default function FilmGallery() {
  const { filmsData, isLoading } = useFilmDataContext()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <ul>
      {filmsData.results.map((film) => {
        return (
          <li key={film.id}>
            <p>{film.title}</p>
          </li>
        )
      })}
    </ul>
  )
}
