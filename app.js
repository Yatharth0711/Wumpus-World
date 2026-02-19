let locationTracker = 0;
const container1 = document.querySelector(".container");
const container2 = document.querySelector(".container2");
const restartBtn = document.querySelector(".restartBtn");
const declarationBox = document.querySelector(".declarationBox");
const firstStepBox = document.querySelector(`#step1`);
const alertBox = document.querySelector(".alert-box");

function gameOver(stepId) {
  //   container1.classList.add("position");
  container1.classList.add("hide");
  //   container2.classList.remove("position");
  container2.classList.remove("hide");
  locationTracker = 0;
  console.log(stepId);
  const currentStepBox = document.querySelector(`#${stepId}`);
  currentStepBox.classList.remove("maroon");
  firstStepBox.classList.add("maroon");
}
function gameWon() {
  declarationBox.textContent = "You won the game.";
  //   container1.classList.add("position");
  container1.classList.add("hide");
  //   container2.classList.remove("position");
  container2.classList.remove("hide");
  locationTracker = 0;
  // console.log(stepId);
  // const currentStepBox = document.querySelector(`#${stepId}`);
  // currentStepBox.classList.remove("maroon");
  // firstStepBox.classList.add("maroon");
}
restartBtn.addEventListener("click", restart);
function restart() {
  alertBox.textContent = "Alert Box";
  //   container1.classList.remove("position");
  container1.classList.remove("hide");
  //   container2.classList.add("position");
  container2.classList.add("hide");
  if (firstStepBox.classList.contains("win")) {
    firstStepBox.classList.remove("win");
  }
}

function sendAlert(id) {
  if (id == "breeze-stench") {
    alertBox.textContent = "BREEZE AND STENCH";
  } else if (id == "breeze") {
    alertBox.textContent = "BREEZE";
  } else if (id == "stench") {
    alertBox.textContent = "Stench";
  } else if (id == "pit1" || id == "pit2" || id == "pit3" || id == "wumpus") {
    gameOver(id);
  } else if (id == "gold") {
    alertBox.textContent = "GRABBED THE GOLD, RETURN TO START";
    if (!firstStepBox.classList.contains("win")) {
      firstStepBox.classList.add("win");
    }
  } else {
    alertBox.textContent = "Alert Box";
  }
}
function right(btn) {
  console.dir(btn);
  console.dir(btn.nextElementSibling);
  btn.classList.remove("maroon");
  btn.nextElementSibling.classList.add("maroon");
  locationTracker++;
  console.log(locationTracker);
  const btnId = btn.nextElementSibling.getAttribute("id");
  console.log(btnId);
  sendAlert(btnId);
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
  const btnId = btn.previousElementSibling.getAttribute("id");
  console.log(btnId);
  sendAlert(btnId);
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
  sendAlert(btnId);
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
  sendAlert(btnId);
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
