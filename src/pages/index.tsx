import Head from 'next/head'
import { useEffect, useState } from 'react'
import keycode from 'keycode'

const movie = 'mission impossible'

type GameState = 'new' | 'win' | 'lose'

type Key = { key: string; correct: boolean; pressed: boolean }

export default function Home() {
  const [distortedName, setDistortedName] = useState('')
  const [keys, setKeys] = useState<Key[]>([])

  const [gameState, setGameState] = useState<GameState>('new')

  const updateKeys = (key: string) => {
    if (!/^[\w]{1}$/.test(key)) {
      return console.error('invalid key')
    }

    setKeys((keys) => {
      const newKeys = [...keys]
      const updatedKeyIndex = newKeys.findIndex(
        (keyState) => keyState.key === key
      )
      if (updatedKeyIndex === -1) return keys

      newKeys[updatedKeyIndex].pressed = true
      return newKeys
    })
    setDistortedName((name) => {
      let newName = name.split('')
      for (let index = 0; index < movie.length; index++) {
        if (movie[index] === key) {
          newName[index] = key
        }
      }

      return newName.join('')
    })
  }

  useEffect(() => {
    const eventHandler = (event: Event) => {
      const key = keycode(event)
      updateKeys(key)
    }

    document.addEventListener('keydown', eventHandler, false)

    return () => {
      document.removeEventListener('keydown', eventHandler, false)
    }
  }, [])

  // Set win state
  useEffect(() => {
    if (movie === distortedName) {
      setGameState('win')
    }
  }, [distortedName])

  useEffect(() => {
    if (gameState === 'new') {
      setDistortedName(
        movie
          .split(' ')
          .map((char) => char.replaceAll(/[^aeiou]/gi, '_'))
          .join(' ')
      )

      setKeys([
        ...Array.from(Array(10))
          .map((_, i) => i + 48)
          .map((key) => ({
            key: String.fromCharCode(key),
            correct: false,
            pressed: false,
          })),
        ...Array.from(Array(26))
          .map((_, i) => i + 97)
          .map((key) => ({
            key: String.fromCharCode(key),
            correct: false,
            pressed: false,
          })),
      ])
    }
  }, [gameState])

  const handleReset = () => {
    setGameState('new')
  }

  const onClickKey = (key: Key) => {
    updateKeys(key.key)
  }

  return (
    <>
      <Head>
        <title>Hangman</title>
      </Head>
      <main className="p-4 text-center">
        <h1 className="text-4xl">HANGMAN</h1>
        <p className="font-head text-xl">Let's check your knowledge!</p>

        <section
          className="mt-8 text-7xl leading-relaxed"
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
                backgroundColor: key.pressed ? 'rgb(74 222 128)' : 'inherit',
                color: key.pressed ? 'white' : 'inherit',
              }}
              onClick={() => onClickKey(key)}
            >
              {key.key.toUpperCase()}
            </button>
          ))}
        </section>

        {gameState === 'win' && (
          <div className="space-y-4">
            <h2 className="mt-8 text-xl text-green-400">You won!</h2>
            <button
              className="rounded bg-red-500 p-2 text-white"
              onClick={handleReset}
            >
              Restart
            </button>
          </div>
        )}
      </main>
    </>
  )
}
