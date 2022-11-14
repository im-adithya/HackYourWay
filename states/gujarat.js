const requestPauser = require("../utils/requestPauser");

async function captchaHandling(page, link, time_now) {
  await page.goto(link);
}

async function gujarat(ac, pn) {
  const URL = `https://erms.gujarat.gov.in/ceo-gujarat/DRAFT2022/${ac
    .toString()
    .padStart(3, "0")}/S06A${ac}P${pn}.pdf`;

  await requestPauser(URL, captchaHandling);
}

module.exports = gujarat;
// gujarat(null, 3, 8);
