let vectors;

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

window.addEventListener('load', () => defaultShape('square'), false);
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

function fetchAllVectors(){
  vectors = [];
  let list = document.getElementById("vectorList");

  for(let ch of list.children){
    vectors.push([parseInt(ch.children[0].value), parseInt(ch.children[2].value)]);
  }
}

function defaultShape(shapeName){
  if (defaultShapes.hasOwnProperty(shapeName)){
    vectors = defaultShapes[shapeName].slice(0);
    showVectors();
  }
}
