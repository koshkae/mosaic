const video = document.getElementById("webCam");
const canvas = document.getElementById("canvasCam");
const context = canvas.getContext("2d");
let updateNote = document.getElementById("message");

let x, y;
var num = 5;
var points = [
  [500, 250],
  [520, 348],
  [679, 400],
  [510, 330],
  [512, 447],
];
var myObj = {
  score: [
    { name: "name", time: "- sec", level: "none", sec: "120" },
    { name: "name", time: "- sec", level: "none", sec: "120" },
    { name: "name", time: "- sec", level: "none", sec: "120" },
    { name: "name", time: "- sec", level: "none", sec: "120" },
    { name: "name", time: "- sec", level: "none", sec: "120" },
    { name: "name", time: "- sec", level: "none", sec: "120" },
    { name: "name", time: "- sec", level: "none", sec: "120" },
    { name: "name", time: "- sec", level: "none", sec: "120" },
    { name: "name", time: "- sec", level: "none", sec: "120" },
  ],
};
var myJSON;
var pntsCntTiger = 0,
  pntsCntParrot = 0,
  toysCnt = 0;
let tigerBool = false,
  parrotBool = false;
let tigerPng, parrotPng;
var userName;
let checked = true;
var counter = 0;
var timeLeft = 120;
var countTimeBy2sec = 12;
var output, txtFromLocal, obj;
let img, s;
let pix = [];
var buffer, videoCanvas;
let renderVideo = true,
  videoLoaded = false;
let model = null;
let xCord, yCord, xCord2, yCord2;
let dSize = 4;

window.onload = function () {
  var txt;
  var person = prompt("Please enter your name:", "Guest");
  if (person == null || person == "") {
    window.location.replace("level.html");
  } else {
    txt = person.substr(0, 10);
  }
  userName = txt;
  s = "Good luck " + userName + "!";
};

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
var delaunay;
function preload() {
  img = loadImage("imgs/easy01.jpg");
  tigerPng = loadImage("pngs/easy1.png");
  parrotPng = loadImage("pngs/easy2.png");
  if (localStorage.getItem("Highscore") === null) {
    myJSON = JSON.stringify(myObj);
    localStorage.setItem("Highscore", myJSON);
  } else {
    txtFromLocal = localStorage.getItem("Highscore");
    obj = JSON.parse(txtFromLocal);
    if (obj.score.length != 9) {
      myJSON = JSON.stringify(myObj);
      localStorage.setItem("Highscore", myJSON);
    } else console.log("yes umnu ni togloj bsan bna ");
  }
}

function convertSeconds(s) {
  var min = floor(s / 60);
  var sec = s % 60;
  return "Timer: " + nf(min, 2) + ":" + nf(sec, 2);
}

function convertSeconds1(s) {
  var min = floor(s / 60);
  var sec = s % 60;
  return nf(min, 2) + ":" + nf(sec, 2);
}
function setup() {
  buffer = createGraphics(img.width, img.height);
  let cnv = createCanvas(img.width, img.height);
  cnv.parent("myContainer");
  var timer = select("#timer");
  timer.html(convertSeconds(timeLeft - counter));
  var interval = setInterval(timeIt, 1000);
  function timeIt() {
    counter++;
    timer.html(convertSeconds(timeLeft - counter));
    if (counter == timeLeft || !checked) {
      clearInterval(interval);
      //counter = 0;
      var go = document.createElement("IMG");
      go.setAttribute("id", "gameover");
      go.setAttribute("src", "assets/Group 33.png");

      var realImg = document.createElement("IMG");
      realImg.setAttribute("src", "imgs/easy01.jpg");
      realImg.setAttribute("id", "gameover1");

      document.body.appendChild(go);
      document.body.appendChild(realImg);
    }
  }
  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      pix.push(img.get(i, j));
    }
  }
  textSize(20);
}

