import { Layout, Alert } from 'antd'
import { FilmDataProvider } from './contexts/FilmDataContext'
import useStatusNetwork from './utils/hooks'
import styles from './App.module.css'
import FilmsList from './components/FilmsList/FilmsList'

export default function App() {
  const statusNetwork = useStatusNetwork()

  return (
    <FilmDataProvider>
      {statusNetwork ? (
        <Layout.Content className={styles.content}>
          <FilmsList></FilmsList>
        </Layout.Content>
      ) : (
        <Alert
          className={styles.warningBanner}
          type="warning"
          showIcon
          message="Отсутствует подключение к интернету!"
        ></Alert>
      )}
    </FilmDataProvider>
  )
}
