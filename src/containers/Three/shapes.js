import * as THREE from 'three'
import alpha_map from './alphamap.png'


const netTexture = () => {
  const canvas = document.createElement('canvas'),
  ctx = canvas.getContext('2d')
  canvas.width = 64;
  canvas.height = 64;
  ctx.clearRect(0,0,64,64);
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
  // for (let i = 1; i < 10; i++) {
  //   ctx.fillRect(i * 6, 0, 2, 64)
  // }
  // for (let i = 1; i < 10; i++){
  //   ctx.fillRect(0, i * 6, 64, 2)
  // }
  ctx.globalAlpha = 0.2
  ctx.fillRect(0, 0, 64, 64)
  return new THREE.CanvasTexture(canvas);
}

const drawSamplingPlane = () => {
  const geometry = new THREE.PlaneGeometry(1.4, 1.4);
  // const material = new THREE.MeshBasicMaterial({ color: 0xffff0022, });
  // const alphaMap = new THREE.ImageUtils.loadTexture(alpha_map)
  const material = new THREE.MeshBasicMaterial({
    color: 'rgba(f,f,f,0.5)', // red (can also use a CSS color string here)
    // alphaMap: netTexture(),
    side: THREE.DoubleSide,
    transparent: true,
  });
  const plane = new THREE.Mesh(geometry, material)
  plane.name = 'sampling-plane'
  // plane.lookAt(new THREE.Vector3(10, 0, 0)); // x direction red
  // plane.lookAt(new THREE.Vector3(0, 10, 0)); // y direction green
  plane.lookAt(new THREE.Vector3(0, 0, 10)) // z direction blue
  plane.translateX(0.45)
  plane.translateY(0.45)
  plane.translateZ(0.05)
  return plane
}

const drawSamplingLine = () => {
  const geometry = new THREE.CylinderGeometry(0.01, 0.01, 1.5, 32)
  const material = new THREE.MeshBasicMaterial({ color: '#80D0FF' })
  const cylinder = new THREE.Mesh(geometry, material);
  cylinder.translateX(0.45)
  cylinder.translateY(0.5)
  cylinder.translateZ(0.45)
  cylinder.name = 'sampling-line'
  return cylinder
}

const drawSamplingDot = (name) => {
  const geometry = new THREE.SphereGeometry( .02, .02, .02 );
  const material = new THREE.MeshBasicMaterial( {color: name ? '#00ff00':'#80D0FF'} );
  const sphere = new THREE.Mesh( geometry, material );
  sphere.position.set(0.2, name ? 0.3 : 0.2, 1-0.02);
  sphere.name = name || 'sampling-dot'
  return sphere
}

const filler = () => {
  const geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
  const material = new THREE.MeshBasicMaterial( { color: '#F2AB1f' } );
  const mesh = new THREE.Mesh( geometry, material )
  return mesh
}


export { filler, drawSamplingPlane, drawSamplingLine, drawSamplingDot }
