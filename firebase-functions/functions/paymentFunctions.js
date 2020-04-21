const functions = require('firebase-functions');
const admin = require('firebase-admin');

const db = admin.firestore();

exports.paymentIntent = functions.https.onCall(async (data, context) => {
    const stripe = require('stripe')('sk_test_v9k8fKhH1oq3R0EnF2vg8n7M00zReeGEZs');

    const paymentIntent = await stripe.paymentIntents.create({
        amount: parseInt(data.price),
        currency: 'usd',
        payment_method_types: ['card'],
        receipt_email: data.email.toString(),
    });

    return paymentIntent.client_secret;
});

exports.grabPrice = functions.https.onCall(async (data) => {
    //data should be the party package
    return (await db.collection('Prices').where('partyPackage', '==', parseInt(data.partyPackage))
        .get().then((snapshot) => {
            let price = -1;
            snapshot.forEach(docs => {
                price = docs.data().price;
            })
            return price;
        }).catch(err => {
            // Error with the database
            throw new functions.https.HttpsError('database-failure', 'Getting prices: ' + err);
        }));
});