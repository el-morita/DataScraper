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

async function openIEEE() {
  // open the browser so we can start using pubmed enter the title batches and see if any have pubmed ID...

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://ieeexplore.ieee.org/Xplore/home.jsp");

  //if no pubmedid put into a seperate file and use that file to enter 00000000 into the RW database
}

// search for an article title and return an array of search result links for any matches that have retractions or errata, etc
async function searchForRetraction(title) {
  // get search results

  // exact title match
  // "Expression of concern: " + title
  // "Retracted: " + title
  // "Erratum: " + title
  // do something to find retractions

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
}

async function getRetractionDetails(searchResult) {
  if (!searchResult || searchResult.retractions.length === 0) return;

  // go to searchResult.originalArticle and extract details
  // get a list of fields used by retraction watch
  // get matching field values from the article so we can fill these in later

  const details = {
    author_name: "",
    title: "",
    publisher: "",
    journal: "",
    originalPubMedId: "",
    retractionId: "",
    originalPublicationDate: "",
    retractionDate: "",
    originalDOI: "",
    retractionDOI: "",
    institutionAffilications,
  };

  return details;
}

async function main(options) {
  const titles = await readTitles(options.fileName);
  const batch = titles.slice(0, options.batchSize);

  const retractionDetails = Promise.all(
    batch.map((title) => searchForRetraction(title).then(getRetractionDetails))
  );

  // write the details to a file for processing data entry
}

main({ fileName: "Assignment10.csv", batchSize: 10 });
