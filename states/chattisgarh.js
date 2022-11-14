const requestPauser = require('../utils/requestPauser')

async function captchaHandling(page, link, time_now) {
  await page.goto(link)
}

async function chattisgarh(name, ac, pn, time_now) {
  const URL = `https://election.cg.nic.in/voterlist/pdf2023/AC_${ac
    .toString()
    .padStart(3, '0')}/S26A${ac}P${pn}.pdf`

  await requestPauser(URL, captchaHandling, name, time_now)
}

module.exports = chattisgarh
// chattisgarh(null, 1, 10)
