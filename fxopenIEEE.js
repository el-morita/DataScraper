const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://ieeexplore.ieee.org/Xplore/home.jsp");

  await page.type(
    'input[type= "search"]',
    "Immunomodulation and antitumor activities of dicrateria sp. polysaccharide",
    { delay: 100 }
  );
  await page.click('button[aria-label="Search"]');
})();

//on IEEE website search results use class = "result-item-title" to find the titles of the results
