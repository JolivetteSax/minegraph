const fs = require('fs');

const csvFilePath=process.argv[2];
const csv=require('csvtojson');

const voxels = {};

csv()
.fromFile(csvFilePath)
.then((observations)=>{
  let count = 0;
  let currentYear = 2020;
  let dayOfYear = 0;
  let last = 0;
  for(const weather of observations){
    if(weather.type !== 'TMAX'){
      continue;
    }



    year = weather.date.slice(0,4);
    yearsAgo = currentYear - parseInt(year);
    if(yearsAgo !== last){
      dayOfYear = 0;
      last = yearsAgo;
    }
    dayOfYear++;

    let farenheit = ((weather.val / 10) * (9/5)) + 32;

    let block= 'green_wool';
    if(farenheit < 32){
      block = 'blue_wool'; 
    }
 
    if(farenheit < 20){
      block = 'white_wool'; 
    }
    
    if(farenheit > 80){
      block = 'orange_wool';
    }

    if(farenheit > 90){
      block = 'red_wool';
    }

   // console.log(yearsAgo + ': ' + dayOfYear + ' -> ' + farenheit);

    let x = {};
    if(voxels[yearsAgo]){
      x = voxels[yearsAgo];
    }
   
    let height = Math.floor(farenheit);
    x[dayOfYear] = {
      height,
      block
    };
    voxels[yearsAgo] = x;
  }
  console.log(JSON.stringify(voxels));
});
