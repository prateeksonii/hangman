import keycode from 'keycode'
import { useEffect, useState } from 'react'
import { GameState, Key } from '../types'

export default (movie: string) => {
  const [distortedName, setDistortedName] = useState('')
  const [keys, setKeys] = useState<Key[]>([])
  const [tries, setTries] = useState(0)

  const [gameState, setGameState] = useState<GameState>('new')

  const updateKeys = (key: string) => {
    if (!/^[\w]{1}$/.test(key)) {
      return console.error('invalid key')
    }

    if (!movie.includes(key)) {
      console.log('here', key)
      setTries((tries) => tries + 1)
    }

    setKeys((keys) => {
      const newKeys = [...keys]
      const updatedKeyIndex = newKeys.findIndex(
        (keyState) => keyState.key === key
      )
      if (updatedKeyIndex === -1) return keys

      newKeys[updatedKeyIndex].pressed = true
      newKeys[updatedKeyIndex].correct = movie.includes(key)

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
    console.log(tries, gameState)
    if (tries > 3) {
      setGameState('lose')
    }
  }, [tries])

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

  return { gameState, distortedName, keys, onClickKey, handleReset, tries }
}
