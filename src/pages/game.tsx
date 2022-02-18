import { useAtom } from 'jotai'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { movieAtom } from '../atoms'
import useGameState from '../hooks/useGameState'

const GamePage: NextPage = () => {
  const router = useRouter()

  const {
    distortedName,
    gameState,
    keys,
    onClickKey,
    tries,
    error,
    handleReset,
    movie,
  } = useGameState()

  if (error) {
    return <div>Error fetching data</div>
  }

  useEffect(() => {
    if (!movie || movie.length === 0) {
      router.replace('/')
    }
  }, [movie])

  const setBackground = (): string => {
    switch (tries) {
      case 0:
        return 'bg-white'
      case 1:
        return 'bg-red-100'
      case 2:
        return 'bg-red-200'
      case 3:
        return 'bg-red-300'
      default:
        return 'bg-red-400'
    }
  }

  return (
    <>
      <Head>
        <title>Hangman</title>
      </Head>
      <main
        className={`mx-auto flex h-screen w-screen flex-col items-center justify-center p-4 text-center ${setBackground()}`}
      >
        <h1 className="text-4xl">HANGMAN</h1>
        <p className="font-head text-xl">Let's check your knowledge!</p>

        <section
          className="mt-8 p-4 text-4xl uppercase leading-relaxed md:text-7xl"
          style={{ color: gameState === 'win' ? 'green' : 'inherit' }}
        >
          {distortedName}
        </section>

        {/* Keyboard  */}
        <section className="container mx-auto flex flex-wrap items-center justify-evenly gap-4 p-4 text-xl md:justify-center md:text-2xl">
          {keys.map((key) => (
            <button
              key={key.key}
              className="rounded-lg p-4 shadow-md shadow-slate-400"
              style={{
                backgroundColor: key.pressed
                  ? key.correct
                    ? 'rgb(74 222 128)'
                    : 'rgb(248 113 113)'
                  : 'inherit',
                color: key.pressed ? 'white' : 'inherit',
              }}
              onClick={() => onClickKey(key)}
              disabled={
                keys.find((keyState) => keyState.key === key.key)?.pressed
              }
            >
              {key.key.toUpperCase()}
            </button>
          ))}
        </section>

        {gameState === 'win' ? (
          <div className="space-y-4">
            <h2 className="mt-8 text-xl text-green-400">You won!</h2>
          </div>
        ) : gameState === 'lose' ? (
          <div className="space-y-4">
            <h2 className="mt-8 text-xl text-white">You lose!</h2>
          </div>
        ) : null}
        <button
          className="my-12 rounded bg-red-500 p-2 text-white"
          onClick={handleReset}
        >
          Restart
        </button>
      </main>
    </>
  )
}

export default GamePage
