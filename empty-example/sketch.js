let brain;
let canvas;
function setup() {
    brain = new NeuralNet();
    brain.buildNeuralNet();
    canvas = createCanvas(400, 400);
    canvas.parent('canvas-holder');
}
function draw() {
  // noLoop();
    background(0);
    fill(255);
    ellipse(mouseX,mouseY,5,5);
    let first = map(mouseX,0,400,0,1);
    let second = map(mouseY,0,400,0,1);
    brain.train(first,second);
    drawCircle();
}
function drawCircle(){
  // compare prediction values against actual values
  const prediction = brain.predict();
  var mappedPredictionX = map(prediction[0],0,1,0,400);
  var mappedPredictionY = map(prediction[1],0,1,0,400);
  noFill();
  stroke(255);
  strokeWeight(2);
  ellipse(mappedPredictionX,mappedPredictionY,20,20);
}
function handleSubmit(){
  let loss = document.getElementById('loss_drop').value;
  let optimizer = document.getElementById('optimizer_drop').value;
  let activation = document.getElementById('activation_drop').value;

  let epoch = parseInt(document.getElementById('epochs_text').value);
  let hidden = parseInt(document.getElementById('hidden_text').value);
  let learning_rate = parseFloat(document.getElementById('lr_text').value);
  console.log(epoch,hidden,learning_rate)
  if(isNaN(epoch) || epoch < 0)
  {
  //  alert('Enter a valid integer for epoch');
    epoch = 1;
    console.log(typeof(epoch));
  }
  if(isNaN(hidden) || hidden < 0)
  {
    //alert('Enter a valid integer for hidden');
    hidden = 2;
  }
  if(isNaN(learning_rate) || learning_rate >= 1 || learning_rate <= 0)
  {
    //alert('Enter a valid integer for learning_rate');
    learning_rate = 0.2;
  }
  brain= new NeuralNet(learning_rate,optimizer,activation,hidden,loss,epoch);
  brain.buildNeuralNet();
}
