let radius = 2;
const gameField = document.querySelector(".game-field");
const gamePanel = document.querySelector(".header__game-panel")
const scoreField = document.querySelector(".score");
const clicksField = document.querySelector(".clicks");
const startGameButton = document.querySelector(".start-game");
let score = 0;
let clicks = 0;

function makeAim(radius) {
  const countCircles = 10;
  const pointsForCircle = 1;
  let parentElement = document.createElement("div");
  let rootElement = parentElement;
  
  for (let i=0; i < countCircles; i++) {
    let currentCircleElement = document.createElement("div");
    currentCircleElement.style.height = `${(countCircles - i) * radius * 2}px`;
    currentCircleElement.style.width = `${(countCircles - i) * radius * 2}px`;
    currentCircleElement.style.paddingLeft = `${radius - 1}px`;
    currentCircleElement.style.paddingTop = `${radius - 1}px`;
    currentCircleElement.classList.add("aim");
    currentCircleElement.dataset.score = pointsForCircle * (i + 1);
    parentElement.append(currentCircleElement);
    parentElement = currentCircleElement;
  }
  rootElement.style.visibility = "hidden";
  rootElement.style.position = "absolute";
  return rootElement;
}

function clickOnAim(e) {
  const elementScore = e.target.dataset.score;
  if (!elementScore) return;
  score += parseInt(elementScore);
  scoreField.textContent = score;
  clicksField.textContent = ++clicks;
  showAim();
}

function showAim() {
  let aimTop = Math.round(Math.random() * (aim.parentElement.clientHeight - aim.clientHeight));
  let aimLeft = Math.round(Math.random() * (aim.parentElement.clientWidth - aim.clientWidth));
  aim.style.top = `${aimTop}px`;
  aim.style.left = `${aimLeft}px`;
  aim.style.visibility = "";
}

function hideAim() {
  aim.style.visibility = "hidden";
}

function startGameButtonClick() {
  startGameButton.style.display = "none";
  gamePanel.style.display = "block";
  showAim();
}

let aim = makeAim(radius);
aim.addEventListener("click", clickOnAim);
startGameButton.addEventListener("click", startGameButtonClick);
gameField.append(aim);

// TODO:
// 1. Make end of the game
// 2. Calc stats
// 3. Timers