import authReducer from "./authReducer";
import partyReducer from "./partyReducer";
import {combineReducers} from "redux";

//todo this is not done
const rootReducer = combineReducers({
    auth: authReducer,
    party: partyReducer
});

export default rootReducer