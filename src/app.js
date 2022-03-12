import fs from "fs";
import fetch from "node-fetch";
import { PATH_IMG, TYPING_SVG, URL_QUOTE, VISTOR_COUNT } from "./constants";
import { getFullDate } from "./utils";

const totalVisitor = `<p align='center'><img src='${VISTOR_COUNT}'></p>`;
const greets = `[![Typing SVG](${TYPING_SVG})](https://git.io/typing-svg)`;
const images = `\n<p align="center"><img src="${PATH_IMG}" width=70% /></p>`;

async function getQuote() {
  try {
    const response = await fetch(URL_QUOTE);
    const data = await response.json();
    const quote = data.content;
    const author = data.author === null ? `Anonymous` : data.author;
    return {
      quote,
      author,
    };
  } catch (err) {
    console.error(err.message);
  }
}

const generate = async () => {
  const { quote, author } = await getQuote();
  const today = getFullDate(new Date());
  const quoteOfDay = `${totalVisitor} \n\n\n ${greets} \n _Quote of the Day (${today})_\n___\n>**_${quote}_**\n___\n## __ **_${author}_** ${images}`;

  fs.writeFileSync("README.md", quoteOfDay);
};

generate();
