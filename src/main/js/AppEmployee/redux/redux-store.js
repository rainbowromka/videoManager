import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import videoFileReducer from "./videoFileReducer";


let reducers =combineReducers({
    videoFilesPage: videoFileReducer,
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;