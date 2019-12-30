const functions = require('firebase-functions');
// new
const cors = require("cors")({ origin: true });
// new
const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://church-34afa.firebaseio.com"
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// exports.helloWorld = functions.https.onRequest((request, response) => {
//     cors(request, response, () => {
//         response.setHeader('Access-Control-Allow-Origin', '*');
//         response.send({text:"Hello from Firebase!"});
//     });
// });

exports.helloWorld = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        var registrationToken = 'cFiwCAD8kTY:APA91bGnDmJe5cXbInsOwY8wUklo0UQ1JuTUwXZg2BQ8ZRORo3sCE-SNeyOSxsrvqj-7QU4YIM5rmNYB8hHC9hXVpBD9A--jE_vylstnjQjWWEuXTnU6Uj080FfJpm08NNnUGrjQL9BV';

var message = {
	notification: {
		title: request.body.notification_title,
		body: request.body.notification_body
	},
	token: registrationToken
};

// Send a message to the device corresponding to the provided
// registration token.
    response.setHeader('Access-Control-Allow-Origin', '*');

admin.messaging().send(message)
  .then((resp) => {
    // Response is a message ID string.
    // console.log('Successfully sent message:', resp);
    response.send({text:"Successfully sent message"});
  })
  .catch((error) => {
    // console.log('Error sending message:', error);
    response.send({text:"Error sending message"});
  });
	
    });
});
