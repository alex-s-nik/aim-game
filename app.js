let radius = 4;
const gameField = document.querySelector(".game-field");

function makeAim(radius) {
  const countCircles = 10;
  const circlesFilled = 9;
  const pointsForCircle = 1;
  /* let elemAim = document.createElement("div");
  elemAim.style.height = `${countCircles * radius * 2}px`; //  "400px";
  elemAim.style.width = `${countCircles * radius * 2}px`;
  elemAim.classList.add("aim");
  elemAim.classList.add("non-filled");
  elemAim.dataset.score = pointsForCircle; */
  let parentElement = gameField;
  /* parentElement.append(elemAim);
  parentElement = elemAim; */
  for (let i=0; i < countCircles; i++) {
    let currentCircleElement = document.createElement("div");
    // data-points=i
    // width, height = radius*2*(i+1)
    //
    currentCircleElement.style.height = `${(countCircles - i) * radius * 2}px`;
    currentCircleElement.style.width = `${(countCircles - i) * radius * 2}px`;
    currentCircleElement.style.paddingLeft = `${radius - 1}px`;
    currentCircleElement.style.paddingTop = `${radius - 1}px`;
    currentCircleElement.classList.add("aim");
    if (i >= circlesFilled) {
      currentCircleElement.classList.add("filled");
    } else {
      currentCircleElement.classList.add("non-filled");
    }
    
    currentCircleElement.dataset.score = pointsForCircle * (i + 1);
    parentElement.append(currentCircleElement);
    parentElement = currentCircleElement;
  }
  //gameField.append(elemAim);
}

makeAim(radius);