import { Card, Tag, Rate } from 'antd'
import { trimText } from '../../utils/utils'

import styles from './FilmCard.module.css'

export default function FilmCard({
  filmId,
  guestSessionId,
  title,
  overview,
  releaseDate,
  imageURL,
  genreList,
  addRating,
  voteAverage,
  rating,
}) {
  const getRatingColor = (rating) => {
    if (rating <= 3) return '#e90000'
    if (rating <= 5) return '#e97e00'
    if (rating <= 7) return '#e9d100'
    return '#66e900'
  }

  const rateTooltips = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <Card
      className={styles.filmCard}
      variant="borderless"
    >
      <div className={styles.cardInner}>
        <div className={styles.cardPosterWrapper}>
          <img
            className={styles.cardPoster}
            src={imageURL}
            alt="Film cover"
            loading="lazy"
          />
        </div>
        <div className={styles.cardHeaderWrapper}>
          <div className={styles.cardHeaderLeft}>
            <h3
              className={styles.cardTitle}
              title={title}
            >
              {trimText(title, 18)}
            </h3>
            <div className={styles.cardReleaseDate}>{releaseDate}</div>
            <div className={styles.tagsGroup}>
              {genreList.map((genre) => {
                return <Tag key={genre.id}>{genre.name}</Tag>
              })}
            </div>
          </div>
          <div className={styles.cardHeaderRight}>
            <div
              className={styles.voteAverage}
              style={{ borderColor: getRatingColor(voteAverage) }}
            >
              {voteAverage}
            </div>
          </div>
        </div>
        <div className={styles.cardDescriptionWrapper}>
          <p className={styles.filmOverview}>{trimText(overview, 220)}</p>
          <Rate
            className={styles.filmRating}
            onChange={(value) => {
              addRating(filmId, value, guestSessionId)
            }}
            value={rating}
            tooltips={rateTooltips}
            count={10}
            allowHalf
          ></Rate>
        </div>
      </div>
    </Card>
  )
}
