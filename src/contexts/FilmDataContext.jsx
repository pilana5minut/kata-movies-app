import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../api/api'

const FilmDataContext = createContext()

export function FilmDataProvider({ children }) {
  const [filmsData, setFilmsData] = useState(null)
  const [configApi, setConfigApi] = useState(null)
  const [isLoadingConfigApi, setIsLoadingConfigApi] = useState(false)
  const [isLoadingFilmsData, setIsLoadingFilmsData] = useState(false)
  const [errorConfig, setErrorConfig] = useState(null)
  const [errorFilmsData, setErrorFilmsData] = useState(null)

  useEffect(() => {
    getConfig()
    getFilmsData()
  }, [])

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

  const getFilmsData = async () => {
    setIsLoadingFilmsData(true)
    try {
      const data = await api.getFilms('return', '2')
      setFilmsData(data)
    } catch (error) {
      setErrorFilmsData(error.message)
    } finally {
      setIsLoadingFilmsData(false)
    }
  }

  const isLoading = isLoadingConfigApi || isLoadingFilmsData
  const errors = [errorConfig, errorFilmsData].filter(Boolean)

  const value = {
    configApi,
    errors,
    filmsData,
    isLoading,
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
