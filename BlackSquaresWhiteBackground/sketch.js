var dotSize = 100;
var dotSpacing = 40;

var paddingLeft;
var paddingTop;

var noiseIndex = 26;
var noiseIncrement = 0.004;

var noiseRadius = 10;
var noiseTheta = 0;
var deltaTheta = 1.0 / 1200.0; // 1200 frames


var header = document.getElementById("header");
var titleView = {
    duration: 100,
    active: 100
};

function setup() {
    createCanvas(windowWidth, windowHeight);

    noiseSeed(1234);

    paddingLeft = (width % dotSpacing) / 2;
    paddingTop = (height % dotSpacing) / 2;
  
    //colorMode(HSB);
    rectMode(CENTER);
}

function draw() {
    
    trackMouse();

    background(255);
  
    noStroke();
    fill(0);
    for (var x = paddingLeft; x < width + dotSpacing; x = x + dotSpacing) {
        var noiseX = (x / dotSpacing) / 50.0;
      for (var y = paddingTop; y < height + dotSpacing; y = y + dotSpacing) {
        var noiseY = (y / dotSpacing) / 50.0;
        var n = noise(noiseIndex, noiseX, noiseY);
        var s = map(n, 0, 1, 0, dotSize);
        //float c = map(n, 0, 1, 227, 125);// 125, 227);
        // var c = map(n, 0, 1, 0, 255);// 125, 227);
        //fill(c, 255, 255);
        // fill(c);
        rect(x, y, s, s, s / 8);
        // ellipse(x, y, s, s);
      }
    }
    noiseIndex += noiseIncrement;
  
    //fill(0, 0, 255);
    //textSize(60);
    //text(frameCount + " | " + noiseIndex, 20, 100);
}

function trackMouse() {
    if (mouseX != pmouseX || mouseY != pmouseY) {
        titleView.active = titleView.duration;
        header.className = "headerVisible";
    }
    if (titleView.active == 0) {
        titleView.active--;
        header.className = "headerHidden";
    } else if (titleView.active > 0) {
        titleView.active--;
    }
}