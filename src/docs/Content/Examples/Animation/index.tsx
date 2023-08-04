import React from 'react'

import { SlideIn } from './SlideIn'
import { Bounce } from './Bounce'
import { FadeIn } from './FadeIn'

export const Animation = () => <>
    <h3 style={{ width: '95%', margin: '15px 0' }}>
        <strong>Hover effects</strong>
    </h3>
    <div className="row animations" style={{ width: '80%', justifyContent: 'space-around' }}>
        <FadeIn />
        <SlideIn />
        <Bounce />
    </div>
</>
