import { Flex, Card, Tag, Rate } from 'antd'
import { trimText } from '../../utils/utils'
import styles from './FilmCard.module.css'

export default function FilmCard({ title, overview, releaseDate, popularity, imageURL }) {
  const getRatingColor = (rating) => {
    if (rating <= 3) return '#e90000'
    if (rating <= 5) return '#e97e00'
    if (rating <= 7) return '#e9d100'
    return '#66e900'
  }

  return (
    <Card
      className={styles.filmCard}
      variant="borderless"
    >
      <Flex className={styles.cardInner}>
        <div className={styles.cardImageWrapper}>
          <img
            className={styles.cardCoverImage}
            src={imageURL}
            alt="Film cover"
            loading="lazy"
          />
        </div>
        <div className={styles.cardContent}>
          <div className={styles.cardContentTop}>
            <div className={styles.cardContentTopLeft}>
              <h3 title={title}>{trimText(title, 22)}</h3>
              <div className={styles.cardReleaseDate}>{releaseDate}</div>
              <div className={styles.tagsWrapper}>
                <Tag>Action</Tag>
                <Tag>Drama</Tag>
                <Tag>Comedy</Tag>
                <Tag>Horror</Tag>
                <Tag>Thriller</Tag>
              </div>
            </div>
            <div className={styles.cardContentTopRight}>
              <div
                className={styles.voteAverage}
                style={{ borderColor: getRatingColor(popularity) }}
              >
                {popularity}
              </div>
            </div>
          </div>
          <div className={styles.cardContentBottom}>
            <p className={styles.cardOverview}>{trimText(overview, 230)}</p>
            <Rate
              className={styles.filmRating}
              count={10}
              allowHalf
            ></Rate>
          </div>
        </div>
      </Flex>
    </Card>
  )
}
