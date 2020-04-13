import authReducer from "./authReducer";
import partyReducer from "./partyReducer";
import {combineReducers} from "redux";
import {firestoreReducer} from "redux-firestore";
import {firebaseReducer} from "react-redux-firebase";

const rootReducer = combineReducers({
    auth: authReducer,
    party: partyReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer