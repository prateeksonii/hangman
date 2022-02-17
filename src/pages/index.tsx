import { useAtom } from 'jotai'
import Link from 'next/link'
import React, { useEffect } from 'react'
import useSWR from 'swr'
import { movieAtom } from '../atoms'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const IndexPage = () => {
  const { data, error } = useSWR('/api/movies/random', fetcher)
  const [movie, setMovie] = useAtom(movieAtom)

  if (error) {
    return <div>Error loading data...</div>
  }

  useEffect(() => {
    if (data) setMovie(data.movie)
  }, [data])

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <h1 className="text-7xl uppercase">
        Hang<span className="text-red-700">man</span>
      </h1>
      <Link href="/game" passHref>
        <a className="mt-8 rounded bg-red-700 py-4 px-6 text-2xl text-white">
          Start game
        </a>
      </Link>
    </div>
  )
}

export default IndexPage
