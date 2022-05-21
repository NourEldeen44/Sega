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
    if (rocks[i].style.transform == "scale(1.5)") {
      rocks[i].style.transform = "scale(1)";
    } else {
      rocks[i].style.transform = "scale(1.5)";
    }
    focusedId = event.target.id;
    focusedRock = document.getElementById(focusedId);
    focusedRockRow =
      focusedRock.parentElement.parentElement.classList[1].split("-")[1];
    focusedRockCol = focusedRock.parentElement.classList[0].split("-")[0];
    focusedRockColor = focusedRock.classList[0];
  });
}
//Moving
//Adding all board Pieces & preparing to move
var boardPieces = [];
Array.prototype.push.apply(boardPieces, document.getElementsByClassName("a"));
Array.prototype.push.apply(boardPieces, document.getElementsByClassName("b"));
Array.prototype.push.apply(boardPieces, document.getElementsByClassName("c"));
Array.prototype.push.apply(boardPieces, document.getElementsByClassName("d"));
Array.prototype.push.apply(boardPieces, document.getElementsByClassName("e"));
Array.prototype.push.apply(boardPieces, document.getElementsByClassName("f"));
Array.prototype.push.apply(boardPieces, document.getElementsByClassName("g"));
Array.prototype.push.apply(boardPieces, document.getElementsByClassName("h"));
//Moving
boardPieces.forEach(function (peice) {
  peice.addEventListener("click", function () {
    //Params
    var peiceCol = peice.classList[0];
    var peicecolor = peice.classList[1];
    var peicerow = peice.parentElement.classList[1].split("-")[1];
    //aboard peice cant have more than one rock
    if (peice.children.length > 0) {
      console.log("err unvalid move!!!");
    }
    // if trying to move a rock in the same peice that is already holding it
    else if (peiceCol == focusedRockCol && peicerow == focusedRockRow) {
      console.log("can't move in the same place !");
    }
    // if first move
    else if (
      (playCounter <= 1 &&
        parseInt(focusedRockRow) == parseInt(peicerow) + 2) ||
      (playCounter <= 1 && parseInt(focusedRockRow) == parseInt(peicerow)) ||
      (playCounter <= 1 && parseInt(focusedRockRow) == parseInt(peicerow) - 2)
    ) {
      //white player turn
      if (playCounter % 2 == 0 && focusedRockColor == "whiteRock") {
        // validating cols moving
        if (
          parseInt(focusedRockCol.charCodeAt(0)) ==
          parseInt(peiceCol.charCodeAt(0))
        ) {
          // Accept and Move
          peice.appendChild(focusedRock);
          playCounter++;
          console.log("valid move");
          console.log("valid player's move num " + playCounter);
          console.log("Col:" + peiceCol);
          console.log("Row:" + peicerow);
        } else {
          console.log("unvalid move!!!");
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
          peice.appendChild(focusedRock);
          playCounter++;
          console.log("valid move");
          console.log("valid player's move num " + playCounter);
          console.log("Col:" + peiceCol);
          console.log("Row:" + peicerow);
        } else {
          console.log("unvalid move!!!");
        }
      } else {
        console.log("unvalid!!!!: other player's move");
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
          peice.appendChild(focusedRock);
          playCounter++;
          console.log("valid move");
          console.log("valid player's move num " + playCounter);
          console.log("Col:" + peiceCol);
          console.log("Row:" + peicerow);
        } else {
          console.log("unvalid move!!!");
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
          peice.appendChild(focusedRock);
          playCounter++;
          console.log("valid move");
          console.log("valid player's move num " + playCounter);
          console.log("Col:" + peiceCol);
          console.log("Row:" + peicerow);
        } else {
          console.log("unvalid move!!!");
        }
      } else {
        console.log("unvalid!!!!: other player's move");
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
        peice.appendChild(focusedRock);
        playCounter++;
        console.log("valid move");
        console.log("valid player's move num " + playCounter);
        console.log("Col:" + peiceCol);
        console.log("Row:" + peicerow);
      } //black turn
      else if (playCounter % 2 != 0 && focusedRockColor == "blackRock") {
        // Accept and Move
        peice.appendChild(focusedRock);
        playCounter++;
        console.log("valid move");
        console.log("valid player's move num " + playCounter);
        console.log("Col:" + peiceCol);
        console.log("Row:" + peicerow);
      } else {
        console.log("unvalid!!!!: other player's move");
      }
    } else {
      console.log("unvalid move!!!");
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

//Cancelling move
function cancelMove(e) {
  for (let i = 0; i < rocks.length; i++) {
    if (rocks[i].style.transform == "scale(1.5)") {
      rocks[i].style.transform = "scale(1)";
    }
  }
}
