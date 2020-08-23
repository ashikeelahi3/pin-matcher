

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

let count;

let pinNumber;

let getId = (id) => document.getElementById(id);


// <<< a function to display block or none >>>
let wantDisplayBlock = (id, wantToShow) => document.getElementById(id).style.display = (wantToShow) ? "block" : "none";

// <<< hiding all function >>>
const hideAll = () => {
  wantDisplayBlock("wrong", false);
  wantDisplayBlock("correct", false);
  wantDisplayBlock("warning", false);
}

hideAll();

// <<<  4 digits random number generator function >>>
function getRandom() {
  let rand = Math.floor(Math.random() * 10000);
  let randString = rand + '';
  let returnString = randString;
  if (randString.length
    < 4) {
    let needZero = (4 - randString.length);
    for (let i = 0; i < needZero; i++) {
      returnString = '0' + returnString;
    }
  }
  return returnString;
}

// <<< left counting function >>>
let leftCount = (count) => {
  getId("left-count").innerText = `${count} try left`;
}

// <<< generating a 4 digits random number >>>
getId("rand-num-generator").addEventListener("click", () => {
  pinNumber = getRandom();
  getId("generate-pin-box").value = pinNumber;
  hideAll();
  getId("input-box").value = '';
  count = 3;
  leftCount(count);
  getId("submit-pin-btn").disabled = false;
});


// <<< number pad event listener >>>
getId("num-pad").addEventListener("click", () => {
  let buttonText = event.target.innerText;
  let inputBox = getId("input-box");
  let provideNumbers = (inputBox.value).length;
  if ((provideNumbers < 4) && (numbers.indexOf(buttonText) !== -1)) {
    inputBox.value += buttonText;
  } else if (buttonText === "<") {
    const displayAfterRemove = (inputBox.value).slice(0, (provideNumbers - 1));
    inputBox.value = displayAfterRemove;
  } else if (buttonText === "C") {
    inputBox.value = '';
  }
});


// <<< checking and notify the values >>>
getId("submit-pin-btn").addEventListener("click", () => {
  hideAll();
  let generatedPin = getId("generate-pin-box").value;
  let inputPin = getId("input-box").value;

  if (generatedPin.length === 0) {
    wantDisplayBlock("warning", true);
  } else if (generatedPin === inputPin) {
    wantDisplayBlock("correct", true);
    // generatedPin = '';
    getId("generate-pin-box").value = '';
    // inputPin = '';
    getId("input-box").value = '';
    getId("left-count").style.display = "none";
  } else if (generatedPin !== inputPin) {
    wantDisplayBlock("wrong", true);
    // inputPin = '';
    getId("input-box").value = '';

    leftCount(--count);
    if (count === 0) {
      getId("submit-pin-btn").disabled = true;
      getId("wrong").innerText = "❌ You can't access";
      getId("generate-pin-box").value = '';
    }
  }
});

// <<< Anyone can't modify the generating pin >>>
getId("generate-pin-box").addEventListener("input", () => getId("generate-pin-box").value = pinNumber || '');


