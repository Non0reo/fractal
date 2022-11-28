let fShader;
let BoxZoom;
let BoxPanX, BoxPanY;
let minS, maxS;
let xPanS, yPanS;

let zoom, xPan, yPan;

function preload() {
  fShader = loadShader('assets/shaders/fractals.vert', 'assets/shaders/fractals.frag')
}

function setup() {
  //createCanvas(900, 600, WEBGL);
  createCanvas(400, 400, WEBGL);
  minS = createSlider(-2.5, 0, -2.5, 0.0001);
  BoxZoom = createInput(minS.value())
  //maxS = createSlider(0, 2.5, 2.5, 0.0001);
  // xPan = createSlider(-7.5, 2.5, -2.5, 0.01);
  // yPan = createSlider(-7.5, 2.5, -2.5, 0.01);
  xPanS = createSlider(-2.5, 2.5, 0, 0.0001);
  yPanS = createSlider(-2.5, 2.5, 0, 0.0001);
  BoxPanX = createInput(xPanS.value())
  BoxPanY = createInput(yPanS.value())

  zoom = BoxZoom.value();
  xPan = BoxPanX.value();
  yPan = BoxPanY.value();
  shader(fShader);
  fShader.setUniform('u_resolution', [width, height]);
}

function draw() {
  minS.input(() => {
    BoxZoom.value(minS.value());
    zoom = minS.value();
  });

  BoxZoom.input(() => {
    minS.value(BoxZoom.value());
    zoom = BoxZoom.value();
  });


  xPanS.input(() => {
    BoxPanX.value(xPanS.value());
    xPan = xPanS.value();
  });

  BoxPanX.input(() => {
    xPanS.value(BoxPanX.value());
    xPan = BoxPanX.value();
  });

  yPanS.input(() => {
    BoxPanY.value(yPanS.value());
    yPan = yPanS.value();
  });

  BoxPanY.input(() => {
    yPanS.value(BoxPanY.value());
    yPan = BoxPanY.value();
  });
  
  fShader.setUniform('u_zoom', [zoom, 0]);
  fShader.setUniform('u_pan', [xPan - zoom / 2, yPan - zoom / 2]);
  fShader.setUniform('maxI', 50);
  rect(0, 0, width, height); //Put a rect on the screen to make it visible and so, activate the shader
}
