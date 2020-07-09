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
    { name: "name", time: "- sec", level: "none", sec: "180" },
    { name: "name", time: "- sec", level: "none", sec: "180" },
    { name: "name", time: "- sec", level: "none", sec: "180" },
    { name: "name", time: "- sec", level: "none", sec: "180" },
    { name: "name", time: "- sec", level: "none", sec: "180" },
    { name: "name", time: "- sec", level: "none", sec: "180" },
    { name: "name", time: "- sec", level: "none", sec: "180" },
    { name: "name", time: "- sec", level: "none", sec: "180" },
    { name: "name", time: "- sec", level: "none", sec: "180" },
  ],
};
var myJSON;
var pntsCntHeli = 0,
  pntsCntCar = 0,
  pntsCntParrot = 0,
  pntsCntTiger = 0,
  pntsCntFlamingo = 0,
  pntsCntPlane = 0,
  toysCnt = 0;
let carBool = false,
  tigerBool = false,
  heliBool = false,
  flamingoBool = false,
  planeBool = false,
  parrotBool = false;
var userName;
let checked = true;
var counter = 0;
var timeLeft = 180;
var countTimeBy2sec = 12;
var output, txtFromLocal, obj, obj1;
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
var output, txtFromLocal, obj, obj1;
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
var delaunay = Delaunator.from(points);
function preload() {
  img = loadImage("imgs/many.jpg");
  if (localStorage.getItem("Highscore") === null) {
    myJSON = JSON.stringify(myObj);
    localStorage.setItem("Highscore", myJSON);
  } else {
    if (myObj.score.length != 9) {
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
      realImg.setAttribute("src", "imgs/many.jpg");
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
    if (tempX1 > 290 && tempX1 < 481 && tempY1 > 282 && tempY1 < 378) {
      if (pntsCntCar < 1000) {
        //car shalgah
        if (!points.includes([tempX1, tempY1])) {
          points.push([tempX1, tempY1]);
          pntsCntCar++;
        }
        if (!points.includes([tempX1 - dSize, tempY1])) {
          points.push([tempX1 - dSize, tempY1]);
          pntsCntCar++;
        }
        if (!points.includes([tempX1 + dSize, tempY1])) {
          points.push([tempX1 + dSize, tempY1]);
          pntsCntCar++;
        }
        if (!points.includes([tempX1, tempY1 - dSize])) {
          points.push([tempX1, tempY1 - dSize]);
          pntsCntCar++;
        }
        if (!points.includes([tempX1, tempY1 + dSize])) {
          points.push([tempX1, tempY1 + dSize]);
          pntsCntCar++;
        }
      }
    } else if (tempX1 > 343 && tempX1 < 522 && tempY1 > 450 && tempY1 < 614) {
      // tiger shalgah
      if (pntsCntTiger < 1000) {
        if (!points.includes([tempX1, tempY1])) {
          points.push([tempX1, tempY1]);
          pntsCntTiger++;
        }
        if (!points.includes([tempX1 - dSize, tempY1])) {
          points.push([tempX1 - dSize, tempY1]);
          pntsCntTiger++;
        }
        if (!points.includes([tempX1 + dSize, tempY1])) {
          points.push([tempX1 + dSize, tempY1]);
          pntsCntTiger++;
        }
        if (!points.includes([tempX1, tempY1 - dSize])) {
          points.push([tempX1, tempY1 - dSize]);
          pntsCntTiger++;
        }
        if (!points.includes([tempX1, tempY1 + dSize])) {
          points.push([tempX1, tempY1 + dSize]);
          pntsCntTiger++;
        }
      }
    } else if (tempX1 > 720 && tempX1 < 980 && tempY1 > 70 && tempY1 < 205) {
      //helicopter shalgah
      if (pntsCntHeli < 1300) {
        if (!points.includes([tempX1, tempY1])) {
          points.push([tempX1, tempY1]);
          pntsCntHeli++;
        }
        if (!points.includes([tempX1 - dSize, tempY1])) {
          points.push([tempX1 - dSize, tempY1]);
          pntsCntHeli++;
        }
        if (!points.includes([tempX1 + dSize, tempY1])) {
          points.push([tempX1 + dSize, tempY1]);
          pntsCntHeli++;
        }
        if (!points.includes([tempX1, tempY1 - dSize])) {
          points.push([tempX1, tempY1 - dSize]);
          pntsCntHeli++;
        }
        if (!points.includes([tempX1, tempY1 + dSize])) {
          points.push([tempX1, tempY1 + dSize]);
          pntsCntHeli++;
        }
      }
    } else if (tempX1 > 430 && tempX1 < 560 && tempY1 > 30 && tempY1 < 220) {
      // parrot shalgah
      if (pntsCntParrot < 800) {
        if (!points.includes([tempX1, tempY1])) {
          points.push([tempX1, tempY1]);
          pntsCntParrot++;
        }
        if (!points.includes([tempX1 - dSize, tempY1])) {
          points.push([tempX1 - dSize, tempY1]);
          pntsCntParrot++;
        }
        if (!points.includes([tempX1 + dSize, tempY1])) {
          points.push([tempX1 + dSize, tempY1]);
          pntsCntParrot++;
        }
        if (!points.includes([tempX1, tempY1 - dSize])) {
          points.push([tempX1, tempY1 - dSize]);
          pntsCntParrot++;
        }
        if (!points.includes([tempX1, tempY1 + dSize])) {
          points.push([tempX1, tempY1 + dSize]);
          pntsCntParrot++;
        }
      }
    } else if (tempX1 > 145 && tempX1 < 300 && tempY1 > 85 && tempY1 < 335) {
      // flamingo shalgah
      if (pntsCntFlamingo < 1500) {
        if (!points.includes([tempX1, tempY1])) {
          points.push([tempX1, tempY1]);
          pntsCntFlamingo++;
        }
        if (!points.includes([tempX1 - dSize, tempY1])) {
          points.push([tempX1 - dSize, tempY1]);
          pntsCntFlamingo++;
        }
        if (!points.includes([tempX1 + dSize, tempY1])) {
          points.push([tempX1 + dSize, tempY1]);
          pntsCntFlamingo++;
        }
        if (!points.includes([tempX1, tempY1 - dSize])) {
          points.push([tempX1, tempY1 - dSize]);
          pntsCntFlamingo++;
        }
        if (!points.includes([tempX1, tempY1 + dSize])) {
          points.push([tempX1, tempY1 + dSize]);
          pntsCntFlamingo++;
        }
      }
    } else if (tempX1 > 645 && tempX1 < 950 && tempY1 > 220 && tempY1 < 460) {
      // PLANE shalgah
      if (pntsCntPlane < 1500) {
        if (!points.includes([tempX1, tempY1])) {
          points.push([tempX1, tempY1]);
          pntsCntPlane++;
        }
        if (!points.includes([tempX1 - dSize, tempY1])) {
          points.push([tempX1 - dSize, tempY1]);
          pntsCntPlane++;
        }
        if (!points.includes([tempX1 + dSize, tempY1])) {
          points.push([tempX1 + dSize, tempY1]);
          pntsCntPlane++;
        }
        if (!points.includes([tempX1, tempY1 - dSize])) {
          points.push([tempX1, tempY1 - dSize]);
          pntsCntPlane++;
        }
        if (!points.includes([tempX1, tempY1 + dSize])) {
          points.push([tempX1, tempY1 + dSize]);
          pntsCntPlane++;
        }
      }
    } else {
      if (!points.includes([tempX1, tempY1])) points.push([tempX1, tempY1]);
      if (!points.includes([tempX1 - dSize, tempY1]))
        points.push([tempX1 - dSize, tempY1]);
      if (!points.includes([tempX1 + dSize, tempY1]))
        points.push([tempX1 + dSize, tempY1]);
      if (!points.includes([tempX1, tempY1 - dSize]))
        points.push([tempX1, tempY1 - dSize]);
      if (!points.includes([tempX1, tempY1 + dSize]))
        points.push([tempX1, tempY1 + dSize]);
    }
  }
  if (xCord2 != null && yCord2 != null) {
    tempX2 = int(map(xCord2, 0, video.width, 0, img.width));
    tempY2 = int(map(yCord2, 0, video.height, 0, img.height));
    if (tempX2 > 290 && tempX2 < 481 && tempY2 > 282 && tempY2 < 378) {
      if (pntsCntCar < 1000) {
        // car shalgah heseg
        if (!points.includes([tempX2, tempY2])) {
          points.push([tempX2, tempY2]);
          pntsCntCar++;
        }
        if (!points.includes([tempX2 - dSize, tempY2])) {
          points.push([tempX2 - dSize, tempY2]);
          pntsCntCar++;
        }
        if (!points.includes([tempX2 + dSize, tempY2])) {
          points.push([tempX2 + dSize, tempY2]);
          pntsCntCar++;
        }
        if (!points.includes([tempX2, tempY2 - dSize])) {
          points.push([tempX2, tempY2 - dSize]);
          pntsCntCar++;
        }
        if (!points.includes([tempX2, tempY2 + dSize])) {
          points.push([tempX2, tempY2 + dSize]);
          pntsCntCar++;
        }
      }
    } else if (tempX2 > 343 && tempX2 < 522 && tempY2 > 450 && tempY2 < 614) {
      // tiger shalgah
      if (pntsCntTiger < 1000) {
        if (!points.includes([tempX2, tempY2])) {
          points.push([tempX2, tempY2]);
          pntsCntTiger++;
        }
        if (!points.includes([tempX2 - dSize, tempY2])) {
          points.push([tempX2 - dSize, tempY2]);
          pntsCntTiger++;
        }
        if (!points.includes([tempX2 + dSize, tempY2])) {
          points.push([tempX2 + dSize, tempY2]);
          pntsCntTiger++;
        }
        if (!points.includes([tempX2, tempY2 - dSize])) {
          points.push([tempX2, tempY2 - dSize]);
          pntsCntTiger++;
        }
        if (!points.includes([tempX2, tempY2 + dSize])) {
          points.push([tempX2, tempY2 + dSize]);
          pntsCntTiger++;
        }
      }
    } else if (tempX2 > 720 && tempX2 < 980 && tempY2 > 70 && tempY2 < 205) {
      //helicopter shalgah
      if (pntsCntHeli < 1500) {
        if (!points.includes([tempX2, tempY2])) {
          points.push([tempX2, tempY2]);
          pntsCntHeli++;
        }
        if (!points.includes([tempX2 - dSize, tempY2])) {
          points.push([tempX2 - dSize, tempY2]);
          pntsCntHeli++;
        }
        if (!points.includes([tempX2 + dSize, tempY2])) {
          points.push([tempX2 + dSize, tempY2]);
          pntsCntHeli++;
        }
        if (!points.includes([tempX2, tempY2 - dSize])) {
          points.push([tempX2, tempY2 - dSize]);
          pntsCntHeli++;
        }
        if (!points.includes([tempX2, tempY2 + dSize])) {
          points.push([tempX2, tempY2 + dSize]);
          pntsCntHeli++;
        }
      }
    } else if (tempX2 > 430 && tempX2 < 560 && tempY2 > 30 && tempY2 < 220) {
      // parrot shalgah
      if (pntsCntParrot < 800) {
        if (!points.includes([tempX2, tempY2])) {
          points.push([tempX2, tempY2]);
          pntsCntParrot++;
        }
        if (!points.includes([tempX2 - dSize, tempY2])) {
          points.push([tempX2 - dSize, tempY2]);
          pntsCntParrot++;
        }
        if (!points.includes([tempX2 + dSize, tempY2])) {
          points.push([tempX2 + dSize, tempY2]);
          pntsCntParrot++;
        }
        if (!points.includes([tempX2, tempY2 - dSize])) {
          points.push([tempX2, tempY2 - dSize]);
          pntsCntParrot++;
        }
        if (!points.includes([tempX2, tempY2 + dSize])) {
          points.push([tempX2, tempY2 + dSize]);
          pntsCntParrot++;
        }
      }
    } else if (tempX2 > 145 && tempX2 < 300 && tempY2 > 85 && tempY2 < 335) {
      // flamingo shalgah
      if (pntsCntFlamingo < 1500) {
        if (!points.includes([tempX2, tempY2])) {
          points.push([tempX2, tempY2]);
          pntsCntFlamingo++;
        }
        if (!points.includes([tempX2 - dSize, tempY2])) {
          points.push([tempX2 - dSize, tempY2]);
          pntsCntFlamingo++;
        }
        if (!points.includes([tempX2 + dSize, tempY2])) {
          points.push([tempX2 + dSize, tempY2]);
          pntsCntFlamingo++;
        }
        if (!points.includes([tempX2, tempY2 - dSize])) {
          points.push([tempX2, tempY2 - dSize]);
          pntsCntFlamingo++;
        }
        if (!points.includes([tempX2, tempY2 + dSize])) {
          points.push([tempX2, tempY2 + dSize]);
          pntsCntFlamingo++;
        }
      }
    } else if (tempX2 > 645 && tempX2 < 950 && tempY2 > 220 && tempY2 < 460) {
      // plane shalgah
      if (pntsCntPlane < 1500) {
        if (!points.includes([tempX2, tempY2])) {
          points.push([tempX2, tempY2]);
          pntsCntPlane++;
        }
        if (!points.includes([tempX2 - dSize, tempY2])) {
          points.push([tempX2 - dSize, tempY2]);
          pntsCntPlane++;
        }
        if (!points.includes([tempX2 + dSize, tempY2])) {
          points.push([tempX2 + dSize, tempY2]);
          pntsCntPlane++;
        }
        if (!points.includes([tempX2, tempY2 - dSize])) {
          points.push([tempX2, tempY2 - dSize]);
          pntsCntPlane++;
        }
        if (!points.includes([tempX2, tempY2 + dSize])) {
          points.push([tempX2, tempY2 + dSize]);
          pntsCntPlane++;
        }
      }
    } else {
      if (!points.includes([tempX2, tempY2])) points.push([tempX2, tempY2]);
      if (!points.includes([tempX2 - dSize, tempY2]))
        points.push([tempX2 - dSize, tempY2]);
      if (!points.includes([tempX2 + dSize, tempY2]))
        points.push([tempX2 + dSize, tempY2]);
      if (!points.includes([tempX2, tempY2 - dSize]))
        points.push([tempX2, tempY2 - dSize]);
      if (!points.includes([tempX2, tempY2 + dSize]))
        points.push([tempX2, tempY2 + dSize]);
    }
  }
  //2 secondiin daraa 5 tseg ustgah
  if (counter == countTimeBy2sec) {
    if (points.length > 10) {
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
    delaunay = Delaunator.from(points);
    countTimeBy2sec = countTimeBy2sec + 1;
  }

  if (pntsCntCar == 1000 && !carBool) {
    toysCnt++;
    carBool = true;
    s = "You have just found a CAR :D";
  }
  if (pntsCntHeli == 1500 && !heliBool) {
    toysCnt++;
    heliBool = true;
    s = "You have just found a HELICOPTER :D";
  }

  if (pntsCntPlane == 1500 && !planeBool) {
    toysCnt++;
    planeBool = true;
    s = "You have just found a PLANE :D";
  }
  if (pntsCntFlamingo == 1500 && !flamingoBool) {
    toysCnt++;
    flamingoBool = true;
    s = "You have just found a FLAMINGO :D";
  }

  if (pntsCntTiger == 1000 && !tigerBool) {
    toysCnt++;
    tigerBool = true;
    s = "You have just found a TIGER :D";
  }
  if (pntsCntParrot == 800 && !parrotBool) {
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
  buffer.clear();
  noFill();
  if (xCord != null && yCord != null) {
    ellipse(tempX1, tempY1, width / 12);
  }
  if (xCord2 != null && yCord2 != null) {
    ellipse(tempX2, tempY2, width / 12);
  }
  // console.log(points.length);  tsegiin toog hevlej harah

  document.getElementById("p1").innerHTML = "Toys: " + toysCnt + "/6";
  let htTxt = "<tr><th>#</th><th>Name</th><th>Time</th><th>Level</th></tr>";

  txtFromLocal = localStorage.getItem("Highscore");
  obj = JSON.parse(txtFromLocal);
  obj1 = JSON.parse(txtFromLocal);
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

  document.getElementById("highscore").innerHTML =
    "<table>" + htTxt + "</table>";
  if (toysCnt == 6) {
    for (var num = 0; num < 9; num++) {
      if (checked) {
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
          myObj.score[num].level = "Hard";
          myObj.score[num].sec = counter;

          myJSON = JSON.stringify(myObj);
          localStorage.setItem("Highscore", myJSON);
        }
        checked = false;
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
    if (mouseX > 290 && mouseX < 481 && mouseY > 282 && mouseY < 378) {
      if (pntsCntCar < 1000) {
        // car shalgah heseg
        if (!points.includes([mouseX, mouseY])) {
          points.push([mouseX, mouseY]);
          pntsCntCar++;
        }
        if (!points.includes([mouseX - dSize, mouseY])) {
          points.push([mouseX - dSize, mouseY]);
          pntsCntCar++;
        }
        if (!points.includes([mouseX + dSize, mouseY])) {
          points.push([mouseX + dSize, mouseY]);
          pntsCntCar++;
        }
        if (!points.includes([mouseX, mouseY - dSize])) {
          points.push([mouseX, mouseY - dSize]);
          pntsCntCar++;
        }
        if (!points.includes([mouseX, mouseY + dSize])) {
          points.push([mouseX, mouseY + dSize]);
          pntsCntCar++;
        }
      }
    } else if (mouseX > 343 && mouseX < 522 && mouseY > 450 && mouseY < 614) {
      // tiger shalgah
      if (pntsCntTiger < 1000) {
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
    } else if (mouseX > 720 && mouseX < 980 && mouseY > 70 && mouseY < 205) {
      //helicopter shalgah
      if (pntsCntHeli < 1500) {
        if (!points.includes([mouseX, mouseY])) {
          points.push([mouseX, mouseY]);
          pntsCntHeli++;
        }
        if (!points.includes([mouseX - dSize, mouseY])) {
          points.push([mouseX - dSize, mouseY]);
          pntsCntHeli++;
        }
        if (!points.includes([mouseX + dSize, mouseY])) {
          points.push([mouseX + dSize, mouseY]);
          pntsCntHeli++;
        }
        if (!points.includes([mouseX, mouseY - dSize])) {
          points.push([mouseX, mouseY - dSize]);
          pntsCntHeli++;
        }
        if (!points.includes([mouseX, mouseY + dSize])) {
          points.push([mouseX, mouseY + dSize]);
          pntsCntHeli++;
        }
      }
    } else if (mouseX > 430 && mouseX < 560 && mouseY > 30 && mouseY < 220) {
      // parrot shalgah
      if (pntsCntParrot < 800) {
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
    } else if (mouseX > 145 && mouseX < 300 && mouseY > 85 && mouseY < 335) {
      // flamingo shalgah
      if (pntsCntFlamingo < 1500) {
        if (!points.includes([mouseX, mouseY])) {
          points.push([mouseX, mouseY]);
          pntsCntFlamingo++;
        }
        if (!points.includes([mouseX - dSize, mouseY])) {
          points.push([mouseX - dSize, mouseY]);
          pntsCntFlamingo++;
        }
        if (!points.includes([mouseX + dSize, mouseY])) {
          points.push([mouseX + dSize, mouseY]);
          pntsCntFlamingo++;
        }
        if (!points.includes([mouseX, mouseY - dSize])) {
          points.push([mouseX, mouseY - dSize]);
          pntsCntFlamingo++;
        }
        if (!points.includes([mouseX, mouseY + dSize])) {
          points.push([mouseX, mouseY + dSize]);
          pntsCntFlamingo++;
        }
      }
    } else if (mouseX > 645 && mouseX < 950 && mouseY > 220 && mouseY < 460) {
      // plane shalgah
      if (pntsCntPlane < 1500) {
        if (!points.includes([mouseX, mouseY])) {
          points.push([mouseX, mouseY]);
          pntsCntPlane++;
        }
        if (!points.includes([mouseX - dSize, mouseY])) {
          points.push([mouseX - dSize, mouseY]);
          pntsCntPlane++;
        }
        if (!points.includes([mouseX + dSize, mouseY])) {
          points.push([mouseX + dSize, mouseY]);
          pntsCntPlane++;
        }
        if (!points.includes([mouseX, mouseY - dSize])) {
          points.push([mouseX, mouseY - dSize]);
          pntsCntPlane++;
        }
        if (!points.includes([mouseX, mouseY + dSize])) {
          points.push([mouseX, mouseY + dSize]);
          pntsCntPlane++;
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
