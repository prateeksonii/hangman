import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { movieAtom } from '../atoms'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default () => {
  const [refetch, setRefetch] = useState(true)
  const [error, setError] = useState<Error>()
  const [movie, setMovie] = useAtom(movieAtom)

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await fetcher('/api/movies/random')
        setMovie(data.movie)
      } catch (err: any) {
        setError(err)
      }
    }

    console.log('here')

    if (refetch) {
      fetchMovie()
      setRefetch(false)
    }
  }, [refetch])

  const refetchMovie = () => {
    setRefetch(true)
  }

  return { movie, error, refetchMovie }
}
