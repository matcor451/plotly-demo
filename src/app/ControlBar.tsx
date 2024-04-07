/* eslint-disable max-len */
import { PlotDatum } from 'plotly.js'
import React, { useState } from 'react'
import { Badge } from 'react-bootstrap'
import { Figure } from 'react-plotly.js'

import { PlotControls } from './PlotControls'

const CONFIG_TAB = 'config'
const SELECTED_TAB = 'selected'
const ALL_TABS = [CONFIG_TAB, SELECTED_TAB] as const
type TABS_TYPE = typeof ALL_TABS[number]

interface Props {
  figure?: Figure
  setRevision: React.Dispatch<React.SetStateAction<number | undefined>>
  selectedPoints?: {[key: string]: PlotDatum[]}
}

export const ControlBar = ({ figure, selectedPoints, setRevision }: Props) => {
  const [activeTab, setActiveTab] = useState<TABS_TYPE>()

  const MenuIcon = ({ count, svgPath, tab }: any) => (
    <div
      onClick={() => setActiveTab(activeTab === tab ? undefined : tab)}
      style={{
        cursor: 'pointer',
        textAlign: 'center',
        paddingBottom: '10px',
        position: 'relative'
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width='30px' height='30px'>
        {svgPath}
      </svg>
      {!!count &&
        <Badge
          style={{ position: 'absolute', top: 0, right: '10px' }}
        >
          {count}
        </Badge>
      }
    </div>
  )

  return (
    <>
      <div
        style={{
          position: 'absolute',
          height: '100%',
          zIndex: 999,
          // width: activeTab ? '50%' : '50px',
          width: '100px',
          border: '1px solid magenta',
          backgroundColor: 'white'
        }}
      >
        {/* <MenuIcon
          tab={DATA_TAB}
          svgPath={<path d="M448 80v48c0 44.2-100.3 80-224 80S0 172.2 0 128V80C0 35.8 100.3 0 224 0S448 35.8 448 80zM393.2 214.7c20.8-7.4 39.9-16.9 54.8-28.6V288c0 44.2-100.3 80-224 80S0 332.2 0 288V186.1c14.9 11.8 34 21.2 54.8 28.6C99.7 230.7 159.5 240 224 240s124.3-9.3 169.2-25.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.7 390.7 159.5 400 224 400s124.3-9.3 169.2-25.3c20.8-7.4 39.9-16.9 54.8-28.6V432c0 44.2-100.3 80-224 80S0 476.2 0 432V346.1z"/>}
        /> */}
        <MenuIcon
          tab={CONFIG_TAB}
          svgPath={<path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/>}
        />
        <MenuIcon
          tab={SELECTED_TAB}
          svgPath={<path d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>}
          count={selectedPoints ? Object.values(selectedPoints).reduce((prev, x) => prev + x.length, 0) : 0}
        />
      </div>
      {activeTab &&
        <div
          style={{
            position: 'absolute',
            left: '100px',
            height: '100%',
            zIndex: 999,
            width: '50%',
            border: '1px solid magenta',
            backgroundColor: 'white'
          }}
        >
          {activeTab === CONFIG_TAB && figure &&
            <PlotControls
              setRevision={setRevision}
              figure={figure}
            />
          }
          {activeTab === SELECTED_TAB && figure &&
            <div>
              {selectedPoints
                ? <div>
                    {Object.keys(selectedPoints).map((x, i) =>
                      <div key={i}>
                        {x}: {selectedPoints[x].length} points selected
                      </div>
                    )}
                  </div>
                : <div>No points selected yet</div>
              }
            </div>
          }
        </div>
      }
    </>
  )
}
