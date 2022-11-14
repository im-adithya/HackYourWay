const captcha = require('../utils/captcha');
const requestPauser = require('../utils/requestPauser')

async function captchaHandling(page, link, time_now) {
  await page.goto(link)
  await page.waitForSelector('#Image2')
  // Take the element to be captured
  const element = await page.$('#Image2')
  await element.screenshot({
    path: `/home/ubuntu/images/karnataka-captcha-${time_now}.jpg`,
  })
  const text = await captcha(`/home/ubuntu/images/karnataka-captcha-${time_now}.jpg`)
  console.log(text)
  fs.unlinkSync(`/home/ubuntu/images/karnataka-captcha-${time_now}.jpg`)
  // await page.type('input[name=txtVerificationCode]', text);
  // await page.$("#btnSubmit").click();
  // delete image
  await page.waitForTimeout(10000)
  // close browser
}

// https://ceoaperolls.ap.gov.in/AP_Eroll_2023/Popuppage?partNumber=141&roll=EnglishMotherRoll&districtName=DIST_15&acname=106&acnameeng=A106&acno=106&acnameurdu=106
async function karnataka(ac, pn, time_now) {
  const URL = `https://ceo.karnataka.gov.in/draftroll_2023/CodeCaputer1.aspx?field1=.%2fKANNADA%2fMR%2fAC${ac
    .toString()
    .padStart(3, '0')}%2fS10A${ac}P${pn}.pdf&field2=${ac}&field3=${pn
    .toString()
    .padStart(4, '0')}`

  await requestPauser(URL, captchaHandling, time_now)
  // Do somehting with pdf [take epic id too above]
}

module.exports = karnataka
// karnataka(null, 106, 141)
