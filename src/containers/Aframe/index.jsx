import React, { useState, useEffect, useRef } from 'react';

const VRScene = () => {
  const domElement = useRef(null);
  const scene = useRef(null);

  return (
    <div ref={domElement} className="chart">
      <a-scene ref={scene} width="100%" height="100%" embedded>
        <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
        <a-box position="-1 0.5 -3" rotation="0 45 0" width="1" height="1" depth="1" color="#4CC3D9"></a-box>
        <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
        <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
      </a-scene>
    </div>
  );
};


export default VRScene;
