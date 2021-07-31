import { NextApiRequest, NextApiResponse } from 'next'
import Rollbar from 'rollbar'

export const getRollbar = () => {
  return new Rollbar({
    accessToken: process.env.API_ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: process.env.NODE_ENV,
  })
}

export function middlewareWrapper<TData>(
  endpoint: (
    req: NextApiRequest,
    res: NextApiResponse<TData | Error>
  ) => Promise<void>
): (req: NextApiRequest, res: NextApiResponse<TData | Error>) => Promise<void> {
  return (
    req: NextApiRequest,
    res: NextApiResponse<TData | Error>
  ): Promise<void> => {
    return endpoint(req, res).catch((error) => {
      const rollbar = getRollbar()
      rollbar.error(error)
      return res.status(401).json(error)
    })
  }
}
