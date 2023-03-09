try {
  // importScripts("firebase-sw-private.js");
  importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
  importScripts(
    "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
  );
  // firebase.initializeApp(firebaseConfigObject);
} catch (e) {
  importScripts("/__/firebase/7.15.0/firebase-app.js");
  importScripts("/__/firebase/7.15.0/firebase-messaging.js");
  importScripts("/__/firebase/init.js");
}

if (firebase.messaging.isSupported()) {
  const messaging = firebase.messaging();

  messaging.onBackgroundMessage(function(payload) {
    console.log(
      "[firebase-messaging-sw.js] Received background message ",
      payload
    );

    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon:
        "https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png",
      image: payload.notification.image
    };

    const promiseChain = clients
      .matchAll({
        type: "window",
        includeUncontrolled: true
      })
      .then(windowClients => {
        for (let i = 0; i < windowClients.length; i++) {
          const windowClient = windowClients[i];
          windowClient.postMessage(payload);
        }
      })
      .then(() => {
        return registration.showNotification(
          notificationTitle,
          notificationOptions
        );
      });

    return promiseChain;
  });
}
