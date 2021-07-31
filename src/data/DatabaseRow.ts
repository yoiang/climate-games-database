import { getRollbar } from '../components/Rollbar'
import {
  DatabaseRow,
  parseDispositionOrNull,
  parseMessagingOrNull,
  parseMotivationOrNull,
  parseScopeOrNull,
  parseTechnologyOrNull,
  parseTimelineOrNull,
} from '../models/DatabaseRow'
import {
  parseNumberList,
  parseNumberWithLetterScale,
  parseStringList,
} from '../utility/parse'

export const googleSheetsRawAdapter = (sheetsData: any[][]): DatabaseRow[] => {
  // TODO: programatically get Sheet Header information
  const sheetsDataMinusHeader = [...sheetsData]
  // TODO: connect header name with field below rather than hardcode order?
  const headers = sheetsDataMinusHeader
    .splice(0, 2)
    .filter((row) => row.length > 0)
    .flatMap((value) => value)
  if (headers.length === 0) {
    throw new Error('No headers found, unable to process data')
  }

  const rollbar = getRollbar()

  const getHeaderIndex = (headerValue: string): number => {
    const result = headers.indexOf(headerValue)
    if (result === -1) {
      rollbar.warn(
        "Unable to find Database Header with the name '" + headerValue + "'"
      )
    }
    return result
  }

  const idIndex = getHeaderIndex('ID')
  // TODO: Status, Updated
  const titleIndex = getHeaderIndex('Game Title (w/ Link!)')
  const developerIndex = getHeaderIndex('Developer')
  const yearIndex = getHeaderIndex('Year')
  const metascoreIndex = getHeaderIndex('Metacritic Expert Score')
  // TODO: Community Score
  const scopeIndex = getHeaderIndex('Scope')
  const estimatedPlayerCountIndex = getHeaderIndex('Est. Total Player Count')
  // TODO: const genreIndex =
  const descriptionIndex = getHeaderIndex(
    '1-2 Sentence Description (What is the game? Why does it matter to us?)'
  )
  const environmentalThemeIndex = getHeaderIndex('Environmental Theme, if any')
  const unSDGAlignmentIndex = getHeaderIndex('UN SDG Alignment, if any')
  const salienceIndex = getHeaderIndex('Salience')
  const timelineIndex = getHeaderIndex('Timeline')
  const dispositionIndex = getHeaderIndex('Disposition')
  const technologyIndex = getHeaderIndex('Technology')
  const messagingIndex = getHeaderIndex('Messaging')
  const motivationIndex = getHeaderIndex('Motivation')
  const notableAchievementsIndex = getHeaderIndex('Notable Achievements')

  const cellValue = (
    row: any[],
    index: number,
    processor = undefined
  ): any | null => {
    if (index < 0 || index >= row.length) {
      return null
    }
    if (typeof processor === 'function') {
      return processor(row[index])
    } else {
      return row[index]
    }
  }

  return (
    sheetsDataMinusHeader
      // TODO: is there a Typescript way to annotate the field order in a list and use it to assign below?
      .map((row) => ({
        id: cellValue(row, idIndex, parseInt),
        title: cellValue(row, titleIndex),
        developer: cellValue(row, developerIndex),
        year: cellValue(row, yearIndex, parseInt) || null,
        metascore: cellValue(row, metascoreIndex, parseInt) || null,
        scope: cellValue(row, scopeIndex, parseScopeOrNull),
        estimatedPlayerCount:
          cellValue(
            row,
            estimatedPlayerCountIndex,
            parseNumberWithLetterScale
          ) || null,
        description: cellValue(row, descriptionIndex),
        environmentalTheme: cellValue(
          row,
          environmentalThemeIndex,
          parseStringList
        ),
        unSDGAlignment: cellValue(row, unSDGAlignmentIndex, parseStringList),
        salience: cellValue(row, salienceIndex),
        timeline: cellValue(row, timelineIndex, parseTimelineOrNull),
        disposition: cellValue(row, dispositionIndex, parseDispositionOrNull),
        technology: cellValue(row, technologyIndex, parseTechnologyOrNull),
        messaging: cellValue(row, messagingIndex, parseMessagingOrNull),
        motivation: cellValue(row, motivationIndex, parseMotivationOrNull),
        notableAchievements: cellValue(row, notableAchievementsIndex),
      }))
      .filter((row) => {
        return row.id !== null && row.title !== null
      })
  )
}
