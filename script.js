//initializing & Handling
var rocks = document.querySelectorAll("img[src='rock.png']");
var focusedId = "";
var playCounter;
var focusedRock;
var focusedRockRow;
var focusedRockCol;
var focusedRockColor;

//onload
function Load(event) {
  playCounter = parseInt(location.search.split("=")[1]);
  playCounter % 2 != 0
    ? (document.getElementById("role").style.filter = "invert(100%)")
    : (document.getElementById("role").style.filter = "brightness(125%)");
}
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
    if (winningDone == true) {
      console.log("Game End");
    } else if (peice.children.length > 0) {
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
  });
});

// Accept & Move
function Move(peice, peiceCol, peicerow) {
  peice.appendChild(focusedRock);
  playCounter++;
  document.getElementById("click-sound").play();
  playCounter % 2 != 0
    ? (document.getElementById("role").style.filter = "invert(100%)")
    : (document.getElementById("role").style.filter = "brightness(125%)");

  checkWinning(playCounter, peicerow, peiceCol, peice);
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

function Warning() {
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

function Ballons() {
  if (winner == "blackRock") {
    document.getElementById("rockwin").style.filter = "invert(100%)";
  }
  document.getElementById("congratulation").style.top = "150px";
  document.getElementById("ballonscontainer").style.top = "320px";
  document.getElementById("winaudio").play();
  document.getElementById("winmusic").play();
}

//check winning
function checkWinning(playCounter, row, col, peice) {
  // check three rocks win
  var whiteWinCount = 0;
  var blackWinCount = 0;

  var test = document.getElementsByClassName("row-" + row);
  // checking Rows
  if (
    ((row == 2 || row == 3 || row == 1) &&
      peice.children[0].classList[0] == "blackRock") ||
    ((row == 6 || row == 7 || row == 8) &&
      peice.children[0].classList[0] == "whiteRock")
  ) {
    console.log("Noooooo to win");
  } else {
    for (const iterator of test[0].children) {
      // test[0].children ==> pieces of this row
      if (iterator.children.length != 0) {
        //piece is full
        if (iterator.children[0].classList[0] == "whiteRock") {
          whiteWinCount++;
          if (whiteWinCount >= 5) {
            checkFollowingRows("whiteRock", test);
          }
        } else if (iterator.children[0].classList[0] == "blackRock") {
          blackWinCount++;
          if (blackWinCount >= 5) {
            checkFollowingRows("blackRock", test);
          }
        }
      }
    }
    console.log("whiteWinCount: " + whiteWinCount);
    console.log("blackWinCount: " + blackWinCount);
  }

  // checking columns
  var test2 = document.getElementsByClassName(peice.classList[0]);

  var col_whiteWinCount = 0;
  var col_blackWinCount = 0;
  for (const iterator of test2) {
    // test2[0].children ==> pieces of this column
    if (iterator.children.length != 0) {
      //piece is full
      if (iterator.children[0].classList[0] == "whiteRock") {
        col_whiteWinCount++;
        if (col_whiteWinCount >= 5) {
          checkFollowingColsAndDia("whiteRock", test2);
        }
      } else if (iterator.children[0].classList[0] == "blackRock") {
        col_blackWinCount++;
        if (col_blackWinCount >= 5) {
          checkFollowingColsAndDia("blackRock", test2);
        }
      }
    }
  }
  console.log("col: whiteWinCount: " + col_whiteWinCount);
  console.log("col: blackWinCount: " + col_blackWinCount);

  // checking Diameters
  if (peice.classList.length == 3) {
    var diameter;
    if (peice.classList[2] == "K") {
      diameter = document.getElementsByClassName("K");
    } else if (peice.classList[2] == "L") {
      diameter = document.getElementsByClassName("L");
    }

    var Dia_whiteWinCount = 0;
    var Dia_blackWinCount = 0;
    for (const iterator of diameter) {
      // K_diameter[0].children ==> pieces of this column
      if (iterator.children.length != 0) {
        //piece is full
        if (iterator.children[0].classList[0] == "whiteRock") {
          Dia_whiteWinCount++;
          if (Dia_whiteWinCount >= 5) {
            checkFollowingColsAndDia("whiteRock", diameter);
          }
        } else if (iterator.children[0].classList[0] == "blackRock") {
          Dia_blackWinCount++;
          if (Dia_blackWinCount >= 5) {
            checkFollowingColsAndDia("blackRock", diameter);
          }
        }
      }
    }
    console.log("dia: whiteWinCount: " + Dia_whiteWinCount);
    console.log("dia: blackWinCount: " + Dia_blackWinCount);

    // console.log("col",peice.classList[0])
    // console.log("row",peice.parentElement.classList[1].split("-")[1])

    // console.log(document.getElementsByClassName("L"))
  }
}

var winningDone = false;
var winner;
function checkFollowingRows(rockclass, rowpieces) {
  var firstdone = false;
  var firstRock;
  var lastRock;
  for (const iterator of rowpieces[0].children) {
    //rowpieces[0].children ==> pieces of this row
    if (iterator.children.length != 0) {
      //piece is full
      if (iterator.children[0].classList[0] == rockclass) {
        if (firstdone == false) {
          firstRock = iterator.children[0];
          lastRock = iterator.children[0];
          firstdone = true;
        } else {
          lastRock = iterator.children[0];
        }
      }
    }
  }

  var asciiFirst = firstRock.parentElement.classList[0].charCodeAt(0);
  var asciiLast = lastRock.parentElement.classList[0].charCodeAt(0);

  if (asciiLast - asciiFirst == 4) {
    //win
    console.log("win", rockclass);
    winningDone = true;
    winner = rockclass;
    Ballons();
  }
}

function checkFollowingColsAndDia(rockclass, colpieces) {
  var firstdone = false;
  var firstRock;
  var lastRock;
  for (const iterator of colpieces) {
    //colpieces[0].children ==> pieces of this row
    if (iterator.children.length != 0) {
      //piece is full
      if (iterator.children[0].classList[0] == rockclass) {
        if (firstdone == false) {
          firstRock = iterator.children[0];
          lastRock = iterator.children[0];
          firstdone = true;
        } else {
          lastRock = iterator.children[0];
        }
      }
    }
  }

  var Firstrow =
    firstRock.parentElement.parentElement.classList[1].split("-")[1];
  var Lastrow = lastRock.parentElement.parentElement.classList[1].split("-")[1];

  if (Firstrow - Lastrow == 4) {
    //win
    console.log("win", rockclass);
    winningDone = true;
    winner = rockclass;
    Ballons();
  }
}
