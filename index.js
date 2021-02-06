const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.redirect("/form");
});

app.use("/form", express.static(__dirname + "/index.html"));
app.use(fileUpload());

app.post("/upload", function (req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send("No files were uploaded.");
    return;
  }

  sampleFile = req.files.sampleFile;
  uploadPath = __dirname + "/uploads/" + sampleFile.name;
  sampleFile.mv(uploadPath, function (err) {
    if (err) {
      return res.status(500).send(err);
    }

    var toPdf = require("office-to-pdf");
    var fs = require("fs");
    var wordBuffer = fs.readFileSync(uploadPath);

    toPdf(wordBuffer).then(
      (pdfBuffer) => {
        fs.writeFileSync(uploadPath + ".pdf", pdfBuffer);
      },
      (err) => {
        console.log(err);
      }
    );

    res.send("Generating " + uploadPath + ".pdf");
  });
});

app.listen(PORT, function () {
  console.log("Express server listening on port ", PORT);
});
