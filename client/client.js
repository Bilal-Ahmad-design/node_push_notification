const publicVapidKey =
  'BK0S_5Noatx83lLwlmGaorMIKXs34iPcyQQkLu3761CKSRIME2qANBy8pus0h79EDVekgcobgGLOe2i20k5VF_c';

//check if we can use the service worker in the current browser
if ('serviceWorker' in navigator) {
  send().catch((err) => {
    console.log(err);
  });
}

//create a function which will, Register service worker, register push, and then send the push

async function send() {
  //register service worker
  console.log('registering sevice worker ....');
  const register = await navigator.serviceWorker.register('/worker.js', {
    scope: '/',
  });
  console.log('service worker has registered...');

  //register push
  console.log('Registering push...');
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: publicVapidKey,
  });
  console.log('push registered...');

  // send push notification
  console.log('sending push notification ...');
  await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json',
    },
  });
  console.log('push sent...');
}
