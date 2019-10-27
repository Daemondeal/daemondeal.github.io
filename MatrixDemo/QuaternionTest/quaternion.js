class Quaternion{
  constructor(p0, p1, p2, p3){
    this.s = p0;
    this.v = new Vector3(p1, p2, p3);
  }

  static fromVector(p0, vec){
    return new Quaternion(p0, vec.x(), vec.y(), vec.z());
  }

  static fromAngle(angle, axis){
    return Quaternion.fromVector(Math.cos(angle), axis.scale(Math.sin(angle)));
  }

  static identity(){
    return new Quaternion(1, 0, 0, 0);
  }

  conjugate(){
    return Quaternion.fromVector(this.s, this.v.opposite());
  }

  norm(){
    return Math.sqrt(this.squareNorm());
  }

  squareNorm(){
    return this.s*this.s + this.v.squareNorm();
  }

  inverse(){
    return this.conjugate().scale(1/this.squareNorm());
  }

  scale(factor){
    return Quaternion.fromVector(this.s*factor, this.v.scale(factor));
  }

  multiply(quaternion){
    let p0 = this.s;
    let q0 = quaternion.s;
    let p = this.v;
    let q = quaternion.v;

    let r0 = p0*q0 - p.dot(q);
    let r = q.scale(p0).add(p.scale(q0)).add(p.cross(q));

    return Quaternion.fromVector(r0, r);
  }

  multiplyFast(otherQuaternion){
    if (!(otherQuaternion instanceof Quaternion)){
      throw "You can only multiply together two quaternions";
    }

    let p0 = this.s;
    let [p1, p2, p3] = this.v.toArray();

    let q0 = otherQuaternion.s;
    let [q1, q2, q3] = otherQuaternion.v.toArray();

    let r0 = p0*q0 - (p1*q1 + p2*q2 + p3*q3);
    let r1 = p0*q1 + q0*p1 + p2*q3 - p3*q2;
    let r2 = p0*q2 + q0*p2 + p3*q1 - p1*q3;
    let r3 = p0*q3 + q0*p3 + p1*q2 - p2*q1;

    return new Quaternion(r0, r1, r2, r3);
  }

  sum(quaternion){
    return Quaternion.fromVector(this.s + quaternion.s, this.v.sum(quaternion.v));
  }

  conjugateFunction(vector){
    let v = Quaternion.fromVector(0, vector);
    return this.multiply(v).multiply(this.conjugate()).v;
  }

  toString(){
    let p0 = this.s;
    let res = `${p0}`;

    let i = 0;
    for (let pc of this.v.toArray()){
      let cur = 'ijk'[i];
      i++;
      if (pc === 0) continue;
      else if (pc > 0) res += ` + ${Math.abs(pc)}${cur}`;
      else res += ` - ${Math.abs(pc)}${cur}`;
    }
    return res;
  }
}
