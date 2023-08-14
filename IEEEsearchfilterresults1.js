const puppeteer = require("puppeteer");

async function searchForRetraction(title) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://ieeexplore.ieee.org/Xplore/home.jsp");

  await page.type('input[type="search"]', title, { delay: 100 });
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
  }); //for each title do a title.textContent

  console.log(titles);
  //Eda accidentally put the above console.log within the evaluate function
  //which operates the console.log code inside the webbrowser and not in the VS code termainal
  //so no array would print out in the VS code console
}
//on IEEE website search results use class = "result-item-title" to find the titles of the results
//fs file system can read and write files look up on mdn for functions on how to write a csv file

//Next search the css  container that holds the results whose titles = what youre looking for and click on the anchor link

searchForRetraction(
  "Genetic Algorithm Optimization for the Total Radiated Power of a Meandered Line by Using an Artificial Neural Network"
);
