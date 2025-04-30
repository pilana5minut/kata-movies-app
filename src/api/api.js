const BASE_URL = 'https://api.themoviedb.org/3/'
const TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjQzZjExMzEzMmJmZGM1ZTEwNzhlNDBiMGM5YzcwYyIsIm5iZiI6MTc0NDY0MzUxOC42Miwic3ViIjoiNjdmZDI1YmU2MWIxYzRiYjMyOTkzNjE0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.20F_0vgAgC47pU_aFRXFtncwF5HGM84QIx7PoW4kGBU'

const myHeaders = new Headers()
myHeaders.append('accept', 'application/json')
myHeaders.append('Authorization', `Bearer ${TOKEN}`)

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

      console.log('Списка жанров получен.')
      return await response.json()
    } catch (error) {
      throw new Error(error.message)
    }
  },
}
