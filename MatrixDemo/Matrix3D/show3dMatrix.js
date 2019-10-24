let canvas;
let ctx;

let originPosition = [100, 100];
let scaleFactor = [20, 20];
let pointThickness = 2;

let vectors3DCube = [
  [0, 0, 0], [1, 0, 0], [1, 0, 1], [0, 0, 1],
  [0, 1, 1], [1, 1, 1], [1, 1, 0], [0, 1, 0]
]

let vectors3D = [
  [0, 0, 0], [1.5, 0, 3], [-1.5, 0, 3], [0, 1, 1.5]
]

let connectedPoints = [
[1, 0]
]

let connectedPointsCube = [
  [0, 1], [1, 2], [2, 3], [3, 0],
  [4, 5], [5, 6], [6, 7], [7, 4],
  [0, 7], [1, 6], [2, 5], [3, 4]
]


window.addEventListener('load', () => loadCanvas(), false);

let connectionsList;

function loadCanvas(){
    canvas = document.getElementById("main-canvas");
    ctx = canvas.getContext('2d');

    originPosition = [canvas.width/2, canvas.height/2];

    sliders =   [document.getElementById('xSlider'),
      document.getElementById('ySlider'),
      document.getElementById('zSlider')];

    connectionsList = document.getElementById('connections');

    window.setInterval(update, 1000/60);
}

function update(){
  draw();
}

function vecMatrixMult(vec, mat){
  if (vec.length !== mat[0].length){
    throw "You can't multiply matrices that aren't as long as the vector is tall";
  }else if (vec.length === 0 || mat.length === 0){
    throw "You can't multiply empty vectors or matrices";
  }

  let finalVector = [];
  for (let v of mat){
    let finalSum = 0;
    for (let n in vec){
      finalSum += vec[n]*v[n];
    }
    finalVector.push(finalSum);
  }

  return finalVector;
}


function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = 'red';
  ctx.fillStyle = 'red';

  let transformedVectors = [];

  for (let vec of vectors3D){
    transformedVectors.push(projectPoint(vec));
  }

  ctx.strokeStyle = 'blue';
  ctx.fillStyle = 'blue';

  switch(connectionsList.selectedIndex){
    case 0:
      drawPoints(transformedVectors);
      break;
    case 1:
      drawPoints(transformedVectors);
      drawConnections(transformedVectors);
      break;
    case 2:
      drawAllConnections(transformedVectors);
      break;
  }
}

let topView = [[1, 0, 0], [0, 0, 1]];

function getRotationMatrices(x, y, z){
  let d2a = Math.PI/180;
  let radX = x*d2a;
  let radY = y*d2a;
  let radZ = z*d2a;

  let xMatrix = [
    [1, 0, 0], [0, cos(radX), -sin(radX)], [0, sin(radX), cos(radX)]
  ];

  let yMatrix = [
    [cos(radY), 0, sin(radY)], [0, 1, 0], [-sin(radY), 0, cos(radY)]
  ];

  let zMatrix = [
    [cos(radZ), -sin(radZ), 0], [sin(radZ), cos(radZ), 0], [0, 0, 1]
  ];

  return [xMatrix, yMatrix, zMatrix];
}

function projectPoint(point){
  let resVec = vecMatrixMult(point, multMatrix);

  for(let mat of getRotationMatrices(sliders[0].value, sliders[1].value, sliders[2].value)){
    resVec = vecMatrixMult(resVec, mat);
  }

  return vecMatrixMult(resVec, topView);
}

function cos(angle){
  let c = Math.cos(angle);
  if (c <= 0.000001) return 0;
  return c;
}

function sin(angle){
  let s = Math.sin(angle);
  if (s <= 0.000001) return 0;
  return s;
}

let sliders;

function drawPoints(points){
  for (let p of points){
    ctx.beginPath();
    ctx.arc(p[0] * scaleFactor[0] + originPosition[0], -p[1] * scaleFactor[0] + originPosition[1], pointThickness, 0, 2*Math.PI, false);
    ctx.fill();
    ctx.stroke();
  }
}

function drawConnectedPoints(points){
  for (let i in points){
    i = parseInt(i);
    let v = vectorToCanvasCoords(points[i]);
    let nextV = (i+1 >= points.length) ? vectorToCanvasCoords(points[0]) : vectorToCanvasCoords(points[i+1]);

    ctx.beginPath();
    ctx.arc(v[0], v[1], pointThickness, 0, 2*Math.PI, false);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(v[0], v[1]);
    ctx.lineTo(nextV[0], nextV[1]);
    ctx.stroke();

  }
}

function drawConnections(points){
  for (let connection of connectedPoints){
    let p1 = vectorToCanvasCoords(points[connection[0]]);
    let p2 = vectorToCanvasCoords(points[connection[1]]);

    ctx.beginPath();
    ctx.moveTo(p1[0], p1[1]);
    ctx.lineTo(p2[0], p2[1]);
    ctx.stroke();
  }
}

function drawAllConnections(points){
  for(let p of points){
    let v = vectorToCanvasCoords(p);

    ctx.beginPath();
    ctx.arc(v[0], v[1], pointThickness, 0, 2*Math.PI, false);
    ctx.fill();
    ctx.stroke();

    for (let p2 of points){
      if (p != p2){
        let v2 = vectorToCanvasCoords(p2);
        ctx.beginPath();
        ctx.moveTo(v[0], v[1]);
        ctx.lineTo(v2[0], v2[1]);
        ctx.stroke();
      }
    }
  }
}

function vectorToCanvasCoords(vec){
  let x = vec[0] * scaleFactor[0] + originPosition[0];
  let y = -vec[1] * scaleFactor[0] + originPosition[1];

  return [x, y];
}
