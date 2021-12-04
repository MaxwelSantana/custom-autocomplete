import trainingTxt from './training.txt';

let wordArray;
let map;
const depth = 3;

async function readTrainingFileToArray() {
  if (wordArray) return wordArray;
  await fetch(trainingTxt)
    .then((r) => r.text())
    .then((text) => {
      text = text.replace(/\r?\n|\r/g, ' ');
      const replacements = [
        ',',
        '.',
        ':',
        '!',
        '?',
        '"',
        '“',
        '”',
        ';',
        '(',
        ')',
        '-',
        '_',
      ];
      replacements.forEach((value) => {
        text = text.replace(RegExp('\\' + value, 'g'), ' ' + value + ' ');
      });
      wordArray = text.split(' ');
      wordArray = wordArray.filter((word) => word.trim().length !== 0);
    });
  return wordArray;
}

function buildMap(tokens, depth) {
  if (map) return map;
  console.log('buildMap called');
  map = {};

  for (let index = 0; index < tokens.length - depth; index++) {
    let phrase = '';
    for (let depthIndex = 0; depthIndex < depth; depthIndex++) {
      const curr_word = tokens[depthIndex + index];
      phrase = phrase + ' ' + curr_word;

      phrase = phrase.trimStart();

      if (!map[phrase]) {
        map[phrase] = {};
      }

      let next_word = tokens[index + depth];

      let next_word_list = map[phrase];
      if (!next_word_list[next_word]) {
        next_word_list[next_word] = 1;
      } else {
        next_word_list[next_word]++;
      }
    }
  }

  return map;
}

function suggest_word(start_phrase, word_map) {
  let phrase = start_phrase;
  let word_list = word_map[phrase];
  while (word_list == null) {
    let startNextWord = phrase.indexOf(' ');
    if (startNextWord < 0) return null;
    phrase = phrase.substring(startNextWord + 1);
    word_list = word_map[phrase];
  }
  console.log('suggest_word', word_list);
  let suggested_word = choose_word_weighted(word_list);
  return suggested_word;
}

function choose_word_weighted(word_list) {
  var keys = Object.keys(word_list);
  let sum_of_weights = 0;

  keys.forEach((key) => {
    sum_of_weights += word_list[key];
  });

  let random = Math.random() * sum_of_weights;

  let curr_word = '';
  keys.every((word) => {
    curr_word = word;
    random -= word_list[word];
    return random > 0;
  });

  return curr_word;
}

readTrainingFileToArray().then((all_words) => {
  buildMap(all_words, depth);
});

function suggestWord(initial_phrase) {
  if (!wordArray || !map) return '';

  let output = suggest_word(initial_phrase, map);
  console.log(initial_phrase + ': ' + output);
  return initial_phrase + output;
}

export { suggestWord };
