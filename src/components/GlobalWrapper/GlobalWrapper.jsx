import { Layout, Alert, Tabs, Spin } from 'antd'

import { useNetworkStatus } from '../../utils/hooks'
import styles from './GlobalWrapper.module.css'
import { useFilmDataContext } from '../../contexts/FilmDataContext'

import SearchBar from '../SearchBar/SearchBar'
import FilmsList from '../FilmsList/FilmsList'
import Spinner from '../Spinner/Spinner'

export default function GlobalWrapper() {
  const { isLoadingInitial, activeTab, setActiveTab } = useFilmDataContext()
  const networkStatus = useNetworkStatus()

  if (isLoadingInitial) {
    return (
      <Spinner
        sizeSpinner={'large'}
        message={'Инициализация приложения.'}
      />
    )
  }

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
    <>
      {networkStatus ? (
        <>
          <Tabs
            className={styles.tabsBar}
            centered
            activeKey={activeTab}
            onChange={(key) => setActiveTab(key)}
            items={items}
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
    </>
  )
}
