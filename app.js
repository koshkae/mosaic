const video = document.getElementById("webCam");
const canvas = document.getElementById("canvasCam");
const context = canvas.getContext("2d");
let updateNote = document.getElementById("message");

let x, y;
var num = 5;
var points = [
  [0, 0],
  [0, 648],
  [1079, 0],
  [500, 300],
  [1079, 647],
];
var myObj = {
  score: [
    { name: "name", time: "02:00", level: "none", sec: "120" },
    { name: "name", time: "02:00", level: "none", sec: "120" },
    { name: "name", time: "02:00", level: "none", sec: "120" },
  ],
};
var myJSON;
var pntsCntHeli = 0,
  pntsCntCar = 0,
  pntsCntParrot = 0,
  pntsCntTiger = 0,
  toysCnt = 0;
var userName;
let checked = true;
var counter = 0;
var timeLeft = 150;
var countTimeBy2sec = 12;
var output, txtFromLocal, obj, obj1;
let img, s;
let pix = [];
var buffer, videoCanvas;
let renderVideo = true,
  videoLoaded = false;
let model = null;
let xCord, yCord, xCord2, yCord2;

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
  img = loadImage("imgs/redtoys.jpg");
  if (localStorage.getItem("Highscore") === null) {
    myJSON = JSON.stringify(myObj);
    localStorage.setItem("Highscore", myJSON);
  } else {
    console.log("yes urid ni togolj bsan bj taarlaa l daa");
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
    if (counter == timeLeft || checked == false) {
      clearInterval(interval);
      //counter = 0;
      var go = document.createElement("IMG");
      go.setAttribute("id", "gameover");
      go.setAttribute("src", "assets/Group 33.png");

      var realImg = document.createElement("IMG");
      realImg.setAttribute("src", "imgs/redtoys.jpg");
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
    tempX2 = int(map(xCord2, 0, video.width, 0, img.width));
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
  //2 secondiin daraa 5 tseg ustgah
  if (counter == countTimeBy2sec) {
    if (points.length > 5) {
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
      delaunay = Delaunator.from(points);
      countTimeBy2sec = countTimeBy2sec + 1;
    }
  }
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
  noFill();
  if (xCord != null && yCord != null) {
    ellipse(tempX1, tempY1, width / 12);
  }
  if (xCord2 != null && yCord2 != null) {
    ellipse(tempX2, tempY2, width / 12);
  }
  // console.log(points.length);  tsegiin toog hevlej harah

  document.getElementById("p1").innerHTML = "Toys: " + toysCnt + "/4";
  let htTxt = "<tr><th>#</th><th>Name</th><th>Time</th><th>Level</th></tr>";

  txtFromLocal = localStorage.getItem("Highscore");
  obj = JSON.parse(txtFromLocal);
  obj1 = JSON.parse(txtFromLocal);
  for (var num = 0; num < 3; num++) {
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
  if (toysCnt == 2) {
    for (var num = 0; num < 3; num++) {
      if (checked) {
        if (counter < int(obj.score[num].sec)) {
          if (num + 1 < 3) {
            for (var aaaa = num + 1; aaaa < 3; aaaa++) {
              myObj.score[aaaa].name = myObj.score[num].name;
              myObj.score[aaaa].time = myObj.score[num].time;
              myObj.score[aaaa].level = myObj.score[num].level;
              myObj.score[aaaa].sec = myObj.score[num].sec;
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

function editScore() {}
function mouseDragged() {
  if (
    mouseX <= buffer.width &&
    mouseX >= 0 &&
    mouseY <= buffer.height &&
    mouseY >= 0
  ) {
    if (mouseX > 418 && mouseX < 761 && mouseY > 403 && mouseY < 556) {
      if (pntsCntCar < 2500) {
        // car shalgah heseg
        points.push([mouseX, mouseY]);
        delaunay = Delaunator.from(points);
        pntsCntCar++;
        if (pntsCntCar == 2500) {
          toysCnt++;
          s = "Congratulations! You have just found a RACECAR :D";
        }
      }
    } else if (mouseX > 830 && mouseX < 1024 && mouseY > 274 && mouseY < 447) {
      // tiger shalgah
      if (pntsCntTiger < 1500) {
        points.push([mouseX, mouseY]);
        delaunay = Delaunator.from(points);
        pntsCntTiger++;
        if (pntsCntTiger == 1500) {
          toysCnt++;
          s = "Congratulations! You have just found a TIGER :D";
        }
      }
    } else if (mouseX > 55 && mouseX < 409 && mouseY > 276 && mouseY < 462) {
      //helicopter shalgah
      if (pntsCntHeli < 3000) {
        points.push([mouseX, mouseY]);
        delaunay = Delaunator.from(points);
        pntsCntHeli++;
        if (pntsCntHeli == 3000) {
          toysCnt++;
          s = "Congratulations! You have just found a HELICOPTER :D";
        }
      }
    } else if (mouseX > 508 && mouseX < 668 && mouseY > 134 && mouseY < 413) {
      // parrot shalgah
      if (pntsCntParrot < 2300) {
        points.push([mouseX, mouseY]);
        delaunay = Delaunator.from(points);
        pntsCntParrot++;
        if (pntsCntParrot == 2300) {
          toysCnt++;
          s = "Congratulations! You have just found a PARROT :D";
        }
      }
    } else {
      points.push([mouseX, mouseY]);
      delaunay = Delaunator.from(points);
    }
  }
}
