const partyTimes = require('./SchedulerFunctions');
const paymentFunctions = require('./PaymentFunctions');
const tests = require('./TestingFunctions');

//This file is all of the server side work done on the project

// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.paymentIntent = paymentFunctions.paymentIntent;

exports.checkPartyTimeOne = partyTimes.checkPartyTimeOne;
exports.checkPartyTimeTwo = partyTimes.checkPartyTimeTwo;
exports.checkPartyTimeThree = partyTimes.checkPartyTimeThree;

exports.fillOpenHours = tests.fillOpenHours;
exports.pullOpenHours = tests.pullOpenHours;