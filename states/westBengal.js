const requestPauser = require("../utils/requestPauser");

async function captchaHandling(page, link, time_now) {
  await page.goto(link);
}

async function westBengal(name, dist, ac, pn, time_now) {
  // TODO: Convert 09 to 9
  // dist id 09-9
  const URL = `https://ceowestbengal.nic.in/DraftRoll?DCID=${dist}%20&ACID=${ac}&PSID=${pn}#toolbar=0&navpanes=0`;

  await requestPauser(URL, captchaHandling, name, time_now);
  // Do somehting with pdf [take epic id too above]
}

module.exports= westBengal
// westBengal(2, 14, 172);
