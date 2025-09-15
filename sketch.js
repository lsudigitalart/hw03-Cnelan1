let hexRadius = 40;
let innerScaleNormal = 0.5;
let innerScaleSmall = 0.2;
let innerScaleHoverFactor = 1.8; 

let palette = [
  '#0A8E71', '#27CEAC', '#99E9C2',
  '#FFFFFF', '#7BACE4', '#5249C8', '#3E1B79'
];

let hexagons = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(RADIANS);
  noStroke();
  colorMode(RGB);
  
  let hexHeight = sqrt(3) * hexRadius;
  let horizSpacing = 1.5 * hexRadius;
  let vertSpacing = hexHeight;

  for (let row = 0; row < height / vertSpacing + 1; row++) {
    for (let col = 0; col < width / horizSpacing + 1; col++) {
      let x = col * horizSpacing;
      let y = row * vertSpacing;

      if (col % 2 === 1) y += vertSpacing / 2;

      let outerColor = random(palette);
      hexagons.push({
        x,
        y,
        outerColor,
        clicked: false,
        innerScale: innerScaleNormal,
        targetScale: innerScaleNormal
      });
    }
  }
}

function draw() {
  background(255);

  for (let h of hexagons) {
    let baseScale = h.clicked ? innerScaleSmall : innerScaleNormal;

    
    if (pointInHexagon(mouseX, mouseY, h.x, h.y, hexRadius)) {
      h.targetScale = baseScale * innerScaleHoverFactor;
    } else {
      h.targetScale = baseScale;
    }

    
    h.innerScale = lerp(h.innerScale, h.targetScale, 0.1);
    
    stroke(2);
    strokeWeight(15);
    drawHexagon(h.x, h.y, hexRadius, h.outerColor);
    
    noStroke();
    drawHexagon(h.x, h.y, hexRadius * h.innerScale, color(0));
  }
}



function mousePressed() {
  for (let h of hexagons) {
    if (pointInHexagon(mouseX, mouseY, h.x, h.y, hexRadius)) {
      h.clicked = !h.clicked;
      break; 
    }
  }
}

function drawHexagon(x, y, r, col) {
  fill(col);
  beginShape();
  for (let a = 0; a < TWO_PI; a += TWO_PI / 6) {
    let sx = x + cos(a) * r;
    let sy = y + sin(a) * r;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}


function pointInHexagon(px, py, hx, hy, r) {
  let dx = abs(px - hx);
  let dy = abs(py - hy);
  if (dx > r * 1.5 || dy > sqrt(3) * r / 2) return false;

  
  return sqrt((px - hx) ** 2 + (py - hy) ** 2) < r * 1.1;
}
