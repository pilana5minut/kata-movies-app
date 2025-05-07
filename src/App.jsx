import { FilmDataProvider } from './contexts/FilmDataContext'

import GlobalWrapper from './components/GlobalWrapper/GlobalWrapper'

export default function App() {
  return (
    <FilmDataProvider>
      <GlobalWrapper />
    </FilmDataProvider>
  )
}
