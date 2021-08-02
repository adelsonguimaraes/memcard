/* Service Worker */
if ( 'serviceWorker' in navigator ) {
    navigator.serviceWorker
    // .register('./service-worker.js?'+moment().valueOf())
    .register('./service-worker.js', {
        scope: '.'
    })
    .then((reg) => {
        console.log('Service Worker Registered');
    })
    .catch((err) => {
        console.log('erro', err);
    });
}