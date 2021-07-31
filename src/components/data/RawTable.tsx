import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { DatabaseRow } from '../../models/DatabaseRow'
import { usePrefersColorSchemeDark } from '../../utility/usePrefersColorScheme'

const ExpandedRow: React.FC<{ data: DatabaseRow }> = (props: {
  data: DatabaseRow
}) => {
  return (
    <div className="expandedRow">
      {props.data.description ? (
        <div className="description property">
          Description: {props.data.description}
        </div>
      ) : null}
      {props.data.notableAchievements ? (
        <div className="notableAchievements property">
          Notable Achievements: {props.data.notableAchievements}
        </div>
      ) : null}

      <style jsx>{`
        .expandedRow {
          padding: 20px;
          border: 1px solid lightgray;
        }
        .property {
          padding: 10px;
        }
      `}</style>
    </div>
  )
}

const columns = [
  {
    name: 'Id',
    selector: (row) => row.id,
    sortable: true,
    width: '60px',
  },
  {
    name: 'Title',
    selector: (row) => row.title,
    sortable: true,
    width: '300px',
  },
  {
    name: 'Developer',
    selector: (row) => row.developer,
    sortable: true,
    width: '250px',
  },
  {
    name: 'Year',
    selector: (row) => row.year,
    sortable: true,
    width: '100px',
    center: true,
  },
  {
    name: 'Expert Metascore',
    selector: (row) => row.metascore,
    sortable: true,
    width: '150px',
    center: true,
  },
  {
    name: 'Scope',
    selector: (row) => row.scope,
    sortable: true,
    width: '100px',
    center: true,
  },
  {
    name: 'Estimated Player Count',
    selector: (row) => row.estimatedPlayerCount,
    sortable: true,
    width: '200px',
    center: true,
  },
  {
    name: 'Environmental Themes',
    selector: (row) => row.environmentalTheme,
    sortable: true,
    width: '200px',
    center: true,
  },
  {
    name: 'UN SDG Alignment',
    selector: (row) => row.unSDGAlignment,
    sortable: true,
    width: '200px',
    center: true,
  },
  {
    name: 'Salience',
    selector: (row) => row.salience,
    sortable: true,
    width: '100px',
    center: true,
  },
  {
    name: 'Timeline',
    selector: (row) => row.timeline,
    sortable: true,
    width: '100px',
    center: true,
  },
  {
    name: 'Disposition',
    selector: (row) => row.disposition,
    width: '110px',
    center: true,
  },
  {
    name: 'Technology',
    selector: (row) => row.technology,
    sortable: true,
    width: '120px',
    center: true,
  },
  {
    name: 'Messaging',
    selector: (row) => row.messaging,
    sortable: true,
    width: '120px',
    center: true,
  },
  {
    name: 'Motivation',
    selector: (row) => row.motivation,
    sortable: true,
    width: '120px',
    center: true,
  },
  {
    name: 'Notable Achievements',
    selector: (row) => row.notableAchievements,
    sortable: true,
    width: '200px',
    right: true,
  },
]

const RawTable: React.FC<{ data: DatabaseRow[] }> = (props: {
  data: DatabaseRow[]
}) => {
  const useDarkMode = usePrefersColorSchemeDark()

  return (
    <DataTable
      title="Raw Data"
      keyField="id"
      columns={columns}
      data={props.data}
      striped
      highlightOnHover
      pointerOnHover
      // noDataComponent={}
      responsive
      persistTableHead
      fixedHeader
      fixedHeaderScrollHeight="calc(100vh - 260px)"
      theme={useDarkMode ? 'dark' : undefined}
      expandableRows
      expandableRowsComponent={ExpandedRow}
      expandOnRowClicked
    />
  )
}

export default RawTable
