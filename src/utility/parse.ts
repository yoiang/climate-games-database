import {
  parseStringList as eunomiaParseStringList,
  parseNumberList as eunomiaParseNumberList,
  parseNumberWithLetterScale as eunomiaParseNumberWithLetterScale,
} from '@adorkable/eunomia-typescript'

export const parseStringList = (stringList: string | null): string[] | null => {
  if (!stringList) {
    return null
  }
  return eunomiaParseStringList(stringList, /,[ ]*/)
}

export const parseNumberList = (numberList: string | null): number[] | null => {
  if (!numberList) {
    return null
  }
  return eunomiaParseNumberList(numberList, /,[ ]*/)
}

export const parseNumberWithLetterScale = (
  numberString: string | null
): number | null => {
  if (!numberString) {
    return null
  }

  const matches = numberString.match(/([0-9.]+)([a-zA-Z]?)/)
  if (!matches || matches.length < 1) {
    return null
  }

  try {
    return eunomiaParseNumberWithLetterScale(numberString)
  } catch {
    return null
  }
}
