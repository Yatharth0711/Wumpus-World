let locationTracker = 0;
let arrowCount = 1;
const container1 = document.querySelector(".container");
const container2 = document.querySelector(".container2");
const restartBtn = document.querySelector(".restartBtn");
const declarationBox = document.querySelector(".declarationBox");
const firstStepBox = document.querySelector(`#step1`);
const alertBox = document.querySelector(".alert-box");
let attempts = 0;
const worldBox = document.querySelector(".world-box");
let attempt = 1;
let score = 0;
let highscore = 0;
let attemptBox = document.querySelector("#attempt");
let scoreBox = document.querySelector("#score");
let highscoreBox = document.querySelector("#highscore");
scoreBox.textContent = `${score}`;
if (score > highscore) {
  highscore = score;
}
highscoreBox.textContent = `${highscore}`;
let gameOver_gameWon = false;

function gameOver(currLocation) {
  container1.classList.add("hide");
  container2.classList.remove("hide");
  locationTracker = 0;
  declarationBox.textContent = `Game Over! your current score is ${score} and your highest score is ${highscore}`;
  const currentStepBox = worldBox.children[currLocation];
  currentStepBox.classList.remove("maroon");
  firstStepBox.classList.add("maroon");
  attempt++;
  attemptBox.textContent = `${attempt}`;
  gameOver_gameWon = true;
  score -= 100;
  scoreBox.textContent = `${score}`;
  if (score > highscore) {
    highscore = score;
  }
  highscoreBox.textContent = `${highscore}`;
}
function gameWon() {
  declarationBox.textContent = `Game Won! your current score is ${score} and your highest score is ${highscore} `;

  container1.classList.add("hide");

  container2.classList.remove("hide");
  locationTracker = 0;
  attempt++;
  attemptBox.textContent = `${attempt}`;
  gameOver_gameWon = true;
  if (score > highscore) {
    highscore = score;
  }
  highscoreBox.textContent = `${highscore}`;
}
restartBtn.addEventListener("click", restart);
function restart() {
  arrowCount = 1;
  alertBox.textContent = "Alert Box";
  container1.classList.remove("hide");
  container2.classList.add("hide");
  console.log("wumpus");
  console.log(document.querySelector(".wumpus"));
  document.querySelector(".wumpus").textContent = "Wumpus";
  if (firstStepBox.classList.contains("win")) {
    firstStepBox.classList.remove("win");
  }
  gameOver_gameWon = false;
  score = 0;
  scoreBox.textContent = `${score}`;
}

function sendAlert(currLocation) {
  if (
    worldBox.children[currLocation].textContent.includes("Pit") ||
    worldBox.children[currLocation].textContent.includes("Wumpus")
  ) {
    gameOver(currLocation);
  }
  let alertMsg = "";
  let isGold = worldBox.children[currLocation].textContent.includes("Gold");
  if (isGold) {
    alertMsg = "GRABBED THE GOLD, RETURN TO START";
    score += 200;
    scoreBox.textContent = `${score}`;
    if (!firstStepBox.classList.contains("win")) {
      firstStepBox.classList.add("win");
    }
  }

  let topStep, bottomStep, leftStep, rightStep;
  let topIdx = currLocation - 4;
  let bottomIdx = currLocation + 4;
  let leftIdx = currLocation - 1;
  let rightIdx = currLocation + 1;

  if (topIdx >= 0) topStep = worldBox.children[topIdx];
  if (bottomIdx < 16) bottomStep = worldBox.children[bottomIdx];
  if (currLocation % 4 !== 0) leftStep = worldBox.children[leftIdx];
  if (currLocation % 4 !== 3) rightStep = worldBox.children[rightIdx];

  if (
    topStep?.textContent.includes("Pit") ||
    bottomStep?.textContent.includes("Pit") ||
    leftStep?.textContent.includes("Pit") ||
    rightStep?.textContent.includes("Pit")
  ) {
    alertMsg += "breeze";
  }

  if (
    topStep?.textContent.includes("Wumpus") ||
    bottomStep?.textContent.includes("Wumpus") ||
    leftStep?.textContent.includes("Wumpus") ||
    rightStep?.textContent.includes("Wumpus")
  ) {
    alertMsg += " stench";
  }
  alertMsg === ""
    ? (alertBox.textContent = "No Warnings")
    : (alertBox.textContent = alertMsg);
}

