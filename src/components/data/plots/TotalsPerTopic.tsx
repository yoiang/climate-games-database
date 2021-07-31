import {
  DatabaseRow,
  DispositionValues,
  MessagingValues,
  MotivationValues,
  TechnologyValues,
} from '../../../models/DatabaseRow'
import CountsBar from './CountsBar'

export type Props = {
  data: DatabaseRow[]
}

interface Topic {
  spreadProperty: string
  spreadPropertyValues: string[] | readonly string[]
  againstProperty: string
}

const topics: Topic[] = [
  {
    spreadProperty: 'disposition',
    spreadPropertyValues: DispositionValues,
    againstProperty: 'year',
  },
  {
    spreadProperty: 'technology',
    spreadPropertyValues: TechnologyValues,
    againstProperty: 'year',
  },
  {
    spreadProperty: 'messaging',
    spreadPropertyValues: MessagingValues,
    againstProperty: 'year',
  },
  {
    spreadProperty: 'motivation',
    spreadPropertyValues: MotivationValues,
    againstProperty: 'year',
  },
]

export const TotalsPerTopic = ({ data }: Props): JSX.Element => {
  return (
    <div className="totalsPerTopic">
      {topics.map((topic, index) => {
        return (
          <div key={`topic${index}`} className="topicContainer">
            <CountsBar data={data} {...topic} />
          </div>
        )
      })}
      <style jsx>{`
        .totalsPerTopic {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;

          padding: 20px;
          width: 100%;
        }

        .topicContainer {
          width: 50%;
          height: 50vh;
          position: relative;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

export default TotalsPerTopic
