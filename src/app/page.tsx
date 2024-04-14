'use client'
import { Dictionary, cloneDeep, groupBy, isEqual, range } from 'lodash'
import dynamic from 'next/dynamic'
import { Layout, PlotDatum, ScatterData } from 'plotly.js'
import type Plotly from 'plotly.js'
import { useEffect, useState } from 'react'
import { Figure } from 'react-plotly.js'

import { ControlBar } from './ControlBar'
import {
  DepthData, DepthLayout, ManyLinesData, ManyLinesLayout, RealData, RealDataLayout, TimeData, TimeLayout
} from './data'
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false })

const DATASETS: Dictionary<Plotly.Data[]> = {
  time: TimeData,
  depth: DepthData,
  many: ManyLinesData,
  real: RealData
}

const LAYOUTS: Dictionary<Partial<Layout>> = {
  time: TimeLayout,
  depth: DepthLayout,
  many: ManyLinesLayout,
  real: RealDataLayout
}

export interface FlaggedPoint {
  traceName: string
  pointIndex: number
  flag: string
}

export default function Page () {
  const [dataset, setDataset] = useState<string>()
  const [figure, setFigure] = useState<Figure>()
  const [revision, setRevision] = useState<number>()
  const [selectedPoints, setSelectedPoints] = useState<{[key: string]: PlotDatum[]}>()
  const [activePlot, setActivePlot] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)
  const [flaggedPoints, setFlaggedPoints] = useState<FlaggedPoint[]>([])

  useEffect(() => {
    if (dataset) {
      setActivePlot(dataset)
      setFigure(undefined)
      setIsLoading(true)
    } else {
      setActivePlot(undefined)
      setFigure(undefined)
    }
  }, [dataset])

  useEffect(() => {
    if (activePlot && !figure) {
      setFigure(cloneDeep({ data: DATASETS[activePlot], layout: LAYOUTS[activePlot], frames: [] }))
    }
  }, [activePlot, figure])

  useEffect(() => {
    figure?.data.forEach((trace, i) => {
      const flaggedIndices = flaggedPoints.filter(x => x.traceName === trace.name).map(x => x.pointIndex)
      const scatterTrace = (figure?.data[i] as ScatterData)
      scatterTrace.marker.symbol = range(scatterTrace.x.length).map(i =>
        flaggedIndices.includes(i) ? 'star' : 'circle'
      )
    })
    setRevision(Date.now())
  }, [figure, flaggedPoints])

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
      {isLoading &&
        <div
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            zIndex: 9999,
            pointerEvents: 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <h1
            style={{
              backgroundImage: 'linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red)',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}
          >Loading...</h1>
        </div>
      }
      <div style={{ display: 'flex', height: '100vh' }}>
        <ControlBar
          figure={figure}
          setRevision={setRevision}
          selectedPoints={selectedPoints}
          dataset={dataset}
          setDataset={setDataset}
          flaggedPoints={flaggedPoints}
          setFlaggedPoints={setFlaggedPoints}
        />
        {figure &&
          <Plot
            style={{
              width: '100%'
            }}
            data={figure.data}
            layout={figure.layout}
            revision={revision}
            onSelected={onSelected}
            config={{
              modeBarButtonsToRemove: ['resetScale2d'],
              modeBarButtonsToAdd: [
                {
                  title: 'Reset Plot',
                  name: 'resetButton',
                  icon: {
                    width: 500,
                    height: 600,
                    // eslint-disable-next-line max-len
                    path: 'M48.5 224H40c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H48.5z'
                  },
                  click: onReset
                }
              ],
              displaylogo: false,
              scrollZoom: true,
              displayModeBar: true,
              responsive: true
            }}
            onUpdate={x => {
              if (!isEqual(x, figure)) {
                setFigure(x)
              }
            }}
            onInitialized={() => setIsLoading(false)}
          />
        }
      </div>
    </div>
  )
}
