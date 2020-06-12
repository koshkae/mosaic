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
  [0, 648],
  [1079, 0],
  [500, 300],
  [1079, 647],
];

var pntsCntCar = 0,
  pntsCntHeli = 0,
  pntsCntTiger = 0,
  pntsCntParrot = 0,
  toysCnt = 0;
var counter = 0;
var timeLeft = 120;
let img;
let pix = [];
var buffer;
var videoCanvas;

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
  scoreThreshold: 0.65, // confidence threshold for predictions.
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
  img = loadImage("imgs/redtoys.jpg");
}

function convertSeconds(s) {
  var min = floor(s / 60);
  var sec = s % 60;
  return "Timer: " + nf(min, 2) + ":" + nf(sec, 2);
}
function setup() {
  translate(200, 0, 0);
  buffer = createGraphics(img.width, img.height);
  createCanvas(img.width + 100, img.height);
  var timer = select("#timer");
  timer.html(convertSeconds(timeLeft - counter));
  var interval = setInterval(timeIt, 1000);
  function timeIt() {
    counter++;
    timer.html(convertSeconds(timeLeft - counter));
    if (counter == timeLeft) {
      clearInterval(interval);
      counter = 0;
    }
  }

  // canvasP.parent("triangleCanvas");
  //background(204);
  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      pix.push(img.get(i, j));
    }
  }
  // video = createCapture(VIDEO);
  // video.size(320, 240);
}
let s = "";
function draw() {
  background(204);

  var tempX1, tempX2, tempY1, tempY2;

  if (xCord != null && yCord != null) {
    tempX1 = int(map(video.width - xCord, 0, video.width, 0, img.width));
    tempY1 = int(map(yCord, 0, video.height, 0, img.height));
    if (tempX1 > 418 && tempX1 < 761 && tempY1 > 403 && tempY1 < 556) {
      if (pntsCntCar < 2500) {
        //car shalgah
        points.push([tempX1, tempY1]);
        delaunay = Delaunator.from(points);
        pntsCntCar++;
        if (pntsCntCar == 2500) {
          toysCnt++;
          s = "Congratulations! You have just found a RACECAR :D";
        }
      }
    } else if (tempX1 > 830 && tempX1 < 1024 && tempY1 > 274 && tempY1 < 447) {
      // tiger shalgah
      if (pntsCntTiger < 1500) {
        points.push([tempX1, tempY1]);
        delaunay = Delaunator.from(points);
        pntsCntTiger++;
        if (pntsCntTiger == 1500) {
          toysCnt++;
          s = "Congratulations! You have just found a TIGER :D";
        }
      }
    } else if (tempX1 > 55 && tempX1 < 409 && tempY1 > 276 && tempY1 < 462) {
      //helicopter shalgah
      if (pntsCntHeli < 3000) {
        points.push([tempX1, tempY1]);
        delaunay = Delaunator.from(points);
        pntsCntHeli++;
        if (pntsCntHeli == 3000) {
          toysCnt++;
          s = "Congratulations! You have just found a HELICOPTER :D";
        }
      }
    } else if (tempX1 > 508 && tempX1 < 668 && tempY1 > 134 && tempY1 < 413) {
      // parrot shalgah
      if (pntsCntParrot < 2300) {
        points.push([tempX1, tempY1]);
        delaunay = Delaunator.from(points);
        pntsCntParrot++;
        if (pntsCntParrot == 2300) {
          toysCnt++;
          s = "Congratulations! You have just found a PARROT :D";
        }
      }
    } else {
      points.push([tempX1, tempY1]);
      delaunay = Delaunator.from(points);
    }
  }
  if (xCord2 != null && yCord2 != null) {
    tempX2 = int(map(video.width - xCord2, 0, video.width, 0, img.width));
    tempY2 = int(map(yCord2, 0, video.height, 0, img.height));
    if (tempX2 > 418 && tempX2 < 761 && tempY2 > 403 && tempY2 < 556) {
      if (pntsCntCar < 2500) {
        // car shalgah heseg
        points.push([tempX2, tempY2]);
        delaunay = Delaunator.from(points);
        pntsCntCar++;
        if (pntsCntCar == 2500) {
          toysCnt++;
          s = "Congratulations! You have just found a RACECAR :D";
        }
      }
    } else if (tempX2 > 830 && tempX2 < 1024 && tempY2 > 274 && tempY2 < 447) {
      // tiger shalgah
      if (pntsCntTiger < 1500) {
        points.push([tempX2, tempY2]);
        delaunay = Delaunator.from(points);
        pntsCntTiger++;
        if (pntsCntTiger == 1500) {
          toysCnt++;
          s = "Congratulations! You have just found a TIGER :D";
        }
      }
    } else if (tempX2 > 55 && tempX2 < 409 && tempY2 > 276 && tempY2 < 462) {
      //helicopter shalgah
      if (pntsCntHeli < 3000) {
        points.push([tempX2, tempY2]);
        delaunay = Delaunator.from(points);
        pntsCntHeli++;
        if (pntsCntHeli == 3000) {
          toysCnt++;
          s = "Congratulations! You have just found a HELICOPTER :D";
        }
      }
    } else if (tempX2 > 508 && tempX2 < 668 && tempY2 > 134 && tempY2 < 413) {
      // parrot shalgah
      if (pntsCntParrot < 2300) {
        points.push([tempX2, tempY2]);
        delaunay = Delaunator.from(points);
        pntsCntParrot++;
        if (pntsCntParrot == 2300) {
          toysCnt++;
          s = "Congratulations! You have just found a PARROT :D";
        }
      }
    } else {
      points.push([tempX2, tempY2]);
      delaunay = Delaunator.from(points);
    }
  }
  // pop();
  var triangles = delaunay.triangles;
  buffer.noStroke();
  // for (let j = 0; j < points.length; j++) {
  //   if (
  //     points[j][0] > 418 &&
  //     points[j][0] < 761 &&
  //     points[j][1] > 403 &&
  //     points[j][0] < 556
  //   )
  //     pntsCount++;
  // }
  console.log(pntsCntCar);
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
  image(buffer, 100, 0);
  // textSize(32);
  // textAlign(CENTER, CENTER);
  // fill(255);
  // text(label, width / 2, height - 16);
  //rect(0, 0, video.width, video.height);
  noFill();
  if (xCord != null && yCord != null) {
    ellipse(tempX1 + 100, tempY1, width / 12);
  }
  if (xCord2 != null && yCord2 != null) {
    ellipse(tempX2 + 100, tempY2, width / 12);
  }
  console.log(points.length);

  fill(50);
  text(s, 10, 10, 70, 80); // Text wraps within text box
  document.getElementById("p1").innerHTML = "Toys: " + toysCnt + "/4";
}

function mouseDragged() {
  if (
    mouseX <= buffer.width &&
    mouseX >= 100 &&
    mouseY <= buffer.height &&
    mouseY >= 0
  ) {
    if (mouseX > 518 && mouseX < 861 && mouseY > 403 && mouseY < 556) {
      if (pntsCntCar < 2500) {
        points.push([mouseX - 100, mouseY]);
        delaunay = Delaunator.from(points);
        pntsCntCar++;
      }
    } else {
      points.push([mouseX - 100, mouseY]);
      delaunay = Delaunator.from(points);
    }
  }
}
