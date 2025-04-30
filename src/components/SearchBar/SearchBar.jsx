import { Input } from 'antd'
import { useFilmDataContext } from '../../contexts/FilmDataContext'
import { debounce } from '../../utils/utils'
import { useState, useCallback } from 'react'

export default function SearchBar() {
  const { setQueryStringValue, getFilmsData } = useFilmDataContext()
  const [currentStringValue, setCurrentStringValue] = useState('')

  const debouncedSearch = useCallback(
    debounce(777, (queryString) => {
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
      value={currentStringValue}
      onChange={(e) => handleSearchQuery(e)}
    />
  )
}
