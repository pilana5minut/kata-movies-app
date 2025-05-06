import { createContext, useContext, useState, useEffect } from 'react'
import { tmdbService } from '../service/tmdbService'

const FilmDataContext = createContext()

export function FilmDataProvider({ children }) {
  const [configApi, setConfigApi] = useState(null)
  const [filmsData, setFilmsData] = useState(null)
  const [filmsRatedData, setFilmsRatedData] = useState(null)
  const [genres, setGenres] = useState(null)

  const [isLoadingConfigApi, setIsLoadingConfigApi] = useState(false)
  const [isLoadingFilmsData, setIsLoadingFilmsData] = useState(false)
  const [isLoadingFilmsRatedData, setIsLoadingFilmsRatedData] = useState(false)
  const [isLoadingGenresList, setIsLoadingGenresList] = useState(false)
  const [isLoadingGuestSession, setIsLoadingGuestSession] = useState(false)

  const [errorConfig, setErrorConfig] = useState(null)
  const [errorFilmsData, setErrorFilmsData] = useState(null)
  const [errorFilmsRatedData, setErrorFilmsRatedData] = useState(null)
  const [errorGenresList, setErrorGenresList] = useState(null)
  const [errorGuestSession, setErrorGuestSession] = useState(null)

  const [queryStringValue, setQueryStringValue] = useState('')
  const [guestSessionId, setGuestSessionId] = useState(null)
  const [activeTab, setActiveTab] = useState('1')
  const [renderedList, setRenderedList] = useState(null)

  useEffect(() => {
    getConfig()
    fetchingGenresList()
    getGuestSessionValue()
  }, [])

  useEffect(() => {
    if (activeTab === '1') {
      setRenderedList(filmsData)
    } else if (activeTab === '2') {
      setRenderedList(filmsRatedData)
    }
  }, [activeTab, filmsData, filmsRatedData])

  useEffect(() => {
    if (guestSessionId) {
      getFilmsRatedData(guestSessionId)
    }
  }, [guestSessionId])

  const getConfig = async () => {
    setIsLoadingConfigApi(true)
    try {
      const config = await tmdbService.getConfigApi()
      setConfigApi(config)
    } catch (error) {
      setErrorConfig(error.message)
    } finally {
      setIsLoadingConfigApi(false)
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
          const newSession = await tmdbService.createGuestSession()
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
        const newSession = await tmdbService.createGuestSession()
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

  const fetchingGenresList = async () => {
    setIsLoadingGenresList(true)
    try {
      const genresList = await tmdbService.getGenresList()
      setGenres(genresList)
    } catch (error) {
      setErrorGenresList(error.message)
    } finally {
      setIsLoadingGenresList(false)
    }
  }

  const getFilmsData = async (queryStringValue, page) => {
    setIsLoadingFilmsData(true)
    try {
      const data = await tmdbService.getFilms(queryStringValue, page)
      setFilmsData(data)
    } catch (error) {
      setErrorFilmsData(error.message)
    } finally {
      setIsLoadingFilmsData(false)
    }
  }

  const addRating = async (movieId, ratingValue, guestSessionId) => {
    try {
      await tmdbService.addRatingForMovie(movieId, ratingValue, guestSessionId)
      await getFilmsRatedData(guestSessionId)
    } catch (error) {
      setErrorFilmsRatedData(error.message)
    }
  }

  const getFilmsRatedData = async (guestSessionId) => {
    setIsLoadingFilmsRatedData(true)
    try {
      const data = await tmdbService.getListRatedMovies(guestSessionId)
      setFilmsRatedData(data)
    } catch (error) {
      setErrorFilmsRatedData(error.message)
    } finally {
      setIsLoadingFilmsRatedData(false)
    }
  }

  const isLoadingInitial = isLoadingConfigApi || isLoadingGenresList || isLoadingGuestSession

  const errors = [
    errorConfig,
    errorFilmsData,
    errorGenresList,
    errorGuestSession,
    errorFilmsRatedData,
  ].filter(Boolean)

  const providerValue = {
    configApi,
    errors,
    genres,

    guestSessionId,
    queryStringValue,
    activeTab,

    setActiveTab,
    setQueryStringValue,
    getFilmsData,
    addRating,

    filmsData,
    filmsRatedData,
    renderedList,

    isLoadingInitial,
    isLoadingFilmsData,
    isLoadingFilmsRatedData,
  }

  return <FilmDataContext.Provider value={providerValue}>{children}</FilmDataContext.Provider>
}

export const useFilmDataContext = () => {
  const context = useContext(FilmDataContext)
  if (!context) {
    throw new Error('Этот компонент не является частью провайдера FilmDataProvider')
  }
  return context
}
