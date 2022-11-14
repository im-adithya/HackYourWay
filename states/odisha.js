const requestPauser = require("../utils/requestPauser");

async function captchaHandling(page, link, time_now) {
  await page.goto(link);
}

async function odisha(name, ac, pn, time_now) {
  // TODO: Convert 09 to 9
  // dist name lite
  const URL = `http://ceoorissa.nic.in/ErollPdfs/${ac}/MotherRoll/Odiya/1/S18A${ac}P${pn}.PDF`;

  await requestPauser(URL, captchaHandling, name, time_now);
  // Do somehting with pdf [take epic id too above]
}

module.exports= odisha
// odisha("", 49, 4);
