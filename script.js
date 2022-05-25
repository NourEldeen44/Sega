//initializing & Handling
var rocks = document.querySelectorAll("img[src='rock.png']");
var focusedId = "";
var playCounter = 0;
var focusedRock;
var focusedRockRow;
var focusedRockCol;
var focusedRockColor;

//on focus
for (let i = 0; i < rocks.length; i++) {
  // rocks[i].cancelb;
  rocks[i].addEventListener("click", function (event) {
    //prevent bubling
    event.stopPropagation();
    for (let i = 0; i < rocks.length; i++) {
      if (rocks[i].style.transform == "scale(1.5)") {
        rocks[i].style.transform = "scale(1)";
      }
    }
    //if double click
    if (rocks[i].value == "big") {
      rocks[i].style.width = "40px";
      rocks[i].style.height = "40px";
      rocks[i].value = "small";
      rocks[i].style.transform = "";
      focusedId = "";
      focusedRock = "";
      focusedRockRow = "";
      focusedRockCol = "";
      focusedRockColor = "";
    } else {
      rocks[i].value = "big";
      rocks[i].style.transform = "scale(1.5)";
      focusedId = event.target.id;
      focusedRock = document.getElementById(focusedId);
      focusedRockRow =
        focusedRock.parentElement.parentElement.classList[1].split("-")[1];
      focusedRockCol = focusedRock.parentElement.classList[0].split(" ")[0];
      focusedRockColor = focusedRock.classList[0];
    }
  });
}

//Moving
//Adding all board Pieces & preparing to move
var boardPieces = [];

Array.prototype.push.apply(
  boardPieces,
  document.getElementsByClassName("white")
);
Array.prototype.push.apply(
  boardPieces,
  document.getElementsByClassName("black")
);

//Moving
var notify = document.getElementById("notify");

boardPieces.forEach(function (peice) {
  peice.addEventListener("click", function () {
    notify.innerHTML = "continue playing ...";

    //Params
    var peiceCol = peice.classList[0];
    var peicecolor = peice.classList[1];
    var peicerow = peice.parentElement.classList[1].split("-")[1];
    //aboard peice cant have more than one rock
    if (peice.children.length > 0) {
      console.log("err unvalid move!!!");
      notify.innerHTML = "Unvalid move!";
      Warning();
    }
    // if trying to move a rock in the same peice that is already holding it
    else if (peiceCol == focusedRockCol && peicerow == focusedRockRow) {
      console.log("can't move in the same place !");
      notify.innerHTML = "You can't move in the same place !";
      Warning();
    }
    // if first move
    else if (
      (playCounter <= 1 &&
        parseInt(focusedRockRow) == parseInt(peicerow) + 2) ||
      (playCounter <= 1 && parseInt(focusedRockRow) == parseInt(peicerow)) || //  ازاي اول مرة يلعب فنفس الصف؟ بتشيل بجاية مش فاكرها??????
      (playCounter <= 1 && parseInt(focusedRockRow) == parseInt(peicerow) - 2)
    ) {
      //white player turn
      if (playCounter % 2 == 0 && focusedRockColor == "whiteRock") {
        //Asmaa--> playcounter = 0 or 1
        // validating cols moving
        if (
          parseInt(focusedRockCol.charCodeAt(0)) ==
          parseInt(peiceCol.charCodeAt(0))
        ) {
          // Accept and Move
          Move(peice, peiceCol, peicerow);
        } else {
          console.log("unvalid move!!!");
          notify.innerHTML = "Unvalid move!";
          Warning();
        }
      }
      //black player turn
      else if (playCounter % 2 != 0 && focusedRockColor == "blackRock") {
        // validating cols moving
        if (
          parseInt(focusedRockCol.charCodeAt(0)) ==
          parseInt(peiceCol.charCodeAt(0))
        ) {
          // Accept and Move
          Move(peice, peiceCol, peicerow);
        } else {
          console.log("unvalid move!!!");
          notify.innerHTML = "Unvalid move!";
          Warning();
        }
      } else {
        console.log("unvalid!!!!: other player's move");
        notify.innerHTML = "Unvalid move, it's other player role!";
        Warning();
      }
    }
    //if not the first play
    //move only one row up or down or move in the same row
    else if (
      parseInt(focusedRockRow) == parseInt(peicerow) + 1 ||
      parseInt(focusedRockRow) == parseInt(peicerow) ||
      parseInt(focusedRockRow) == parseInt(peicerow) - 1
    ) {
      //white player turn
      if (playCounter % 2 == 0 && focusedRockColor == "whiteRock") {
        // validating cols moving
        if (
          parseInt(focusedRockCol.charCodeAt(0)) ==
            parseInt(peiceCol.charCodeAt(0) + 1) ||
          parseInt(focusedRockCol.charCodeAt(0)) ==
            parseInt(peiceCol.charCodeAt(0) - 1) ||
          parseInt(focusedRockCol.charCodeAt(0)) ==
            parseInt(peiceCol.charCodeAt(0))
        ) {
          // Accept and Move
          Move(peice, peiceCol, peicerow);
        } else {
          console.log("unvalid move!!!");
          notify.innerHTML = "Unvalid move!";
          Warning();
        }
      }

      //black player turn
      else if (playCounter % 2 != 0 && focusedRockColor == "blackRock") {
        // validating cols moving
        if (
          parseInt(focusedRockCol.charCodeAt(0)) ==
            parseInt(peiceCol.charCodeAt(0) + 1) ||
          parseInt(focusedRockCol.charCodeAt(0)) ==
            parseInt(peiceCol.charCodeAt(0) - 1) ||
          parseInt(focusedRockCol.charCodeAt(0)) ==
            parseInt(peiceCol.charCodeAt(0))
        ) {
          // Accept and Move
          Move(peice, peiceCol, peicerow);
        } else {
          console.log("unvalid move!!!");
          notify.innerHTML = "Unvalid move!";
          Warning();
        }
      } else {
        console.log("unvalid!!!!: other player's move");
        notify.innerHTML = "Unvalid move, it's other player role!";
        Warning();
      }
    }
    // skip the next rock move
    else if (
      (parseInt(focusedRockRow) == parseInt(peicerow) + 2 &&
        document.querySelector(".row-" + (parseInt(peicerow) + 1)).children[
          peiceCol.charCodeAt(0) - 97
        ].children.length == 1) ||
      (parseInt(focusedRockRow) == parseInt(peicerow) - 2 &&
        document.querySelector(".row-" + (parseInt(peicerow) - 1)).children[
          peiceCol.charCodeAt(0) - 97
        ].children.length == 1)
    ) {
      //white turn
      if (playCounter % 2 == 0 && focusedRockColor == "whiteRock") {
        // Accept and Move
        Move(peice, peiceCol, peicerow);
      } //black turn
      else if (playCounter % 2 != 0 && focusedRockColor == "blackRock") {
        // Accept and Move
        Move(peice, peiceCol, peicerow);
      } else {
        console.log("unvalid!!!!: other player's move");
        notify.innerHTML = "Unvalid move, it's other player role!";
        Warning();
      }
    } else {
      console.log("unvalid move!!!");
      notify.innerHTML = "Unvalid move!";
      Warning();
    }

    //resetting focusedId
    focusedId = "";
    //////////////////
    //checkWinning(params);
  });
});

