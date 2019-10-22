let y = 10;
let canvas;
let ctx;

let ySpeed = 5;

let originPosition = [100, 100];
let scaleFactor = [20, 20];
let pointThickness = 2;


window.addEventListener('load', () => loadCanvas(), false);

function loadCanvas(){
    canvas = document.getElementById("main-canvas");
    ctx = canvas.getContext('2d');

    originPosition = [canvas.width/2, canvas.height/2];

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

  drawConnectedPoints(vectors);

  let transformedVectors = [];

  for (let vec of vectors){
    transformedVectors.push(vecMatrixMult(vec, multMatrix));
  }

  ctx.strokeStyle = 'blue';
  ctx.fillStyle = 'blue';

  drawConnectedPoints(transformedVectors);
}

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

function vectorToCanvasCoords(vec){
  let x = vec[0] * scaleFactor[0] + originPosition[0];
  let y = -vec[1] * scaleFactor[0] + originPosition[1];

  return [x, y];
}
