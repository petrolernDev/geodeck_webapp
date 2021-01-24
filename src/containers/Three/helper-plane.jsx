import * as THREE from "three";

var PlaneHelper = function(plane) {
  var geom = new THREE.PlaneGeometry( 5, 5, 50, 50 );
  var material = new THREE.MeshBasicMaterial({
    color: '#333',
    side: THREE.DoubleSide,
    wireframe: true
  });
  var obj = new THREE.Mesh( geom, material );
  obj.lookAt(plane.normal);
  obj.translateOnAxis(
    new THREE.Vector3(1, 0, 0).cross(plane.normal).normalize(),
    plane.constant * -1
  );
  return obj;
}

var wavyPlaneGeom = function() {
  var degree = 3;
  var knots = [0, 0, 0, 0, 1, 1, 1, 1];
  var pts = [];
  var numPoints = 4;
  for (let u = 0; u < numPoints; u++) {
    var ptsV = [];
    for (let v = 0; v < numPoints; v++) {
      ptsV.push([
        u/numPoints - 0.5,
        Math.random() - 0.5,
        v/numPoints - 0.1
      ])
    }
    pts.push(ptsV)
  }
  var srf = window.verb.geom.NurbsSurface.byKnotsControlPointsWeights(degree, degree, knots, knots, pts);
  var geom = srf.toThreeGeometry();
  return geom;
}

const floor = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)

export default PlaneHelper(floor)
