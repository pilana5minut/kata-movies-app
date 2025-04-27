import { useFilmDataContext } from '../../contexts/FilmDataContext'
import { debounce } from '../../utils/utils'

export default function SearchBar() {
  const { getFilmsData } = useFilmDataContext()

  const handleSearchQuery = debounce(3333, (e) => {
    getFilmsData(e.target.value, '1')
  })

  return <input onChange={(e) => handleSearchQuery(e)} />
}