function right(btn) {
  console.dir(btn);
  console.dir(btn.nextElementSibling);
  btn.classList.remove("maroon");
  btn.nextElementSibling.classList.add("maroon");
  locationTracker++;
  console.log(locationTracker);
  sendAlert(locationTracker);
  score -= 10;
  scoreBox.textContent = `${score}`;
  if (score > highscore) {
    highscore = score;
  }
  highscoreBox.textContent = `${highscore}`;
}

function left(btn) {
  console.dir(btn);
  console.dir(btn.nextElementSibling);
  btn.classList.remove("maroon");
  btn.previousElementSibling.classList.add("maroon");
  locationTracker--;
  console.log(locationTracker);
  if (locationTracker == 0) {
    if (firstStepBox.classList.contains("win")) {
      gameWon();
    }
  }
  sendAlert(locationTracker);
  score -= 10;
  scoreBox.textContent = `${score}`;
  if (score > highscore) {
    highscore = score;
  }
  highscoreBox.textContent = `${highscore}`;
}
function down(btn) {
  console.dir(btn);
  let index = locationTracker + 4;
  console.log(worldBox.children[index]);
  btn.classList.remove("maroon");
  worldBox.children[index].classList.add("maroon");
  locationTracker += 4;
  console.log(locationTracker);
  const btnId = worldBox.children[index].getAttribute("id");
  console.log(btnId);
  sendAlert(locationTracker);
  score -= 10;
  scoreBox.textContent = `${score}`;
  if (score > highscore) {
    highscore = score;
  }
  highscoreBox.textContent = `${highscore}`;
}
function up(btn) {
  console.dir(btn);
  let index = locationTracker - 4;
  console.log(worldBox.children[index]);
  btn.classList.remove("maroon");
  worldBox.children[index].classList.add("maroon");
  locationTracker -= 4;
  console.log(locationTracker);
  if (locationTracker == 0) {
    if (firstStepBox.classList.contains("win")) {
      gameWon();
    }
  }

  const btnId = worldBox.children[index].getAttribute("id");
  console.log(btnId);
  sendAlert(locationTracker);
  score -= 10;
  scoreBox.textContent = `${score}`;
  if (score > highscore) {
    highscore = score;
  }
  highscoreBox.textContent = `${highscore}`;
}

const rightBtn = document.querySelector(".right");
rightBtn.addEventListener("click", () => {
  const location = document.querySelector(".maroon");
  if ([3, 7, 11, 15].includes(locationTracker)) {
    console.log(locationTracker);
    console.log("bump");
  } else {
    right(location);
  }
});
const leftBtn = document.querySelector(".left");
leftBtn.addEventListener("click", () => {
  const location = document.querySelector(".maroon");
  if ([0, 4, 8, 12].includes(locationTracker)) {
    console.log(locationTracker);
    console.log("bump");
  } else {
    left(location);
  }
});
const downBtn = document.querySelector(".down");
downBtn.addEventListener("click", () => {
  const location = document.querySelector(".maroon");
  if ([12, 13, 14, 15].includes(locationTracker)) {
    console.log(locationTracker);
    console.log("bump");
  } else {
    down(location);
  }
});
const upBtn = document.querySelector(".up");
upBtn.addEventListener("click", () => {
  const location = document.querySelector(".maroon");
  if ([0, 1, 2, 3].includes(locationTracker)) {
    console.log(locationTracker);
    console.log("bump");
  } else {
    up(location);
  }
});

const showInstructions = document.querySelector(".instruction");
showInstructions.addEventListener("click", () => {
  console.log("button was cliked");
  const detail = document.querySelector("#details");
  detail.classList.toggle("hide");
});

