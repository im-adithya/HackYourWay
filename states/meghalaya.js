const requestPauser = require("../utils/requestPauser");

async function captchaHandling(page, link, time_now) {
  await page.goto(link);
}

async function meghalaya(name, ac, pn, time_now) {
    // TODO : INPUT ac AND pn AS STRINGS
  // TODO: ac is 3 digit and pn is 4 digit
  // dist is null
  const URL = `https://ceomeghalaya.nic.in/erolls/pdf/english/A${ac
    .toString()
    .padStart(3, "0")}/A${ac.toString().padStart(3, "0")}${pn
    .toString()
    .padStart(4, "0")}.pdf`;

  await requestPauser(URL, captchaHandling, name, time_now);
  // Do somehting with pdf [take epic id too above]
}

module.exports= meghalaya
// meghalaya("", '003', '0009')
