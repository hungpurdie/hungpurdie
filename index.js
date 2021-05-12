const axios = require("axios");
const fs = require("fs");

async function getQuote() {
  try {
    const { data } = await axios.get("https://api.quotable.io/random");
    const quote = data.content;
    const author = data.author === null ? `Anonymous` : data.author;
    return {
      quote,
      author,
    };
  } catch (err) {
    console.error(err.message);
    return {};
  }
}

const generate = async () => {
  const { quote, author } = await getQuote();
  const currentDate = new Date();
  const time = currentDate.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "asia/Ho_Chi_Minh",
  });
  const date = currentDate.toLocaleDateString("vi-VN");
  const today = time + " " + date;
  greeting =
    "[![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Press+Start+2P&color=FFDD00&size=35&width=900&height=100&lines=Hello+World%2C+I'm+Hung+!)](https://git.io/typing-svg)";
  let quoteOfDay = `${greeting}\n_Quote of the Day (${today})_\n___\n>**_${quote}_**\n___\n## \__ **_${author}_**`;
  fs.writeFileSync("README.md", quoteOfDay);
};

generate();
