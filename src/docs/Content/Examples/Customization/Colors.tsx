import React from 'react'
import { Tooltip } from '../../../../lib'

export const Colors = () => <>
    <h3 style={{ width: '95%', marginBottom: '0' }}><strong>Colors</strong></h3>
    <div className="row">
        <div>
            <p>Hover / lines</p>
            <div className="vPlaceHolder">
                <Tooltip
                    show
                    hoverBackground="bg-[#3b0586]"
                    hoverColor="text-[white]"
                    lineSeparated="1px solid purple"
                >
                    <span>Our Technology</span>
                    <span>Our Story</span>
                </Tooltip>
            </div>
        </div>
        <div>
            <p>Background / shadows</p>
            <div className="vPlaceHolder">
                <Tooltip
                    show
                    color="text-[white]"
                    backgroundColor="bg-[#181818]"
                    shadowColor="rgba(60, 20, 70, 0.7)"
                >
                    <span>Our Technology</span>
                    <span>Our Story</span>
                </Tooltip>
            </div>
        </div>
        <div>
            <p>Flat (no shadows)</p>
            <div className="vPlaceHolder">
                <Tooltip
                    show
                    color="white"
                    backgroundColor="bg-[#444444]"
                    hoverBackground="bg-[#3b0586]"
                    hoverColor="white"
                    flat
                >
                    <span>Our Technology</span>
                    <span>Our Story</span>
                </Tooltip>
            </div>
        </div>
    </div>
</>
