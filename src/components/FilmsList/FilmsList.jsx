import { Row, Col, Spin, Alert, Empty } from 'antd'
import { format } from 'date-fns'
import { getImageURL } from '../../utils/utils'
import { useFilmDataContext } from '../../contexts/FilmDataContext'
import FilmCard from '../FilmCard/FilmCard'
import styles from './FilmsList.module.css'

export default function FilmsList() {
  const { configApi, errors, filmsData, isLoading } = useFilmDataContext()

  if (isLoading) {
    return (
      <Spin
        fullscreen
        size="large"
        tip="Загрузка данных"
      ></Spin>
    )
  }

  if (errors.length > 0) {
    return errors.map((error) => (
      <Alert
        className={styles.errorBanner}
        type="error"
        showIcon
        message={error}
      ></Alert>
    ))
  }

  if (!filmsData) {
    return <Empty description="Данные отсутствуют."></Empty>
  }

  return (
    <Row
      gutter={[36, 36]}
      justify="center "
    >
      {filmsData.results.map((film) => {
        return (
          <Col key={film.id}>
            <FilmCard
              title={film.title ? film.title : 'No title.'}
              overview={film.overview ? film.overview : 'No overview.'}
              releaseDate={
                film.release_date ? format(new Date(film.release_date), 'MMMM d, yyyy') : 'No date.'
              }
              popularity={film.popularity ? Number(film.popularity.toFixed(1)) : 'No data.'}
              imageURL={`${getImageURL(configApi, 1)}${film.poster_path}`}
            ></FilmCard>
          </Col>
        )
      })}
    </Row>
  )
}
