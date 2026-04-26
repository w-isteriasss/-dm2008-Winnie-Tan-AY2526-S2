// DM2008 – Activity 5a
// Colliding Circles (30 min)

let balls = [];
let c;

function setup() {
  createCanvas(400, 400);
  balls.push(new Ball(100,100));
  balls.push(new Ball(200,200));
             
  // Step 1: create two Ball objects
  // balls.push(new Ball(x, y));
  // balls.push(new Ball(x, y));
}

function draw() {
  background(43, 37, 34);

  // Step 2: update and display each ball
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    b.move();
    b.show();
    b.checkCollision(balls)
  // Step 3: check collisions
  // Use dist() between ball centers
  // Trigger feedback (color, bounce, etc.)
  }
}

class Ball {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.r = 40;
    this.vel = createVector(random(-2, 3), random(-2, 3));
  }

  move() {
    this.pos.add(this.vel);
     if (this.pos.x < this.r || this.pos.x > width - this.r) {
      this.vel.x *= -1;
    }
    if (this.pos.y <  this.r || this.pos.y > height - this.r) {
      this.vel.y *= -1;
    }
    
    // TODO: wrap around OR bounce off edges
  }

  show() {
    fill(176, 89, 227);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }

  // Step 4: Add a method to checkCollision(others)
  // Use dist() and respond visually
  checkCollision(others) {
    for (let i = 0; i < others.length; i++) {
      // Make sure we do not compare the ball to itself
      if (others[i] !== this) {
        let other = others[i];
        let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
        if (d < this.r + other.r) {
          push();
          stroke(201, 235, 49);
          strokeWeight(10);
          fill(201, 235, 49);
          ellipse(this.pos.x, this.pos.y, this.r * 2); // highlight on collision
          pop();
          this.vel.x *= -1;
          this.vel.y *= -1;
        }
      }
    }
  }
}