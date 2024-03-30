'use client'
import { useState } from "react";
import dynamic from "next/dynamic";
import { Figure } from "react-plotly.js";
import { Layout, PlotDatum } from "plotly.js";
import { PlotlyControls } from "./controls";
import { Dictionary, cloneDeep, groupBy, isEqual, range } from "lodash";
import { Button } from "react-bootstrap";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })

const NUM_POINTS = 1000

const data: Plotly.Data[] = [
  {
    type: 'scattergl',
    x: range(NUM_POINTS),
    y: range(NUM_POINTS).map(x => x ** 0.5),
    name: 'Temperature',
    mode: 'markers',
    marker: {color: '#ff0000'},
    yaxis: 'y',
    visible: true
  },
  {
    type: 'scattergl',
    x: range(NUM_POINTS),
    y: range(NUM_POINTS).map(x => x + x * Math.cos(0.1 * x)),
    name: 'Pressure',
    mode: 'markers',
    marker: {color: '#0000ff'},
    yaxis: 'y2',
    visible: true
  },
  {
    type: 'scattergl',
    x: range(NUM_POINTS),
    y: range(NUM_POINTS).map(x => x ** 1.5),
    name: 'Wetness',
    mode: 'markers',
    marker: {color: '#00ff00'},
    yaxis: 'y3',
    visible: true
  },
]

const layout: Partial<Layout> = {
  autosize: true,
  title: 'Test Plot',
  dragmode: 'pan',
  xaxis: {
    title: 'Time'
  },
  yaxis: {
    visible: false
  },
  yaxis2: {
    visible: false,
    overlaying: 'y'
  },
  yaxis3: {
    visible: false,
    overlaying: 'y'
  },
  showlegend: false,
}

export default function Page () {
  const [figure, setFigure] = useState<Figure>(cloneDeep({ data, layout, frames: [] }))
  const [revision, setRevision] = useState<number>()
  const [selectedPoints, setSelectedPoints] = useState<Dictionary<PlotDatum[]>>()

  const onSelected = (e: Plotly.PlotSelectionEvent) => {
    if (!e) {
      setSelectedPoints(undefined)
    } else {
      setSelectedPoints(groupBy(e.points, 'data.name'))
    }
  }

  const onReset = () => {
    setFigure(cloneDeep({ data, layout, frames: [] }))
  }

  return (
    <div>
      {selectedPoints &&
        <div>
          {Object.keys(selectedPoints).map(x =>
            <div>
              {x}: {selectedPoints[x].length} points selected
            </div>
          )}
        </div>
      }
      <Plot
        style={{
          // height: '100vh',
          width: '100%',
        }}
        data={figure.data}
        layout={figure.layout}
        revision={revision}
        onSelected={onSelected}
        config={{
          // modeBarButtonsToRemove: ['lasso2d'],
          displaylogo: false,
          scrollZoom: true
        }}
        onUpdate={x => {
          if (!isEqual(x, figure)) {
            setFigure(x)
          }
        }}
      />
      <Button onClick={onReset}>
        Reset Plot
      </Button>
      <PlotlyControls
        setRevision={setRevision}
        figure={figure}
      />
    </div>
  )
}
