import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import videoFileReducer from "./videoFileReducer";
import { reducer as formReducer } from 'redux-form';

let reducers =combineReducers({
    videoFilesPage: videoFileReducer,
    form: formReducer,
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;