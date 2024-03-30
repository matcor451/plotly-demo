import { Layout, LayoutAxis, PlotData, ScatterData } from "plotly.js"
import { Figure } from "react-plotly.js"

import { Table } from "react-bootstrap"

interface Props {
  figure: Figure
  setRevision: React.Dispatch<React.SetStateAction<number | undefined>>
}

export const PlotlyControls = ({ figure, setRevision }: Props) => {
  const reRender = () => setRevision(Date.now())

  const onToggle = (dataIndex: number, visible: boolean) => {
    (figure.data[dataIndex] as ScatterData).visible = visible ? true : 'legendonly'
    reRender()
  }

  const isAxisVisible = (axisIndex: number) => {
    const key = `yaxis${axisIndex > 0 ? axisIndex + 1 : ''}` as keyof Layout
    return ((figure.layout as Layout)[key] as LayoutAxis).visible
  }

  const onToggleAxis = (axisIndex: number, visible: boolean) => {
    for (let i = 0; i < figure.data.length; i++) {
      const key = `yaxis${i > 0 ? i + 1 : ''}` as keyof Layout
      if (i === axisIndex) {
        ((figure.layout as Layout)[key] as LayoutAxis).visible = visible
      } else {
        ((figure.layout as Layout)[key] as LayoutAxis).visible = false
      }
    }

    reRender()
  }

  const isOverlayActive = () => {
    let isOverlay = false
    for (let i = 0; i < figure.data.length; i++) {
      if ((figure.data[i] as ScatterData).yaxis !== 'y') {
        isOverlay = true
        break
      }
    }
    return isOverlay
  }

  const onToggleOverlay = (overlay: boolean) => {
    figure.data.forEach((x, i) => {
      if (!overlay) {
        (x as ScatterData).yaxis = 'y'
      } else if (i > 0){
        (x as ScatterData).yaxis = `y${i+1}`
      }      
    })

    // Setting autorange to true will reset the view to show all data
    for (let i = 0; i < figure.data.length; i++) {
      const key = `yaxis${i > 0 ? i + 1 : ''}` as keyof Layout
      ((figure.layout as Layout)[key] as LayoutAxis).autorange = true
    }
    figure.layout.xaxis!.autorange = true

    reRender()
  }

  const onColorChange = (dataIndex: number, newColor: string) => {
    (figure.data[dataIndex] as ScatterData).marker.color = newColor
    reRender()
  }

  const onToggleLines = (checked: boolean) => {
    (figure.data as ScatterData[]).forEach(x => {
      x.mode = checked ? 'lines+markers' : 'markers'
    })
    reRender()
  }

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={isOverlayActive()}
          onChange={e => onToggleOverlay(e.target.checked)}
        />
        Overlay data
      </label>
      <label>
        <input
          type="checkbox"
          defaultChecked={false}
          onChange={e => onToggleLines(e.target.checked)}
        />
        Show lines
      </label>
      <Table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Show</th>
            <th>Show Axis</th>
            <th>Colour</th>
          </tr>
        </thead>
        <tbody>
          {figure.data.map((x, i) =>
            <tr key={x.name}>
              <td>{x.name}</td>
              <td>
                <input
                  type="checkbox"
                  checked={(x as ScatterData).visible === true}
                  onChange={e => onToggle(i, e.target.checked)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={isAxisVisible(i)}
                  onChange={e => onToggleAxis(i, e.target.checked)}
                />
              </td>
              <td>
                <input
                  type="color"
                  value={(x as ScatterData).marker.color?.toString()}
                  onChange={e => onColorChange(i, e.target.value)}
                />
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}
