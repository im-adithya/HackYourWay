const requestPauser = require('../utils/requestPauser')

async function captchaHandling(page, link, time_now) {
  await page.goto(link)
}

async function chandigarh(name, dist, ac, pn, time_now) {
  const URL = `https://ceochandigarh.gov.in/sites/default/files/polling_files/w0010${pn.toString().padStart(3, "0")}.pdf`

  await requestPauser(URL, captchaHandling, name, time_now)
}

module.exports = chandigarh
// chandigarh(null, null, 9)
