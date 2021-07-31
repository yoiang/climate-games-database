import { DatabaseRow } from '../../../../models/DatabaseRow'
import { PlotData } from 'plotly.js'
import { addCountForProperty } from '../../utility'
import { randomColor } from '@adorkable/eunomia-typescript'

export const createBarData = (name: string): Partial<PlotData> => {
  return {
    type: 'bar',
    name,
    x: [],
    y: [],
    text: [],
  }
}

export const countData = (data: DatabaseRow[], property: string) => {
  const processedData = createBarData(property)

  data
    .filter((value) => {
      return value[property] !== null
    })
    .forEach((value) => {
      addCountForProperty(processedData, value, property)
    })

  return processedData
}

export const countDataSeperately = (
  data: DatabaseRow[],
  property: string,
  propertyValues: string[] | readonly string[]
) => {
  const processedData = propertyValues.map((typeValue) => {
    return createBarData(typeValue)
  })

  data
    .filter((value) => {
      return value[property] !== null
    })
    .forEach((value) => {
      const index = propertyValues.indexOf(value[property])
      addCountForProperty(processedData[index], value, property)
    })

  return processedData
}

export const spreadData = (
  data: DatabaseRow[],
  spreadProperty: string,
  spreadPropertyValues: string[] | readonly string[],
  againstProperty: string
) => {
  const processedData = spreadPropertyValues.map((typeValue) => {
    return createBarData(typeValue)
  })

  data
    .filter((value) => {
      return value[spreadProperty] !== null && value[againstProperty] !== null
    })
    .forEach((value) => {
      const index = spreadPropertyValues.indexOf(value[spreadProperty])
      addCountForProperty(processedData[index], value, againstProperty)
    })

  return processedData
}
