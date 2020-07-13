let currentRecord;
let paused;
let lineSpacing;

// User Input

let sliderTimeFrame;

function foo() {
  paused = true;
}

function setup() {
  createCanvas(1000, 500);

  currentRecord = 0;
  paused = false;

  sliderTimeFrame = createSlider(0, data.x.length, 0);
  sliderTimeFrame.input(foo);
  sliderTimeFrame.position(10, 10);
}

function draw() {
  noStroke();
  background(255);

  // Left hand side
  drawGrid(10, height);
  drawData(data, currentRecord, height, height);
  drawTimeSeries(500, 250, 500, 250, data.y, data.alert, currentRecord, 165, 7, 245);
  drawTimeSeries(500, 500, 500, 250, data.x, data.alert, currentRecord, 0, 162, 71);

  if ((currentRecord < data.x.length) && !paused) {
    currentRecord++;
  } else {
    currentRecord = sliderTimeFrame.value()
  }

  sliderTimeFrame.value(currentRecord);
}

function drawData(data, limit, w, h) {
  noStroke();
  for (let i = 0; i < limit; i++) {
    let x = data.x[i];
    let y = data.y[i];
    let alert = data.alert[i];
    
    if (alert == 1) {
      fill(255, 0, 0);
    } else {
      fill(0, 0, 255, 50);
    }
    // 1 - y orients the y-axis to point up
    ellipse(w * x, h * (1 - y), 10, 10);
  }
}

function drawGrid(nlines, edgeLength) {
  let space = edgeLength / nlines;

  stroke(200);
  for (let i = 0; i <= nlines; i++) {
    line(i * space, 0, i * space, edgeLength);
    line(0, i * space, edgeLength, i * space);
  }
}

function drawTimeSeries(
  chartLeftEdge, chartBottomEdge, 
  chartWidth, chartHeight, 
  series, 
  alert,
  limit,
  r, g, b) {

  stroke(0);
  line(chartLeftEdge, chartBottomEdge, chartLeftEdge + chartWidth, chartBottomEdge);
  line(chartLeftEdge, chartBottomEdge, chartLeftEdge, chartBottomEdge - chartHeight);

  stroke(r, g, b, 60);

  noFill();
  beginShape();
  // assume data are normalised
  for (let i = 0; i < limit; i++) {
    let x = chartLeftEdge + (i / series.length) * chartWidth;
    let y = chartBottomEdge - series[i] * chartHeight;
    //ellipse(x, y, 5, 5);
    vertex(x, y);
  }
  endShape();

  noStroke();
  fill(255, 0, 0);
  for (let i = 0; i < limit; i++) {
    if (alert[i] > 0) {
      let x = chartLeftEdge + (i / series.length) * chartWidth;
      let y = chartBottomEdge - series[i] * chartHeight;
      ellipse(x, y, 3, 3);
    }
  }

}