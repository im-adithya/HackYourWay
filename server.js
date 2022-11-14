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
  telanganaFunc,
  punjabFunc
} = require('./states')

const app = express();
const port = 3000;

app.post('/api', async (req, res)=>{
  const name=req.query.name
  const fname = req.query.fname ?? " ";
  const age = req.query.age;
  const dob = req.query.dob; // YYYY-MM-DD
  const gender=req.query.gender ?? null; // M or F or O
  const state=req.query.state; // Take STATE_CODE as input;
  const district =req.query.dist ?? null; // Take DIST_CODE as input;

  const [dist, ac, pn, correctName] = await scraper("https://electoralsearch.in/", {
    name,
    fname,
    age,
    dob,
    gender,
    state,
    dist: district
  })
  // "S01 S03 U02 S26 U03 U05 S05 S06 S10 S15 S16 S17 S18 S20 S21 S29 S25 S19"
  const time_now = Date.now();
  switch (state) {
    case "S01":
      await andhraFunc(dist, ac, pn, time_now);
      break;
    
    case "S03":
      await assamFunc(dist, ac, pn, time_now);
      break;

    case "U02":
      await chandigarhFunc(pn, time_now);
      break;

    case "S26":
      await chattisgarhFunc(ac, pn, time_now);
      break;

    case "U03":
      await damanFunc(pn, time_now);
      break;

    case "U05":
      await delhiFunc(ac, pn, time_now);
      break;

    case "S05":
      await goaFunc(ac, pn, time_now);
      break;

    case "S06":
      await gujaratFunc(ac, pn, time_now);
      break;

    case "S10":
      await karnatakaFunc(ac, pn, time_now);
      break;

    case "S15":
      await meghalayaFunc(ac, pn, time_now);
      break;

    case "S16":
      await mizoramFunc(ac, pn, time_now);
      break;

    case "S17":
      await nagalandFunc(ac, pn, time_now);
      break;

    case "S18":
      await odishaFunc(ac, pn, time_now);
      break;

    case "S20":
      await rajasthanFunc(dist, ac, pn, time_now);
      break;

    case "S21":
      await sikkimFunc(ac, pn, time_now);
      break;

    case "S29":
      await telanganaFunc(dist, ac, pn, time_now);
      break;

    case "S19":
      await punjabFunc(ac, pn, time_now);
      break;

    case "S25":
      await westBengalFunc(dist, ac, pn, time_now);
      break;
  
    default:
      break;
  }

  await fs.readFile(`home/ubuntu/txt/translated-${time_now}.txt`, 'utf8', function(err, data) {
    if (err) throw err;
    console.log(correctName)
    const tree = findTree(data, correctName);
    console.log(tree);
    res.send(tree);
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});