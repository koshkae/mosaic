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
var pntsCntHeli = 0,
  pntsCntCar = 0,
  pntsCntParrot = 0,
  pntsCntTiger = 0,
  toysCnt = 0;
let carBool = false,
  tigerBool = false,
  heliBool = false,
  parrotBool = false;
var userName;
let checked = true;
var counter = 0;
var timeLeft = 150;
var countTimeBy2sec = 12;
var output, txtFromLocal, obj;
let img, s;
let pix = [];
var buffer, videoCanvas;
let renderVideo = true,
  videoLoaded = false;
let model = null;
let xCord, yCord, xCord2, yCord2;
let dSize = 4,
  htTxt,
  toyUpdate = false,
  highscoreUpdate = true;
var hsDom, p1Dom;
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
var output, txtFromLocal, obj;
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
  return "Timer:<br />" + nf(min, 2) + ":" + nf(sec, 2);
}

function convertSeconds1(s) {
  var min = floor(s / 60);
  var sec = s % 60;
  return nf(min, 2) + ":" + nf(sec, 2);
}
function setup() {
  hsDom = document.getElementById("highscore");
  p1Dom = document.getElementById("p1");
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
    } else if (tempX1 > 830 && tempX1 < 1024 && tempY1 > 274 && tempY1 < 447) {
      // tiger shalgah
      if (pntsCntTiger < 1500) {
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
    } else if (tempX1 > 55 && tempX1 < 409 && tempY1 > 276 && tempY1 < 462) {
      //helicopter shalgah
      if (pntsCntHeli < 3000) {
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
    } else if (tempX1 > 508 && tempX1 < 668 && tempY1 > 134 && tempY1 < 413) {
      // parrot shalgah
      if (pntsCntParrot < 2300) {
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
    if (tempX2 > 418 && tempX2 < 761 && tempY2 > 403 && tempY2 < 556) {
      if (pntsCntCar < 2500) {
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
    } else if (tempX2 > 830 && tempX2 < 1024 && tempY2 > 274 && tempY2 < 447) {
      // tiger shalgah
      if (pntsCntTiger < 1500) {
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
    } else if (tempX2 > 55 && tempX2 < 409 && tempY2 > 276 && tempY2 < 462) {
      //helicopter shalgah
      if (pntsCntHeli < 3000) {
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
    } else if (tempX2 > 508 && tempX2 < 668 && tempY2 > 134 && tempY2 < 413) {
      // parrot shalgah
      if (pntsCntParrot < 2300) {
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
  //2 secondiin daraa 7 tseg ustgah
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
    countTimeBy2sec = countTimeBy2sec + 1;
  }

  if (pntsCntCar == 2500 && !carBool) {
    toysCnt++;
    toyUpdate = true;
    carBool = true;
  }
  if (pntsCntTiger == 1500 && !tigerBool) {
    toysCnt++;
    toyUpdate = true;
    tigerBool = true;
  }
  if (pntsCntHeli == 3000 && !heliBool) {
    toysCnt++;
    toyUpdate = true;
    heliBool = true;
  }
  if (pntsCntParrot == 2300 && !parrotBool) {
    toysCnt++;
    toyUpdate = true;
    parrotBool = true;
  }
  delaunay = Delaunator.from(points);
  var triangles = delaunay.triangles;
  buffer.noStroke();
  var lll = triangles.length;
  for (let i = 0; i < lll; i += 3) {
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
  if (tigerBool) {
    document.getElementById("tiger").src = "pngs/redtoys33.png";
    document.getElementById("tiger").style.backgroundColor = "rgb(242, 92, 5)";
  }
  if (parrotBool) {
    document.getElementById("parrot").src = "pngs/redtoys22.png";
    document.getElementById("parrot").style.backgroundColor = "rgb(242, 92, 5)";
  }
  if (carBool) {
    document.getElementById("raceCar").src = "pngs/redtoys44.png";
    document.getElementById("raceCar").style.backgroundColor =
      "rgb(242, 92, 5)";
  }
  if (heliBool) {
    document.getElementById("helicopter").src = "pngs/redtoys11.png";
    document.getElementById("helicopter").style.backgroundColor =
      "rgb(242, 92, 5)";
  }
  buffer.clear();
  noFill();
  if (xCord != null && yCord != null) {
    ellipse(tempX1, tempY1, width / 12);
  }
  if (xCord2 != null && yCord2 != null) {
    ellipse(tempX2, tempY2, width / 12);
  }
  if (toyUpdate) {
    p1Dom.innerHTML = "Toys:<br />" + toysCnt + "/4";
    toyUpdate = false;
  }
  if (highscoreUpdate) {
    htTxt = "<tr><th>#</th><th>Name</th><th>Time</th><th>Level</th></tr>";

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
    highscoreUpdate = false;
  }

  hsDom.innerHTML = "<table>" + htTxt + "</table>";
  if (toysCnt == 4) {
    for (var num = 0; num < 9; num++) {
      if (checked) {
        if (counter - 30 < int(obj.score[num].sec)) {
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
          myObj.score[num].level = "Medium";
          myObj.score[num].sec = counter;
          myJSON = JSON.stringify(myObj);
          localStorage.setItem("Highscore", myJSON);
          checked = false;
        }
      }
    }
    highscoreUpdate = true;
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
    if (mouseX > 418 && mouseX < 761 && mouseY > 403 && mouseY < 556) {
      if (pntsCntCar < 2500) {
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
    } else if (mouseX > 830 && mouseX < 1024 && mouseY > 274 && mouseY < 447) {
      // tiger shalgah
      if (pntsCntTiger < 1500) {
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
    } else if (mouseX > 55 && mouseX < 409 && mouseY > 276 && mouseY < 462) {
      //helicopter shalgah
      if (pntsCntHeli < 3000) {
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
    } else if (mouseX > 508 && mouseX < 668 && mouseY > 134 && mouseY < 413) {
      // parrot shalgah
      if (pntsCntParrot < 2300) {
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
