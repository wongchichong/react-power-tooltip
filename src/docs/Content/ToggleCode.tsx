import React, { useState, ReactNode } from 'react'
import ArrowUp from '../../assets/arrow-up.svg'
import ArrowDown from '../../assets/arrow-down.svg'

export const ToggleCode = (props: { children?: ReactNode }) => {
    const [open, setOpen] = useState(false)

    //   componentDidUpdate() {
    //     // eslint-disable-next-line
    //     Prism.highlightAll();
    //   }

    const clickHandler = () => setOpen(!open)


    const { children } = props
    const SVG = open ? ArrowUp : ArrowDown

    return <>
        <div
            className="toggleCode"
            role="button"
            tabIndex={0}
            onClick={clickHandler}
        >
            <span>{open ? 'Hide Code Example' : 'Show Code Example'}</span>
            <img
                style={{ marginLeft: '8px', width: '10px' }}
                src={SVG}
                alt=""
            />
        </div>
        {open ? children : null}
    </>
}