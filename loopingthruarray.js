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

  // cvstojson function converts const titles array into a object w properties, use for...in loop NOT map or forEach which leads to type error since not a f(x)
  csvtojson()
    .fromFile(filename)
    .then((json) => {
      console.log(json);

      fs.writeFileSync("output.json", JSON.stringify(json), "utf-8", (err) => {
        if (err) console.log(err);
      });
    });

  // return titles;
  // const secondelement = titles.title;
  //console.log(secondelement);
  /*
    await page.type('input[type= "search"]', X, { delay: 100 });
    await page.click('button[aria-label="Search"]');
  */
  for (let i = 0; i < filename.length; i++) {
    await page.type('input[type= "search"]', filename[i], { delay: 100 });
    await page.click('button[aria-label="Search"]');
  }
}

loopthruarray("Ass10Batch1.csv");

// h3.result-item-title.firstchildelement.a.innerText
