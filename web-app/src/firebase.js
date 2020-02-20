import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBIyEdACmURTID4gh9KsJyJcbi0tCc8h-s",
    authDomain: "paramount-group-scheduler.firebaseapp.com",
    databaseURL: "https://paramount-group-scheduler.firebaseio.com",
    projectId: "paramount-group-scheduler",
    storageBucket: "paramount-group-scheduler.appspot.com",
    messagingSenderId: "187693486731",
    appId: "1:187693486731:web:33d2ac8e49733d6b55ba8e",
    measurementId: "G-J2VK2JJSJ4"
};

var fire = firebase.initializeApp(firebaseConfig);

export default fire;