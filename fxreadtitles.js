const puppeteer = require("puppeteer");
const fs = require("fs");

async function readTitles(filename) {
  // read the file and return an array of titles
  fs.readFile(filename, "utf8", async function (err, data) {
    if (err) {
      return console.log(err);
    }
    const titles = data.split("\n");

    console.log(titles);

    return [];
  });
}

readTitles("Ass10Batch1.csv");
