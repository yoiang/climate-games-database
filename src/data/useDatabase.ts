import { useQuery, UseQueryResult } from 'react-query'
import { DatabaseRow } from '../models/DatabaseRow'
import { googleSheetsRawAdapter } from './DatabaseRow'

export const useDatabase = (): UseQueryResult<DatabaseRow[], Error> => {
  return useQuery<DatabaseRow[], Error>(
    'database',
    () =>
      fetch('api/database')
        .then((res) => {
          if (res.status !== 200) {
            return res.json().then((error) => {
              throw error
            })
          }
          if (!res.ok) {
            throw new Error('Response was not ok')
          }
          return res.json()
        })
        .then((json) => {
          return googleSheetsRawAdapter(json)
        }),
    { refetchOnWindowFocus: false }
  )
}

export default useDatabase
