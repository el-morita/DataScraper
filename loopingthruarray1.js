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
    await page.type('input[type= "search"]', records[i].Title, { delay: 100 });
    await page.click('button[aria-label="Search"]');
  }
}

loopthruarray("Ass10Batch1.csv");

// the term "Did you read the documentation" is actually asking do you know what the
// ie library is for and how to use it? Always read thru borrow code line by line to understand
// // what it's doing before trying to use it in your own code.
// "Are you uptodate?" Means are you using the latest version of the code or old code from 6 months ago?
