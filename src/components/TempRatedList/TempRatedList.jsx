import { useFilmDataContext } from '../../contexts/FilmDataContext'
import { api } from '../../api/api'

export default function TempRatedList() {
  const { guestSessionId } = useFilmDataContext()

  return (
    <button
      onClick={() => {
        api.getListRatedMovies(guestSessionId)
      }}
    >
      get List Rated Movies
    </button>
  )
}
