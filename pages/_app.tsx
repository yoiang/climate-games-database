import React from 'react'
import { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Hydrate } from 'react-query/hydration'
import { Provider, ErrorBoundary } from '@rollbar/react'

const rollbarConfig = {
  accessToken: process.env.FRONTEND_ROLLBAR_ACCESS_TOKEN,
  environment: process.env.NODE_ENV,
}

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const queryClient = new QueryClient()
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
            <style jsx global>
              {`
                html,
                body,
                #__next {
                  padding: 0;
                  margin: 0;

                  min-width: 100%;
                  min-height: 100%;
                  width: 100%;
                  height: 100%;

                  font-family: -apple-system, BlinkMacSystemFont, Segoe UI,
                    Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
                    Helvetica Neue, sans-serif;
                }
              `}
            </style>
          </Hydrate>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ErrorBoundary>
    </Provider>
  )
}

export default MyApp
