const csvtojson = require("csvtojson");
const fs = require("fs/promises");
const puppeteer = require("puppeteer");

async function loopthruarray(filename) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://ieeexplore.ieee.org/Xplore/home.jsp");

  //cvstojson function converts const titles array into a object w properties, use for...in loop NOT map or forEach which leads to type error since not a f(x)
  const records = await csvtojson().fromFile(filename);

  for (let i = 0; i < records.length; i++) {
    await page.type('input[type= "search"]', records[i].Title, { delay: 5 });
    await page.click('button[aria-label="Search"]');

    //only put the area of the code that specific to the area where things will go wrong
    try {
      await page.waitForSelector(".List-results-items", { timeout: 1000 });
    } catch {
      //console.log(records[i].Title + "  :Not Found!");
      const notFound = records[i].Title + "  :Not Found!";
      fs.appendFile("EntriesNotFound.txt", notFound + "\n");

      continue;
    }

    //"for each" is used with "continue" method

    const titles = await page.evaluate(() => {
      const links = document.querySelectorAll(".List-results-items h3 a");
      //".result-item h3 a" searches for the anchor element that is specifc
      //to the h3 which is under .result-item. Note sometimes .result-item
      //had a CSS descriptor in front of it to describe it as part of the class name
      //but when you use "result-item" in a search you didn't need the CSS descriptor
      let searchedArr = [];

      links.forEach((link) => {
        searchedArr.push({
          title: link.textContent,
        });
      });

      return searchedArr;
    });
    const foundTitles = JSON.stringify(titles);
    const found = foundTitles;
    fs.appendFile("EntriesFound.txt", found + "\n");
    //how to represent an object as a string? Program trying to print out result objects into a file but
    //appendFile needs the objects as strings, not objects.

    // console.log(titles);
  }
}

loopthruarray("Ass10Batch1.csv");
