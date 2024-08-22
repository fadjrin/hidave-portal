const functions = require('firebase-functions');
const { default: next } = require('next');

const app = next({
  dev: false,
  conf: { distDir: '.next' },
});

const handle = app.getRequestHandler();

exports.nextjsapp = functions.https.onRequest((req, res) => {
  return app.prepare().then(() => handle(req, res));
});
