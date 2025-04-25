import { getImageURL } from '../../utils/utils'
import { useFilmDataContext } from '../../contexts/FilmDataContext'
import { format } from 'date-fns'
import { Row, Col } from 'antd'

import FilmCard from '../FilmCard/FilmCard'

export default function FilmsList() {
  const { configApi, errors, filmsData, isLoading } = useFilmDataContext()

  if (isLoading) return <div>Loading...</div>
  if (errors.length > 0) return <div>Errors: {errors.join(', ')}</div>
  if (!filmsData) return <div>Not data!</div>

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
