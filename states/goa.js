const requestPauser = require("../utils/requestPauser");

async function captchaHandling(page, link, time_now) {
  await page.goto(link);
}

async function goa(name, ac, pn, time_now) {
  // TODO: Convert 09 to 9
  // dist name can be null

  // TODO: for loop for looping over pdf pages stops early in case of ac=1 and pn=1
  const URL = `https://ceogoa.nic.in/PDF/EROLL/MOTHERROLL/2021/${ac}/S05A${ac}P${pn}.pdf`;

  await requestPauser(URL, captchaHandling, name, time_now);
  // Do somehting with pdf [take epic id too above]
}

module.exports= goa
// goa("", 1, 1);
