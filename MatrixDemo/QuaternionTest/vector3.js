class Vector3{
  constructor(x, y, z){
    this.vec = [x, y, z];
  }

  static fromArray(vec){
    return new Vector3(vec[0], vec[1], vec[2]);
  }

  x(){
    return this.vec[0];
  }

  y(){
    return this.vec[1];
  }

  z(){
    return this.vec[2];
  }

  toArray(){
    return this.vec;
  }

  opposite(){
    let result = [];
    for (let x of this.vec){
      result.push(-x);
    }
    return Vector3.fromArray(result);
  }

  squareNorm(){
    let result = 0;
    for (let x of this.vec){
      result += x*x;
    }
    return result;
  }

  norm(){
    return Math.sqrt(this.squareNorm());
  }

  normalize(){
    return this.scale(1/this.norm);
  }

  add(vector){
    let result = [];
    for (let i in this.vec){
      result.push(this.vec[i] + vector.vec[i])
    }
    return Vector3.fromArray(result);
  }

  subtract(vector){
    this.add(vector.opposite());
  }

  scale(scalar){
    let result = [];
    for (let x of this.vec){
      result.push(x*scalar);
    }
    return Vector3.fromArray(result);
  }

  dot(vector){
    let result = 0;
    for (let i in this.vec){
      result += this.vec[i] * vector.vec[i];
    }
    return result;
  }

  cross(vector){
    let [ax, ay, az] = this.vec;
    let [bx, by, bz] = vector.vec;

    let cx = ay*bz - az*by;
    let cy = az*bx - ax*bz;
    let cz = ax*by - ay*bx;

    return new Vector3(cx, cy, cz);
  }

  toString(){
    return `(${this.x()}, ${this.y()}, ${this.z()})`
  }
}
