const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mong = require('mongoose');
const User = require("./schemas/User")
const Patient = require("./schemas/Patient")


async function mongoConnect() {
    await mong.connect('mongodb://localhost:27017/');
    console.log('Connected!')
}
mongoConnect() 

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/html/index.html');
});

app.get('/new/intake-form', function(req, res) {
  res.sendFile(__dirname + '/public/html/intake-form.html');
});

app.get('/new/patient', function(req, res) {
  res.sendFile(__dirname + '/public/html/newPatient.html');
});


app.get('/api/hydrate/all-patients', async (req, res) =>{
  const all = await Patient.find({});
  res.send(all);
});

app.post('/api/save-patient-form', (req, res) => {
  const data = req.body; // Get the request body (assuming it's JSON)
  Patient.create({
    name: data[0],
    dob: data[1],
    age: data[2],
    patientID: data[3],
    height: data[4],
    weight: data[5],
    gender: data[6],
    temp: data[7],
    pulse: data[8],
    respiratoryRate: data[9],
    breathingSounds: data[10],
    bloodPressure: data[11],
    sPO2: data[12]
});
  res.json({ message: `Received action with data:`, data });
});

  

app.listen(80 , '0.0.0.0', () => {
  console.log('Server started on port 3000');
});
