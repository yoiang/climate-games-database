import dynamic from 'next/dynamic'
import { PlotParams } from 'react-plotly.js'

// TODO: loading
export const PlotlySSR = dynamic<PlotParams>(
  () => import('./Plotly').then((module) => module.default),
  {
    ssr: false,
    loading: ({ isLoading, error }) => {
      if (isLoading)
        return (
          <div className="loading">
            Loading...
            <style jsx>{`
              .loading {
                flex-grow: 1;

                display: flex;
                flex-direction: column;
                justify-content: center;
              }
            `}</style>
          </div>
        )
      if (error)
        return (
          <div className="error">
            Error: {error}
            <style jsx>{`
              .error {
                flex-grow: 1;

                display: flex;
                flex-direction: column;
                justify-content: center;
              }
            `}</style>
          </div>
        )
    },
  }
)
export default PlotlySSR
