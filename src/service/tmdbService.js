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

export const tmdbService = {
  async getFilms(queryValue, page = 1) {
    console.log(`(gF) Выполняется поиск по запросу "${queryValue}" ...`)
    try {
      const response = await fetch(
        `${BASE_URL}search/movie?query=${queryValue}&page=${page}`,
        requestOptions
      )

      if (!response.ok) {
        throw new Error('(gF) Ошибка запроса данных о фильмах')
      }

      console.log(`(gF) Список фильмов по запросу "${queryValue}" получен.`)
      return await response.json()
    } catch (error) {
      throw new Error(error.message)
    }
  },

  async getConfigApi() {
    console.log('(cF) Выполняется запрос конфигурации API...')
    try {
      const response = await fetch(`${BASE_URL}configuration`, requestOptions)

      if (!response.ok) {
        throw new Error('(cF) Ошибка запроса конфигурации API')
      }

      console.log('(cF) Конфигурации API получена.')
      return await response.json()
    } catch (error) {
      throw new Error(error.message)
    }
  },

  async getGenresList(lang = 'en') {
    console.log('(gL) Выполняется запрос списка жанров...')
    try {
      const response = await fetch(`${BASE_URL}genre/movie/list?language=${lang}`, requestOptions)

      if (!response.ok) {
        throw new Error('(gL) Ошибка запроса списка жанров')
      }

      console.log('(gL) Список жанров получен.')
      return await response.json()
    } catch (error) {
      throw new Error(error.message)
    }
  },

  async createGuestSession() {
    try {
      console.log('(gS) Выполняется запрос новой гостевой сессии...')
      const response = await fetch(`${BASE_URL}authentication/guest_session/new`, requestOptions)

      if (!response.ok) {
        throw new Error('(gS) Ошибка при создании гостевой сессии')
      }

      console.log('(gS) Была создана новая гостевая сессия.')
      return await response.json()
    } catch (error) {
      throw new Error(error.message)
    }
  },

  async getListRatedMovies(guestSessionId) {
    console.log('(rL) Выполняется запрос фильмов имеющих оценку...')
    try {
      const response = await fetch(
        `${BASE_URL}guest_session/${guestSessionId}/rated/movies`,
        requestOptions
      )

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('(rL) Недействительный ключ API: код 401')
        }

        if (response.status === 404) {
          console.warn(
            '(rL) Список фильмов имеющих оценку не найден, так как в рамках текущей гостевой сессии не одному из фильмов еще не была присвоена оценка. Сервер ответил с кодом: 404.'
          )
          return null
        }

        throw new Error('(rL) Ошибка запроса фильмов имеющих оценку')
      }

      console.log('(rL) Список фильмов имеющих оценку получен.')
      return await response.json()
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

    console.log('(aR) Добавляем оценку фильму...')
    try {
      const response = await fetch(
        `${BASE_URL}movie/${movieId}/rating?guest_session_id=${guestSessionId}`,
        requestOptions
      )

      if (!response.ok) {
        throw new Error('(aR) Ошибка при добавлении оценки фильму')
      }

      console.log('(aR) Оценка фильму успешно добавлена.')
    } catch (error) {
      throw new Error(error.message)
    }
  },
}
