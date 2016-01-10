process.chdir(__dirname);

require('coffee-script').register();

// Ensure a "sails" can be located:
var lift = function() {
  var sails;
  try {
    sails = require('sails');
  } catch (e) {
    console.error('To run an app using `node app.js`, you usually need to have a version of `sails` installed in the same directory as your app.');
    console.error('To do that, run `npm install sails`');
    console.error('');
    console.error('Alternatively, if you have sails installed globally (i.e. you did `npm install -g sails`), you can use `sails lift`.');
    console.error('When you run `sails lift`, your app will still use a local `./node_modules/sails` dependency if it exists,');
    console.error('but if it doesn\'t, the app will run with the global sails instead!');
    return;
  }

  // Try to get `rc` dependency
  var rc;
  try {
    rc = require('rc');
  } catch (e0) {
    try {
      rc = require('sails/node_modules/rc');
    } catch (e1) {
      console.error('Could not find dependency: `rc`.');
      console.error('Your `.sailsrc` file(s) will be ignored.');
      console.error('To resolve this, run:');
      console.error('npm install rc --save');
      rc = function () { return {}; };
    }
  }


  // Start server
  sails.lift(rc('sails')); 
};

var es_status = require('./es/es_status');
var pingEs = es_status.pingEs,
  updateDBVersion = es_status.updateDBVersion;

pingEs().then(function () {
  //lift();
  updateDBVersion(lift);
});
