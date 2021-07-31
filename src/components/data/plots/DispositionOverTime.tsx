import Plotly from '../Plotly/PlotlySSR'
import { PlotData } from 'plotly.js'
import { DatabaseRow } from '../../../models/DatabaseRow'

const InvalidIndex = -1

export type Props = {
  data: DatabaseRow[]
}

export const DispositionOverTime = ({ data }: Props): JSX.Element => {
  let maximumCount = 0

  const countForYear = (data: Partial<PlotData>, item: DatabaseRow) => {
    const x = data.x as number[]
    const y = data.y as number[]
    const text = data.text as string[]
    const index = x.indexOf(item.year)
    if (index != InvalidIndex) {
      y[index] += 1
      text[index] += ', ' + item.title
      if (y[index] > maximumCount) {
        maximumCount = y[index]
      }
    } else {
      x.push(item.year)
      y.push(1)
      text.push(item.title)
      if (1 > maximumCount) {
        maximumCount = 1
      }
    }
  }
  const createBarData = (name: string): Partial<PlotData> => {
    return {
      type: 'bar',
      name,
      x: [],
      y: [],
      text: [],
    }
  }

  const pessimistic = createBarData('Pessimistic')
  const optimistic = createBarData('Optimistic')
  const objective = createBarData('Objective')

  data
    .filter((value) => {
      return value.disposition !== null && value.year !== null
    })
    .forEach((value) => {
      switch (value.disposition) {
        case 'Optimistic':
          countForYear(optimistic, value)
          break
        case 'Objective':
          countForYear(objective, value)
          break
        case 'Pessimistic':
          countForYear(pessimistic, value)
          break
      }
    })

  const lowTech = createBarData('Low Tech')
  const highTech = createBarData('High Tech')
  const techNA = createBarData('Tech N/A')

  data
    .filter((value) => {
      return value.technology !== null && value.year !== null
    })
    .forEach((value) => {
      switch (value.technology) {
        case 'High Tech':
          countForYear(highTech, value)
          break
        case 'Low Tech':
          countForYear(lowTech, value)
          break
        case 'N/A':
          countForYear(techNA, value)
          break
      }
    })
  return (
    <Plotly
      data={[pessimistic, optimistic, objective, lowTech, highTech, techNA]}
      layout={{
        autosize: true,
        title: 'Year vs Technology and Disposition Counts',
        barmode: 'group',
        xaxis: {
          title: 'Year',
          // autotick: true,
          rangeslider: {
            visible: true,
            range: [2019, 2021],
          },
        },
        yaxis: {
          title: 'Technology / Disposition',
        },
      }}
    />
  )
}

export default DispositionOverTime
