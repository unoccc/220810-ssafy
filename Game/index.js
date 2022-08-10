function sleep(ms) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
}

const cardArray = [
  {
    name: "airplane",
    img: "./public/airplane.png",
    id: null,
    done: false,
  },
  {
    name: "airplane",
    img: "./public/airplane.png",
    id: null,
    done: false,
  },
  {
    name: "train",
    img: "./public/train.png",
    id: null,
    done: false,
  },
  {
    name: "train",
    img: "./public/train.png",
    id: null,
    done: false,
  },
  {
    name: "bus",
    img: "./public/bus.png",
    id: null,
    done: false,
  },
  {
    name: "bus",
    img: "./public/bus.png",
    id: null,
    done: false,
  },
  {
    name: "car",
    img: "./public/car.png",
    id: null,
    done: false,
  },
  {
    name: "car",
    img: "./public/car.png",
    id: null,
    done: false,
  },
  {
    name: "bicycle",
    img: "./public/bicycle.png",
    id: null,
    done: false,
  },
  {
    name: "bicycle",
    img: "./public/bicycle.png",
    id: null,
    done: false,
  },
  {
    name: "ship",
    img: "./public/ship.png",
    id: null,
    done: false,
  },
  {
    name: "ship",
    img: "./public/ship.png",
    id: null,
    done: false,
  },
];

const gameDOM = [];

const getGameDOM = () => {
  const columns = document.querySelectorAll('.column');
  for(let i=0;i<columns.length;i++){
    gameDOM[i] = columns[i];
  }
};

getGameDOM();

cardArray.sort(() => 0.5 - Math.random()); // shuffle 섞는 구문


const setIDtoCardArray = () => {
  for(let i=0;i<gameDOM.length;i++){
    cardArray[i].id = i;
  }
};

setIDtoCardArray();

const createBoard = () => {
  for (let i = 0; i < gameDOM.length; i++) {
    const card = document.createElement('img');
    card.setAttribute("src", "./public/question_mark.png");
    gameDOM[i].append(card);
  }
};

createBoard();

let clickCount = 0;
let clickFirst = -1;
let clickSecond = -1;

const setClickHistory = (location) => {
  if(clickFirst === -1) {
    clickFirst = location;
    const card = gameDOM[location].querySelector('img');
    card.setAttribute("src", cardArray[location].img);
    clickCount++;
  }
  else{
    clickSecond = location;
    const card = gameDOM[location].querySelector('img');
    card.setAttribute("src", cardArray[location].img);
    clickCount++;
  }
}

const isCorrect = () => {
  if(cardArray[clickFirst].name === cardArray[clickSecond].name){
    cardArray[clickFirst].done = true;
    cardArray[clickSecond].done = true;
  }
}

const backflip = () => {
  const card1 = gameDOM[clickFirst].querySelector('img');
  card1.setAttribute("src", "./public/question_mark.png");
  const card2 = gameDOM[clickSecond].querySelector('img');
  card2.setAttribute("src", "./public/question_mark.png");
}

const flip = (location) => {
  if(!cardArray[location].done){
    setClickHistory(location);
    setTimeout(() => {
      if(clickCount === 2){
        isCorrect();
        if(!cardArray[clickFirst].done){
          backflip();
        }
        clickCount = 0;
        clickFirst = -1;
        clickSecond = -1;
      }
    }, 200);
  }
};
