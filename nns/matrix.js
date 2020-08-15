//a = Matrix(3,2)

class Matrix {
  constructor(rows,cols) {
    this.rows = rows;
    this.cols = cols;
    this.matrix = [];
    for(let i=0; i < this.rows; i++){
      this.matrix.push([]);
    }
    // Assigning all values to 0
    for(let i=0; i<this.rows; i++){
      for(let j=0; j<this.cols; j++){
        this.matrix[i].push(0);
      }
    }
  }

  randomize(){
    for(let i=0; i<this.rows; i++){
      for(let j=0; j<this.cols; j++){
        this.matrix[i][j] = Math.random()*10-5;
      }
    }
  }
  add(a){
    if(a instanceof Matrix){
      if(a.cols===this.cols && a.rows === this.rows){
        for(let i=0; i<this.rows; i++){
          for(let j=0; j<this.cols; j++){
            this.matrix[i][j] +=a.matrix[i][j];
          }
        }
      }
    }
    else {
      for(let i=0; i<this.rows; i++){
        for(let j=0; j<this.cols; j++){
          this.matrix[i][j] +=a;
        }
      }
    }
  }
  subtract(a){
    if(a instanceof Matrix){
      if(a.cols===this.cols && a.rows === this.rows){
        for(let i=0; i<this.rows; i++){
          for(let j=0; j<this.cols; j++){
            this.matrix[i][j] -=a.matrix[i][j];
          }
        }
      }
    }
    else {
      for(let i=0; i<this.rows; i++){
        for(let j=0; j<this.cols; j++){
          this.matrix[i][j] -=a;
        }
      }
    }
  }
  multiply(a){
    for(let i=0; i<this.rows; i++){
      for(let j=0; j<this.cols; j++){
        this.matrix[i][j] *=a;
      }
    }
  }
  static cross(a,b){
    if(a.cols===b.rows){
      let result = new Matrix(a.rows,b.cols);
      for(let i=0; i<a.rows; i++){
        for(let j=0; j<b.cols; j++){
          let sum = 0;
          for(let k=0; k<a.cols; k++){
            sum+=a.matrix[i][k]*b.matrix[k][j];
          }
          result.matrix[i][j] = sum;
        }
      }
      return result;
    }
  }
  static T(a){
    /* To do transpose of a matrix*/
    let result = new Matrix(a.cols,a.rows);
    for(let i=0; i<a.rows; i++){
      for(let j=0; j<a.cols; j++){
        result.matrix[j][i] = a.matrix[i][j];
      }
    }
    return result;
  }

  map(fun){
    for(let i=0; i<this.rows; i++){
      for(let j=0; j<this.cols; j++){
        this.matrix[i][j] = fun(this.matrix[i][j]);
      }
    }
  }

  static hadmard(a,b){
    let result = new Matrix(a.rows,a.cols);
    for(let i=0; i<a.rows; i++){
      for(let j=0; j<b.cols; j++){
        result.matrix[i][j] = a.matrix[i][j]*b.matrix[i][j];
      }
    }
    return result;
  }
  static print(a){
    // Printing the matrix in a tabled form on console
    console.table(a.matrix);
  }
}
