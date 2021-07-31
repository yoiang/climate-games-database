import React from 'react'
import { useRouter } from 'next/router'
import { Head, Footer } from '../../src/components/'

const Code: React.FC = () => {
  const router = useRouter()
  const code = router.query['code']

  let contents = () => {
    if (code) {
      return <div className="oauth-code">OAuth code: {code}</div>
    } else {
      return <div className="error">No code found</div>
    }
  }

  return (
    <div className="code">
      {contents()}
      <style jsx>{`
        .code {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          align-content: center;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  )
}

const Home: React.FC = () => {
  return (
    <>
      <Head />
      <div className="mainContent">
        <Code />
        <Footer />
      </div>
      <style jsx>{`
        .mainContent {
          height: 100%;

          display: flex;
          flex-direction: column;
        }
      `}</style>
    </>
  )
}

export default Home
