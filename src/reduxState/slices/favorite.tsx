import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Character } from 'types'

let list: Character[] = []

if (typeof window !== 'undefined') {
  const getStorageFavorites = localStorage.getItem('favorites')
  if (getStorageFavorites) {
    list = JSON.parse(getStorageFavorites)
  }
}

const initialState = {
  list
}

export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorite: (state, { payload }: PayloadAction<Character>) => {
      const isAlreadySaved = state.list.find(
        (character) => character.id === payload.id
      )

      if (isAlreadySaved) {
        state.list = state.list.filter((char) => char.id !== payload.id)
      } else {
        state.list.push(payload)
      }
      localStorage.setItem('favorites', JSON.stringify(state.list))
    }
  }
})

export const { setFavorite } = favoriteSlice.actions

export default favoriteSlice.reducer
