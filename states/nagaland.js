const requestPauser = require("../utils/requestPauser");

async function captchaHandling(page, link, time_now) {
  await page.goto(link);
}

async function nagaland(dist, ac, pn) {
  // TODO: Convert 09 to 9
  // dist is null
  const URL = `https://ceo.nagaland.gov.in/Downloads/DraftRoll2023/${ac}/S17A${ac}P${pn}.pdf`;

  await requestPauser(URL, captchaHandling);
  // Do somehting with pdf [take epic id too above]
}

module.exports= nagaland
// nagaland("", 50, 2);
