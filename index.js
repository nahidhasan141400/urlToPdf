const puppeteer = require("puppeteer");
const path = require('path');

const Pdf_Gen = async (url)=>{
    try {
        const browser = await puppeteer.launch({
            headless:"new",
            executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
        });
        const page = await browser.newPage();
        const loaddata = await page.goto(url,{
            waitUntil:"networkidle2"
        });
        const namefile =  `file.pdf`
        await page.setViewport({ width: 2480, height: 3508 });

       const pdfn = await page.pdf({
            path:`${path.join(__dirname,'./pdf/') + namefile}`,
            format:"A4",
        })
    
        await browser.close();

        console.log("🚀 ~ file: GenaratePDF.js:24 ~ constPdf_Gen= ~ namefile:", namefile)
        return namefile
    } catch (error) {
        console.log("🚀 ~ file: Pdf_gen.js:23 ~ constPdf_Gen= ~ error:", error)
        throw error
    }
}

const express = require("express");
const app = express();

var bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/gen',async(req,res)=>{
 
    // const {url} = req.body;
    // console.log("🚀 ~ file: index.js:41 ~ app.post ~ url:", req.body)
    
    try {
        const link = await Pdf_Gen('https://www.w3schools.com/jsref/met_win_clearinterval.asp');
        let pathsoffile = `${path.join(__dirname,'./pdf/') + link}`

        res.sendFile(pathsoffile);
        // res.send('hello')
        
    } catch (error) {
        console.log("🚀 ~ file: index.js:42 ~ app.get ~ error:", error)
        res.send('eror')
    }
})


const PORT = process.env.PORT || 5000;
console.log("server started on port:", PORT);
app.listen(PORT);
