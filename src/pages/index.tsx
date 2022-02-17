import Head from 'next/head'
import useGameState from '../hooks/useGameState'

const movie = 'mission impossible'

export default function Home() {
  const { distortedName, gameState, handleReset, keys, onClickKey, tries } =
    useGameState(movie)

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
      <main className={`h-screen w-screen p-4 text-center ${setBackground()}`}>
        <h1 className="text-4xl">HANGMAN</h1>
        <p className="font-head text-xl">Let's check your knowledge!</p>

        <section
          className="mt-8 text-7xl uppercase leading-relaxed"
          style={{ color: gameState === 'win' ? 'green' : 'inherit' }}
        >
          {distortedName}
        </section>

        {/* Keyboard  */}
        <section className="container mx-auto flex flex-wrap gap-4 text-2xl">
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
          className="mt-12 rounded bg-red-500 p-2 text-white"
          onClick={handleReset}
        >
          Restart
        </button>
      </main>
    </>
  )
}
