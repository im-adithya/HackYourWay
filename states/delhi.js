const fs = require("fs");
const captcha = require('../utils/captcha');
const requestPauser = require('../utils/requestPauser');

const { chromium } = require('playwright');

async function captchaHandling(page, link, time_now, obj){
  await page.goto(link);
  await page.waitForSelector('#ContentPlaceHolder1_imgCaptcha');
  // Take the element to be captured
  const element = await page.$("#ContentPlaceHolder1_imgCaptcha");
  await element.screenshot({
    path: `/home/ubuntu/images/delhi-captcha-${time_now}.jpg`
  });
  const text = await captcha(`/home/ubuntu/images/delhi-captcha-${time_now}.jpg`);
  console.log(text);
  fs.unlinkSync(`/home/ubuntu/images/delhi-captcha-${time_now}.jpg`)
  // await page.type('input[name=txtVerificationCode]', text);
  // await page.$("#btnSubmit").click();
  // delete image
  await page.waitForTimeout(10000);
  // close browser
}

async function generatePath(ac, pn){
  const browser = await chromium.launch({
    headless: false,
  });
  const browserContext = await browser.newContext();
  const page = await browserContext.newPage();
  await page.goto("https://ceodelhi.gov.in/AcListEng.aspx");
  await page.waitForSelector('#main-content');
  const acs = await page.$$("a[href*=PartDetailsEng]");
  await Promise.all([
    page.waitForNavigation(),
    acs[ac-1].click(),
    page.waitForNavigation(),
  ]);
  const pns = await page.$$("a[href*=validateUser]");
  const link = await pns[pn-1].getAttribute("href");
  return link;
}

// https://ceoaperolls.ap.gov.in/AP_Eroll_2023/Popuppage?partNumber=141&roll=EnglishMotherRoll&districtName=DIST_15&acname=106&acnameeng=A106&acno=106&acnameurdu=106
async function delhi(ac, pn, time_now){

  const path = await generatePath(ac, pn);

  await requestPauser("https://ceodelhi.gov.in" + path, captchaHandling, time_now);
  // Do somehting with pdf [take epic id too above]
}

// delhi(1, 2, 3)

module.exports = delhi;
// delhi(15, 106, 141);
