
sinp = new Matrix(2,1);
k = new NeuralNetwork([2,1]);
var sout= new Matrix(1,1);

for(let i=0; i<10000; i++){
  sinp.matrix[0][0] = Math.floor(Math.random()*2);
  sinp.matrix[1][0] = Math.floor(Math.random()*2);
  sout.matrix[0][0] = sinp.matrix[0][0] | sinp.matrix[1][0];
  //console.log(sinp.matrix[0][0],sinp.matrix[1][0],sout.matrix[0][0]);
  k.train(sinp,sout);
}
data = [];
data.push(new Matrix(2,1));
data.push(new Matrix(2,1));
data.push(new Matrix(2,1));
data.push(new Matrix(2,1));
data[0].matrix[0][0] = 0;
data[0].matrix[1][0] = 0;
data[1].matrix[0][0] = 0;
data[1].matrix[1][0] = 1;
data[2].matrix[0][0] = 1;
data[2].matrix[1][0] = 0;
data[3].matrix[0][0] = 1;
data[3].matrix[1][0] = 1;

for(let i=0; i<4; i++){
  Matrix.print(k.feed_forward(data[i]));
}
