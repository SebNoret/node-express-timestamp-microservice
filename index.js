// init project
const express = require('express');
const app = express();
const dateFunctions= require("./dateFunctions");

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// hello endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// api endpoint for date transformations
//current time endpoint
app.get("/api", (req,res,next)=>{
  
   const current = dateFunctions.getCurrentTime();
    res.status(200).json(current);
  
})
//date endpoint
app.get("/api/:date", (req,res,next)=>{
  const urlParam= req.params.date
 
  try {
    if(dateFunctions.urlParamTester(urlParam)){
      
      const dataResponse= dateFunctions.getDateFromUrlParam(urlParam);
      res.status(200).json(dataResponse)      

    }
  } catch(error) {
    console.log(`${urlParam}-> ${error.message}`);
    res.status(400).json({
      error: error.message
    })
  }
  
})


// function urlParamTester(urlParam){
//   // if url param is a timestamp
//   const timestampRegex= /^\d+$/;
//   if(timestampRegex.test(urlParam)){
//       return urlParam
//   }

//   // if url param is not a valid date string
//   const dateParam= new Date(urlParam)  
//   if(isNaN(dateParam))throw new Error("Invalid Date")

//   // url param is a valid date string
//   return urlParam
// }


// function dateFormater(urlParam){
 
//   const tsToDate= new Date(parseInt(urlParam)).toUTCString();
//   return {
//    unix: Number(urlParam),
//    utc: tsToDate
//   }
// }
// function timestampFormater(urlParam){
//   const dateString= new Date(urlParam).toUTCString();
//   const tsString= Date.parse(dateString);
//   return{
//     unix: Number(tsString),
//     utc: dateString
//   }
// }
// function getDateFromUrlParam(urlParam){

//   // format for timestamp string param
//   const timestampRegex= /^\d+$/;
//   if(timestampRegex.test(urlParam)) return dateFormater(urlParam)
//   //format for date string param
//   return timestampFormater(urlParam)
// }

// function getCurrentTime(){
  
//   const current = Date.now();
//   const utc= new Date(current).toUTCString()
  
//   return {
//     unix: Number(current),
//     utc: utc
//   }
// }



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
