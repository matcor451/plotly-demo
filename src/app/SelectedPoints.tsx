import { cloneDeep } from 'lodash'
import { PlotDatum, ScatterData } from 'plotly.js'
import React from 'react'
import { Accordion, Table } from 'react-bootstrap'
import { Figure } from 'react-plotly.js'

import { FlaggedPoint } from './page'

interface Props {
  figure: Figure
  selectedPoints?: {[key: string]: PlotDatum[]}
  flaggedPoints?: FlaggedPoint[]
  setFlaggedPoints: React.Dispatch<React.SetStateAction<FlaggedPoint[]>>
}

export const SelectedPoints = ({ figure, flaggedPoints, selectedPoints, setFlaggedPoints }: Props) => {
  const getColour = (key: string): string | undefined => {
    try {
      return (figure.data.filter(x => x.name === key)[0] as ScatterData).marker.color?.toString()
    } catch (exc) {
      return ''
    }
  }

  const onChangeFlag = (point: PlotDatum, flag?: string) => {
    let updatedFlags = cloneDeep(flaggedPoints) || []
    // Remove point from existing list first
    updatedFlags = updatedFlags.filter(x => x.pointIndex !== point.pointIndex)
    if (flag) {
      updatedFlags?.push({ traceName: point.data.name, pointIndex: point.pointIndex, flag })
    }
    setFlaggedPoints(updatedFlags)
  }

  return (
    <div>
      {(selectedPoints && Object.keys(selectedPoints).length > 0)
        ? <Accordion>
            {Object.keys(selectedPoints).map((x, i) =>
              <Accordion.Item key={i} eventKey={i.toString()}>
                <Accordion.Header>
                  <div
                    style={{ display: 'inline-block', width: '1rem', height: '1rem', backgroundColor: getColour(x) }}
                  />
                  {x}: {selectedPoints[x].length} points selected
                </Accordion.Header>
                <Accordion.Body>
                  <Table size='sm'>
                    <thead>
                      <tr>
                        <th>x</th>
                        <th>y</th>
                        <th>Flag</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedPoints[x].map(point =>
                        <tr key={point.pointIndex}>
                          <td>{point.x?.toString()}</td>
                          <td>{point.y?.toString()}</td>
                          <td>
                            <select onChange={e => onChangeFlag(point, e.target.value)}>
                              <option value=''></option>
                              {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(flag =>
                                <option key={flag} value={flag}>{flag}</option>
                              )}
                            </select>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
            )}
          </Accordion>
        : <div>No points selected yet</div>}
    </div>
  )
}
