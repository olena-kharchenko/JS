const selectedByLetter = document.querySelector('#letter-select');
const listOfFriends = document.querySelector('#list-of-friends');

//create array of random letters and insert it in select
const arr_en = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

const arrOfRandomLetters = [];

for (let i = 0; i < 5; i += 1) {
  const nextLetter = arr_en[getRandomInt(0, arr_en.length - 1)];
  arrOfRandomLetters.push(nextLetter);
  arr_en.splice(arr_en.indexOf(nextLetter), 1); //letters do not repeat
}

const lettersToShowInSelect = [...arrOfRandomLetters].reduce(
  (string, item) => string + `<option value="${item}">${item.toUpperCase()}</option>`,
  '',
);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

selectedByLetter.insertAdjacentHTML('beforeend', lettersToShowInSelect);

//looking for people
selectedByLetter.addEventListener('change', getFriends);

function getFriends(e) {
  const letterToFind = getValue(e);

  readTextFile('./list.json', function (text) {
    const data = JSON.parse(text);
    const friendsToShow = data.filter(
      friend => friend.name[0].toLowerCase() === letterToFind.toLowerCase(),
    );

    if (friendsToShow.length > 0) {
      const friends = [...friendsToShow].reduce(
        (string, item) => string + `<li>${item.name}</li>`,
        '',
      );
      listOfFriends.innerHTML = friends;
      console.log(friends);
    } else{
      listOfFriends.innerHTML = '';
    }
  });
}

//reading json
function readTextFile(file, callback) {
  const rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType('application/json');
  rawFile.open('GET', file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == '200') {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}

function getValue(e) {
  const value = e.target.value;
  return value;
}

