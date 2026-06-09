const fs = require('fs');

const dataFile = 'd:\\github\\math-flashcards\\data.js';
const newCardsFile = 'd:\\github\\math-flashcards\\scratch_format.txt';

let dataContent = fs.readFileSync(dataFile, 'utf8');
const newCardsContent = fs.readFileSync(newCardsFile, 'utf8');

// Find the start of the cards array in se_short_answers
const seShortAnswersStart = dataContent.indexOf('se_short_answers: {');
if (seShortAnswersStart === -1) {
    console.error('Could not find se_short_answers in data.js');
    process.exit(1);
}

const cardsStart = dataContent.indexOf('cards: [', seShortAnswersStart);
if (cardsStart === -1) {
    console.error('Could not find cards array in se_short_answers');
    process.exit(1);
}

// Find the end of the cards array
// We know it ends with "\n        ]\n    }" because it's the last property of se_short_answers
// Let's use a regex or just simple parsing
let openBrackets = 0;
let cardsEnd = -1;
for (let i = cardsStart + 7; i < dataContent.length; i++) {
    if (dataContent[i] === '[') openBrackets++;
    else if (dataContent[i] === ']') {
        openBrackets--;
        if (openBrackets === 0) { // Found the closing bracket of cards: [
            cardsEnd = i;
            break;
        }
    }
}

if (cardsEnd === -1) {
    console.error('Could not find the end of cards array');
    process.exit(1);
}

// Replace the slice
const updatedContent = dataContent.slice(0, cardsStart) + newCardsContent.trim() + dataContent.slice(cardsEnd + 1);

fs.writeFileSync(dataFile, updatedContent, 'utf8');
console.log('Successfully updated data.js with new formatted cards!');
