import Rollbar from 'rollbar'

export const getRollbar = () => {
  return new Rollbar({
    accessToken: process.env.FRONTEND_ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: process.env.NODE_ENV,
  })
}

export default getRollbar
