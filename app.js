// basic variables
const radius = 2;
let score = 0;
let clicks = 0;
const aimShowTime = 1301;
const gameTime = 20000;
let aimAppearTimer;
let gameTimer;
let timeLeftUpdate;
let timesShow = 0;
let isGameFinished = false;
let aim = makeAim(radius);
let aimPadding = 10;

// element variables
const gameField = document.querySelector(".game-field");
const gamePanel = document.querySelector(".header__game-panel")
const scoreField = document.querySelector(".score");
const clicksField = document.querySelector(".clicks");
const triesField = document.querySelector(".tries");
const gameTimerField = document.querySelector(".timer");
const startGameButton = document.querySelector(".start-game");
const menu = document.querySelector(".menu");
const results = document.querySelector(".results__text");


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
  rootElement.style.display = "none";
  rootElement.style.position = "absolute";
  return rootElement;
}

function clickOnAim(e) {
  const elementScore = e.target.dataset.score;
  if (!elementScore) return;
  score += parseInt(elementScore);
  scoreField.textContent = score;
  clicksField.textContent = ++clicks;
  hideAim();
}

function showAim() {
  let aimTop = Math.round(Math.random() * (aim.parentElement.clientHeight - aim.clientHeight - 2 *aimPadding) + aimPadding); 
  let aimLeft = Math.round(Math.random() * (aim.parentElement.clientWidth - aim.clientWidth - 2 * aimPadding) + aimPadding);
  aim.style.top = `${aimTop}px`;
  aim.style.left = `${aimLeft}px`;
  aim.style.display = "block";
  triesField.textContent = (++timesShow);
}

function hideAim() {
  aim.style.display = "none";
}

function startGameButtonClick() {
  menu.style.display = "none";
  gameField.append(aim);
  gamePanel.style.display = "block";
  aimAppearTimer = setInterval(showAim, aimShowTime);
  gameTimer = setTimeout(gameOver, gameTime);

  let gameOverTime = Date.now() + gameTime;
  timeLeftUpdate = setInterval(()=>{

    let distance = gameOverTime - Date.now();
    let minutes = Math.round(distance / (1000 * 60));
    console.log(`${minutes}`);
   
    let seconds = Math.round(distance / 1000) % 60;
    console.log(`${seconds}`);
    gameTimerField.textContent = `${minutes}:${seconds < 9 ? "0" : ""}${seconds}`;
  
  }, 500);
  showAim();
}

function gameOver () {
  clearInterval(aimAppearTimer);
  clearInterval(timeLeftUpdate);
  aim.style.display = "none";
  isGameFinished = true;
  initGame();
}

// add listeners
aim.addEventListener("click", clickOnAim);
startGameButton.addEventListener("click", startGameButtonClick);


function initGame() {
  if (isGameFinished) {
    results.textContent = `Score: ${score}, mistakes: ${timesShow - clicks}`;
    startGameButton.textContent = "Play again!";
  }
  timesShow = 0;
  score = 0;
  clicks = 0;
  menu.style.display = "block";
  gamePanel.style.display = "none";
}