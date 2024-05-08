import { Table } from 'react-bootstrap'
import { Figure } from 'react-plotly.js'

import { FlaggedPoint } from './page'

interface Props {
  figure: Figure
  flaggedPoints?: FlaggedPoint[]
}

export const FlaggedPoints = ({ figure, flaggedPoints }: Props) => {
  if (flaggedPoints?.length === 0) {
    return (
      <div>No points flagged yet</div>
    )
  }

  console.log(figure.data)

  return (
    <div>
      <Table>
        <thead></thead>
        <tbody>
          {flaggedPoints?.map((point, idx) =>
            <tr key={idx}>
              <td>{point.traceName}</td>
              <td>
                {figure.data.find(x => x.name === point.traceName)?.x[point.pointIndex]},
                {figure.data.find(x => x.name === point.traceName)?.y[point.pointIndex]}
              </td>
              <td>{point.flag}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}
