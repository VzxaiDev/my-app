const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mong = require('mongoose');
const User = require("./schemas/User")
const Patient = require("./schemas/Patient")

/*
async function mongoConnect() {
    await mong.connect('mongodb://localhost:27017/');
    console.log('Connected!')
    const user = new User({name: "mike"});
    await user.save();
    console.log('test')
    const patient = new Patient({name: "male", hasCancer: true});
    await patient.save();
    console.log(patient)
}
mongoConnect() */

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/html/index.html');
  });

  app.get('/new/intake-form', function(req, res) {
    res.sendFile(__dirname + '/public/html/intake-form.html');
  });

  app.post('/api/:action', (req, res) => {
    const action = req.params.action; // Get the value of the :action parameter
    const data = req.body; // Get the request body (assuming it's JSON)
    
    // Do something with the action and data
    // ...
    
    res.json({ message: `Received ${action} action with data:`, data });
  });
  
  

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
