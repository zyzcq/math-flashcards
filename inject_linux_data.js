const fs = require('fs');

const dataFile = 'd:\\github\\math-flashcards\\data.js';
let dataContent = fs.readFileSync(dataFile, 'utf8');
const shortAnswersContent = fs.readFileSync('d:\\github\\math-flashcards\\scratch_linux_short_answers.js', 'utf8');

const linuxQuizConfig = `
    linux_quiz: {
        id: "linux_quiz",
        title: "Linux：基础与应用通关",
        subtitle: "八大模块核心考点（选择/判断）",
        themeColor: "emerald",
        type: "article",
        url: "linux/linux_quiz.html?v=1.3",
        cards: []
    },`;

// Inject into appData. Replace the Linux block if it already exists.
const siteDataIndex = dataContent.indexOf('const siteData = [');
if (siteDataIndex === -1) process.exit(1);

// We find the last "};" before siteData
const appDataEndIndex = dataContent.lastIndexOf('};', siteDataIndex);
const linuxBlockStart = dataContent.lastIndexOf('\n,\n\n    linux_quiz:', appDataEndIndex);

let newAppDataContent;
if (linuxBlockStart !== -1) {
    newAppDataContent = dataContent.slice(0, linuxBlockStart) +
        ",\n" + linuxQuizConfig + "\n\n" + shortAnswersContent + "\n" +
        dataContent.slice(appDataEndIndex);
} else {
    newAppDataContent = dataContent.slice(0, appDataEndIndex) +
        ",\n" + linuxQuizConfig + "\n\n" + shortAnswersContent + "\n" +
        dataContent.slice(appDataEndIndex);
}

fs.writeFileSync(dataFile, newAppDataContent, 'utf8');
console.log('Successfully injected linux objects into data.js');
