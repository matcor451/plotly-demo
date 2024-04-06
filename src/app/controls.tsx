import { Layout, LayoutAxis, PlotData, ScatterData } from "plotly.js"
import { Figure } from "react-plotly.js"

import { Table } from "react-bootstrap"

interface Props {
  figure: Figure
  setRevision: React.Dispatch<React.SetStateAction<number | undefined>>
}

export const PlotlyControls = ({ figure, setRevision }: Props) => {
  const reRender = () => setRevision(Date.now())

  const visibleTraces = figure.data.map(x => (x as ScatterData).visible === true)

  const onToggle = (dataIndex: number, visible: boolean) => {
    (figure.data[dataIndex] as ScatterData).visible = visible ? true : 'legendonly'
    reRender()
  }

  const onToggleAll = (visible: boolean) => {
    figure.data.forEach((x, i) => {
      (figure.data[i] as ScatterData).visible = visible ? true : 'legendonly'
    })
    reRender()
  }

  const isAxisVisible = (axisIndex: number, axis: 'y' | 'x') => {
    if (axis === 'y') {
      const key = `yaxis${axisIndex > 0 ? axisIndex + 1 : ''}` as keyof Layout
      return ((figure.layout as Layout)[key] as LayoutAxis).visible
    }
    if (axis === 'x') {
      const key = `xaxis${axisIndex > 0 ? axisIndex + 1 : ''}` as keyof Layout
      return ((figure.layout as Layout)[key] as LayoutAxis).visible
    }
    return false
  }

  const onToggleAxis = (axisIndex: number, axis: 'y' | 'x', visible: boolean) => {
    for (let i = 0; i < figure.data.length; i++) {
      let key
      if (axis === 'y') {
        key = `yaxis${i > 0 ? i + 1 : ''}` as keyof Layout
      } else {
        key = `xaxis${i > 0 ? i + 1 : ''}` as keyof Layout
      }
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
      const dataItem = figure.data[i] as ScatterData
      if (
        (dataItem.xaxis && dataItem.xaxis !== 'x') ||
        (dataItem.yaxis && dataItem.yaxis !== 'y')
      ) {
        isOverlay = true
        break
      }
    }
    return isOverlay
  }

  const onToggleOverlay = (overlay: boolean) => {
    figure.data.forEach((dataItem, i) => {
      Object.keys(dataItem).forEach(key => {
        if (key === 'xaxis') {
          if (!overlay) {
            (dataItem as ScatterData).xaxis = 'x'
          } else if (i > 0){
            (dataItem as ScatterData).xaxis = `x${i+1}`
          }
        }
        if (key === 'yaxis') {
          if (!overlay) {
            (dataItem as ScatterData).yaxis = 'y'
          } else if (i > 0){
            (dataItem as ScatterData).yaxis = `y${i+1}`
          }
        }
      })
    })

    // Setting autorange to true will reset the view to show all data
    Object.keys(figure.layout).forEach(key => {
      if (key.startsWith('xaxis') || key.startsWith('yaxis')) {
        (figure.layout[key as keyof Layout] as LayoutAxis).autorange = true
      }
    })

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
          checked={(figure.data[0] as ScatterData).mode === 'lines+markers'}
          onChange={e => onToggleLines(e.target.checked)}
        />
        Show lines
      </label>
      <Table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>
              Show
              <input
                type='checkbox'
                checked={visibleTraces.every(x => x)}
                onChange={e => onToggleAll(e.target.checked)}
              />
            </th>
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
                  checked={visibleTraces[i]}
                  onChange={e => onToggle(i, e.target.checked)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={isAxisVisible(i, (x as ScatterData).yaxis ? 'y' : 'x')}
                  onChange={e => onToggleAxis(i, (x as ScatterData).yaxis ? 'y' : 'x', e.target.checked)}
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
