import { Layout, Alert, Tabs } from 'antd'
import { FilmDataProvider } from './contexts/FilmDataContext'
import useNetworkStatus from './utils/hooks'
import styles from './App.module.css'
import FilmsList from './components/FilmsList/FilmsList'
import SearchBar from './components/SearchBar/SearchBar'
import TempRatedList from './components/TempRatedList/TempRatedList'

export default function App() {
  const networkStatus = useNetworkStatus()

  const items = [
    {
      key: '1',
      label: 'Search',
      children: (
        <>
          <Layout.Header className={styles.header}>
            <SearchBar />
          </Layout.Header>
          <Layout.Content className={styles.content}>
            <FilmsList />
          </Layout.Content>
        </>
      ),
    },
    {
      key: '2',
      label: 'Rated',
      children: (
        <Layout.Content className={styles.content}>
          <FilmsList />
        </Layout.Content>
      ),
    },
  ]

  return (
    <FilmDataProvider>
      {networkStatus ? (
        <>
          <TempRatedList />
          <Tabs
            className={styles.tabsBar}
            items={items}
            centered
          ></Tabs>
        </>
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
