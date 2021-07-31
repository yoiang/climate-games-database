import type { NextApiRequest, NextApiResponse } from 'next'
import { google, Auth } from 'googleapis'
import { getJWTClient } from './google-cloud'
import { middlewareWrapper } from './rollbar'

const getDatabase = (
  auth:
    | Auth.GoogleAuth
    | Auth.OAuth2Client
    | Auth.BaseExternalAccountClient
    | string
): Promise<any[][]> => {
  const sheets = google.sheets({ version: 'v4', auth })

  return sheets.spreadsheets.values
    .get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'Games',
    })
    .then((response) => {
      const rows = response.data.values
      if (typeof rows === 'undefined') {
        throw new Error('value.get response is undefined')
      }
      return rows
    })
}

export default middlewareWrapper(
  async (
    req: NextApiRequest,
    res: NextApiResponse<any[][] | string>
  ): Promise<void> => {
    return getDatabase(getJWTClient()).then((result) => {
      return res.status(200).json(result)
    })
  }
)

// When using OAuth2
// export default async (
//   req: NextApiRequest,
//   res: NextApiResponse<any[][] | string>
// ): Promise<void> => {
//   return getDatabase()
//     .then((result) => {
//       if (result.length > 0) {
//         return res.status(200).json(result)
//       } else {
//         return res.status(401).json('')
//       }
//     })
//     .catch((error) => {
//       if (error.message === 'Invalid Credentials') {
//         return revokeOAuthToken().then(() => {
//           return getDatabase().then((result) => {
//             if (result.length > 0) {
//               return res.status(200).json(result)
//             } else {
//               return res.status(401).json('')
//             }
//           })
//         })
//       } else {
//         throw error
//       }
//     })
// }
