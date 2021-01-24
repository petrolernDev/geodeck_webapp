import React, { useState, useEffect, useRef } from 'react'
import data from './sample.json'
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import DatGui, { DatBoolean, DatColor, DatNumber, DatString, DatSelect } from 'react-dat-gui';
import { Interaction } from 'three.interaction';
import 'react-dat-gui/dist/index.css';
import { connect } from 'react-redux'
import PlaneHelper from './helper-plane'
import { drawSamplingPlane, drawSamplingLine, drawSamplingDot,filler } from './shapes'
import cubeData from './cube0.json'

const {ni, nj, nk } = data

const threeWorker = new Worker(`${process.env.PUBLIC_URL}/three-worker.js`)

function RGBAToHexA(r,g,b,a) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);
  a = Math.round(a * 255).toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;
  if (a.length == 1)
    a = "0" + a;

  return "#" + r + g + b;
}

const Cube = ({three}) => {
  const [groupP, setGroupP] = useState(null) // pressure
  const [groupA, setGroupA] = useState(Array(29).fill(0).map(e=>(filler()))) // pressure array for other time frames
  const [groupT, setGroupT] = useState(null)// temprature
  const [gP, setGP] = useState(null) // pressure
  const [gT, setGT] = useState(null)// temprature
  const [count, _] = useState(0)
  const [stage, setStage] = useState(null);
  const [samplePlane, setSamplePlane] = useState(null);
  const [sampleLine, setSampleLine] = useState(null);
  const [sampleDot, setSampleDot] = useState(null);
  const [sampleDot2, setSampleDot2] = useState(null);
  const [data1, setData1] = useState({
    project: 'GeoDeck Demo',
    simulation: 'S1',
    point: [
      {
        name: 'point 1',
        x: 0.2,
        y: 0.2,
        z: 0.98,
      }
    ],
    line: {
      name: 'line 1',
      translateX: 0,
      translateZ: 0,
    },
    plane: {
      name: 'plane 1',
      translate: 0,
    }
  })
  const [points, setPoints] = useState([])
  const domElement = useRef(null);

  const handleUpdate = newData => {
    const event = new CustomEvent('sample-update', { detail: { ...newData } })
    document.dispatchEvent(event)
    setData1({ ...data1,...newData })
  }

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, domElement.current.clientWidth / domElement.current.clientHeight, 0.1, 1000 );
    const renderer = new THREE.WebGLRenderer({alpha:true});

    //light
    var light = new THREE.PointLight(0xffffff, 1, 100)
    light.position.set(20, 30, 40)
    scene.add(light)

     var light = new THREE.AmbientLight( 0x404040 ) // soft white light
     scene.add( light )


     // var localPlane = new THREE.Plane( new THREE.Vector3( .5, -.5, .1 ), .1 );

     // var globalPlane = new THREE.Plane( new THREE.Vector3( -.5, .6, -.34 ), .1 );

     // renderer.clippingPlanes = [ globalPlane ];

     // renderer.localClippingEnabled = true;

    //interaction
    // const interaction = new Interaction(renderer, scene, camera)
    renderer.setSize(domElement.current.clientWidth, domElement.current.clientHeight);
    domElement.current.appendChild( renderer.domElement );
    const _groupT = new THREE.Group();
    _groupT.name = 'cube-temprature-0'
    const _groupP = new THREE.Group();
    _groupP.name = 'cube-pressure-0'
    cubeData.map(node => {
      const {i, j, k} = node
      if (i === 0 || j === 0 || k === 0)return
      const geometry = new THREE.BoxBufferGeometry(0.04, 0.04, 0.04);
      const materialT = new THREE.MeshBasicMaterial({ color: node.Temprature, clippingPlanes: [] });
      const materialP = new THREE.MeshBasicMaterial({ color: node.Pressure, clippingPlanes: [] });
      const cube = new THREE.Mesh(geometry, materialT);
      const cubeP = new THREE.Mesh(geometry, materialP);
      cube.position.set(i/100,j/100,k/25)
      cubeP.position.set(i/100,j/100,k/25)
      _groupT.add(cube)
      _groupP.add(cubeP)
    })


    threeWorker.postMessage({test:0})
    threeWorker.onmessage = (e) => {
      let ga = []
      for (let f of e.data) {
        const {data, j} = f
        const _gP = new THREE.Group();
        _gP.name = `cube-pressure-${j}`
        data.map(node => {
          const {i, j, k} = node
          if (i === 0 || j === 0 || k === 0)return
          const geometry = new THREE.BoxBufferGeometry(0.04, 0.04, 0.04);
          const materialP = new THREE.MeshBasicMaterial({ color: node.Pressure, clippingPlanes: [] });
          const cubeP = new THREE.Mesh(geometry, materialP);
          cubeP.position.set(i/100,j/100,k/25)
          _gP.add(cubeP)
        })
        ga.push(_gP)
      }
      setGroupA(ga)
    }


    //axis helper
    const axesHelper = new THREE.AxesHelper( 5 );
    scene.add( axesHelper );


    const line = drawSamplingLine()
    setSampleLine(line)

    const dot = drawSamplingDot()
    setSampleDot(dot)

    const dot2 = drawSamplingDot('sampling-dot2')
    setSampleDot2(dot2)

    // slicing
    // let _plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    // let geom = new THREE.BoxGeometry(1, 1, 1);
    // geom = sliceGeometry(geom, _plane);
    // let mat = new THREE.MeshBasicMaterial({ wireframe: true });
    // let mesh = new THREE.Mesh(geom, mat);
    // scene.add(mesh);
    //
    //
    // sampling
    const plane = drawSamplingPlane()

    _groupP.cursor = 'pointer';
    _groupP.on('click', (ev) => {
        if (points.length === 1) {
          setPoints([points[0], [ev.intersects[0].point.x, ev.intersects[0].point.y, ev.intersects[0].point.z]])
        } else {
          setPoints([[ev.intersects[0].point.x, ev.intersects[0].point.y, ev.intersects[0].point.z]])
        }
    })
    scene.add(groupP)

    camera.position.z = 1.5
    camera.position.y = 1
    camera.position.x = 2
    camera.up = new THREE.Vector3(0, 0, 1)
    window.camera = camera
    // camera.up = new THREE.Vector3(0,0,1)
    camera.lookAt(0.5, 0.5, 0.5)
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target = new THREE.Vector3(0.5, 0.5, 0.5)
    controls.target = new THREE.Vector3(0.5, 0.5, 0)

    // Stop from going inside the geometry
    OrbitControls.minDistance = 1;
    OrbitControls.maxDistance = 5;

    OrbitControls.rotateSpeed = 0.3;
    OrbitControls.minPolarAngle = 0; // radians
    OrbitControls.maxPolarAngle = 1.65;

    controls.update()

    const render = () => {
      renderer.render(scene, camera)
    }
    render()
    const animate = () => {
      requestAnimationFrame(animate)
      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;
      controls.update()
      render()
    }

    setStage(scene)
    setGroupP(_groupP)
    setGroupT(_groupT)
    // window.stage = scene
    setSamplePlane(plane)
    // scene.add(PlaneHelper); // the help grid on the floor
    animate()
    // controls.addEventListener( 'change', render)
  }, []);

  useEffect(() => {
    if(three.activeWidget){
      const cbp = stage.getObjectByName('cube-pressure')
      if(cbp) {

      }
    }else{

    }
    switch (three.activeWidget){
      case 'plane':
        if (stage) stage.remove(stage.getObjectByName('sampling-line'))
        if (stage) stage.remove(stage.getObjectByName('sampling-dot'))
        if (stage) stage.remove(stage.getObjectByName('sampling-dot2'))
        if (!stage.getObjectByName('sampling-plane')) {
          stage.add(samplePlane)
        }
        break
      case 'line':
        if (stage) stage.remove(stage.getObjectByName('sampling-plane'))
        if (stage) stage.remove(stage.getObjectByName('sampling-dot'))
        if (stage) stage.remove(stage.getObjectByName('sampling-dot2'))
        if (!stage.getObjectByName('sampling-line')) {
          stage.add(sampleLine)
        }
        break
      case 'point':
        if (stage) stage.remove(stage.getObjectByName('sampling-plane'))
        if (stage) stage.remove(stage.getObjectByName('sampling-line'))
        if (!stage.getObjectByName('sampling-dot')) {
          stage.add(sampleDot)
        } else {
          const event = new CustomEvent('sample-update', { detail: { ...data1, addPoint: true } })
          document.dispatchEvent(event)
          stage.add(sampleDot2)
        }
        break
      default:
        if (stage) stage.remove(stage.getObjectByName('sampling-plane'))
        if (stage) stage.remove(stage.getObjectByName('sampling-line'))
        if (stage) stage.remove(stage.getObjectByName('sampling-dot'))
        break
    }
  }, [three])

  useEffect(() => {
    if (!stage) return
    switch (three.sample.variable){
      case 'Temprature':
        stage.remove(stage.getObjectByName(`cube-pressure-${three.sample.time || 0}`))
        stage.add(groupT)
        break
      default:
        stage.remove(stage.getObjectByName('cube-temprature-0'))
        for (let i=0;i<30;i++){
          stage.remove(stage.getObjectByName(`cube-pressure-${i}`))
        }
        stage.add(three.sample.time===0?groupP:groupA[three.sample.time-1])
    }
  },[three,groupP, groupT])

  useEffect(()=>{

    switch (three.activeWidget){
      case 'plane':
        let plane = stage.getObjectByName('sampling-plane')
        if (plane) {
          console.log('tns', data1.plane.translate)
          plane.position.z = 0.05 + data1.plane.translate
        }
        break
      case 'line':
        if (!stage.getObjectByName('sampling-line')) {
          stage.add(sampleLine)
        }
        break
      case 'point':
        let dot = stage.getObjectByName('sampling-dot')
        dot.position.x = data1.point[0].x
        break
      default:
        break
    }
  },[three, data1])

  useEffect(() => {
    console.log('ready array', groupA)
  }, [groupA])


  const myInc = ls => ls.map(v => v + 0.1)

  const renderLegend = () => {
    switch (three.activeWidget) {
      case 'plane':
        return (
          <DatGui data={data1} onUpdate={handleUpdate} style={{ position: 'absolute' }}>
            <DatSelect path="plane" options={['XY', 'ZY', 'XZ']} />
            <DatNumber path="plane.translate" label="Move" min={0} max={1} step={0.05} />
            <DatNumber path="plane.rotate" label="Rotate" min={-90} max={90} step={5} />
          </DatGui>
        )
      case 'line':
        return (
          <DatGui data={data1} onUpdate={handleUpdate} style={{ position: 'absolute' }}>
            <DatSelect path="line" label="Direction" options={['Y', 'X', 'Z']} />
            <DatNumber path="line.translateX" label="Move X" min={0} max={1} step={0.05} />
            <DatNumber path="line.translateZ" label="Move Z" min={0} max={1} step={0.05} />
          </DatGui>
        )
      case 'point':
        return (
          <DatGui data={data1} onUpdate={handleUpdate} style={{ position: 'absolute' }}>
            <DatString path="point.0.name" label="name" />
            <DatNumber path="point.0.x" label="X" min={0} max={1} step={0.05} />
            <DatNumber path="point.0.y" label="Y" min={0} max={1} step={0.05} />
            <DatNumber path="point.0.z" label="Z" min={0} max={1} step={0.05} />
          </DatGui>
        )
      default:
        return (
          <DatGui data={data1} onUpdate={handleUpdate} style={{ position: 'absolute' }}>
            <DatString path="project" label="Project" />
            <DatSelect path="simulation" options={['S1', 'S2', 'S3', 'S4']} />
          </DatGui>
        )
    }
  }


  return (
    <div ref={domElement} className="chart" style={{position: 'relative'}}>
      {renderLegend()}
    </div>
  )
}


function mapStateToProps({
  three
  }){
  return {
    three
  }
}

const mapDispatchToProps = {

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cube)
