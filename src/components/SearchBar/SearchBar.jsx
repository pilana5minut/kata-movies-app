import { useState, useCallback } from 'react'
import { Input } from 'antd'
import { useFilmDataContext } from '../../contexts/FilmDataContext'
import { debounce } from '../../utils/utils'

export default function SearchBar() {
  const { setQueryStringValue, getFilmsData } = useFilmDataContext()
  const [currentStringValue, setCurrentStringValue] = useState('')

  const debouncedSearch = useCallback(
    debounce(555, (queryString) => {
      setQueryStringValue(queryString)
      getFilmsData(queryString)
    }),
    [setQueryStringValue, getFilmsData]
  )

  const handleSearchQuery = (e) => {
    setCurrentStringValue(e.target.value)
    debouncedSearch(e.target.value)
  }

  return (
    <Input
      placeholder="Type to search..."
      value={currentStringValue}
      onChange={(e) => handleSearchQuery(e)}
    />
  )
}
