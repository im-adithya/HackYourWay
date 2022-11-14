const requestPauser = require('../utils/requestPauser')

async function captchaHandling(page, link, time_now) {
  await page.goto(link)
}

async function daman(name, pn, time_now) {
  const URL = `https://ceodaman.nic.in/ElectoralRoll/PhotoER2022_F/pdf/English/A00100${
    pn < 10 ? pn.toString().padStart(2, '0') : pn
  }.PDF`

  await requestPauser(URL, captchaHandling, name, time_now)
}

module.exports = daman
// daman(null, null, 10)
