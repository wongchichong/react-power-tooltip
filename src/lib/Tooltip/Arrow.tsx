import React from 'react' //
import clsx from 'clsx'

export const Arrow = ({ isHovered, hovBkg, bkgCol, flat }: { isHovered: string, hovBkg: string, bkgCol: string, flat?: boolean }) => {
    const backgroundColor = isHovered ? hovBkg : bkgCol
    // const boxShadow = flat ? null : 'shadow-[rgba(0,0,0,.18)0_0_0_1px]'
    const boxShadow = flat ? null : '[box-shadow:rgba(0,0,0,0.18)0px_0px_0px_1px]'

    return <div
        className={clsx(`rotate-45 w-[15px] h-[15px] m-[3px] z-[1]`, backgroundColor, boxShadow)}
    />
}
