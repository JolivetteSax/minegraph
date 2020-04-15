const fs = require('fs');

const csvFilePath=process.argv[2];
const csv=require('csvtojson');

const voxels = {};

const underlying = parseInt(process.argv[3]);
const shift = parseInt(process.argv[4]) || 0;
csv()
.fromFile(csvFilePath)
.then((options)=>{
  let count = 0;
  //const today = new Date();
  // TODO get it from header with underlying
  // hardcoded so it'll run in the future with the sample
  const today = new Date('04/14/2020');
  for(const opt of options){

    if(opt.Vol === '0'){
      continue;
    }

    const strike = parseInt(opt.Strike);

    let block= 'stone';


    if(opt.Calls && strike > underlying){
      block = 'dirt';
    }
    if(opt.Puts && strike < underlying){
      block = 'dirt';
    }

    let exp = new Date(opt['Expiration Date']);
    let weeksToExp = Math.round((((((exp - today) / 1000) / 60) / 60) / 24) / 7);
    weeksToExp = weeksToExp + shift;

    let x = {};
    if(voxels[weeksToExp]){
      x = voxels[weeksToExp];
    }
   
    let height = Math.round(parseFloat(opt['Last Sale']));
    x[strike] = {
      height,
      block
    };
    voxels[weeksToExp] = x;
    
    //console.log('x: ' + strike + ' z: ' + weeksToExp + ' y: ' + extrinsic);
  }
  console.log(JSON.stringify(voxels));
});
