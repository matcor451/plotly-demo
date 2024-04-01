import { range } from 'lodash'
import { Layout } from 'plotly.js'

const NUM_POINTS = 1000

export const TimeData: Plotly.Data[] = [
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

export const TimeLayout: Partial<Layout> = {
  autosize: true,
  title: 'Multiple Y axes',
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

export const DepthData: Plotly.Data[] = [
  {
    type: 'scattergl',
    x: range(NUM_POINTS).map(x => x ** 0.5),
    y: range(NUM_POINTS),
    name: 'Temperature',
    mode: 'markers',
    marker: {color: '#ff0000'},
    xaxis: 'x',
    visible: true
  },
  {
    type: 'scattergl',
    x: range(NUM_POINTS).map(x => x ** 1.5),
    y: range(NUM_POINTS),
    name: 'Wetness',
    mode: 'markers',
    marker: {color: '#00ff00'},
    xaxis: 'x2',
    visible: true
  },
  {
    type: 'scattergl',
    x: range(NUM_POINTS).map(x => x + x * Math.cos(0.1 * x)),
    y: range(NUM_POINTS),
    name: 'Pressure',
    mode: 'markers',
    marker: {color: '#0000ff'},
    xaxis: 'x3',
    visible: true
  },
]

export const DepthLayout: Partial<Layout> = {
  autosize: true,
  title: 'Multiple X axes',
  dragmode: 'pan',
  xaxis: {
    visible: false
  },
  xaxis2: {
    visible: false,
    overlaying: 'x'
  },
  xaxis3: {
    visible: false,
    overlaying: 'x'
  },
  yaxis: {
    title: 'Depth',
    autorange: 'reversed'
  },
  showlegend: false,
}