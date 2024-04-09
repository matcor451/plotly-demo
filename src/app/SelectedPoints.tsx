import { PlotDatum, ScatterData } from 'plotly.js'
import { Figure } from 'react-plotly.js'

interface Props {
  figure: Figure
  selectedPoints?: {[key: string]: PlotDatum[]}
}

export const SelectedPoints = ({ figure, selectedPoints }: Props) => {
  const getColour = (key: string): string | undefined => {
    try {
      return (figure.data.filter(x => x.name === key)[0] as ScatterData).marker.color?.toString()
    } catch (exc) {
      return ''
    }
  }

  return (
    <div>
      {(selectedPoints && Object.keys(selectedPoints).length > 0)
        ? <div>
            {Object.keys(selectedPoints).map((x, i) =>
              <div key={i}>
                <div
                  style={{ display: 'inline-block', width: '1rem', height: '1rem', backgroundColor: getColour(x) }}
                />
                {x}: {selectedPoints[x].length} points selected
              </div>
            )}
          </div>
        : <div>No points selected yet</div>
      }
    </div>
  )
}
