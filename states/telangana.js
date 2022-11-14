const captcha = require('../utils/captcha');
const requestPauser = require('../utils/requestPauser');

async function captchaHandling(page, link, time_now){
  await page.goto(link);
  await page.waitForSelector('#Image2');
  // Take the element to be captured
  const element = await page.$("#Image2");
  await element.screenshot({
    path: `/home/ubuntu/Code/images/telangana-captcha-${time_now}.jpg`
  });
  const text = await captcha(`/home/ubuntu/Code/images/telangana-captcha-${time_now}.jpg`);
  console.log(text);
  fs.unlinkSync(`/home/ubuntu/Code/images/telangana-captcha-${time_now}.jpg`)
  await Promise.all([
    page.type('input[name=txtVerificationCode]', text),
    page.locator("#btnSubmit").click(),
  ])
  // close browser
}

// https://ceoaperolls.ap.gov.in/AP_Eroll_2023/Popuppage?partNumber=141&roll=EnglishMotherRoll&districtName=DIST_15&acname=106&acnameeng=A106&acno=106&acnameurdu=106
async function telangana(dist, ac, pn, time_now){
  const URL = `https://ceotserms2.telangana.gov.in/ts_erolls/Popuppage.aspx?partNumber=${pn.toString().padStart(3, "0")}&roll=EnglishMotherRoll&districtName=DIST_${dist.toString().padStart(2, "0")}&acname=AC_${ac.toString().padStart(3, "0")}&acnameeng=A${ac}&acno=${ac}&acnameurdu=0${ac}`;

  await requestPauser(URL, captchaHandling, time_now);
  // Do somehting with pdf [take epic id too above]
}

module.exports = telangana;
//telangana(16, 47, 125)