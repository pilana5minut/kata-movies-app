const BASE_URL = 'https://api.themoviedb.org/3/'
const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjQzZjExMzEzMmJmZGM1ZTEwNzhlNDBiMGM5YzcwYyIsIm5iZiI6MTc0NDY0MzUxOC42Miwic3ViIjoiNjdmZDI1YmU2MWIxYzRiYjMyOTkzNjE0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.20F_0vgAgC47pU_aFRXFtncwF5HGM84QIx7PoW4kGBU'

const myHeaders = new Headers()
myHeaders.append('accept', 'application/json')
myHeaders.append('Authorization', `Bearer ${API_KEY}`)

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
}

export const api = {
  async getFilms(queryValue, page = 1) {
    console.log('Выполняется запрос фильмов...')
    try {
      const response = await fetch(
        `${BASE_URL}search/movie?query=${queryValue}&page=${page}`,
        requestOptions
      )

      if (!response.ok) {
        throw new Error('Ошибка запроса данных о фильмах.')
      }

      console.log('Список фильмов получен.')
      return await response.json()
    } catch (error) {
      throw new Error(error.message)
    }
  },

  async getConfigApi() {
    console.log('Выполняется запрос конфигурации API...')
    try {
      const response = await fetch(`${BASE_URL}configuration`, requestOptions)

      if (!response.ok) {
        throw new Error('Ошибка запроса конфигурации API')
      }

      console.log('Конфигурации API получена.')
      return await response.json()
    } catch (error) {
      throw new Error(error.message)
    }
  },

  async getGenresList(lang) {
    console.log('Выполняется запрос списка жанров...')
    try {
      const response = await fetch(`${BASE_URL}genre/movie/list?language=${lang}`, requestOptions)

      if (!response.ok) {
        throw new Error('Ошибка запроса списка жанров')
      }

      console.log('Список жанров получен.')
      return await response.json()
    } catch (error) {
      throw new Error(error.message)
    }
  },

  async createGuestSession() {
    try {
      console.log('(GS) Выполняется запрос новой гостевой сессии...')
      const response = await fetch(`${BASE_URL}authentication/guest_session/new`, requestOptions)

      if (!response.ok) {
        throw new Error('Ошибка при создании гостевой сессии.')
      }

      console.log('(GS) Была создана новая гостевая сессия.')
      return await response.json()
    } catch (error) {
      throw new Error(error.message)
    }
  },

  async getListRatedMovies(guestSessionId) {
    console.log('Выполняется запрос фильмов имеющих оценку...')
    try {
      const response = await fetch(
        `${BASE_URL}guest_session/${guestSessionId}/rated/movies`,
        requestOptions
      )

      console.log('🚥 response.status 🚥', response.status)

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Запрошенная сессия не найдена.')
        }
        throw new Error('Ошибка запроса фильмов имеющих оценку.')
      }

      console.log('Список фильмов имеющих оценку получен.')
      const result = await response.json()
      console.log('🚥 List Rated Movies 🚥', result)
      // return await response.json()
    } catch (error) {
      throw new Error(error.message)
    }
  },

  async addRatingForMovie(movieId, ratingValue, guestSessionId) {
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ value: ratingValue }),
    }

    try {
      const response = await fetch(
        `${BASE_URL}movie/${movieId}/rating?guest_session_id=${guestSessionId}`,
        requestOptions
      )

      if (!response.ok) {
        throw new Error('Ошибка при добавлении рейтинга для фильма.')
      }

      const data = await response.json()
      console.log('Оценка фильму успешно добавлена.', data)
    } catch (error) {
      throw new Error(error.message)
    }
  },
}
