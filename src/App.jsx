import './App.css'
import { FilmDataProvider } from './contexts/FilmDataContext'

import FilmGallery from './components/FilmGallery'

export default function App() {
  return (
    <FilmDataProvider>
      <FilmGallery></FilmGallery>
    </FilmDataProvider>
  )
}
