import authReducer from "./authReducer";
import projectReducer from "./projectReducer";
import {combineReducers} from "redux";

//todo this is not done
const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer
});

export default rootReducer