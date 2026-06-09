const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'se', 'se_quiz.html');
const content = fs.readFileSync(filePath, 'utf8');

const startMarker = 'const rawDB = [';
const startIndex = content.indexOf(startMarker);
if (startIndex === -1) {
    console.error('Could not find rawDB start');
    process.exit(1);
}

let bracketCount = 1;
let currentIndex = startIndex + startMarker.length;
while (bracketCount > 0 && currentIndex < content.length) {
    if (content[currentIndex] === '[') {
        bracketCount++;
    } else if (content[currentIndex] === ']') {
        bracketCount--;
    }
    currentIndex++;
}

const rawDbStr = content.substring(startIndex, currentIndex);
const rawDB = eval(`(function() { ${rawDbStr}; return rawDB; })()`);

fs.writeFileSync(path.join(__dirname, 'temp_db.json'), JSON.stringify(rawDB, null, 2), 'utf8');
console.log('Successfully wrote temp_db.json');
