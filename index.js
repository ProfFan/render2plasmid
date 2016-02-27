var path = require('path')
var childProcess = require('child_process')
var phantomjs = require('phantomjs-prebuilt')
var binPath = phantomjs.path
var genbank = require('./genbank-parser');
var Handlebars = require('handlebars');
var fs = require('fs');


var randomcolor = require('randomcolor');

var sample = fs.readFileSync('PB5-HS4-CAG-Age1-Bla-2A-R-GECO1-Bcl1-BGpA-HS4-PB3.gb',"utf8");

var gbf = genbank.parseGBF(sample);

var template = fs.readFileSync('render.hb') + '';

Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);
        
    return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue,
        "div": Math.ceil(lvalue / rvalue)
    }[operator];
});

Handlebars.registerHelper("rcolor", function(options) {
    return randomcolor({luminosity: 'bright'});
});


Handlebars.registerHelper("ifequal", function(a,b,options) {
	var ret = "";
    if(a==b){
    	ret = options.fn(this);
    }
    return ret;
});


fs.writeFileSync('rendered.html', Handlebars.compile(template)(gbf));

var childArgs = [
  path.join(__dirname, 'test.js'),
  ''
];
 
childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
  // handle results 
  // console.log(stdout);
});

