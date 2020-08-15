class NeuralNetwork{
  constructor(layer_sizes) {
    this.eta = 0.1;  // This is learning rate
    this.biases = []; // contains biases for each layer except input layer
    this.weights = []; // weights between layers
    this.weight_errors = [];
    this.bias_errors = [];
    for(let i=1; i<layer_sizes.length; i++){
      this.biases.push( new Matrix(layer_sizes[i],1));
      this.weights.push(new Matrix(layer_sizes[i],layer_sizes[i-1]));
      // this.bias_errors.push( new Matrix(layer_sizes[i],1));
      // this.weight_errors.push(new Matrix(layer_sizes[i],layer_sizes[i-1]));
    }
    //length of weights and biases are same
    for(let i=0;i<this.biases.length;i++){
      this.biases[i].randomize();
      this.weights[i].randomize();
    }
  }
  feed_forward(inputs){
    let output;
    for(var i=0; i<this.weights.length; i++){
      output = Matrix.cross(this.weights[i],inputs);
      output.add(this.biases[i]);
      output.map(sigmoid);
      inputs = output;
    }
    return output;
  }

  train(training_data,training_output){
    let activations = [];
    let outputs;
    let inputs = training_data;
    activations.push(inputs);
    for(let i=0; i<this.weights.length; i++){
      outputs = Matrix.cross(this.weights[i],inputs);
      outputs.add(this.biases[i]);
      outputs.map(sigmoid);
      inputs = outputs;
      activations.push(inputs);
    }
    let error = new Matrix(outputs.rows,outputs.cols);
    for(let i=0; i<outputs.rows; i++){
      for(let j=0; j<outputs.cols; j++){
        error.matrix[i][j] = 2*this.eta*(outputs.matrix[i][j]-training_output.matrix[i][j])*outputs.matrix[i][j]*(1-outputs.matrix[i][j]);
      }
    }
    let errorw = Matrix.cross(error,Matrix.T(activations[activations.length-2]));
    let errorb = error;
    this.weight_errors.push(errorw);
    this.bias_errors.push(errorb);
    let m=0;
    for(let i=activations.length-3; i>=0; i--){
      outputs = activations[i+1];
      error = Matrix.cross(Matrix.T(this.weights[i+1]),error);
      for(let j=0; j<error.rows; j++){
        for(let k=0; k<error.cols; k++){
          error.matrix[j][k] *= activations[i+1].matrix[j][k]*(1-activations[i+1].matrix[j][k]);
        }
      }
      errorw = Matrix.cross(error,Matrix.T(activations[i]));
      errorb = error;
      this.weight_errors.push(errorw);
      this.bias_errors.push(errorb);
    }
    this.bias_errors.reverse();
    this.weight_errors.reverse();
    for(let i=0;i<this.weights.length; i++){
      this.weights[i].subtract(this.weight_errors[i]);
      this.biases[i].subtract(this.bias_errors[i]);

    }
  }
  cost(test_data,test_output){
    let outputs = this.feed_forward(test_data);
    outputs.subtract(test_output);
    outputs.map(square);
    let error=0;
    for(let i=0; i< outputs.rows; i++){
      for (let j=0; j<outputs.cols; j++){
        error+=outputs.matrix[i][j];
      }
    }
    return error;
  }
}

function square(a){
  return Math.pow(a,2);
}

function sigmoid(a){
  return 1/(1+Math.exp(-a));
}

function sigmoid_derrivative(a){
  return sigmoid(a)*(1-sigmoid(a));
}
