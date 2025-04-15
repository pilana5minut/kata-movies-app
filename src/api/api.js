const BASE_URL = 'https://api.themoviedb.org/3'
const TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjQzZjExMzEzMmJmZGM1ZTEwNzhlNDBiMGM5YzcwYyIsIm5iZiI6MTc0NDY0MzUxOC42Miwic3ViIjoiNjdmZDI1YmU2MWIxYzRiYjMyOTkzNjE0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.20F_0vgAgC47pU_aFRXFtncwF5HGM84QIx7PoW4kGBU'

export const api = {
  async getFilms() {
    const response = await fetch(
      'https://api.themoviedb.org/3/search/movie?query=return&include_adult=false&language=en-US&page=1',
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    )

    if (!response.ok) {
      throw new Error('Fetching error.')
    }

    return await response.json()
  },
}
