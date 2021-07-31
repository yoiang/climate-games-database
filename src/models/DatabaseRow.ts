import { parseUnionOrNullFactory } from '../utility/Union'

export const ScopeValues = ['Jam/Prototype', 'Indie', 'AA', 'AAA'] as const
export type Scope = typeof ScopeValues[number]
export const parseScopeOrNull = parseUnionOrNullFactory(ScopeValues)

export const TimelineValues = [
  'N/A',
  'Past',
  'Present',
  'Future',
  'Multiple eras',
] as const
export type Timeline = typeof TimelineValues[number]
export const parseTimelineOrNull = parseUnionOrNullFactory(TimelineValues)

export const DispositionValues = [
  'Optimistic',
  'Objective',
  'Pessimistic',
] as const
export type Disposition = typeof DispositionValues[number]
export const parseDispositionOrNull = parseUnionOrNullFactory(DispositionValues)

export const TechnologyValues = ['High Tech', 'Low Tech', 'N/A'] as const
export type Technology = typeof TechnologyValues[number]
export const parseTechnologyOrNull = parseUnionOrNullFactory(TechnologyValues)

export const MessagingValues = ['Implicit', 'Explicit'] as const
export type Messaging = typeof MessagingValues[number]
export const parseMessagingOrNull = parseUnionOrNullFactory(MessagingValues)

export const MotivationValues = ['Intrinsic', 'Extrinsic'] as const
export type Motivation = typeof MotivationValues[number]
export const parseMotivationOrNull = parseUnionOrNullFactory(MotivationValues)

export const ColorForMetascore = (metascore: number): string => {
  if (metascore >= 90) {
    return '#65DF5A'
  }
  if (metascore >= 75) {
    return '#A6E249'
  }
  return '#F2BD42'
}

export interface DatabaseRow {
  id: number | null
  title: string | null
  developer: string | null
  year: number | null
  metascore: number | string | null
  scope: Scope | null
  estimatedPlayerCount: number | null
  description: string | null
  environmentalTheme: string[] | null
  unSDGAlignment: number[] | null
  salience: string | null
  timeline: Timeline | null
  disposition: Disposition | null
  technology: Technology | null
  messaging: Messaging | null
  motivation: Motivation | null
  notableAchievements: string | null
}
