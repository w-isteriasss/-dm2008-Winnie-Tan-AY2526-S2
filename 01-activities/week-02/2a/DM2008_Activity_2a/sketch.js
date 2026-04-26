// DM2008 — Activity 2a
// (Mode Switch, 20 min)

let x = 0;        // ellipse x-position
let size = 50;    // ellipse size (you can change this in your if/else)
let bgColor;      // background color set by switch(key)

function setup() {
  createCanvas(400, 400);
  bgColor = color(0);
}

function draw() {
  background(bgColor);
  
  fill(255);
  ellipse(x, height / 2, size);
  
  x += 2;
  // Wrap around when it exits the right edge
  if (x > width + size / 2) {
    x = 0;
  }
  
  if (mouseIsPressed) {
  fill(random(255), random(255), random(255));
  ellipse(x, height / 2, size+10);
  }
  
  if (mouseIsPressed && keyIsPressed) {
  background(255, random(1, 255));
  }
    
   
}

// --- Mode switching with number keys: 1, 2, 3 ---
function keyPressed() {
  switch (key) {
    case '1':
      size = 20
      break;
    case '2':
      size = 50
      break;
    case '3':
      size = 80
      break;
    default:
      size = 100        
  }
  
 
}