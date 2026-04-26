// DDM2008
// Activity 1a

// Run the sketch, then click on the preview to enable keyboard
// Use the 'Option' ('Alt' on Windows) key to view or hide the grid
// Use the 'Shift' key to change overlays between black & white
// Write the code for your creature in the space provided

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background('#CBEB59');
  
  //cherries
  fill('#DE2B28');
  noStroke();
  ellipse(140, 250, 90, 85);
  ellipse(260, 250, 90, 85);
  
  //stems
  noFill();
  stroke('#4A270D');
  strokeWeight(5);
  angleMode (DEGREES);
  arc(130, 150, 90, 180, -70, 65);
  arc(250, 150, 90, 180, -70, 65);
  
  //eyes
  fill('#4A270D');
  circle(125, 263, 5);
  circle(155, 263, 5);
  circle(245, 263, 5);
  circle(275, 263, 5);
  
  fill('#4A270D');
  ellipse(140, 279, 10, 5);
  ellipse(260, 279, 10, 5);
  
  
  
  
  
  
 
  helperGrid(); // do not edit or remove this line
}
