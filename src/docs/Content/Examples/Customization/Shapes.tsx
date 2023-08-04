import React from 'react'
import { Tooltip } from '../../../../lib'

export const Shapes = () => <>
    <h3 style={{ width: '95%', marginBottom: '0' }}><strong>Shapes / Fonts</strong></h3>
    <div className="row">
        <div>
            <p>Default</p>
            <div className="vPlaceHolder">
                <Tooltip
                    show
                >
                    <span>
                        Our Technology
                        <p>Some text</p>
                    </span>
                    <span>Our Story</span>
                </Tooltip>
            </div>
        </div>
        <div>
            <p>Text / shadows</p>
            <div className="vPlaceHolder">
                <Tooltip
                    show
                    textAlign="right"
                    fontWeight="normal"
                    shadowShape="0 3px 6px"
                    lineSeparated
                >
                    <span>Our Technology</span>
                    <span>Our Story</span>
                </Tooltip>
            </div>
        </div>
        <div>
            <p>Corners / lines</p>
            <div className="vPlaceHolder">
                <Tooltip
                    show
                    borderRadius="0px"
                    lineSeparated="3px solid #ececec"
                >
                    <span>Our Technology</span>
                    <span>Our Story</span>
                </Tooltip>
            </div>
        </div>
    </div>
</>
