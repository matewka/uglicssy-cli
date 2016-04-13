#!/usr/bin/env node

'use strict';

const program = require('commander');
const fs = require('fs');
const Uglicssy = require('uglicssy');

const uglicssy = new Uglicssy();

program
  .usage('[options] <input_file...>')
  .option('-o, --output', 'output file name')
  .parse(process.argv);

const inputFilename = program.args[program.args.length - 1];

if (program.args.length === 0) {
  program.help();
} else if (program.args.length <= program.options.length) {
  console.error('Input file name is required');
} else {
  fs.readFile(inputFilename, (err, data) => {
    if (!err) {
      const output = uglicssy.convert(data.toString(), 'html');

      console.log(output);
    } else {
      console.error('An error occurred while reading the input file:', err);
    }
  });
}