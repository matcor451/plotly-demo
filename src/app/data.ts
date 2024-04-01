import { range } from 'lodash'
import { Layout } from 'plotly.js'

const NUM_POINTS = 1000

const COLOURS = [
  '#ff0000',
  '#00ff00',
  '#0000ff',
  '#ff00ff',
  '#ffff00',
  '#00ffff',
  '#000000',
  '#FF007F',
  '#7F00FF',
  '#007FFF',
  '#00FF7F',
  '#DFFF00',
  '#FFA500'
]

const baseLayout: Partial<Layout> = {
  autosize: true,
  dragmode: 'pan',
  showlegend: false
}

export const TimeData: Plotly.Data[] = [
  {
    type: 'scattergl',
    x: range(NUM_POINTS),
    y: range(NUM_POINTS).map(x => x ** 0.5),
    name: 'Temperature',
    mode: 'markers',
    marker: {color: COLOURS[0]},
    yaxis: 'y',
    visible: true
  },
  {
    type: 'scattergl',
    x: range(NUM_POINTS),
    y: range(NUM_POINTS).map(x => x + x * Math.cos(0.1 * x)),
    name: 'Pressure',
    mode: 'markers',
    marker: {color: COLOURS[1]},
    yaxis: 'y2',
    visible: true
  },
  {
    type: 'scattergl',
    x: range(NUM_POINTS),
    y: range(NUM_POINTS).map(x => x ** 1.5),
    name: 'Wetness',
    mode: 'markers',
    marker: {color: COLOURS[2]},
    yaxis: 'y3',
    visible: true
  },
]

export const TimeLayout: Partial<Layout> = {
  ...baseLayout,
  title: 'Multiple Y axes',
  xaxis: {
    title: 'Time'
  },
  ...Object.fromEntries(TimeData.map((x, i) => (
    [
      `yaxis${i > 0 ? i + 1 : ''}`,
      {visible: false, overlaying: i > 0 ? 'y' : undefined}
    ]
  )))
}

export const DepthData: Plotly.Data[] = [
  {
    type: 'scattergl',
    x: range(NUM_POINTS).map(x => x ** 0.5),
    y: range(NUM_POINTS),
    name: 'Temperature',
    mode: 'markers',
    marker: {color: COLOURS[0]},
    xaxis: 'x',
    visible: true
  },
  {
    type: 'scattergl',
    x: range(NUM_POINTS).map(x => x ** 1.5),
    y: range(NUM_POINTS),
    name: 'Wetness',
    mode: 'markers',
    marker: {color: COLOURS[1]},
    xaxis: 'x2',
    visible: true
  },
  {
    type: 'scattergl',
    x: range(NUM_POINTS).map(x => x + x * Math.cos(0.1 * x)),
    y: range(NUM_POINTS),
    name: 'Pressure',
    mode: 'markers',
    marker: {color: COLOURS[2]},
    xaxis: 'x3',
    visible: true
  },
]

export const DepthLayout: Partial<Layout> = {
  ...baseLayout,
  title: 'Multiple X axes',
  ...Object.fromEntries(DepthData.map((x, i) => (
    [
      `xaxis${i > 0 ? i + 1 : ''}`,
      {visible: false, overlaying: i > 0 ? 'x' : undefined, side: 'top'}
    ]
  ))),
  yaxis: {
    title: 'Depth',
    autorange: 'reversed'
  },
}

export const ManyLinesData: Plotly.Data[] = range(1, 16).map(i => (
  {
    type: 'scattergl',
    x: range(NUM_POINTS),
    y: range(NUM_POINTS).map(x => (x - 50 * i) ** 2),
    name: `Param ${i}`,
    mode: 'markers',
    marker: {color: COLOURS[i % COLOURS.length]},
    yaxis: `y${i}`,
    visible: true
  }
))

export const ManyLinesLayout: Partial<Layout> = {
  ...baseLayout,
  title: 'Many plots at once',
  ...Object.fromEntries(ManyLinesData.map((x, i) => (
    [`yaxis${i > 0 ? i + 1 : ''}`, {visible: false, overlaying: i > 0 ? 'y' : undefined}]
  )))
}