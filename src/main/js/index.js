import ReactDOM from "react-dom";
import store from "./redux/redux-store"
import React from "react";
import App from "./App";
// import App from "./AppEmployee/App";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";

/**
 * Отрисовка учебного приложения AppEmployee основного приложения.
 */
// ReactDOM.render(
//     <App loggedInManager={document.getElementById('managername').innerHTML } />,
//     document.getElementById('react')
// )

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>, document.getElementById('react'));
