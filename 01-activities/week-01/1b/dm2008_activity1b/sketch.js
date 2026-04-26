// DM2008
// Activity 1b (Ryoji Ikeda)

let x;
let w;
let y;
let c;


function setup() {
  createCanvas(600, 600);
  background(0);
  noStroke();
  fill(0);
}

function draw() {
  background(0, 20);
  
  c = color(random(255), random(255), random(255));
  fill(c);
  x = random(width);
  w = random(1, 15);
  y = random(mouseY, mouseX);
  ellipse(x, y, w, height, 50);
  
  x = random(width);
  stroke('#d3ed11');
  strokeWeight(1);
  ellipse(x, height/2, w, height);
  
  x = random(width);
  ellipse(x, y, w, height, 50);
}

function mousePressed() {
  blendMode(OVERLAY);
}

function mouseReleased() {
  blend(NORMAL);
}

