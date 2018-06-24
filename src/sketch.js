let brain;
let canvas;
let point;
function setup() {
    brain = new NeuralNet();
    brain.buildNeuralNet();
    point = new Circle();
    canvas = createCanvas(400, 400);
    canvas.parent('canvas-holder');
}
function draw() {
    background(0);
    point.show();
    let first = map(point.getX(),0,400,0,1);
    let second = map(point.getY(),0,400,0,1);
    brain.train(first,second);
    drawCircle();
}
function mouseDragged(){
    point.update(mouseX,mouseY);

}
function drawCircle(){
  // compare prediction values against actual values
  const prediction = brain.predict(point.getX(),point.getY());
  let mappedPredictionX = map(prediction[0],0,1,0,400);
  let mappedPredictionY = map(prediction[1],0,1,0,400);
  noFill();
  stroke(255);
  strokeWeight(2);
  ellipse(mappedPredictionX,mappedPredictionY,40,40);
}
function handleSubmit(){
  let loss = document.getElementById('loss_drop').value;
  let optimizer = document.getElementById('optimizer_drop').value;
  let activation = document.getElementById('activation_drop').value;

  let epoch = document.getElementById('epochs_text').value;
  let hidden = document.getElementById('hidden_text').value;
  let learning_rate = document.getElementById('lr_text').value;
  console.log(epoch,hidden,learning_rate);
  if(isNaN(epoch) || epoch < 0)
  {
    alert("Epoch must be a positive number");
    epoch = 1;
    console.log(typeof(epoch));
  }
  if(isNaN(hidden) || hidden < 0)
  {
    alert("Hidden layers must be a positive number");
    hidden = 2;
  }
  if(learning_rate >= 1 || learning_rate <= 0)
  {
      alert("Learning rate must be an integer from 0 to 1");
      learning_rate = 0.2;
  }
  brain = new NeuralNet(learning_rate,optimizer,activation,hidden,loss,epoch);
  brain.buildNeuralNet();
}
function checkInput(x) {
    let regex=/^[0-9]+$/;
    if(x.match(regex)){
        alert("Must input numbers!");
        return false;
    }

}
