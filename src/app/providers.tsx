import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { store } from './store'
import React from 'react'

const queryClient = new QueryClient()

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  )
}