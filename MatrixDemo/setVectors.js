let vectors;
let multMatrix = [[1, 0], [0, 1]];

function getRotationMatrix(degAngle){
  let angle = degAngle * Math.PI/180;

  let cos = Math.cos(angle);
  let sin = Math.sin(angle);

  if (Math.abs(cos) < 0.00001) cos = 0;
  if (Math.abs(sin) < 0.00001) sin = 0;

  return [
    [cos, -sin],
    [sin, cos]
  ]
}

let defaultMatrices = {
  'identity': [
    [1, 0], [0, 1]
  ],
  '90deg': getRotationMatrix(90),
  '45deg': getRotationMatrix(45),
  '20deg': getRotationMatrix(20),
  '2x': [
    [2, 0], [0, 2]
  ]
}

let defaultShapes = {
  "square": [
    [0, 0], [2, 0], [2, 2], [0, 2]
  ],
  "origin": [
    [0, 0]
  ],
  "triangle":[
    [0, 0], [4, 0], [2, 4]
  ],
  "pentagon": [
    [0, 1], [1, -1], [3, -1], [4, 1], [2, 3]
  ],
  "hexagon": [
    [0, 0], [2, -1], [4, 0], [4, 2], [2, 3], [0, 2]
  ]
};

window.addEventListener('load', () => {
  defaultShape('square');
  defaultMatrix('identity');
}, false);
// window.onload += function(){
//   defaultShape('square');
// }

function addVector(){
  vectors.push([0, 0]);
  showVectors();
}

function showVectors(){
  let list = document.getElementById("vectorList");

  while (list.firstChild){
    list.firstChild.remove();
  }

  for (let v of vectors){
    let listElement = document.createElement('li');
    let xInput = document.createElement('input');
    let yInput = document.createElement('input');

    xInput.type = 'number';
    yInput.type = 'number';

    xInput.value = v[0];
    yInput.value = v[1];

    xInput.onchange = fetchAllVectors;
    yInput.onchange = fetchAllVectors;

    listElement.appendChild(document.createTextNode("X: "))
    listElement.appendChild(xInput);
    listElement.appendChild(document.createElement('br'));
    listElement.appendChild(document.createTextNode("Y: "));
    listElement.appendChild(yInput);

    list.appendChild(listElement);
  }
}

function defaultMatrix(name){
  if (defaultMatrices.hasOwnProperty(name)){
    setMatrix(defaultMatrices[name]);
  }
}

function setMatrix(matrix){
  multMatrix = matrix.slice(0);

  let ch = document.getElementById('matrix').children;

  ch[0].value = multMatrix[0][0];
  ch[1].value = multMatrix[0][1];
  ch[3].value = multMatrix[1][0];
  ch[4].value = multMatrix[1][1];
}

function fetchMatrix(){
  let ch = document.getElementById('matrix').children;

  let m = [[0, 0], [0, 0]]

  m[0][0] = ch[0].value;
  m[0][1] = ch[1].value;
  m[1][0] = ch[3].value;
  m[1][1] = ch[4].value;

  multMatrix = m;
}

let rotInterval;
let currentAngle = 0;
let currentScale = 1;

function playRotation(){
  rotInterval = window.setInterval(rotationIntervalStep, 1000 / 60);
}

function rotationIntervalStep(){
  currentAngle++;
  setMatrix(getRotationMatrix(currentAngle));
  if (currentAngle >= 360){
    window.clearInterval(rotInterval);
    currentAngle = 0;
  }
}

function playScale(){
  rotInterval = window.setInterval(scalingIntervalStep, 1000 / 60);
}

function scalingIntervalStep(){
  currentScale += .01;
  setMatrix([[currentScale, 0], [0, currentScale]]);
  if (currentScale >= 2){
    window.clearInterval(rotInterval);
    currentScale = 1;
  }
}

function fetchAllVectors(){
  vectors = [];
  let list = document.getElementById("vectorList");

  for(let ch of list.children){
    vectors.push([parseFloat(ch.children[0].value), parseFloat(ch.children[2].value)]);
  }
}

function defaultShape(shapeName){
  if (defaultShapes.hasOwnProperty(shapeName)){
    vectors = defaultShapes[shapeName].slice(0);
    showVectors();
  }
}
