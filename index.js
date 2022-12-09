const express = require("express");
const fs = require("fs/promises");
const cors = require("cors");
const _ = require("lodash");
const {v4: uuid} = require("uuid");
const puppeteer = require('puppeteer-extra')

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const {executablePath} = require('puppeteer')
const app = express();

app.get('/test', (req,res) => {
    res.send('i am runnig fine');
});


app.get('/test3', (req, res) => {
    (async () => {
        // try{
            const browser = puppeteer.launch({ executablePath: executablePath(),
             } ).then(async browser => {
                console.log('Running tests..')
                const page = await browser.newPage()
                 var response = await page.goto(req.query.url);
                if(req.query.type == 'HTML' || req.query.type == 'XML'){
                    res.json({
                        data: await page.content(),
                        headers : response.headers(),
                        cookies : page.cookies()
                })
                }else if(req.query.type == 'JSON'){
                  res.json({
                        data: JSON.parse(await  page.evaluate(() => document.querySelector("body").innerText)),
                        headers : response.headers(),
                        cookies : page.cookies()
                  })
                }
                await browser.close()
                console.log(`All done,  ✨`)
            
          })
        // }catch(e){
        //     console.log(e)
        // }
  
})();
   
});
app.post('/', (req, res) => {
    (async () => {
        try{
            const browser = puppeteer.launch({ executablePath: executablePath(),
             } ).then(async browser => {
                console.log('Running tests..')
                const page = await browser.newPage()
                 var response = await page.goto(req.query.url);
                if(req.query.type == 'HTML' || req.query.type == 'XML'){
                    res.json({
                        data: await page.content(),
                        headers : response.headers(),
                        cookies : page.cookies()
                })
                }else if(req.query.type == 'JSON'){
                  res.json({
                        data: JSON.parse(await  page.evaluate(() => document.querySelector("body").innerText)),
                        headers : response.headers(),
                        cookies : page.cookies()
                  })
                }
                await browser.close()
                console.log(`All done,  ✨`)
            
          })
        }catch(e){
            console.log(e)
        }
  
})();
   
});


 app.listen(3800, () => console.log("API SERVER IS RUNNING..."));