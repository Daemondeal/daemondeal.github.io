let multMatrix = [
  [3, 0, 0], [0, 3, 0], [0, 0, 6]
]

function fetchMatrix(){
  let ch = document.getElementById('matrix').children;

  let m = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

  m[0][0] = ch[0].value;
  m[0][1] = ch[1].value;
  m[0][2] = ch[2].value;
  m[1][0] = ch[4].value;
  m[1][1] = ch[5].value;
  m[1][2] = ch[6].value;
  m[2][0] = ch[8].value;
  m[2][1] = ch[9].value;
  m[2][2] = ch[10].value;

  multMatrix = m;
}

function setMatrix(matrix){
  multMatrix = matrix.slice(0);

  let ch = document.getElementById('matrix').children;

  ch[0].value = multMatrix[0][0];
  ch[1].value = multMatrix[0][1];
  ch[2].value = multMatrix[0][2];

  ch[4].value = multMatrix[1][0];
  ch[5].value = multMatrix[1][1];
  ch[6].value = multMatrix[1][2];

  ch[8].value = multMatrix[2][0];
  ch[9].value = multMatrix[2][1];
  ch[10].value = multMatrix[2][2];
}

window.addEventListener('load', () => {
  setMatrix([
    [3, 0, 0], [0, 3, 0], [0, 0, 6]
  ])
}, false);
