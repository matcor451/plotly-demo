'use client'
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Figure } from "react-plotly.js";
import { Layout, PlotDatum } from "plotly.js";
import { PlotlyControls } from "./controls";
import { Dictionary, cloneDeep, groupBy, isEqual, range } from "lodash";
import { Button } from "react-bootstrap";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })

import { DepthData, DepthLayout, ManyLinesData, ManyLinesLayout, TimeData, TimeLayout } from "./data";

const DATASETS: Dictionary<Plotly.Data[]> = {
  time: TimeData,
  depth: DepthData,
  many: ManyLinesData
}

const LAYOUTS: Dictionary<Partial<Layout>> = {
  time: TimeLayout,
  depth: DepthLayout,
  many: ManyLinesLayout
}

export default function Page () {
  const [dataset, setDataset] = useState<string>()
  const [figure, setFigure] = useState<Figure>()
  const [revision, setRevision] = useState<number>()
  const [selectedPoints, setSelectedPoints] = useState<Dictionary<PlotDatum[]>>()

  useEffect(() => {
    if (dataset) {
      setFigure(cloneDeep({ data: DATASETS[dataset], layout: LAYOUTS[dataset], frames: [] }))
    } else {
      setFigure(undefined)
    }
  }, [dataset])

  const onSelected = (e: Plotly.PlotSelectionEvent) => {
    if (!e) {
      setSelectedPoints(undefined)
    } else {
      setSelectedPoints(groupBy(e.points, 'data.name'))
    }
  }

  const onReset = () => {
    if (!dataset) return
    setFigure(cloneDeep({ data: DATASETS[dataset], layout: LAYOUTS[dataset], frames: [] }))
  }

  return (
    <div>
      <select onChange={e => setDataset(e.target.value)}>
        <option></option>
        <option value='time'>Time Series</option>
        <option value='depth'>Depth Profile</option>
        <option value='many'>Many Params</option>
      </select>
      {selectedPoints &&
        <div>
          {Object.keys(selectedPoints).map(x =>
            <div>
              {x}: {selectedPoints[x].length} points selected
            </div>
          )}
        </div>
      }
      {figure &&
        <>
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
        </>
      }
    </div>
  )
}
