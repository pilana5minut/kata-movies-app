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
  const [isLoadingGuestSession, setIsLoadingGuestSession] = useState(false)

  const [errorConfig, setErrorConfig] = useState(null)
  const [errorFilmsData, setErrorFilmsData] = useState(null)
  const [errorGenresList, setErrorGenresList] = useState(null)
  const [errorGuestSession, setErrorGuestSession] = useState(null)

  const [queryStringValue, setQueryStringValue] = useState('')
  const [guestSessionId, setGuestSessionId] = useState(null)

  useEffect(() => {
    getConfig()
    fetchingGenresList()
    getGuestSessionValue()
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

  const getGuestSessionValue = async () => {
    try {
      if (localStorage.getItem('guestSessionObject')) {
        const guestSessionObject = JSON.parse(localStorage.getItem('guestSessionObject'))
        const ExpirationDate = Date.parse(guestSessionObject.expires_at)

        if (ExpirationDate < Date.now()) {
          console.log('(GS) Срок действия гостевой сессии истек.')
          setIsLoadingGuestSession(true)
          const newSession = await api.createGuestSession()
          setGuestSessionId(newSession.guest_session_id)
          localStorage.setItem('guestSessionObject', JSON.stringify(newSession))
          console.log('(GS) Новая гостевая сессия была записана в localStorage.')
        } else {
          console.log('(GS) Гостевая сессия уже существует.')
          const guestSessionObject = JSON.parse(localStorage.getItem('guestSessionObject'))
          setGuestSessionId(guestSessionObject.guest_session_id)
        }
      } else {
        console.log('(GS) Гостевая сессия еще не создана.')
        setIsLoadingGuestSession(true)
        const newSession = await api.createGuestSession()
        setGuestSessionId(newSession.guest_session_id)
        localStorage.setItem('guestSessionObject', JSON.stringify(newSession))
        console.log('(GS) Новая гостевая сессия была записана в localStorage.')
      }
    } catch (error) {
      setErrorGuestSession(error.message)
    } finally {
      setIsLoadingGuestSession(false)
    }
  }

  const isLoading =
    isLoadingConfigApi || isLoadingFilmsData || isLoadingGenresList || isLoadingGuestSession
  const errors = [errorConfig, errorFilmsData, errorGenresList, errorGuestSession].filter(Boolean)

  const value = {
    getFilmsData,
    queryStringValue,
    setQueryStringValue,
    configApi,
    errors,
    filmsData,
    isLoading,
    genres,
    guestSessionId,
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
