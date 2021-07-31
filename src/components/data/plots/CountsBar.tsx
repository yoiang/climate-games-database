import Plotly from '../Plotly/PlotlySSR'
import { DatabaseRow, DispositionValues } from '../../../models/DatabaseRow'
import {
  countData,
  countDataSeperately,
  spreadData,
} from '../Plotly/utility/bar'
import { useState } from 'react'
import { TableView, TableViewSelect } from '../Plotly/utility/TableViewSelect'
import Checkbox from 'rc-checkbox'
import { Layout } from 'plotly.js'

export type Props = {
  spreadProperty: string
  spreadPropertyValues: string[] | readonly string[]
  againstProperty: string
  data: DatabaseRow[]
}

export const CountsBar = ({
  spreadProperty,
  spreadPropertyValues,
  againstProperty,
  data: unprocessedData,
}: Props): JSX.Element => {
  const [byYear, setByYear] = useState<boolean>(false)
  const [tableView, setTableView] = useState<TableView>('Separately')

  const data = byYear
    ? spreadData(
        unprocessedData,
        spreadProperty,
        spreadPropertyValues,
        againstProperty
      )
    : countDataSeperately(unprocessedData, spreadProperty, spreadPropertyValues)

  const capitalSpreadProperty =
    spreadProperty.charAt(0).toUpperCase() + spreadProperty.slice(1)
  const capitalAgainstProperty =
    againstProperty.charAt(0).toUpperCase() + againstProperty.slice(1)
  const layout: Partial<Layout> = byYear
    ? {
        // autosize: true,
        title: `${capitalSpreadProperty} Counts by ${capitalAgainstProperty}`,
        barmode: 'group',
        xaxis: {
          title: `${capitalSpreadProperty} by ${capitalAgainstProperty}`,
        },
        yaxis: {
          title: 'Counts',
        },
        bargap: 0,
        dragmode: 'lasso',
      }
    : {
        // autosize: true,
        title: `${capitalSpreadProperty} Counts`,
        barmode: 'group',
        xaxis: {
          title: capitalSpreadProperty,
        },
        yaxis: {
          title: 'Counts',
        },
        bargap: 0,
        dragmode: 'lasso',
      }

  switch (tableView) {
    case 'Separately':
      layout.barmode = 'relative'
      break
    case 'Stacked':
      layout.barmode = 'stack'
      break
    case 'Normalized':
      layout.barmode = 'stack'
      layout.barnorm = 'fraction'
      break
  }
  return (
    <div className="countsBar">
      <div className="tableViewSelectContainer">
        <TableViewSelect onChange={setTableView} />
      </div>
      By Year:
      <Checkbox
        name="byYear"
        onChange={(genericEvent: Event) => {
          const event =
            genericEvent as any as React.ChangeEvent<HTMLInputElement>
          setByYear(event.target.checked)
        }}
      />
      <Plotly data={data} layout={layout} />
      <style jsx>{`
        .tableViewSelectContainer {
          width: 150px;
        }
      `}</style>
    </div>
  )
}

export default CountsBar