function draw() {
  background(204);

  var tempX1, tempX2, tempY1, tempY2;
  if (xCord != null && yCord != null) {
    tempX1 = int(map(xCord, 0, video.width, 0, img.width));
    tempY1 = int(map(yCord, 0, video.height, 0, img.height));
    if (tempX1 > 278 && tempX1 < 494 && tempY1 > 321 && tempY1 < 502) {
      if (pntsCntTiger < 2200) {
        //tiger shalgah
        //if (!points.includes([tempX1, tempY1])) {
        points.push([tempX1, tempY1]);
        pntsCntTiger++;
        //}
        // if (!points.includes([tempX1 - dSize, tempY1])) {
        points.push([tempX1 - dSize, tempY1]);
        pntsCntTiger++;
        //}
        // if (!points.includes([tempX1 + dSize, tempY1])) {
        points.push([tempX1 + dSize, tempY1]);
        pntsCntTiger++;
        //}
        // if (!points.includes([tempX1, tempY1 - dSize])) {
        points.push([tempX1, tempY1 - dSize]);
        pntsCntTiger++;
        // }
        // if (!points.includes([tempX1, tempY1 + dSize])) {
        points.push([tempX1, tempY1 + dSize]);
        pntsCntTiger++;
        // }
      }
    } else if (tempX1 > 533 && tempX1 < 736 && tempY1 > 202 && tempY1 < 489) {
      // parrot shalgah
      if (pntsCntParrot < 2800) {
        //  if (!points.includes([tempX1, tempY1])) {
        points.push([tempX1, tempY1]);
        pntsCntParrot++;
        //    }
        //   if (!points.includes([tempX1 - dSize, tempY1])) {
        points.push([tempX1 - dSize, tempY1]);
        pntsCntParrot++;
        // }
        // if (!points.includes([tempX1 + dSize, tempY1])) {
        points.push([tempX1 + dSize, tempY1]);
        pntsCntParrot++;
        // }
        // if (!points.includes([tempX1, tempY1 - dSize])) {
        points.push([tempX1, tempY1 - dSize]);
        pntsCntParrot++;
        // }
        // if (!points.includes([tempX1, tempY1 + dSize])) {
        points.push([tempX1, tempY1 + dSize]);
        pntsCntParrot++;
        // }
      }
    } else {
      // if (!points.includes([tempX1, tempY1]))
      points.push([tempX1, tempY1]);
      // if (!points.includes([tempX1 - dSize, tempY1]))
      points.push([tempX1 - dSize, tempY1]);
      // if (!points.includes([tempX1 + dSize, tempY1]))
      points.push([tempX1 + dSize, tempY1]);
      // if (!points.includes([tempX1, tempY1 - dSize]))
      points.push([tempX1, tempY1 - dSize]);
      // if (!points.includes([tempX1, tempY1 + dSize]))
      points.push([tempX1, tempY1 + dSize]);
    }
  }
  if (xCord2 != null && yCord2 != null) {
    tempX2 = int(map(xCord2, 0, video.width, 0, img.width));
    tempY2 = int(map(yCord2, 0, video.height, 0, img.height));
    if (tempX2 > 278 && tempX2 < 494 && tempY2 > 321 && tempY2 < 502) {
      if (pntsCntTiger < 2200) {
        // TIGER shalgah heseg
        // if (!points.includes([tempX2, tempY2])) {
        points.push([tempX2, tempY2]);
        pntsCntTiger++;
        // }
        // if (!points.includes([tempX2 - dSize, tempY2])) {
        points.push([tempX2 - dSize, tempY2]);
        pntsCntTiger++;
        // }
        // if (!points.includes([tempX2 + dSize, tempY2])) {
        points.push([tempX2 + dSize, tempY2]);
        pntsCntTiger++;
        // }
        // if (!points.includes([tempX2, tempY2 - dSize])) {
        points.push([tempX2, tempY2 - dSize]);
        pntsCntTiger++;
        // }
        // if (!points.includes([tempX2, tempY2 + dSize])) {
        points.push([tempX2, tempY2 + dSize]);
        pntsCntTiger++;
        // }
      }
    } else if (tempX2 > 533 && tempX2 < 736 && tempY2 > 202 && tempY2 < 489) {
      // PARROT shalgah
      if (pntsCntParrot < 2800) {
        // if (!points.includes([tempX2, tempY2])) {
        points.push([tempX2, tempY2]);
        pntsCntParrot++;
        // }
        // if (!points.includes([tempX2 - dSize, tempY2])) {
        points.push([tempX2 - dSize, tempY2]);
        pntsCntParrot++;
        // }
        // if (!points.includes([tempX2 + dSize, tempY2])) {
        points.push([tempX2 + dSize, tempY2]);
        pntsCntParrot++;
        // }
        // if (!points.includes([tempX2, tempY2 - dSize])) {
        points.push([tempX2, tempY2 - dSize]);
        pntsCntParrot++;
        // }
        // if (!points.includes([tempX2, tempY2 + dSize])) {
        points.push([tempX2, tempY2 + dSize]);
        pntsCntParrot++;
        // }
      }
    } else {
      // if (!points.includes([tempX2, tempY2]))
      points.push([tempX2, tempY2]);
      // if (!points.includes([tempX2 - dSize, tempY2]))
      points.push([tempX2 - dSize, tempY2]);
      // if (!points.includes([tempX2 + dSize, tempY2]))
      points.push([tempX2 + dSize, tempY2]);
      // if (!points.includes([tempX2, tempY2 - dSize]))
      points.push([tempX2, tempY2 - dSize]);
      // if (!points.includes([tempX2, tempY2 + dSize]))
      points.push([tempX2, tempY2 + dSize]);
    }
  }
  //2 secondiin daraa 10 tseg ustgah
  if (counter == countTimeBy2sec) {
    if (points.length > 20) {
      points.shift();
      points.shift();
      points.shift();
      points.shift();
      points.shift();
      points.shift();
      points.shift();
      points.shift();
      points.shift();
      points.shift();
      points.shift();
      points.shift();
      points.shift();
      points.shift();
      points.shift();
      points.shift();
      points.shift();
      points.shift();
      points.shift();
      points.shift();
    }
    countTimeBy2sec = countTimeBy2sec + 1;
  }
  if (pntsCntTiger == 2200 && !tigerBool) {
    toysCnt++;
    tigerBool = true;
    s = "You have just found a TIGER :D";
  }
  if (pntsCntParrot == 2800 && !parrotBool) {
    toysCnt++;
    parrotBool = true;
    s = "You have just found a PARROT :D";
  }
  delaunay = Delaunator.from(points);
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
  if (tigerBool) image(tigerPng, 0, 0);
  if (parrotBool) image(parrotPng, 0, 0);
  buffer.clear();
  noFill();
  if (xCord != null && yCord != null) {
    ellipse(tempX1, tempY1, width / 12);
  }
  if (xCord2 != null && yCord2 != null) {
    ellipse(tempX2, tempY2, width / 12);
  }
  // console.log(points.length);  tsegiin toog hevlej harah
  document.getElementById("p1").innerHTML = "Toys: " + toysCnt + "/2";
  let htTxt = "<tr><th>#</th><th>Name</th><th>Time</th><th>Level</th></tr>";
  txtFromLocal = localStorage.getItem("Highscore");
  obj = JSON.parse(txtFromLocal);
  for (var num = 0; num < 9; num++) {
    htTxt =
      htTxt +
      "<tr><td id='num'>" +
      (num + 1) +
      "</td><td>" +
      obj.score[num].name +
      "</td><td>" +
      obj.score[num].time +
      "</td><td>" +
      obj.score[num].level +
      "</td></tr>";
    myObj.score[num].name = obj.score[num].name;
    myObj.score[num].time = obj.score[num].time;
    myObj.score[num].level = obj.score[num].level;
    myObj.score[num].sec = obj.score[num].sec;
  }
  //   console.log(txtFromLocal);
  document.getElementById("highscore").innerHTML =
    "<table>" + htTxt + "</table>";
  if (toysCnt == 2) {
    for (var num = 0; num < 9; num++) {
      if (checked) {
        //console.log(obj.score.length);
        console.log(int(obj.score[num].sec));
        console.log(counter);
        if (counter < int(obj.score[num].sec)) {
          let tempObj = obj;
          if (num + 1 < 9) {
            for (var aaaa = num + 1; aaaa < 9; aaaa++) {
              myObj.score[aaaa].name = tempObj.score[aaaa - 1].name;
              myObj.score[aaaa].time = tempObj.score[aaaa - 1].time;
              myObj.score[aaaa].level = tempObj.score[aaaa - 1].level;
              myObj.score[aaaa].sec = tempObj.score[aaaa - 1].sec;
            }
          }
          myObj.score[num].name = userName;
          myObj.score[num].time = convertSeconds1(counter);
          myObj.score[num].level = "Easy";
          myObj.score[num].sec = counter;
          myJSON = JSON.stringify(myObj);
          localStorage.setItem("Highscore", myJSON);
          checked = false;
        }
      }
    }
  }
  fill(242, 92, 5);
  text(s, 10, 10, 700, 80); // Text wraps within text box
}

