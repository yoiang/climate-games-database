import { PlotData } from 'plotly.js'
import { DatabaseRow } from '../../models/DatabaseRow'

export const InvalidIndex = -1

export const addCountForProperty = (
  data: Partial<PlotData>,
  item: DatabaseRow,
  itemProperty: string
) => {
  const x = data.x as number[]
  const y = data.y as number[]
  const text = data.text as string[]
  const index = x.indexOf(item[itemProperty])
  if (index != InvalidIndex) {
    y[index] += 1
    text[index] += ', ' + item.title
  } else {
    x.push(item[itemProperty])
    y.push(1)
    text.push(item.title)
  }
}
