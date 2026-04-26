// DM2008 — Mini Project
// FLAPPY BIRD (Starter Scaffold)

// Notes for students:
// 1) Add flap control in keyPressed() (space / ↑ to jump)
// 2) Detect collisions between the bird and pipes → game over
// 3) Add scoring when you pass a pipe
// 4) (Stretch) Add start/pause/game-over states

/* ----------------- Globals ----------------- */
let bird;
let pipes = [];

let score = 0;

let spawnCounter = 0; // simple timer
const SPAWN_RATE = 90; // ~ every 90 frames at 60fps ≈ 1.5s
const PIPE_SPEED = 2.5;
const PIPE_GAP = 150; // gap height (try 100–160)
const PIPE_W = 60;

let img1, img2, img3;
let font1;
let sound1;

let isLooping = true;
let isPaused = false;
/* ----------------- Setup & Draw ----------------- */

function preload() {
  img1 = loadImage("assets/background2.PNG");
  img2 = loadImage("assets/orb.PNG");
  img3 = loadImage("assets/game-over.png");
  font1 = loadFont("assets/Blackadder ITC Std Regular.otf");
  sound1 = loadSound("assets/Magdalena Bay - Image.mp3");
}

function setup() {
  createCanvas(480, 640);
  noStroke();
  bird = new Bird(120, height / 2);
  // Start with one pipe so there's something to see
  pipes.push(new Pipe(width + 40));
  sound1.loop();
}

function draw() {
  image(img1, 0, 0, width, height);

  // 1a update world
  bird.update();

  // 1b spawn new pipes on a simple timer
  spawnCounter++;
  if (spawnCounter >= SPAWN_RATE) {
    pipes.push(new Pipe(width + 40));
    spawnCounter = 0;
  }

  // update + draw pipes
  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].update();
    pipes[i].show();

    // TODO (students): collision check with bird
    // Hint: call pipes[i].hits(bird) here
    if (pipes[i].hits(bird)) {
      bird.alive = false;
      pipes[i].highlight = true;
    }

    if (bird.alive == false) {
      push();
      imageMode(CENTER);
      image(img3, width / 2, height / 2, 450, 450);
      pop();
      fill(255, 240, 200);
      textFont(font1);
      textSize(60);
      textAlign(CENTER);
      text(score, width / 2, height / 2 + 20);
      if (isLooping === true) {
        sound1.pause();
        isPaused = true;
      }
    } else {
      fill(255, 240, 200);
      textFont(font1);
      textSize(60);
      textAlign(CENTER);
      text(score, 460, 40);
    }

    // remove pipes that moved off screen
    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  // 2) draw bird last so it's on top
  bird.show();
}

/* ----------------- Input ----------------- */
function keyPressed() {
  // TODO (students): make the bird flap on space or UP arrow
  // Uncomment the lines below to enable flapping:
  if (key === " " || keyCode === UP_ARROW) {
    bird.flap();
  }
  if (key === "r" || key === "R") {
    resetSketch();
  }
}

//IMPT!!!!reset method: create a function reset and then call it upon key pressed
function resetSketch() {
  bird = new Bird(120, height / 2);
  pipes = [];
  score = 0;
  if (isPaused === true) {
    sound1.play();
    isLooping = true;
  }
}

/* ----------------- Classes ----------------- */
class Bird {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = 16; // for collision + draw
    this.gravity = 0.4; // constant downward force
    this.flapStrength = -7.5; // negative = upward movement
    this.alive = true;
  }

  applyForce(fy) {
    this.acc.y += fy;
  }

  flap() {
    // instant upward kick (negative velocity = up)
    this.vel.y = this.flapStrength;
  }

  update() {
    // gravity
    this.applyForce(this.gravity);

    // integrate
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // keep inside canvas vertically (simple constraints)
    if (this.pos.y < this.r) {
      this.pos.y = this.r;
      this.vel.y = 0;
    }
    if (this.pos.y > height - this.r) {
      this.pos.y = height - this.r;
      this.vel.y = 0;
      // TODO (students): treat touching the ground as game over
      this.alive = false;
    }
  }

  show() {
    if (this.alive) {
      push();
      imageMode(CENTER);
      image(img2, this.pos.x, this.pos.y, 40, 40);
      pop();
      // fill(255, 205, 80);
      // circle(this.pos.x, this.pos.y, this.r * 2);
      // // (Optional) add a small eye
      // fill(40);
      // circle(this.pos.x + 6, this.pos.y - 4, 4);
      // fill(232, 130, 142);
      // ellipse(this.pos.x + 3, this.pos.y + 3, 8, 6);
    }
  }
}

class Pipe {
  constructor(x) {
    this.x = x;
    this.w = PIPE_W;
    this.speed = PIPE_SPEED;

    // randomize gap position
    const margin = 40;
    const gapY = random(margin, height - margin - PIPE_GAP);

    this.top = gapY; // bottom of top pipe
    this.bottom = gapY + PIPE_GAP; // top of bottom pipe

    this.passed = false; // for scoring once per pipe
    this.highlight = false;
  }

  update() {
    this.x -= this.speed;

    if (
      bird.pos.x + bird.r > this.x &&
      this.passed == false &&
      this.hits(bird) == false &&
      bird.alive
    ) {
      this.passed = true;
      score++;
      //console.log(score);
    }
  }

  show() {
    if (this.highlight) {
      fill(244, 87, 66);
    } else {
      fill(12, 92, 232);
    }
    rect(this.x, 0, this.w, this.top); // top pipe
    rect(this.x, this.bottom, this.w, height - this.bottom);
    // bottom pipe
  }

  offscreen() {
    // look at MDN to understand what 'return' does
    // we will learn more about this in Week 6
    return this.x + this.w < 0;
  }

  // TODO (students): Uncomment this collision detection method
  // Circle-rect collision check (simple version)
  // 1) Check if bird is within pipe's x range
  // 2) If yes, check if bird.y is outside the gap (above top OR below bottom)
  //
  hits(bird) {
    const withinX =
      bird.pos.x + bird.r > this.x && bird.pos.x - bird.r < this.x + this.w;
    const aboveGap = bird.pos.y - bird.r < this.top;
    const belowGap = bird.pos.y + bird.r > this.bottom;

    return withinX && (aboveGap || belowGap);
  }
}
