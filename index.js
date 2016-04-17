#!/usr/bin/env node

'use strict';

const program = require('commander');
const fs = require('fs');
const Uglicssy = require('uglicssy');

const uglicssy = new Uglicssy();

program
  .usage('[options] <input_file...> <output_file...>')
  .parse(process.argv);

if (program.args.length === 0) {
  program.help();
} else if (program.args < 1) {
  console.error('Input file name is required');
} else if (program.args < 2) {
  console.error('Output file name is required');
} else {
  const inputFilename = program.args[0];
  const fileParts = inputFilename.split('.');
  let outputFilename = program.args[1];
  let fileType;

  if (fileParts.length > 1) {
    fileType = fileParts.slice(-1)[0];
  }

  if (!outputFilename) {
    outputFilename = fileParts.slice(0, -1).join('.') + '.uglicssy';

    if (fileType) {
      outputFilename += '.' + fileType;
    }
  }

  fs.readFile(inputFilename, (err, data) => {
    if (!err) {
      const output = uglicssy.convert(data.toString(), fileType);

      fs.writeFile(outputFilename, output, (err) => {
        if (err) {
          throw err;
        }

        console.log(`Uglicssy: ${inputFilename} -> ${outputFilename}`);
      });
    } else {
      console.error(`An error occurred while reading the input file: ${err}`);
    }
  });
}