const shootBtns = document.querySelectorAll(".shootBtn");
for (const shootBtn of shootBtns) {
  shootBtn.addEventListener("click", () => {
    if (arrowCount == 0) {
      alertMsg = "No arrow left";
      alertBox.textContent += alertMsg;
      return;
    }
    let isLeftShoot = shootBtn.classList.contains("left");
    let isRightShoot = shootBtn.classList.contains("right");
    let isUpShoot = shootBtn.classList.contains("up");
    let isDownShoot = shootBtn.classList.contains("down");

    let target;
    if (isLeftShoot) {
      if (locationTracker % 4 !== 0)
        target = worldBox.children[locationTracker - 1];
    } else if (isRightShoot) {
      console.log("right shoot");
      if (locationTracker % 4 !== 3) {
        console.log("target:", worldBox.children[locationTracker + 1]);
        target = worldBox.children[locationTracker + 1];
      }
    } else if (isUpShoot) {
      let targetIdx = locationTracker - 4;
      if (targetIdx > 0) target = worldBox.children[targetIdx];
    } else if (isDownShoot) {
      let targetIdx = locationTracker + 4;
      if (targetIdx < 16) target = worldBox.children[targetIdx];
    }

    if (!target) {
      alertBox.textContent += " GAAND KE ANDHE!!!";
      arrowCount--;
      score -= 50;
      scoreBox.textContent = `${score}`;
      if (score > highscore) {
        highscore = score;
      }
      highscoreBox.textContent = `${highscore}`;
      return;
    }
    const isWumpus = target?.textContent.includes("Wumpus");
    if (isWumpus) {
      const wumpus = document.querySelector(".wumpus");
      wumpus.textContent = "";
      alertBox.textContent += " You killed the Wumpus.";
      arrowCount--;
      score -= 50;
      score += 500;
      scoreBox.textContent = `${score}`;
      if (score > highscore) {
        highscore = score;
      }
      highscoreBox.textContent = `${highscore}`;
    } else {
      alertBox.textContent += " You missed the chance.";
      arrowCount--;
      score -= 50;
      scoreBox.textContent = `${score}`;
      if (score > highscore) {
        highscore = score;
      }
      highscoreBox.textContent = `${highscore}`;
    }
  });
}

window.addEventListener("keydown", (event) => {
  console.log(event);
  if (event.ctrlKey) {
    shoot(event.key);
  } else if (event.key === "Enter" && gameOver_gameWon) {
    restart();
  } else {
    switch (event.key) {
      case "ArrowUp":
        let location1 = document.querySelector(".maroon");
        if ([0, 1, 2, 3].includes(locationTracker)) {
          console.log(locationTracker);
          console.log("bump");
        } else {
          up(location1);
        }
        break;
      case "ArrowDown":
        let location2 = document.querySelector(".maroon");
        if ([12, 13, 14, 15].includes(locationTracker)) {
          console.log(locationTracker);
          console.log("bump");
        } else {
          down(location2);
        }
        break;
      case "ArrowRight":
        let location3 = document.querySelector(".maroon");
        if ([3, 7, 11, 15].includes(locationTracker)) {
          console.log(locationTracker);
          console.log("bump");
        } else {
          right(location3);
        }
        break;
      case "ArrowLeft":
        let location4 = document.querySelector(".maroon");
        if ([0, 4, 8, 12].includes(locationTracker)) {
          console.log(locationTracker);
          console.log("bump");
        } else {
          left(location4);
        }
        break;

      default:
        console.log("You pressed and unwanted key");
        break;
    }
  }
});

function shoot(key) {
  if (arrowCount == 0) {
    alertMsg = "No arrow left";
    alertBox.textContent += alertMsg;
    return;
  }
  let target;
  if (key === "ArrowLeft") {
    if (locationTracker % 4 !== 0)
      target = worldBox.children[locationTracker - 1];
  } else if (key === "ArrowRight") {
    console.log("right shoot");
    if (locationTracker % 4 !== 3) {
      console.log("target:", worldBox.children[locationTracker + 1]);
      target = worldBox.children[locationTracker + 1];
    }
  } else if (key === "ArrowUp") {
    let targetIdx = locationTracker - 4;
    if (targetIdx > 0) target = worldBox.children[targetIdx];
  } else if (key === "ArrowDown") {
    let targetIdx = locationTracker + 4;
    if (targetIdx < 16) target = worldBox.children[targetIdx];
  } else {
    console.log("You pressed an unwanted key");
    return;
  }

  if (!target) {
    alertBox.textContent += " GAAND KE ANDHE!!!";
    arrowCount--;
    score -= 50;
    scoreBox.textContent = `${score}`;
    if (score > highscore) {
      highscore = score;
    }
    highscoreBox.textContent = `${highscore}`;
    return;
  }
  const isWumpus = target?.textContent.includes("Wumpus");
  if (isWumpus) {
    const wumpus = document.querySelector(".wumpus");
    wumpus.textContent = "";
    alertBox.textContent += " You killed the Wumpus.";
    arrowCount--;
    score -= 50;
    score += 500;
    scoreBox.textContent = `${score}`;
    if (score > highscore) {
      highscore = score;
    }
    highscoreBox.textContent = `${highscore}`;
  } else {
    alertBox.textContent += " You missed the chance.";
    arrowCount--;
    score -= 50;
    scoreBox.textContent = `${score}`;
    if (score > highscore) {
      highscore = score;
    }
    highscoreBox.textContent = `${highscore}`;
  }
}
