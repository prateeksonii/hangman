import Link from 'next/link'
import React, { useEffect } from 'react'
import useMovie from '../hooks/useMovie'

const IndexPage = () => {
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