function mouseDragged() {
  if (
    mouseX <= buffer.width - dSize &&
    mouseX >= dSize &&
    mouseY <= buffer.height - dSize &&
    mouseY >= dSize
  ) {
    if (mouseX > 278 && mouseX < 494 && mouseY > 321 && mouseY < 502) {
      if (pntsCntTiger < 2200) {
        // TIGER shalgah heseg
        if (!points.includes([mouseX, mouseY])) {
          points.push([mouseX, mouseY]);
          pntsCntTiger++;
        }
        if (!points.includes([mouseX - dSize, mouseY])) {
          points.push([mouseX - dSize, mouseY]);
          pntsCntTiger++;
        }
        if (!points.includes([mouseX + dSize, mouseY])) {
          points.push([mouseX + dSize, mouseY]);
          pntsCntTiger++;
        }
        if (!points.includes([mouseX, mouseY - dSize])) {
          points.push([mouseX, mouseY - dSize]);
          pntsCntTiger++;
        }
        if (!points.includes([mouseX, mouseY + dSize])) {
          points.push([mouseX, mouseY + dSize]);
          pntsCntTiger++;
        }
      }
    } else if (mouseX > 533 && mouseX < 736 && mouseY > 202 && mouseY < 489) {
      // PARROT shalgah
      if (pntsCntParrot < 2800) {
        if (!points.includes([mouseX, mouseY])) {
          points.push([mouseX, mouseY]);
          pntsCntParrot++;
        }
        if (!points.includes([mouseX - dSize, mouseY])) {
          points.push([mouseX - dSize, mouseY]);
          pntsCntParrot++;
        }
        if (!points.includes([mouseX + dSize, mouseY])) {
          points.push([mouseX + dSize, mouseY]);
          pntsCntParrot++;
        }
        if (!points.includes([mouseX, mouseY - dSize])) {
          points.push([mouseX, mouseY - dSize]);
          pntsCntParrot++;
        }
        if (!points.includes([mouseX, mouseY + dSize])) {
          points.push([mouseX, mouseY + dSize]);
          pntsCntParrot++;
        }
      }
    } else {
      if (!points.includes([mouseX, mouseY])) points.push([mouseX, mouseY]);
      if (!points.includes([mouseX - dSize, mouseY]))
        points.push([mouseX - dSize, mouseY]);
      if (!points.includes([mouseX + dSize, mouseY]))
        points.push([mouseX + dSize, mouseY]);
      if (!points.includes([mouseX, mouseY - dSize]))
        points.push([mouseX, mouseY - dSize]);
      if (!points.includes([mouseX, mouseY + dSize]))
        points.push([mouseX, mouseY + dSize]);
    }
  }
}
