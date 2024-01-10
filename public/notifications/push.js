const push = require('web-push');

// VAPID keys should be generated only once.
let vapidKeys = {
  publicKey: 'BMAm0ZdfJ_pa5ec_Q17CAnhPLlE2mXcrv13ZMAVY2EESrT2piQf4Y0FvD5nWU39_Dh1XxytD43J7BYY6DFsk0Jo',
  privateKey: 'WFcvWtVGhofEZwYiZTRVLnfVs8fvcHLArdHT66zZ1-g'
}

push.setVapidDetails('mailto:test@code.co.uk',vapidKeys.publicKey,vapidKeys.privateKey);

let sub = {}
push.sendNotification(sub,'test message');

// webpush.setGCMAPIKey('<Your GCM API Key Here>');
// webpush.setVapidDetails(
//   'mailto:example@yourdomain.org',
//   vapidKeys.publicKey,
//   vapidKeys.privateKey
// );

// console.log(vapidKeys)
// This is the same output of calling JSON.stringify on a PushSubscription
// const pushSubscription = {
//   endpoint: '.....',
//   keys: {
//     auth: '.....',
//     p256dh: '.....'
//   }
// };

// webpush.sendNotification(pushSubscription, 'Your Push Payload Text');