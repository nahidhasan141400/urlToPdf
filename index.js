const express = require("express");
const app = express();
const puppeteer = require("puppeteer");
const path = require("path");



var bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.post("/gen", async (req, res) => {
  const {url} = req.body;

  if(!url){
    return res.status(404).send('no url pass')
  }

  try {
    
        // genarate pdf 
        const browser = await puppeteer.launch({
            headless: "new",
            executablePath:
              process.env.NODE_ENV === "production"
                ? process.env.PUPPETEER_EXECUTABLE_PATH
                : puppeteer.executablePath(),
          });

          const page = await browser.newPage();

          const loaddata = await page.goto(url, {
            waitUntil: "networkidle2",
          });

          await page.setViewport({ width: 2480, height: 3508 });

          const pdfBuffer = await page.pdf({ format: 'A4' });

          await browser.close();
          res.contentType('application/pdf');
          res.send(pdfBuffer);
          

  } catch (error) {
    console.log("🚀 ~ file: index.js:42 ~ app.get ~ error:", error);
    res.send("eror");
  }
});

const PORT = process.env.PORT || 5000;
console.log("server started on port:", PORT);
app.listen(PORT);
