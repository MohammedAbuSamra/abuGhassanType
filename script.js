
/* Definitions */

const inputBox = document.querySelector(".input");
const writeBox = document.querySelector(".writeBox");
const trueBox = document.querySelector(".true");
const sentenceBox = document.querySelector('.sentence');
const timeLabel = document.querySelector(".time");
const carnt = document.querySelector(".writtenContainer .after");

carnt.addEventListener("animationend", () => {
  carnt.classList.remove("move");
})

const RANDOM_TEXT_API_URL = "https://api.allorigins.win/get?url=https%3A%2F%2Fmonkeytype.com%2Flanguages%2Fenglish.json";
const written = () => {
  return trueBox.innerText + writeBox.innerText;
}
const resultLabel = document.querySelector(".result-detail")
let isGameStarted = false;
const time = 30;

timeLabel.innerText = time;

let sentence = "";

startGame();

async function startGame() {
  sentence = await getText(30);
  setText(sentence);
}


async function getText(numOfWords) {
  const api = RANDOM_TEXT_API_URL;
  try {
    const res = await fetch(api);
    const json = await res.json();
    const words = JSON.parse(json.contents).words;
    let mySentence = "";
    for (let i = 0; i < numOfWords; i++) {
      let randomIndex = Math.floor(Math.random() * 150);
      mySentence += words[randomIndex] + " ";
    }

    console.log(mySentence.slice(0, mySentence.length - 2));
    return mySentence;

  } catch (err) {
    return "than such while much mean you school it where into to at get now here little I mean many all that place should way out call while see man loo"
  }

}

function setText(text) {
  sentenceBox.innerText = text;
}

function compare(text, target) {
  text = text.normalize("NFKC");
  target = target.normalize("NFKC");

  for (let i = 0; i < text.length; i++) {
    if (text[i] !== target[i]) {

      return false;
    }
  }
  return true;
}

function getResult(text, target, time) {
  let convertToMinute = 60 / time

  text = text.normalize("NFKC").split(" ");
  target = target.normalize("NFKC").split(" ");

  let rightWords = 0;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === target[i]) {
      rightWords++;
    }
  }

  let wordPerMinute = (rightWords) * convertToMinute;

  return wordPerMinute;
}

function startTime(time) {

  let sec = time;

  const count = () => {
    if (sec == 0) {
      clearInterval(timer);
      const result = getResult(written(), sentence, time);
      resultLabel.innerText = `${result} words per minute`
      return;
    }
    timeLabel.innerText = --sec;
  }

  count();
  const timer = setInterval(() => {
    count();
  }, 1000)

}


inputBox.addEventListener("click", () => {
  writeBox.focus();
})

inputBox.addEventListener("input", (element) => {



  carnt.classList.add("move");
  if (!isGameStarted) {
    startTime(time)
    isGameStarted = true;
  }
  const writtenText = written();
  sentenceBox.innerText = sentence.slice(writtenText.length).normalize("NFKC")


  if (!compare(writtenText, sentence)) {
    writeBox.classList.add("wrong");
    return;
  }

  trueBox.innerText += writeBox.innerText.normalize("NFKC");
  writeBox.innerText = ""
  inputBox.classList.remove("wrong");

})
