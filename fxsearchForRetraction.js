const puppeteer = require("puppeteer");
const fs = require("fs");

async function searchForRetraction(title) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://pubmed.ncbi.nlm.nih.gov");

  await page.type("#id_term", title, { delay: 100 });
  await page.click(".search-btn");

  // get search results

  // exact title match
  // "Expression of concern: " + title
  // "Retracted: " + title
  // "Erratum: " + title

  // do something to find retractions

  /*
  const retractions = [
    "http://concern...",
    "http://erratum",
    "http://retracted....",
  ];

  if (retractions.length === 0) return;

  // prepare search result
  const searchResult = {
    originalArticle: "http://....?",
    retractions,
  };

  return searchResult;

  */
}

searchForRetraction(
  "Applicability of Cylindrical Near-Field to Far-Field Transformation to OTA and EMC Measurements of 5G Equipment and Devices"
);
