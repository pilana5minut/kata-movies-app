import { Input } from 'antd'
import { useFilmDataContext } from '../../contexts/FilmDataContext'
import { debounce } from '../../utils/utils'

export default function SearchBar() {
  const { getFilmsData } = useFilmDataContext()

  const handleSearchQuery = debounce(555, (e) => {
    getFilmsData(e.target.value)
  })

  return <Input onChange={(e) => handleSearchQuery(e)}></Input>
}
