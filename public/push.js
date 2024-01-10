const push = require('web-push');

// VAPID keys should be generated only once.
let vapidKeys = {
  publicKey: 'BMAm0ZdfJ_pa5ec_Q17CAnhPLlE2mXcrv13ZMAVY2EESrT2piQf4Y0FvD5nWU39_Dh1XxytD43J7BYY6DFsk0Jo',
  privateKey: 'WFcvWtVGhofEZwYiZTRVLnfVs8fvcHLArdHT66zZ1-g'
}

push.setVapidDetails('mailto:test@code.co.uk',vapidKeys.publicKey,vapidKeys.privateKey);

// webpush.setGCMAPIKey('<Your GCM API Key Here>');
// webpush.setVapidDetails(
//   'mailto:example@yourdomain.org',
//   vapidKeys.publicKey,
//   vapidKeys.privateKey
// );

// console.log(vapidKeys)
// This is the same output of calling JSON.stringify on a PushSubscription
const pushSubscription = {
  endpoint: 'https://fcm.googleapis.com/fcm/send/cLQgfWrqplg:APA91bF1TPVofg3OoXJCbuWQaHZPkThZrk3ZGOXCBky7y44DGvQVmCd6J_zlRFEPXLDaPsYcpKC55bHrc-UA5VvAImY2zRTwDstsr6p5O36zpOxpg-sZQ2nA1NnuqvJqbTvS_-xrWaiy',
  keys: {
    auth: '2ausDPqspPVU8ZRMdPvFWw',
    p256dh: 'BI8SQAS_RIkk8NyGsL4H6V1w-b-zmP5Woo5Fcl2EWs8PKGK2V6mNLJme0q1ohU0K--rW9CPv4Juk-ti4LbCgYdE'
  }
};

push.sendNotification(pushSubscription, 'Your Push Payload Text');