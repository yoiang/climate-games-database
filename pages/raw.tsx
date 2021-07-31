import Head from '../src/components/Head'
import Footer from '../src/components/Footer'

import useDatabase from '../src/data/useDatabase'
import { useEffect } from 'react'
import getRollbar from '../src/components/Rollbar'
import RawTable from '../src/components/data/RawTable'

const Home: React.FC = () => {
  const { isLoading, error, data } = useDatabase()
  useEffect(() => {
    if (error) {
      const rollbar = getRollbar()
      rollbar.error(error)
    }
  }, [error])

  return (
    <div className="container">
      <Head pageTitle="Raw Table" />

      {error ? 'Error: ' + JSON.stringify(error) : ''}

      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <RawTable data={data} />
      )}
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
      `}</style>
    </div>
  )
}

export default Home
