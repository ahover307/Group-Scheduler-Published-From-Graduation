const partyTimes = require('./schedulerFunctions');
const paymentFunctions = require('./paymentFunctions');
const tests = require('./testingFunctions');

//This file is all of the server side work done on the project

// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.paymentIntent = paymentFunctions.paymentIntent;

exports.checkPartyTime = partyTimes.checkPartyTimes;

exports.confirmTimeandCommitToDB = partyTimes.confirmTimeandCommitToDB;

exports.fillOpenHours = tests.fillOpenHours;
exports.pullOpenHours = tests.pullOpenHours;