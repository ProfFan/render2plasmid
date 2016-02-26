

var webPage = require('webpage');
var page = webPage.create();

// An example url that supports @2x background-image with the following css:-
/* body {
     background-image: background-image: url('http://retinajs.s3.amazonaws.com/images/backgrounds/bg.jpg');
  }
  @media all and (-webkit-min-device-pixel-ratio: 1.5) {
     body {
       background-image: background-image: url('http://retinajs.s3.amazonaws.com/images/backgrounds/bg@2x.jpg');
    }
} */
var examplePage = 'file:///Users/proffan/Projects/render2plasmid/angularplasmid/examples/main/pPMA43C.html';

//Pass a dpr of your choosing
page.zoomFactor = 4; // in this case, >=1.5 to get the retina-supporting bg-image

page.onResourceRequested = function(requestData, networkRequest) {
  console.log('Request (#' + requestData.id + '): ' + JSON.stringify(requestData));
};

page.onResourceReceived = function(response) {
  console.log('Response (#' + response.id + ', stage "' + response.stage + '"): ' + JSON.stringify(response));
};

page.open(examplePage, function(status) {
   page.render('2x.png');
   phantom.exit();
});