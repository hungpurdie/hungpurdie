const axios = require("axios");
const fs = require("fs");

async function getQuote() {
  try {
    const idRan = Math.floor(Math.random() * 1543);
    const { data } = await axios.get("https://type.fit/api/quotes");
    const quote = data[idRan].text;
    const author =
      data[idRan].author === null ? `Anonymous` : data[idRan].author;
    return {
      quote,
      author,
    };
  } catch (err) {
    console.error(err.message);
    return {};
  }
}

getQuote();

const generate = async () => {
  const { quote, author } = await getQuote();
  const curDate = new Date();
  const dd = String(curDate.getDate()).padStart(2, "0");
  const mm = String(curDate.getMonth() + 1).padStart(2, "0");
  const yyyy = String(curDate.getFullYear());
  const today = mm + "/" + dd + "/" + yyyy;

  try {
    let quoteOfDay = `_Quote of the Day (${today})_\n___\n>**_${quote}_**\n___\n## **_${author}_**`;
    fs.writeFileSync("README.md", quoteOfDay);
  } catch (error) {
    console.log(error);
  }
};

generate();
