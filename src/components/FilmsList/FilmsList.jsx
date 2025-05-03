import { useState } from 'react'
import { Row, Col, Spin, Alert, Empty, Pagination } from 'antd'
import { format } from 'date-fns'
import { getImageURL, getGenreListById } from '../../utils/utils'
import { useFilmDataContext } from '../../contexts/FilmDataContext'
import FilmCard from '../FilmCard/FilmCard'
import styles from './FilmsList.module.css'

export default function FilmsList() {
  const [currentPage, setCurrentPage] = useState(1)

  const {
    configApi,
    errors,
    renderedList,
    isLoading,
    getFilmsData,
    queryStringValue,
    genres,
    guestSessionId,
    addRating,
  } = useFilmDataContext()

  if (isLoading) {
    return (
      <div className={styles.spinner}>
        <Spin size="large"></Spin>
        <span>Please wait.</span>
      </div>
    )
  }

  if (errors.length > 0) {
    return errors.map((error, index) => (
      <Alert
        key={index}
        className={styles.errorBanner}
        type="error"
        showIcon
        message={error}
      ></Alert>
    ))
  }

  if (!renderedList) {
    return (
      <Empty
        className={styles.empty}
        description="No data to display."
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      ></Empty>
    )
  }

  return (
    <>
      {renderedList.results && renderedList.results.length > 0 ? (
        <Pagination
          align="center"
          size="small"
          showSizeChanger={false}
          total={renderedList.total_results}
          pageSize={renderedList.results.length}
          current={currentPage}
          onChange={(page) => {
            getFilmsData(queryStringValue, page)
            setCurrentPage(page)
          }}
        />
      ) : (
        <Empty
          className={styles.empty}
          description="No data to display."
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        ></Empty>
      )}
      <Row
        className={styles.filmsList}
        gutter={[36, 36]}
        justify="center "
      >
        {renderedList.results &&
          renderedList.results.map((film) => {
            return (
              <Col key={film.id}>
                <FilmCard
                  filmId={film.id}
                  guestSessionId={guestSessionId}
                  addRating={addRating}
                  title={film.title ? film.title : 'No title.'}
                  overview={film.overview ? film.overview : 'No overview.'}
                  imageURL={`${getImageURL(configApi, 1)}${film.poster_path}`}
                  genreList={getGenreListById(genres, film)}
                  voteAverage={film.vote_average ? Number(film.vote_average.toFixed(1)) : null}
                  rating={film.rating ? film.rating : null}
                  releaseDate={
                    film.release_date
                      ? format(new Date(film.release_date), 'MMMM d, yyyy')
                      : 'No date.'
                  }
                ></FilmCard>
              </Col>
            )
          })}
      </Row>
    </>
  )
}
