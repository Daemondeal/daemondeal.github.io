let canvases;
let contexts;
let viewMatrices;

let originPosition = [100, 100];
let scaleFactor = [20, 20];
let pointThickness = 2;

let cubeVectors3D = [
  [0, 0, 0], [1, 0, 0], [1, 0, 1], [0, 0, 1],
  [0, 1, 1], [1, 1, 1], [1, 1, 0], [0, 1, 0]
];

let pyrVectors3D = [
  [0, 0, -1.3], [1.5, 0, 1.3], [-1.5, 0, 1.3], [0, 1, 0]
];

let pyrConnectedPoints = [
  [0, 1], [0, 2], [0, 3],
  [1, 2], [1, 3], [2, 3]
]

let cubeConnectedPoints = [
  [0, 1], [1, 2], [2, 3], [3, 0],
  [4, 5], [5, 6], [6, 7], [7, 4],
  [0, 7], [1, 6], [2, 5], [3, 4]
];

let vectors3D = [
  [0, 0, 0], [4, 0, 0], [4, 13, 0], [0, 13, 0],
  [0, 0, 10], [4, 0, 10], [4, 13, 10], [0, 13, 10],
  [14, 7.5, 0], [12, 4, 0], [8, 4, 0], [6, 7.5, 0], [8, 11, 0], [12, 11, 0],
  [14, 7.5, 20], [12, 4, 20], [8, 4, 20], [6, 7.5, 20], [8, 11, 20], [12, 11, 20]

]

let connectedPoints = [
  [0, 1], [1, 2], [2, 3], [0, 3],
  [4, 5], [5, 6], [6, 7], [7, 4],
  [0, 4], [1, 5], [2, 6], [3, 7],
  [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 8],
  [14, 15], [15, 16], [16, 17], [17, 18], [18, 19], [19, 14],
  [8, 14], [9, 15], [10, 16], [11, 17], [12, 18], [13, 19]
]


window.addEventListener('load', () => loadCanvas(), false);

let connectionsList;
let thetaSlider;

function loadCanvas(){
    canvases = [
      document.getElementById('topCanvas'),
      document.getElementById('frontCanvas'),
      document.getElementById('rightCanvas')
    ];

    contexts = canvases.map(x => x.getContext('2d'));

    viewMatrices = [
      [[1, 0, 0], [0, 0, 1]],
      [[1, 0, 0], [0, 1, 0]],
      [[0, 1, 0], [0, 0, 1]]
    ];

    originPosition = [canvases[0].width/2 - 100, canvases[0].height/2];

    sliders = [
      document.getElementById('xSlider'),
      document.getElementById('ySlider'),
      document.getElementById('zSlider')
    ];

    thetaSlider = document.getElementById('thetaSlider');

    connectionsList = document.getElementById('connections');

    window.setInterval(update, 1000/60);
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

function update(){
  let axis = getRotationAxis();
  let transformedVectors = getTransformedVectors(axis);

  for (let i in contexts){
    draw(contexts[i], transformedVectors, axis, viewMatrices[i]);
  }
}

function getTransformedVectors(axis){
  let transformedVectors = [];

  for (let vec of vectors3D){
    transformedVectors.push(projectPoint(vec, axis));
  }

  return transformedVectors;
}

function draw(ctx, vectors, axis, viewMatrix){
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.strokeStyle = 'red';
  ctx.fillStyle = 'red';

  drawAllConnections(ctx,
    [vecMatrixMult([0, 0, 0], viewMatrix), vecMatrixMult(axis, viewMatrix)]
  );

  ctx.strokeStyle = 'blue';
  ctx.fillStyle = 'blue';

  let transformedVectors = vectors.map(x => vecMatrixMult(x, viewMatrix));

  switch(connectionsList.selectedIndex){
    case 0:
      drawPoints(ctx, transformedVectors);
      break;
    case 1:
      drawPoints(ctx, transformedVectors);
      drawConnections(ctx, transformedVectors);
      break;
    case 2:
      drawAllConnections(ctx, transformedVectors);
      break;
  }
}

function getRotationAxis(){
  // let axis = [1, 0, 0];

  // for(let mat of getRotationMatrices(sliders[0].value, sliders[1].value, sliders[2].value)){
  //   axis = vecMatrixMult(axis, mat);
  // }

  return new Vector3(sliders[0].value, sliders[1].value, sliders[2].value).normalize().toArray();
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

function matrixProjectPoint(point){
  let resVec = vecMatrixMult(point, multMatrix);

  for(let mat of getRotationMatrices(sliders[0].value, sliders[1].value, sliders[2].value)){
    resVec = vecMatrixMult(resVec, mat);
  }

  return vecMatrixMult(resVec, topView);
}

function projectPoint(point, axis){
  let startVec = vecMatrixMult(point, multMatrix);



  let vec = Vector3.fromArray(startVec);
  let rotQuaternion = Quaternion.fromAngle(thetaSlider.value * Math.PI/180, Vector3.fromArray(axis));

  let tVec = rotQuaternion.conjugateFunction(vec);


  return tVec.toArray();
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

function drawPoints(ctx, points){
  for (let p of points){
    ctx.beginPath();
    ctx.arc(p[0] * scaleFactor[0] + originPosition[0], -p[1] * scaleFactor[0] + originPosition[1], pointThickness, 0, 2*Math.PI, false);
    ctx.fill();
    ctx.stroke();
  }
}

function drawConnectedPoints(ctx, points){
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

function drawConnections(ctx, points){
  for (let connection of connectedPoints){
    let p1 = vectorToCanvasCoords(points[connection[0]]);
    let p2 = vectorToCanvasCoords(points[connection[1]]);

    ctx.beginPath();
    ctx.moveTo(p1[0], p1[1]);
    ctx.lineTo(p2[0], p2[1]);
    ctx.stroke();
  }
}

function drawAllConnections(ctx, points){
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
