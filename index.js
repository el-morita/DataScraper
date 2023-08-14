const csvtojson = require("csvtojson");
const fs = require("fs");
const puppeteer = require("puppeteer");

async function loopthruarray(filename) {
  // read the file and return an array of titles
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://ieeexplore.ieee.org/Xplore/home.jsp");

  // fs.readFile(filename, "utf8", async function (err, data) {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   const titles = data.split("\n"); //this is an arary

  //cvstojson function converts const titles array into a object w properties, use for...in loop NOT map or forEach which leads to type error since not a f(x)
  const records = await csvtojson().fromFile(filename);

  for (let i = 0; i < records.length; i++) {
    await page.type('input[type= "search"]', records[i].Title, { delay: 10 });
    await page.click('button[aria-label="Search"]');
    await page.waitForSelector(".List-results-items");

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
    console.log(titles);
  }
}

loopthruarray("Ass10Batch1.csv");

