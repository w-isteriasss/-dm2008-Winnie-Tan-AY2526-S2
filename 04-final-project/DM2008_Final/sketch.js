let scale = [
  174.61,
  196.0,
  220.0,
  233.08,
  261.63,
  293.66,
  329.63, 
  349.23,
  392.0,
  440.0,
  466.16,
  523.25,
]; // establishing music scale

let mid, lead, bass, reverb; //setting indiv synth layers
let bassInput, midInput, leadInput; // setting sections to type words
let midfft, leadfft,bassfft; // for audio analysis

let loopInterval;
let loopSpeed = 200; //constant speed of notes
let ADSR = [0.05, 0.2, 0.2, 0.5];

let img;

function preload() {
  img = loadImage('synth2.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  
   //setting synths
  mid = new Synth(ADSR, 1);
  lead = new Synth(ADSR, 2);
  bass = new Synth(ADSR, 0.5);

  //setting reverb
  reverb = new p5.Reverb();
  reverb.process(bass.osc, 6, 2);
  reverb.process(mid.osc, 6, 2);
  reverb.process(lead.osc, 6, 2);

  //setting fft
  midfft = new p5.FFT();
  midfft.setInput(mid.osc);
  
  leadfft = new p5.FFT();
  leadfft.setInput(lead.osc);
  
  bassfft = new p5.FFT();
  bassfft.setInput(bass.osc);
  
   inputInterface();
}

function draw() {
  background(0);

  imageMode(CENTER);
  image(img, windowWidth/2, windowHeight/2);
  img.resize(0, windowHeight);
  
  spectrogram();
}

function inputInterface() {
  
  inputBass = createInput("");
  inputBass.position(windowWidth/2.1, windowHeight/2.7);
    inputBass.style('background-color', '#cbc7b9');
  inputBass.input(() => {
    bass.update(inputBass.value());
  });


  inputMid = createInput("");
  inputMid.position(windowWidth/2.1, windowHeight/2);
  inputMid.style('background-color', '#cbc7b9');
  inputMid.input(() => {
    mid.update(inputMid.value());
  });

  inputLead = createInput("");
  inputLead.position(windowWidth/2.1, windowHeight/1.60);
    inputLead.style('background-color', '#cbc7b9');
  inputLead.input(() => {
    lead.update(inputLead.value());
  });
}

function spectrogram() {
  let centerY = windowHeight / 2;

  // mid spectrogram
  if (mid.sequence.length > 0) {
    let spectrum = midfft.analyze();
    noStroke();
    fill(52, 195, 235, 60);
    for (let i = 0; i < spectrum.length; i++) {
      let x = map(i, 0, spectrum.length, 0, windowWidth);
      let h = map(spectrum[i], 0, 255, 0, windowHeight / 4); 
      rect(x, centerY, windowWidth / spectrum.length, -h); 
      rect(x, centerY, windowWidth / spectrum.length, h);  
    }
  }

  //  lead spectrogram 
  if (lead.sequence.length > 0) {
    let spectrum = leadfft.analyze();
    noStroke();
    fill(174, 225, 245, 100);
    for (let i = 0; i < spectrum.length; i++) {
      let x = map(i, 0, spectrum.length, 0, windowWidth);
      let h = map(spectrum[i], 0, 255, 0, windowHeight / 4);
      rect(x, centerY, windowWidth / spectrum.length, -h);
      rect(x, centerY, windowWidth / spectrum.length, h);
    }
  }

  //  bass spectrogram 
  if (bass.sequence.length > 0) {
    let spectrum = bassfft.analyze();
    noStroke();
    fill(41, 151, 230, 30);
    for (let i = 0; i < spectrum.length; i++) {
      let x = map(i, 0, spectrum.length, 0, windowWidth);
      let h = map(spectrum[i], 0, 255, 0, windowHeight / 4);
      rect(x, centerY, windowWidth / spectrum.length, -h);
      rect(x, centerY, windowWidth / spectrum.length, h);
    }
  }

}

function keyPressed() {
  userStartAudio();
  if (!loopInterval) {
    loopInterval = setInterval(() => {
      mid.play();
      lead.play();
      bass.play();
    }, loopSpeed);
  }
}


//creating synth as a class
class Synth {
  constructor(adsr, octave) {
    this.osc = new p5.Oscillator();
    this.osc.setType("sine");
    this.osc.amp(0);
    this.osc.start();

    this.env = new p5.Envelope();
    this.env.setADSR(ADSR[0], ADSR[1], ADSR[2], ADSR[3]);
    this.env.setRange(1.0, 0.0);

    this.octave = octave;
    this.counter = 0;
    this.sequence = [0];
    this.currentWord = "";
  }
  
  update(rawInput) {
    const val = rawInput.trim();
    if (val.length > 0) {
      this.sequence = val.split('');
      this.osc.amp(1); 
    } else {
      this.sequence = [0];
      this.osc.amp(0);
    }
    this.counter = 0; 
  } 
  
  play() {
    
    if (this.sequence.length === 0 || this.sequence[0] === 0) {
    this.osc.amp(0);
    return;
  }
    
    let note = this.sequence[this.counter % this.sequence.length];

    
    if (this.counter % this.sequence.length === 0) {
      this.currentWord = '';
    }


    if (note !== 0 && (isNaN(note) || note === ' ')) {
      this.currentWord += note;
      note = 1 + (note.charCodeAt(0) % scale.length);
    }

    
    if (note > 0) {
      this.osc.freq(scale[note - 1] * this.octave);
      this.env.play(this.osc);
    }
    this.counter++;
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

