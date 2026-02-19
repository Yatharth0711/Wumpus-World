let locationTracker = 0;
let arrowCount = 1;
const container1 = document.querySelector(".container");
const container2 = document.querySelector(".container2");
const restartBtn = document.querySelector(".restartBtn");
const declarationBox = document.querySelector(".declarationBox");
const firstStepBox = document.querySelector(`#step1`);
const alertBox = document.querySelector(".alert-box");

function gameOver(currLocation) {
  container1.classList.add("hide");
  container2.classList.remove("hide");
  locationTracker = 0;
  declarationBox.textContent= "Game Over";
  const currentStepBox = worldBox.children[currLocation];
  currentStepBox.classList.remove("maroon");
  firstStepBox.classList.add("maroon");
}
function gameWon() {
  declarationBox.textContent = "You won the game.";
  
  container1.classList.add("hide");
  
  container2.classList.remove("hide");
  locationTracker = 0;
 
}
restartBtn.addEventListener("click", restart);
function restart() {
  arrowCount=1;
  alertBox.textContent = "Alert Box";
  container1.classList.remove("hide");
  container2.classList.add("hide");
  console.log("wumpus");
  console.log(document.querySelector(".wumpus"));
  document.querySelector(".wumpus").textContent = "Wumpus";
  if (firstStepBox.classList.contains("win")) {
    firstStepBox.classList.remove("win");
  }
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
}

const worldBox = document.querySelector(".world-box");

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
      return;
    }
    const isWumpus = target?.textContent.includes("Wumpus");
    if (isWumpus) {
      const wumpus = document.querySelector(".wumpus");
      wumpus.textContent = "";
      alertBox.textContent += " You killed the Wumpus.";
    } else {
      alertBox.textContent += " You missed the chance.";
    }
    arrowCount--;
  });
}

