'use strict';

const functions = require('firebase-functions');
//const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
//const sanitizer = require('./sanitizer');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


exports.addMessage = functions.https.onCall((data, context) => {

  // [START_EXCLUDE]

  // [START readMessageData]

  // Message text passed from the client.

  const text = data.text;

  // [END readMessageData]

  // [START messageHttpsErrors]

  // Checking attribute.

  if (!(typeof text === 'string') || text.length === 0) {

    // Throwing an HttpsError so that the client gets the error details.

    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +

        'one arguments "text" containing the message text to add.');

  }

//const sanitizedMessage = sanitizer.sanitizeText(text);
  return admin.database().ref('/messages').push({

    text: text,


  }).then(() => {

    console.log('New Message written');

    // Returning the sanitized message to the client.

    return { text: text };

  })

  // [END returnMessageAsync]

  .catch((error) => {

    // Re-throwing the error as an HttpsError so that the client gets the error details.

    throw new functions.https.HttpsError('unknown', error.message, error);

  });
});



















// const gmailEmail = functions.config().gmail.email;

// const gmailPassword = functions.config().gmail.password;

// const mailTransport = nodemailer.createTransport({

//   service: 'gmail',

//   auth: {

//     user: 'chopra.kriti3@gmail.com',

//     pass: 'Shammi@2104',

//   },

// });

// const APP_NAME = 'Welcome Email';

// exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
//   // ...
//   const email=user.email;
//   const displayName=user.displayName;

//   return sendWelcomeEmail(email,displayName);
// });

// async function sendWelcomeEmail(email, displayName) {

//   const mailOptions = {

//     from: `${APP_NAME} <noreply@firebase.com>`,

//     to: email,

//   };



//   // The user subscribed to the newsletter.

//   mailOptions.subject = `Welcome to ${APP_NAME}!`;

//   mailOptions.text = `Hey ${displayName || ''}! Welcome to ${APP_NAME}. I hope you will enjoy our service.`;

//   await mailTransport.sendMail(mailOptions);

//   console.log('New welcome email sent to:', email);

//   return null;

// }
