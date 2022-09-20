import { combineReducers } from "redux";
import accreducer from "./accountreducer"

const reducers = combineReducers({
    account : accreducer
})

export default reducers