import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
// import App from "./AppEmployee/App";

/**
 * Отрисовка учебного приложения AppEmployee основного приложения.
 */
// ReactDOM.render(
//     <App loggedInManager={document.getElementById('managername').innerHTML } />,
//     document.getElementById('react')
// )

ReactDOM.render(
    <App loggedInManager={"roman"} />,
    document.getElementById('react')
)
