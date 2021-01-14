const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let inputData = require('./data/inputData.json');


app.post('/transform-data', (req, res) => {

    var transformedPayload = transformData(inputData);

    res.status(200).send(transformedPayload);

});

function transformData(inputData) {
    var dataStr = JSON.stringify(inputData.payload)
    var referenceData = inputData.referenceData;
    var labels = Object.keys(referenceData);
    for (i = 0; i < labels.length; i++) {
        dataStr = dataStr.replaceAll(`{${labels[i]}}`, referenceData[labels[i]]);

    }
    return JSON.parse(dataStr);
}


app.listen(port, () => console.log(`This app is listening on  ${port}!`))