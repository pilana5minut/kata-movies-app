import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../api/api'

const FilmDataContext = createContext()

export function FilmDataProvider({ children }) {
  const [filmsData, setFilmsData] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const data = await api.getFilms()
        setFilmsData(data)
      } catch (error) {
        throw new Error(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchingData()
  }, [])

  const value = {
    filmsData,
    isLoading,
  }

  return <FilmDataContext.Provider value={value}>{children}</FilmDataContext.Provider>
}

export const useFilmDataContext = () => {
  const context = useContext(FilmDataContext)
  if (!context) {
    throw new Error('This component is not part of the provider FilmDataProvider')
  }
  return context
}
