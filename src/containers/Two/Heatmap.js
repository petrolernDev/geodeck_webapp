import React, { useState, useEffect } from 'react'
import get from 'lodash.get'

const HeatMap = () => {
  const [frame, setFrame] = useState(0)

  document.addEventListener('sample-update', e => {
    const f = get(e, 'detail.plane.translate') || 0
    setFrame(Math.min(Math.round(f * 24), 24))
  }, false)

  return (
    <div style={{height: "calc( 100% - 40px )"}} className="d-flex align-items-center justifity-content-conter">
      <img src={`${process.env.PUBLIC_URL}/img/gem/gem_0_${frame}.png`} width='400px' alt="heat-map" />
    </div>
  )
}

export default HeatMap
