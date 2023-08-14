const csvtojson = require("csvtojson");
const fs = require("fs");

// const ass = "Ass10Batch1.csv";

function myFunc(filename) {
  csvtojson()
    .fromFile(filename)
    .then((json) => {
      console.log(json);

      fs.writeFileSync(
        "Edapractice.json",
        JSON.stringify(json),
        "utf-8",
        (err) => {
          if (err) console.log(err);
        }
      );
    });
}

myFunc("Ass10Batch1.csv");
