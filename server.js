const express = require("express");
const fs = require("fs");
const scraper=require('./utils/voterInfo');
const findTree = require("./utils/findTree")

const {
  andhraFunc,
  assamFunc,
  chandigarhFunc,
  chattisgarhFunc,
  damanFunc,
  goaFunc,
  delhiFunc,
  gujaratFunc,
  karnatakaFunc,
  meghalayaFunc,
  mizoramFunc,
  nagalandFunc,
  odishaFunc,
  rajasthanFunc,
  sikkimFunc,
  westBengalFunc,
  telanganaFunc
} = require('./states')

const app = express();
const port = 3000;

app.post('/api', async (req, res)=>{
  const name=req.query.name
  const fname = req.query.fname ?? " ";
  const dob = req.query.dob.split("-"); // YYYY-MM-DD
  const gender=req.query.gender ?? null; // M or F or O
  const state=req.query.state; // Take STATE_CODE as input;
  const district =req.query.dist ?? null; // Take DIST_CODE as input;

  const [dist, ac, pn, correctName] = await scraper("https://electoralsearch.in/", {
    name,
    fname,
    year: dob[0],
    month: dob[1],
    day: parseInt(dob[2]).toString(),
    gender,
    state,
    dist: district
  })
  const time_now = Date.now();
  // "S01 S03 U02 S26 U03 U05 S05 S06 S10 S15 S16 S17 S18 S20 S21 S29 S25"
  switch (state) {
    case "S01":
      await andhraFunc(name, dist, ac, pn, time_now);
      break;
    
    case "S03":
      await assamFunc(name, dist, ac, pn, time_now);
      break;

    case "U02":
      await chandigarhFunc(name, pn, time_now);
      break;

    case "S26":
      await chattisgarhFunc(name, ac, pn, time_now);
      break;

    case "U03":
      await damanFunc(name, pn, time_now);
      break;

    case "U05":
      await delhiFunc(name, ac, pn, time_now);
      break;

    case "S05":
      await goaFunc(name, ac, pn, time_now);
      break;

    case "S06":
      await gujaratFunc(name, ac, pn, time_now);
      break;

    case "S10":
      await karnatakaFunc(name, ac, pn, time_now);
      break;

    case "S15":
      await meghalayaFunc(name, ac, pn, time_now);
      break;

    case "S16":
      await mizoramFunc(name, ac, pn, time_now);
      break;

    case "S17":
      await nagalandFunc(name, ac, pn, time_now);
      break;

    case "S18":
      await odishaFunc(name, ac, pn, time_now);
      break;

    case "S20":
      await rajasthanFunc(name, dist, ac, pn, time_now);
      break;

    case "S21":
      await sikkimFunc(name, ac, pn, time_now);
      break;

    case "S29":
      await telanganaFunc(name, dist, ac, pn, time_now);
      break;

    case "S25":
      await westBengalFunc(name, dist, ac, pn, time_now);
      break;
  
    default:
      break;
  }

  await fs.readFile(`translated-${time_now}.txt`, 'utf8', function(err, data) {
    if (err) throw err;
    const tree = findTree(data, correctName);
    console.log(tree);
    res.send(tree);
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
