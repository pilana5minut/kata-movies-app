import styles from './App.module.css'
import { Layout } from 'antd'

import { FilmDataProvider } from './contexts/FilmDataContext'
import FilmsList from './components/FilmsList/FilmsList'

export default function App() {
  return (
    <FilmDataProvider>
      <Layout.Content className={styles.content}>
        <FilmsList></FilmsList>
      </Layout.Content>
    </FilmDataProvider>
  )
}
