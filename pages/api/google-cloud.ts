import fs from 'fs/promises'
import readline from 'readline'
import { Auth, google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library'

const CREDENTIALS_PATH = './google-cloud_oauth-credentials.json'

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.

const OAUTH_TOKEN_LOCATION = './private'
const OAUTH_TOKEN_PATH = `${OAUTH_TOKEN_LOCATION}/google-cloud_oauth-token.json`

const getCredentials = async (): Promise<any> => {
  return fs.readFile(CREDENTIALS_PATH).then((content) => {
    return JSON.parse(content.toString())
  })
}

export const revokeOAuthToken = async (): Promise<void> => {
  await fs.unlink(OAUTH_TOKEN_PATH)
}

const getPreviousOAuthToken = async (): Promise<any> => {
  let content = await fs.readFile(OAUTH_TOKEN_PATH)
  let token /*: Credentials */ = JSON.parse(content.toString())

  if (token.expiry_date <= Date.now()) {
    await revokeOAuthToken()
    throw new Error('Token has expired')
  }

  return token
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
const getNewOAuthToken = async (oAuth2Client: OAuth2Client): Promise<any> => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  })

  console.log('Authorize this app by visiting this url:', authUrl)

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  const code = await new Promise<string>((resolve) => {
    // TODO: can we send a response to set up while keeping the console captive?
    rl.question('Enter the code from that page here: ', (answer) => {
      resolve(answer)
    })
  })
  rl.close()

  const tokenResponse = await oAuth2Client.getToken(code)
  const token = tokenResponse.tokens

  try {
    await fs.access(OAUTH_TOKEN_LOCATION)
  } catch (_error) {
    // TODO: only specific error
    await fs.mkdir(OAUTH_TOKEN_LOCATION)
  }

  return fs.writeFile(OAUTH_TOKEN_PATH, JSON.stringify(token)).then(() => {
    console.log('Token stored to', OAUTH_TOKEN_PATH)
    return token
  })
}

export const getOAuth2Client = async (): Promise<OAuth2Client> => {
  return getCredentials().then((credentials) => {
    const { client_secret, client_id, redirect_uris } = credentials
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    )
    return getPreviousOAuthToken()
      .then((previousToken) => {
        oAuth2Client.setCredentials(previousToken)
        return oAuth2Client
      })
      .catch((_error) => {
        // TODO: handle specifically token missing
        return getNewOAuthToken(oAuth2Client).then((newToken) => {
          oAuth2Client.setCredentials(newToken)
          return oAuth2Client
        })
      })
  })
}

export const getJWTClient = (): Auth.JWT => {
  return new google.auth.JWT(
    process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    null,
    // we need to replace the escaped newline characters
    // https://stackoverflow.com/questions/50299329/node-js-firebase-service-account-private-key-wont-parse
    process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/ \\n /g, '\n'),
    SCOPES
  )
}
