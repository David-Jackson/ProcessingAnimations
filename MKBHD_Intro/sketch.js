
var n1 = 0;
var n2 = 0;
var ease = 0;

var TOTAL_FRAME_COUNT = 480;
var EASE_FRAME_COUNT = 120;
var noiseDirection = 1;

var bgColor = "#357cf0";

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(24);
    smooth(8);
    strokeWeight(1);

    var params = getURLParams();

    if (params.color) {
        bgColor = "#" + params.color;
    }
}

function draw() {

    background(bgColor);
  
    ease = easeInOutQuint(easeTriangle(timeCycle(EASE_FRAME_COUNT)));
    

    translate(0 - ease * (width / 2.0), 0 - ease * (height / 2.0));
    scale(1 + ease, 1 + ease);
  
    for (var i = 16; i < height; i += 41) {
      for (var j = 0; j < 8; j++) {
        stroke(255, 80);
        line(noise(5 + i + j + n1) * 1600 - 400,
             i,
             noise(5 + i + j + n1 + 0.03) * 1600 - 400,
             i);
  
        stroke(255, 200);
        line(noise(i + j + n2) * (width * 2) - (width / 2),
             i,
             noise(i + j + n2 + 0.04) * (width * 2) - (width / 2),
             i);
      }
    }
  
  
    // noiseDirection = (frameCount < (TOTAL_FRAME_COUNT / 2)) ? 1: -1;
    n1 = n1 + (noiseDirection * 0.003);
    // noiseDirection = ((frameCount > (TOTAL_FRAME_COUNT * 0.25)) && (frameCount < (TOTAL_FRAME_COUNT * 0.75))) ? 1: -1;
    n2 = n2 + (noiseDirection * 0.004);
}

function timeCycle(totalframes, offset = 0) {
  return float((frameCount + offset) % totalframes) / float(totalframes);
}

function easeTriangle(t) {
  return t<0.5 ? t*2 : 2-(t*2);
}

function easeInOutQuint(t) {
  return t<0.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t;
}
