class NeuralNet{
  constructor(LR=0.2,optimizer="sgd",activation="sigmoid",hiddenLayers=2,lossF="meanSquaredError",epochs=1){
    this.LR = LR;
    this.optimizer = optimizer;
    this.activation = activation;
    this.hiddenLayers = hiddenLayers;
    this.lossFunction = lossF;
    this.epochs = epochs;
    this.model = tf.sequential();
    // allow use to create custom Neural net
  }
  buildNeuralNet() {
      // Neural network with 2 inputs x,y and 2 outputs the x,y of the circle

      const hidden = tf.layers.dense({
         units:2,
         inputShape:[2],
         activation:this.activation
      });
      const outputs = tf.layers.dense({
         units:2,
         inputShape:[2],
         activation:this.activation

      });
      this.model.add(hidden);
      this.model.add(outputs);
      let userOptimizer;
      switch (this.optimizer) {
          case "adam": userOptimizer = tf.train.adam(this.LR); break;
          case "adamax": userOptimizer = tf.train.adamax(this.LR); break;
          case "adadelta": userOptimizer = tf.train.adadelta(this.LR); break;
          case "rmsprop": userOptimizer = tf.train.rmsprop(this.LR); break;
          default:  userOptimizer = tf.train.sgd(this.LR);
      }
      let userLoss;
      switch (this.lossFunction){
          case "absoluteDifference": userLoss = tf.losses.absoluteDifference;break;
          case "cosineDistance": userLoss = tf.losses.cosineDistance;break;
          case "logLoss": userLoss = tf.losses.logLoss;break;
          case "softmaxCrossEntropy": userLoss = tf.losses.softmaxCrossEntropy;break;
          default: userLoss = tf.losses.meanSquaredError;
      }
      this.model.compile({
          optimizer:userOptimizer,
          loss:userLoss
      });
  }
  async train(first,second){
      //console.log("Training...");
      // train the neural network with the mouse x and y position
      const tensor_xs = tf.tensor2d([[first,second]]);
      const tensor_ys = tf.tensor2d([[first,second]]);
      const history = await this.model.fit(tensor_xs,tensor_ys,{
          epochs:this.epochs,
          shuffle:true
      });
      tensor_xs.dispose();
      tensor_ys.dispose();
      return history;
  }

  predict(x,y){
      // make a prediction based on the current mouse x and y location normalized to a value in => [0,1]
      let mappedX = map(x,0,400,0,1);
      let mappedY = map(y,0,400,0,1);
      const prediction = tf.tensor2d([[mappedX,mappedY]]);
      const output = this.model.predict(prediction);
      let predictionX = output.dataSync()[0];
      let predictionY = output.dataSync()[1];
      prediction.dispose();
      output.dispose();
      return [predictionX,predictionY];
  }
  reset(learning_rate,optimizer,activation,hidden,lossFunction,epoch){
    this.LR = learning_rate;
    this.optimizer = optimizer;
    this.activation = activation;
    this.hiddenLayers = hidden;
    this.lossFunction = lossFunction;
    this.epochs = epoch;
    this.buildNeuralNet();
  }
}
