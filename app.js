const video = document.getElementById("webCam");
const canvas = document.getElementById("canvasCam");
const context = canvas.getContext("2d");
let updateNote = document.getElementById("message");

// context.translate(video.width, 0);
// context.scale(-1, 1);
let x;
let y;
let outsideRadius = 150;
let insideRadius = 100;
var num = 5;
var points = [
  [0, 0],
  [100, 50],
  [500, 360],
];
let img;
let pix = [];
var buffer;
var videoCanvas;
let label = "waiting...";
let classifier;

let renderVideo = true;
let videoLoaded = false;
let model = null;
let xCord;
let yCord;
let xCord2;
let yCord2;

const modelParams = {
  flipHorizontal: true, // flip e.g for video
  maxNumBoxes: 2, // maximum number of boxes to detect
  iouThreshold: 0.07, // ioU threshold for non-max suppression
  scoreThreshold: 0.6, // confidence threshold for predictions.
};

handTrack.load(modelParams).then((lmodel) => {
  // detect objects in the image.
  model = lmodel;
  updateNote.innerText = "";
  startVideo();
});

function startVideo() {
  handTrack.startVideo(video).then(function (status) {
    // console.log("video started", status);
    if (status) {
      updateNote.innerText = "";
      videoLoaded = true;
      runDetection();
    } else {
      updateNote.innerText = "Please enable video";
    }
  });
}

function runDetection() {
  model.detect(video).then((predictions) => {
    if (predictions[0]) {
      let bboxX = predictions[0].bbox[0] + predictions[0].bbox[2] / 2;
      let bboxY = predictions[0].bbox[1] + predictions[0].bbox[3] / 2;
      xCord = bboxX;
      yCord = bboxY;
      if (predictions[1]) {
        let bboxX2 = predictions[1].bbox[0] + predictions[1].bbox[2] / 2;
        let bboxY2 = predictions[1].bbox[1] + predictions[1].bbox[3] / 2;
        xCord2 = bboxX2;
        yCord2 = bboxY2;
      } else {
        xCord2 = null;
        yCord2 = null;
      }
    } else {
      xCord = null;
      yCord = null;
      xCord2 = null;
      yCord2 = null;
    }
    if (renderVideo) {
      model.renderPredictions(predictions, canvas, context, video);
    }
    if (videoLoaded) {
      requestAnimationFrame(runDetection);
    }
  });
}
var delaunay = Delaunator.from(points);
function preload() {
  img = loadImage("assets/redtoys.jpg");
  // classifier = ml5.imageClassifier(
  //   "https://teachablemachine.withgoogle.com/models/JkqWQxQIG/model.json"
  // );
}
function setup() {
  translate(200, 0, 0);
  buffer = createGraphics(img.width, img.height);
  createCanvas(img.width, img.height);
  // canvasP.parent("triangleCanvas");
  //background(204);
  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      pix.push(img.get(i, j));
    }
  }

  // video = createCapture(VIDEO);
  // video.size(320, 240);
  // classifyVideo();
}
// function classifyVideo() {
//   classifier.classify(buffer, gotResults);
// }
function draw() {
  background(204);
  // push();
  // scale(-1, 1);
  // translate(-img.width, 0);
  var tempX1, tempX2, tempY1, tempY2;

  if (xCord != null && yCord != null) {
    tempX1 = int(map(video.width - xCord, 0, video.width, 0, img.width));
    tempY1 = int(map(yCord, 0, video.height, 0, img.height));
    points.push([tempX1, tempY1]);
    console.time("delaunay");
    delaunay = Delaunator.from(points);
    console.timeEnd("delaunay");
  }
  if (xCord2 != null && yCord2 != null) {
    tempX2 = int(map(video.width - xCord2, 0, video.width, 0, img.width));
    tempY2 = int(map(yCord2, 0, video.height, 0, img.height));
    points.push([tempX2, tempY2]);
    console.time("delaunay");
    delaunay = Delaunator.from(points);
    console.timeEnd("delaunay");
  }
  // pop();
  var triangles = delaunay.triangles;
  buffer.noStroke();

  for (let i = 0; i < triangles.length; i += 3) {
    var ii = points[triangles[i]][0];
    var jj = points[triangles[i]][1];
    buffer.fill(pix[ii * img.height + jj]);
    buffer.triangle(
      points[triangles[i]][0],
      points[triangles[i]][1],
      points[triangles[i + 1]][0],
      points[triangles[i + 1]][1],
      points[triangles[i + 2]][0],
      points[triangles[i + 2]][1]
    );
  }
  image(buffer, 0, 0);
  // textSize(32);
  // textAlign(CENTER, CENTER);
  // fill(255);
  // text(label, width / 2, height - 16);
  // rect(0, 0, video.width, video.height);
  noFill();
  if (xCord != null && yCord != null) {
    ellipse(tempX1, tempY1, width / 12);
  }
  if (xCord2 != null && yCord2 != null) {
    ellipse(tempX2, tempY2, width / 12);
  }
}

function mouseDragged() {
  if (mouseX <= buffer.width && mouseX <= buffer.width) {
    points.push([mouseX, mouseY]);
    console.time("delaunay");
    delaunay = Delaunator.from(points);
    console.timeEnd("delaunay");
  }
}

// function gotResults(error, results) {
//   if (error) {
//     console.error(error);
//     return;
//   }
//   console.log(results);
//   label = results[0].label;
//   classifyVideo();
// }
