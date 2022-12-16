var w = 800;
var h = 200;
var d = 500;

var test_device_x, test_device_y, test_device_z;

function setup() {
  createCanvas(500, 500, WEBGL);
  var camera = createEasyCam();
  document.oncontextmenu = () => false;
  camera.setDistance(max(w,h) + 100);
  camera.rotateX(PI + 0.7);
  camera.panX(w / 2);
  
  test_device_x = createSlider(0, w, w / 2); // random(0, w);
  test_device_y = createSlider(0, h, h / 2); // random(0, h);
  test_device_z = createSlider(0, d, d / 2); // random(0, d);
}


function draw() {
  push();
  translate(w / 2, h / 2, d / 2);
  background(230);
  stroke('black');
  noFill();
  strokeWeight(1);
  var b = box(w, h, d);
  pop();

  push();
  stroke('red');
  var center = createVector(0, 0, 0);
  strokeWeight(10);
  point(center);
  
  strokeWeight(5);
  stroke('blue');
  var left_top_back = createVector(0, h, d);
  var right_top_back = createVector(w, h, d);
  var right_top_front = createVector(w, h, 0);
  var left_top_front = createVector(0, h, 0);
  point(left_top_back);
  point(right_top_back);
  point(right_top_front);
  point(left_top_front);
  
  stroke('purple');
  var left_bottom_back = createVector(0, 0, d);
  var right_bottom_back = createVector(w, 0, d);
  var right_bottom_front = createVector(w, 0, 0);
  var left_bottom_front = createVector(0, 0, 0);
  point(left_bottom_back);
  point(right_bottom_back);
  point(right_bottom_front);
  point(left_bottom_front);
  
  stroke('orange');
  strokeWeight(10);
  var test_device = createVector(
    test_device_x.value(),
    test_device_y.value(),
    test_device_z.value());
  point(test_device);
  
  stroke('yellow');
  strokeWeight(2);
  var dltb = drawLine(left_top_back, test_device);
  var drtb = drawLine(right_top_back, test_device);
  var drtf = drawLine(right_top_front, test_device);
  var dltf = drawLine(left_top_front, test_device);
  
  var dlbb = drawLine(left_bottom_back, test_device);
  var drbb = drawLine(right_bottom_back, test_device);
  var drbf = drawLine(right_bottom_front, test_device);
  var dlbf = drawLine(left_bottom_front, test_device);

  output(dltb, drtb, drtf, dltf, dlbb, drbb, drbf, dlbf);

  pop();
}

function drawLine(v1, v2) {
  line(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
  return dist(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
}

function output(dltb, drtb, drtf, dltf, dlbb, drbb, drbf, dlbf) {
  var total = dltb + drtb + drtf + dltf + dlbb + drbb + drbf + dlbf;
  document.getElementById("output").innerHTML = `
  <table>
  
  <tr><td>Left | Top | Back </td><td> ${dltb.toFixed(2)} </td></tr>
  <tr><td>Right | Top | Back </td><td> ${drtb.toFixed(2)} </td></tr>
  <tr><td>Right | Top | Front </td><td> ${drtf.toFixed(2)} </td></tr>
  <tr><td>Left | Top | Front </td><td> ${dltf.toFixed(2)} </td></tr>

  <tr><td>Left | Bottom | Back </td><td> ${dlbb.toFixed(2)} </td></tr>
  <tr><td>Right | Bottom | Back </td><td> ${drbb.toFixed(2)} </td></tr>
  <tr><td>Right | Bottom | Front </td><td> ${drbf.toFixed(2)} </td></tr>
  <tr><td>Left | Bottom | Front </td><td> ${dlbf.toFixed(2)} </td></tr>

  <tr><td><b>Total</b> </td><td> ${total.toFixed(2)}</td></tr>
  </table>
  `;
}