const requestPauser = require('../utils/requestPauser');

async function captchaHandling(page, link, time_now){
  await page.goto(link);
}

async function sikkim(name, ac, pn, time_now){
  // TODO: Convert 09 to 9
  const URL = `https://ceosikkim.nic.in/ElectoralRolls/PDFView?PDFUrl=https://ceosikkim.nic.in/UploadedFiles/ElectoralRollPolling/S21A${ac}P${pn}.pdf`;

  await requestPauser(URL, captchaHandling, name, time_now);
  // Do somehting with pdf [take epic id too above]
}

module.exports=sikkim
// sikkim(9, 32, 1);