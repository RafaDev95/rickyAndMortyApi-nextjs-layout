import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import {
  QueryClientProvider,
  QueryClient,
  Hydrate
} from '@tanstack/react-query'
import NextNProgress from 'nextjs-progressbar'

import theme from '../styles/theme'
import createEmotionCache from '../utils/createEmotionCache'
import { store } from 'reduxState/store'
import { Provider } from 'react-redux'
import '../styles/globals.css'

import Layout from 'layout'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24
    }
  }
})

export default function MyApp(props: MyAppProps): JSX.Element {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Layout>
                <NextNProgress color="#d1d0da" startPosition={0.3} height={3} />
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
          </Hydrate>
        </QueryClientProvider>
      </Provider>
    </CacheProvider>
  )
}
