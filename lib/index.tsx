import { TextBox } from './Tooltip/TextBox'
import { Arrow } from './Tooltip/Arrow'

import cssRules from './Tooltip/styles'

import React, { useState, useEffect, useRef } from 'react'

export const Tooltip = (props: {
    lineSeparated: string, position: string, hoverBackground: string, backgroundColor: string, arrowAlign: string, moveDown: string, moveRight: string, moveLeft: string,
    moveUp: string, textAlign: string, fontFamily: string, fontWeight: string, fontSize: string, color: string, animation: string, zIndex: string, flat, show
}
) => {
    const [hoverArrow, setHoverArrow] = useState(false)
    const [show, setShow] = useState(props.show)
    const [mount, setMount] = useState(true)
    const [hasInitialized, setHasInitialized] = useState(false)
    // const tooltipRef = useRef(null)
    // const {
    //     lineSeparated = '1px solid #ececec', position = 'right center', hoverBackground = '#ececec', backgroundColor = 'white', arrowAlign = 'start', moveDown = '0px',
    //     moveRight = '0px', moveLeft = '0px', moveUp = '0px', textAlign = 'left', fontFamily = 'inherit', fontWeight = 'bold', fontSize = 'inherit', color = 'inherit',
    //     animation = '', zIndex = '100', flat,
    //     show
    // } = props

    useEffect(() => {
        // Injecting styles directly into header
        if (!document.getElementById('rpt-css')) {
            const $style = document.createElement('style')
            $style.type = 'text/css'
            $style.id = 'rpt-css'
            document.head.appendChild($style)
            $style.innerHTML = cssRules
        }

        // Basic prop type checking
        Object.keys(props).forEach((propName) => {
            const type = typeof props[propName]
            const text = `React-power-tooltip: [${propName}] prop should be a`
            if (propName !== 'children' && type !== 'boolean' && type !== 'string') {
                // eslint-disable-next-line
                console.error(`${text} string (check also units)`)
            }
        })
    })

    useEffect(() => {
        if (!hasInitialized) {
            setShow(props.show)
            setHasInitialized(true)
        }
    }, [hasInitialized, props.show])

    useEffect(() => {
        if (props.show) setMount(true)
        if (!props.animation) setMount(false)
    }, [props.show, props.animation])

    const hoverArrowHandler = (bool) => {
        setHoverArrow(bool)
    }

    const { lineSeparated: lines, position: pos, hoverBackground, backgroundColor, arrowAlign: arwAlign, moveDown, moveRight, moveLeft, moveUp, textAlign, fontFamily, fontWeight, fontSize, color, animation, zIndex, flat } = props

    // Sets if false no line; if true default line; if string custom line;
    const lineSeparated = typeof (lines) === 'boolean'
        ? '1px solid #ececec' : lines

    function isAlign(str) {
        return align ? align === str
            : position === str
    }

    function isSide(str) {
        return side === str
    }

    const position = {
        side: pos.split(' ')[0],
        align: pos.split(' ')[1],
        isAlign,
        isSide
    }

    const arrow = {
        isAlign,
        position: arwAlign
    }

    const { side, align } = position
    const classes = ['rpt-container']
    let tooltipStyle = {}
    let bottom

    const arrange = (top, left, right, height, width, cssSel) => {
        tooltipStyle = { top, left, right, height, width }
        classes.push(cssSel)
    }

    switch (side) {
        case 'bottom':
            arrange('100%', '0px', '', '', '100%', 'rpt-bottom')
            break
        case 'top':
            arrange('', '0px', '', '', '100%', 'rpt-top')
            bottom = '100%'
            break
        case 'right':
            arrange('0px', '100%', '', '100%', '', 'rpt-right')
            break
        default:
            arrange('0px', '', '100%', '100%', '', 'rpt-left')
            break
    }

    const onAxis = {
        y: position.isSide('top') || position.isSide('bottom'),
        x: position.isSide('left') || position.isSide('right')
    }

    arrow.position = onAxis.y ? `h-${arrow.position}` : `v-${arrow.position}`

    const num = str => Number(str.slice(0, -2))
    const move = {
        down: num(moveDown),
        up: num(moveUp),
        left: num(moveLeft),
        right: num(moveRight)
    }

    const oneMovePropIsNeg = move.down < 0 || move.up < 0
        || move.left < 0 || move.right < 0

    switch (align) {
        case 'left':
            if (onAxis.y) classes.push('rpt-align-left')
            break
        case 'right':
            if (onAxis.y) classes.push('rpt-align-right')
            break
        case 'bottom':
            if (onAxis.x) classes.push('rpt-align-bottom')
            break
        case 'top':
            break
        default:
            if (onAxis.x) {
                classes.push('rpt-align-center')
                if (!oneMovePropIsNeg) {
                    move.down *= 2
                    move.up *= 2
                }
            }
            if (onAxis.y && !oneMovePropIsNeg) {
                move.right *= 2
                move.left *= 2
            }
            break
    }

    const adjustment = `${move.down}px ${move.left}px ${move.up}px ${move.right}px`

    tooltipStyle = {
        ...tooltipStyle,
        zIndex,
        color,
        bottom,
        fontSize,
        textAlign,
        fontFamily,
        fontWeight,
        padding: oneMovePropIsNeg ? null : adjustment,
        margin: oneMovePropIsNeg ? adjustment : null,
        animation: show ? `rpt-${animation} 0.2s` : `rpt-${animation}-out 0.15s`
    }

    return ((!animation && show) || (show && mount)) ? (
        <div
            className={classes.join(' ')}
            style={tooltipStyle}
            onAnimationEnd={() => { if (!show && animation) setMount(false) }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Arrow
                    isHovered={hoverArrow}
                    hovBkg={hoverBackground}
                    bkgCol={backgroundColor}
                    flat={flat}
                />
                <TextBox
                    {...props}
                    hoverArrow={hoverArrow}
                    lines={lineSeparated}
                    pos={position}
                    arw={arrow}
                    move={move}
                />
            </div>
        </div>
    ) : null
}





// class Tooltip extends Component {
//   state = {
//     hoverArrow: false,
//     show: this.props.show,
//     mount: true,
//     hasInitialized: false
//   }

//   componentWillMount() {
//     // Injecting styles directly into header
//     if (!document.getElementById('rpt-css')) {
//       const $style = document.createElement('style');
//       $style.type = 'text/css';
//       $style.id = 'rpt-css';
//       document.head.appendChild($style);
//       $style.innerHTML = cssRules;
//     }
//     // Basic prop type checking
//     Object.keys(this.props).forEach((propName) => {
//       const type = typeof this.props[propName];
//       const text = `React-power-tooptip: [${propName}] prop should be a`;
//       if (propName !== 'children' && type !== 'boolean' && type !== 'string') {
//         // eslint-disable-next-line
//         console.error(`${text} string (check also units)`);
//       }
//     });
//   }

//   shouldComponentUpdate(nextProps, nextState) {
//     return nextProps !== this.props
//       || nextState.hasInitialized !== this.state.hasInitialized
//       || nextState.mount !== this.state.mount
//       || nextState.hoverArrow !== this.state.hoverArrow;
//   }

//   componentDidUpdate() {
//     /* eslint-disable */
//     if (!this.state.hasInitialized) this.setState({ show: this.props.show, hasInitialized: true });
//     if (this.props.show) this.setState({ mount: true });
//     if (!this.props.animation) this.setState({ mount: false });
//     /* eslint-disable */
//   }

//   hoverArrow = (bool) => {
//     this.setState({ hoverArrow: bool });
//   }

//   render() {
//     const {
//       lineSeparated: lines,
//       position: pos,
//       hoverBackground,
//       backgroundColor,
//       arrowAlign: arwAlign,
//       moveDown,
//       moveRight,
//       moveLeft,
//       moveUp,
//       textAlign,
//       fontFamily,
//       fontWeight,
//       fontSize,
//       color,
//       animation,
//       zIndex,
//       show,
//       flat
//     } = this.props;

//     // Sets if false no line; if true default line; if string custom line;
//     const lineSeparated = typeof (lines) === 'boolean'
//       ? '1px solid #ececec' : lines;

//     function isAlign(str) {
//       return this.align ? this.align === str
//         : this.position === str;
//     }

//     function isSide(str) {
//       return this.side === str;
//     }

//     const position = {
//       side: pos.split(' ')[0],
//       align: pos.split(' ')[1],
//       isAlign,
//       isSide
//     };

//     const arrow = {
//       isAlign,
//       position: arwAlign
//     };

//     const { side, align } = position;
//     const classes = ['rpt-container'];
//     let tooltipStyle = {};
//     let bottom;

//     const arrange = (top, left, right, height, width, cssSel) => {
//       tooltipStyle = { top, left, right, height, width };
//       classes.push(cssSel);
//     };

//     switch (side) {
//       case 'bottom':
//         arrange('100%', '0px', '', '', '100%', 'rpt-bottom');
//         break;
//       case 'top':
//         arrange('', '0px', '', '', '100%', 'rpt-top');
//         bottom = '100%';
//         break;
//       case 'right':
//         arrange('0px', '100%', '', '100%', '', 'rpt-right');
//         break;
//       default:
//         arrange('0px', '', '100%', '100%', '', 'rpt-left');
//         break;
//     }

//     const onAxis = {
//       y: position.isSide('top') || position.isSide('bottom'),
//       x: position.isSide('left') || position.isSide('right')
//     };

//     arrow.position = onAxis.y ? `h-${arrow.position}` : `v-${arrow.position}`;

//     const num = str => Number(str.slice(0, -2));
//     const move = {
//       down: num(moveDown),
//       up: num(moveUp),
//       left: num(moveLeft),
//       right: num(moveRight)
//     };

//     const oneMovePropIsNeg = move.down < 0 || move.up < 0
//       || move.left < 0 || move.right < 0;

//     switch (align) {
//       case 'left':
//         if (onAxis.y) classes.push('rpt-align-left');
//         break;
//       case 'right':
//         if (onAxis.y) classes.push('rpt-align-right');
//         break;
//       case 'bottom':
//         if (onAxis.x) classes.push('rpt-align-bottom');
//         break;
//       case 'top':
//         break;
//       default:
//         if (onAxis.x) {
//           classes.push('rpt-align-center');
//           if (!oneMovePropIsNeg) {
//             move.down *= 2;
//             move.up *= 2;
//           }
//         }
//         if (onAxis.y && !oneMovePropIsNeg) {
//           move.right *= 2;
//           move.left *= 2;
//         }
//         break;
//     }

//     const adjustment = `${move.down}px ${move.left}px ${move.up}px ${move.right}px`;

//     tooltipStyle = {
//       ...tooltipStyle,
//       zIndex,
//       color,
//       bottom,
//       fontSize,
//       textAlign,
//       fontFamily,
//       fontWeight,
//       padding: oneMovePropIsNeg ? null : adjustment,
//       margin: oneMovePropIsNeg ? adjustment : null,
//       animation: show ? `rpt-${animation} 0.2s` : `rpt-${animation}-out 0.15s`
//     };

//     return ((!animation && show) || (this.state.show && this.state.mount)) ? (
//       <div
//         className={classes.join(' ')}
//         style={tooltipStyle}
//         onAnimationEnd={() => { if (!show && animation) this.setState({ mount: false }) }}
//       >
//         <div
//           style={{
//             display: 'flex',
//             justifyContent: 'center'
//           }}
//         >
//           <Arrow
//             isHovered={this.state.hoverArrow}
//             hovBkg={hoverBackground}
//             bkgCol={backgroundColor}
//             flat={flat}
//           />
//           <TextBox
//             {...this.props}
//             hoverArrow={this.hoverArrow}
//             lines={lineSeparated}
//             pos={position}
//             arw={arrow}
//             move={move}
//           />
//         </div>
//       </div>
//     ) : null;
//   }
// }

// // Specifies the default values for props:
// Tooltip.defaultProps = {
//   hoverBackground: '#ececec',
//   hoverColor: 'black',
//   backgroundColor: 'white',
//   textBoxWidth: '150px',
//   padding: '15px 20px',
//   borderRadius: '5px',
//   shadowColor: 'rgba(0,0,0,0.251)',
//   shadowShape: '0 8px 15px',
//   moveDown: '0px',
//   moveRight: '0px',
//   moveLeft: '0px',
//   moveUp: '0px',
//   position: 'right center',
//   arrowAlign: 'start',
//   textAlign: 'left',
//   fontFamily: 'inherit',
//   fontWeight: 'bold',
//   fontSize: 'inherit',
//   color: 'inherit',
//   zIndex: '100',
//   animation: ''
// };

// export default Tooltip;
