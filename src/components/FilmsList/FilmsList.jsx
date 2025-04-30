import { Row, Col, Spin, Alert, Empty, Pagination } from 'antd'
import { format } from 'date-fns'
import { getImageURL } from '../../utils/utils'
import { useFilmDataContext } from '../../contexts/FilmDataContext'
import FilmCard from '../FilmCard/FilmCard'
import styles from './FilmsList.module.css'
import { useState } from 'react'

export default function FilmsList() {
  const { configApi, errors, filmsData, isLoading, getFilmsData, queryStringValue } =
    useFilmDataContext()
  const [currentPage, setCurrentPage] = useState(1)

  if (isLoading) {
    return (
      <div className={styles.spinner}>
        <Spin size="large"></Spin>
      </div>
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
    return (
      <Empty
        className={styles.empty}
        description="Данные отсутствуют."
      ></Empty>
    )
  }

  // console.log('🚥 filmsData.results 🚥', filmsData.results)
  // filmsData.results.forEach((film, index) => {
  //   if (index <= 5) {
  //     console.log('film id: ', film.id)
  //   }
  // })
  // console.log('🚥 filmsData.page 🚥', filmsData.page)
  // console.log('🚥 filmsData.total_pages 🚥', filmsData.total_pages)
  // console.log('🚥 filmsData.total_results 🚥', filmsData.total_results)

  return (
    <>
      {filmsData.results.length > 0 ? (
        <Pagination
          align="center"
          size="small"
          showSizeChanger={false}
          total={filmsData.total_results}
          pageSize={filmsData.results.length}
          current={currentPage}
          onChange={(page) => {
            getFilmsData(queryStringValue, page)
            setCurrentPage(page)
          }}
        />
      ) : (
        <Empty
          className={styles.empty}
          description="Данные отсутствуют."
        ></Empty>
      )}
      <Row
        className={styles.filmsList}
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
                  film.release_date
                    ? format(new Date(film.release_date), 'MMMM d, yyyy')
                    : 'No date.'
                }
                popularity={film.popularity ? Number(film.popularity.toFixed(1)) : null}
                imageURL={`${getImageURL(configApi, 1)}${film.poster_path}`}
              ></FilmCard>
            </Col>
          )
        })}
      </Row>
    </>
  )
}
