// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': "891118479292"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
   
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      
      image:payload.notification.image
     // userVisibleOnly: true
    };
  
    return self.registration.showNotification(notificationTitle,
      notificationOptions);
  });
 // self.registration.onnotificationclick = function(event) {
   // console.log('On notification click: ', event.notification.tag);
    //event.notification.close();
  
    // This looks to see if the current is already open and
    // focuses if it is
   // event.waitUntil(clients.matchAll({
     // type: "window"
    //}).then(function(clientList) {
     // for (let i = 0; i < clientList.length; i++) {
       // let client = clientList[i];
      //  if (client.url == 'https://kuvashose.web.app' && 'focus' in client)
        //  return client.focus();
    //  }
     // if (clients.openWindow)
      //console.log('open window')
       // return clients.openWindow('https://kuvashose.web.app');
    //}));
  //};

  