// DM2008 — Activity 2b
// (Pattern Making, 40 min)

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
}

function draw() {
  background(0);
  stroke(random(255), random(255), random(255));
  strokeWeight(random(5));

  // A simple horizontal row of shapes using a 1D loop
  for (let i = 0; i < width; i += 50) {
  
  if (keyIsPressed) {
    if (i/50 % 2 == 1) {
      fill(random(255), random(255), random(255));
  } else {
    fill(0);
  }
}
    
  if(mouseIsPressed) {
    rect(i + 1, i + 1, mouseX, mouseY);
  } else {
    rect(i + 25, i + 30, 40);
  }
    // TODO: add an if() condition to alternate shape, size, or color
    // (hint: use % modulo to alternate every other shape)
  }

  // TODO: add one interaction (mouse or key) to change the rule
  // (hint: try changing fill() or size when mouseIsPressed)
}