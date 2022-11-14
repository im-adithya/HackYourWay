const axios = require("axios");
const fs = require("fs");
const { chromium } = require('playwright');
const captcha = require('./captcha');

async function enterInfo(page, data){
  await page.type('input#name1', data.name);
  await page.type('input#txtFName', data.fname);
  await page.locator('#nameStateList').selectOption(data.state);
  if (!data.age) {
    const dob = data.dob.split("-");
    await page.locator('input#radDob').click();
    await page.locator('#yearList').selectOption({label: dob[0]}); // "2002"
    await page.locator('#monthList').selectOption(dob[1]); // "04"
    await page.locator('#dayList').selectOption({label: parseInt(dob[2]).toString()}); // "20"
  } else {
    await page.locator('#ageList').selectOption({label: data.age}); // "20"
  }
  if (data.gender)
    await page.locator('#listGender').selectOption(data.gender);
  if (data.district) {
    await page.waitForTimeout(2000);
    await page.locator('#namelocationList').selectOption(`string:${data.district}`);
  }
}

async function captchaSubmit(page){
  const time_now = Date.now();
  const element = await page.$("#captchaDetailImg");
  await element.screenshot({
    path: `/home/ubuntu/images/captcha-${time_now}.jpg`
  });
  await page.type('input#txtCaptcha', '');
  const text = await captcha(`/home/ubuntu/images/captcha-${time_now}.jpg`);
  fs.unlinkSync(`/home/ubuntu/images/captcha-${time_now}.jpg`)
  await page.type('input#txtCaptcha', text);
  await page.locator('#tab1 #btnDetailsSubmit').click();
  
  await page.waitForTimeout(2000);
  const result = await page.url();
  // document.querySelectorAll("tbody")[0].children.length
  return result.includes("resultArea");
}

async function linkScraper(URL, data){
	try{
    const browser = await chromium.launch({
      headless: false,
    });
    const browserContext = await browser.newContext();
    const page = await browserContext.newPage();
    await page.goto(URL);
    // Wait for the required DOM to be rendered
		await page.waitForSelector('#captchaDetailImg');
    // Dialog logic
    const dialog = await page.$("#welcomeDialog");
    if (dialog) {
      const dialogContinue = await page.$("#welcomeDialog #continue");
      await dialogContinue.click();
    }
    await enterInfo(page, data);

    // Keep trying captcha till it opens
    let opened = await captchaSubmit(page);
    while(!opened) {
      opened = await captchaSubmit(page);
    }

    let dist;
    let distName;
    if (!data.dist) {
      const distLocator = await page.locator("tr[ng-repeat] td:nth-child(7)");
      const distText = await distLocator.allInnerTexts();
      distName = distText[0].toUpperCase();

      axios.get(`https://electoralsearch.in/Home/GetDistList?st_code=${data.state}`)
        .then((res) => {
          let result = res.data.find(item => item.dist_name.toUpperCase() === distName);
          dist = result.dist_no;
        })
      // https://electoralsearch.in/Home/GetDistList?st_code=${data.state}
    } else {
      dist = data.dist;
    }

    // TODO: let dist = data.dist ? data.dist : nameToDistCode(distName);
    const submit = await page.$("input[value='View Details']");
    await submit.click();
    await page.waitForTimeout(2000);
    let pages = await browserContext.pages();

    const nameLocator = await pages[1].locator("#name+td");
    const acLocator = await pages[1].locator("#ac_name+td");
    const pnLocator = await pages[1].locator("#part_no+td");

    const nameText = await nameLocator.allInnerTexts();
    const acText = await acLocator.allInnerTexts();
    const pnText = await pnLocator.allInnerTexts();

    const acArr = acText[0].split(" - ")
    const ac = acArr[1];
    const pn = pnText[0];

    await browser.close();

    if (data.state === "S20") dist = distName;
    if (data.state === "S16") ac = acArr[1];

    return [dist, ac, pn, nameText[0]];
	}
	catch(err){
		console.log("Could not resolve the browser instance => ", err);
	}
}

/* linkScraper("https://electoralsearch.in/", {
  name: "Sigireddy Adithya Vardhan",
  fname: " ",
  year: "2002",
  month: "04",
  day: "20",
  gender: "M",
  state: "S01",
  //dist: "15"
}) */
module.exports=linkScraper;