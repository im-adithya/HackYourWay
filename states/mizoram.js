const requestPauser = require("../utils/requestPauser");

async function captchaHandling(page, link, time_now) {
  await page.goto(link);
}

async function mizoram(name, ac, pn, time_now) {
  // TODO: Convert 09 to 9
  // dist is null
  // TODO: HERE AC NAME IS ALSO REQUIRED
  const URL = `https://ceo.mizoram.gov.in/ERollReportWithoutPhoto/S16/${ac}-PALAK/S16A${ac}P${pn}.pdf`;

  await requestPauser(URL, captchaHandling, name, time_now);
  // Do somehting with pdf [take epic id too above]
}

module.exports= mizoram
// mizoram("", 40, 44);
