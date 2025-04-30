import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../api/api'

const FilmDataContext = createContext()

export function FilmDataProvider({ children }) {
  const [configApi, setConfigApi] = useState(null)
  const [filmsData, setFilmsData] = useState(null)
  const [genres, setGenres] = useState(null)
  const [isLoadingConfigApi, setIsLoadingConfigApi] = useState(false)
  const [isLoadingFilmsData, setIsLoadingFilmsData] = useState(false)
  const [isLoadingGenresList, setIsLoadingGenresList] = useState(false)
  const [errorConfig, setErrorConfig] = useState(null)
  const [errorFilmsData, setErrorFilmsData] = useState(null)
  const [errorGenresList, setErrorGenresList] = useState(null)
  const [queryStringValue, setQueryStringValue] = useState('')

  useEffect(() => {
    getConfig()
    fetchingGenresList()
  }, [])

  const fetchingGenresList = async () => {
    setIsLoadingGenresList(true)
    try {
      const genresList = await api.getGenresList()
      setGenres(genresList)
    } catch (error) {
      setErrorGenresList(error.message)
    } finally {
      setIsLoadingGenresList(false)
    }
  }

  const getConfig = async () => {
    setIsLoadingConfigApi(true)
    try {
      const config = await api.getConfigApi()
      setConfigApi(config)
    } catch (error) {
      setErrorConfig(error.message)
    } finally {
      setIsLoadingConfigApi(false)
    }
  }

  const getFilmsData = async (queryStringValue, page) => {
    setIsLoadingFilmsData(true)
    try {
      const data = await api.getFilms(queryStringValue, page)
      setFilmsData(data)
    } catch (error) {
      setErrorFilmsData(error.message)
    } finally {
      setIsLoadingFilmsData(false)
    }
  }

  const isLoading = isLoadingConfigApi || isLoadingFilmsData || isLoadingGenresList
  const errors = [errorConfig, errorFilmsData, errorGenresList].filter(Boolean)

  const value = {
    getFilmsData,
    queryStringValue,
    setQueryStringValue,
    configApi,
    errors,
    filmsData,
    isLoading,
    genres,
  }

  return <FilmDataContext.Provider value={value}>{children}</FilmDataContext.Provider>
}

export const useFilmDataContext = () => {
  const context = useContext(FilmDataContext)
  if (!context) {
    throw new Error('Этот компонент не является частью провайдера FilmDataProvider')
  }
  return context
}
