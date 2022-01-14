const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
const port = 8000;

// step 04) configure the static folder where we would sending the client side content

app.use(express.static(path.join(__dirname, 'client')));

// step 01) create public and private key
const publicVapidKey =
  'BK0S_5Noatx83lLwlmGaorMIKXs34iPcyQQkLu3761CKSRIME2qANBy8pus0h79EDVekgcobgGLOe2i20k5VF_c';
const privateVapidKey = 'mfaaE2D1EGDxYkxSEjaLQSQ3rZ2liQal_HcpEGKhnYI';

//step 02) setup the vapidDetails this basically tells who is sending the notification

webpush.setVapidDetails(
  'mailto:optimist1356@gmail.com',
  publicVapidKey,
  privateVapidKey
);

// step 04) subscribe routes

app.post('/subscribe', async (req, res) => {
  //first get the push subscription object
  const subscription = req.body;

  //send the response
  res.status(201).json({});

  //specify the payload
  const payload = JSON.stringify({
    title: 'push notification test',
  });

  //pass the object into the sendNotification
  // try {
  //   await webpush.sendNotification(subscription, payload);
  // } catch (error) {
  //   console.log(error);
  // }

  webpush
    .sendNotification(subscription, payload)
    .catch((error) => console.log(error));
});

//step 04) configure the static folder where we would sending the client side content👆

// server

app.listen(port, () => {
  console.log(`push notification server is listening to port: ${port}`);
});
