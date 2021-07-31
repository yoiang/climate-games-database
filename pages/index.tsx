import { Head } from '../src/components/Head'
import { Footer } from '../src/components/Footer'
import { useDatabase } from '../src/data/useDatabase'
import React, { useEffect } from 'react'
import { getRollbar } from '../src/components/Rollbar'
import { DispositionOverTime } from '../src/components/data/plots/DispositionOverTime'
import TotalsPerTopic from '../src/components/data/plots/TotalsPerTopic'

export const Index: React.FC = () => {
  const { isLoading, error, data } = useDatabase()
  useEffect(() => {
    if (error) {
      const rollbar = getRollbar()
      rollbar.error(error)
    }
  }, [error])

  return (
    <div className="container">
      <Head pageTitle="Climate Games Database" />
      {isLoading && !data ? (
        <div className="loading">Loading...</div>
      ) : data ? (
        <div className="plots">
          <TotalsPerTopic data={data} />
        </div>
      ) : undefined}

      <Footer />
      <style jsx>{`
        .container {
          min-width: 100%;
          min-height: 100%;

          padding: 0 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .loading {
          flex-grow: 1;

          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .plots {
          flex-grow: 1;

          width: 100%;
          min-height: 100%;

          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
        }
      `}</style>
    </div>
  )
}

export default Index
