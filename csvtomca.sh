#!/bin/bash

if [ $# -ne 1 ] ;
then
  echo "Usage: ./csvtomcs.sh [FILE]"
  exit 1
fi

file=$1

if [ -f $file ] ;
then
  echo "parsing file $file"
else
  echo "$file not found"
  exit 127;
fi

header=`head -n 2 $file`
echo "$header"
cat $file | tail -n +3 | cut -d, -f1-12 > calls_$file
cat $file | tail -n +3 | cut -d, -f1,12-22 > puts_$file

calls=`cat calls_$file | wc -l`
puts=`cat puts_$file | wc -l`

echo "processing $calls calls and $puts puts..."

node generate.js calls_$file 280.64 > calls.json
node generate.js puts_$file 280.64 150 > puts.json
node merge.js > data.json

echo "json files generated"
echo "Generating mca file..."
python3 graph.py


