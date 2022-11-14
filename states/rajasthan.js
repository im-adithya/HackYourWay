const requestPauser = require("../utils/requestPauser");

async function captchaHandling(page, link, time_now) {
  await page.goto(link);
}

async function rajasthan(name, dist, ac, pn, time_now) {
  // TODO: Convert 09 to 9
  // dist name instead of dist no
  const URL = `http://103.203.136.205/${dist}/E_Rolls/A${ac.toString().padStart(3, "0")}/S20A${ac}P${pn}.pdf`;

  await requestPauser(URL, captchaHandling, name, time_now);
  // Do somehting with pdf [take epic id too above]
}

module.exports= rajasthan
// rajasthan('Sikar', 35, 177);
