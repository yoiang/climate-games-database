import { useState } from 'react'
import Select from 'react-select'

export const TableViewValues = ['Separately', 'Stacked', 'Normalized'] as const
export type TableView = typeof TableViewValues[number]

export type OnChange = (string) => void

export type Props = { onChange: OnChange }
export const TableViewSelect: React.FC<Props> = ({ onChange }: Props) => {
  const [tableView, setTableView] = useState<TableView>(TableViewValues[0])

  const optionFromValue = (value: TableView) => {
    return {
      value,
      label: value,
    }
  }
  return (
    <Select
      className="tableViewSelect"
      defaultValue={optionFromValue(TableViewValues[0])}
      options={TableViewValues.map(optionFromValue)}
      backspaceRemovesValue={false}
      isClearable={false}
      isSearchable={false}
      onChange={(option) => {
        setTableView(option.value)
        onChange(option.value)
      }}
    />
  )
}
