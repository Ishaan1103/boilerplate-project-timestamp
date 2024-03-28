// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


function getCurrentDateFormatted() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const currentDate = new Date();
  const dayOfWeek = days[currentDate.getUTCDay()];
  const dayOfMonth = currentDate.getUTCDate();
  const month = months[currentDate.getUTCMonth()];
  const year = currentDate.getUTCFullYear();
  const hours = currentDate.getUTCHours().toString().padStart(2, '0');
  const minutes = currentDate.getUTCMinutes().toString().padStart(2, '0');
  const seconds = currentDate.getUTCSeconds().toString().padStart(2, '0');

  return `${dayOfWeek}, ${dayOfMonth} ${month} ${year} ${hours}:${minutes}:${seconds} GMT`;
}


app.get('/api/:date?', (req, res) => {
  let inputDate = req.params.date;
  
  // Check if the date parameter is empty
  if (!inputDate) {
    inputDate = new Date(); // Set it to the current time
  } else {
    // Parse the input date
    inputDate = new Date(inputDate);
    
    // Check if the parsed date is valid
    if (isNaN(inputDate.getTime())) {
      return res.status(400).json({ error: 'Invalid Date' });
    }
  }

  // Format the date to the required UTC format
  const utcFormattedDate = inputDate.toUTCString();

  // Send the response
  res.json({ unix: inputDate.getTime(), utc: utcFormattedDate });
});
// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
