import React from 'react'
import { Tooltip } from '../../../../lib'

export const HorizontalArrow = () => <>
    <h3 style={{ width: '95%', marginBottom: '0' }}>
        <strong>Horizontally </strong>
        (when tooltip positioned above / below target)
    </h3>
    <div className="row h-pos-container">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p>
                Arrow align:
                <strong> start</strong>
            </p>
            <div className="hPlaceHolder" style={{ right: '25%' }}>
                <Tooltip
                    show
                    arrowAlign="start"
                    position="bottom center"
                    textboxWidth="auto"
                    lineSeparated
                >
                    <span>Longer Option 1</span>
                    <span>Longer Option 2</span>
                </Tooltip>
            </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p>
                Arrow align:
                <strong> center</strong>
            </p>
            <div className="hPlaceHolder">
                <Tooltip
                    show
                    arrowAlign="center"
                    position="bottom center"
                    textboxWidth="auto"
                    lineSeparated
                >
                    <span>Longer Option 1</span>
                    <span>Longer Option 2</span>
                </Tooltip>

            </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p>
                Arrow align:
                <strong> end</strong>
            </p>
            <div className="hPlaceHolder" style={{ left: '25%' }}>
                <Tooltip
                    show
                    arrowAlign="end"
                    position="bottom center"
                    textboxWidth="auto"
                    lineSeparated
                >
                    <span>Longer Option 1</span>
                    <span>Longer Option 2</span>
                </Tooltip>
            </div>
        </div>
    </div>
</>
