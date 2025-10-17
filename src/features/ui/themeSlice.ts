import { createSlice } from '@reduxjs/toolkit'

const themeSlice = createSlice({
  name: 'theme',
  initialState: { mode: 'dark' as 'light' | 'dark' },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark'
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', state.mode === 'dark')
      }
    },
  },
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer