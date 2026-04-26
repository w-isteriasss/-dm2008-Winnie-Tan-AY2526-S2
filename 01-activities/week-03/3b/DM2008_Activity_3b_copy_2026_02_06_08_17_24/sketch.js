// DM2008 — Activity 3b
// (One Function Wonder, 20 min)
let angle = 0;

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  drawFlower(width/2, height/2, mouseY, 70);
  drawWater(mouseX, mouseY, 40, 70);

  // TODO 1:
  // Define a function that draws something (a shape or group of shapes).
  // It should take at least one parameter (e.g., position, size, or color).
function drawFlower (x, y, sz, sh) {
  fill('#ff9cdb');
  noStroke();
  ellipse(x + 50, y, sh, sz);
  ellipse(x - 50, y, sh, sz);
  ellipse(x, y + 50, sz, sh);
  ellipse(x, y - 50, sz, sh);
  
  fill('#ffc73b');
  noStroke();
  ellipse(x, y, 50);
  
}
  
function drawWater(x, y, w, h) {
  fill(240);
  stroke(240);
  strokeWeight(3);
  rect(x, y, w, h);
  fill('#69d3fa');
  rect(x, y, w, h);
 
}
  
  // TODO 2:
  // Call your function multiple times with different parameter values.
  // myShape(100, 200, 50);
  // myShape(300, 200, 80);

  // TODO 3:
  // (Challenge) Call your function inside a for loop
  // to create a repeating pattern or variation.
}

// Example starter function:
// function myShape(x, y, s) {
//   ellipse(x, y, s, s);
// }