import { AllCharactersResponse, Character } from 'types'
import { QueryFunction } from '@tanstack/react-query'

export const getCharactersForSSR: QueryFunction<
  AllCharactersResponse,
  [number | string]
> = async (context, page = 1): Promise<AllCharactersResponse> => {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}`
  )

  return res.json()
}

export const getCharactersForClient = async (
  page = 1
): Promise<AllCharactersResponse> => {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}`
  )

  return res.json()
}

export const getSingleCharacter = async (
  id: number | string
): Promise<Character> => {
  console.log('api', id)
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`)

  return res.json()
}

export const getFilteredCharacters = async (
  key?: string,
  value?: string,
  page = 1
): Promise<AllCharactersResponse> => {
  console.log(key, value)
  try {
    const res = await fetch(
      `https://rickandmortyapi.com/api/character/?${key}=${value}&page=${page}`
    )
    return res.json()
  } catch (error: any) {
    return error
  }
}