//check winning
// function checkWinning(params) {
// }

// Accept & Move
function Move(peice, peiceCol, peicerow) {
  peice.appendChild(focusedRock);
  playCounter++;
  console.log("valid move");
  console.log("valid player's move num " + playCounter);
  console.log("Col:" + peiceCol);
  console.log("Row:" + peicerow);
  document.getElementById("click-sound").play();
  playCounter % 2 != 0
    ? (document.getElementById("role").style.filter = "invert(100%)")
    : (document.getElementById("role").style.filter = "brightness(125%)");
  Timer();
}
//Cancelling move
function cancelMove(e) {
  for (let i = 0; i < rocks.length; i++) {
    if (rocks[i].style.transform == "scale(1.5)") {
      rocks[i].style.transform = "scale(1)";
      rocks[i].value = "small";
    }
  }
}
// Timer
var timer;
function Timer() {
  clearInterval(timer);
  var Time = 60;
  timer = setInterval(function () {
    document.getElementById("time").innerHTML = Time;
    Time--;
    if (Time == -1) {
      playCounter++;
      playCounter % 2 != 0
        ? (document.getElementById("role").style.filter = "invert(100%)")
        : (document.getElementById("role").style.filter = "brightness(125%)");
      clearInterval(timer);
      Timer();
      document.getElementById("time").innerHTML = "0";
    }
  }, 1000);
}

//Sounds
var mplay = false;
var mice = document.getElementById("playaudio");
function musicPlay() {
  if (mplay == false) {
    document.getElementById("audio").play();
    mice.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    mplay = true;
  } else {
    document.getElementById("audio").pause();
    mice.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    mplay = false;
  }
}

function Warning()
{
  document.getElementById("warning").play();
}
  

//watch
var fullTime = new Date();
var hour = fullTime.getHours();
var min = fullTime.getMinutes();
var second = fullTime.getSeconds();
var root = document.querySelector(":root");
var parsedHour = function () {
  if (hour > 12) {
    hour = hour - 12;
  }
  return eval(hour * 30 + parsedMin() / 12); // hrs * 30deg = actual deg for hours // + extra degs for mins as half hour example
};
var parsedMin = function () {
  return min * 6;
};
var parsedSec = function () {
  return second * 6;
};
root.style.setProperty("--hourDeg", `${parsedHour()}` + "deg");
root.style.setProperty("--hourMax", `${parsedHour() + 360}` + "deg");
root.style.setProperty("--minDeg", `${parsedMin()}` + "deg");
root.style.setProperty("--minMax", `${parsedMin() + 360}` + "deg");
root.style.setProperty("--secDeg", `${parsedSec()}` + "deg");
root.style.setProperty("--secMax", `${parsedSec() + 360}` + "deg");
