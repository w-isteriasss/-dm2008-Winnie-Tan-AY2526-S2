// DM2008 – Activity 4a
// Bake a Cookie (30 min)

let cookie;

function setup() {
  createCanvas(400, 400);
  noStroke();
  cookie = new Cookie( "chocolate", 80, width/2, height/2);
  cookie2 = new Cookie( "chip", 80, width/2, height/2);

  // Step 3: make one cookie object
  // cookie = new Cookie("chocolate", 80, width/2, height/2);
}

function draw() {
  background(230);
  cookie.show();

  // Step 4: call the cookie’s show() method
  // cookie.show();
}

// Step 1: define the Cookie class
class Cookie {
  constructor(flavor, sz, x, y) {
    // set up required properties
    this.flavor = flavor;
    this.sz = sz;
    this.x = x;
    this.y = y;
  }

  // Step 2: display the cookie
  show() {
    switch (this.flavor) {
      case "chocolate":
        fill(196, 146, 96);
        ellipse(this.x, this.y, this.sz);
        break;
      case "chip":
        fill(232, 220, 195);
        ellipse(this.x, this.y, this.sz);
        const s = this.sz * 0.1;
        fill(60);
        ellipse(this.x - this.sz*0.22, this.y - this.sz*0.15, s);
        ellipse(this.x + this.sz*0.18, this.y - this.sz*0.10, s);
        ellipse(this.x - this.sz*0.05, this.y + this.sz*0.12, s);
        ellipse(this.x + this.sz*0.20, this.y + this.sz*0.18, s);
        break;
      default:
        fill(220, 180, 120);
    }
    
  }

  // Steps 5 & 6: Implement additional methods here
}

function keyPressed() {
  switch(key) {
    case '1':
      cookie.flavor = "chocolate";
      break;
    case '2':
      cookie.flavor = "chip";
      break;
  }
}
      
      

// Step 5: add movement (keyboard arrows)
// function keyPressed() {}

// Step 6: add flavor randomizer (mouse click)
// function mousePressed() {}
