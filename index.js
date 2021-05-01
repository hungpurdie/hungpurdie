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
  const currentDate = new Date();
  const time = currentDate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const dd = String(currentDate.getDate()).padStart(2, "0");
  const mm = String(currentDate.getMonth() + 1).padStart(2, "0");
  const yyyy = String(currentDate.getFullYear());
  const today = time + " " + dd + "/" + mm + "/" + yyyy;

  try {
    let quoteOfDay = `_Quote of the Day (${today})_\n___\n>**_${quote}_**\n___\n## **_${author}_**`;
    fs.writeFileSync("README.md", quoteOfDay);
  } catch (error) {
    console.log(error);
  }
};

generate();
