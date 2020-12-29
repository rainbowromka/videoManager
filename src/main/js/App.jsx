import React from "react";
import {Grid} from "@material-ui/core";
import Header from "./components/Header/Header";
import {Route} from "react-router-dom";
import ContentContainer from "./components/Content/ContentContainer";
import Login from "./components/Login/Login";
import InstagramContainer
    from "./components/Content/Instagram/InstagramContainer";
// import Header from "./components/Header";

/**
 * Базовый компонент приложения Video Manager
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const App = (props) => {
    return (
        <Grid container direction="column">
            <Grid item>
                <Header/>
            </Grid>
            <Grid item container>
                <Grid item xs={false} sm={1} md={2}/>
                <Grid item xs={12} sm={10} md={8}>
                    <Route path="/login" render={() => <Login/>}/>
                    <Route path="/instagram" render={() => <InstagramContainer />}/>
                    <Route exact path="/"
                           render={() => <ContentContainer/>}
                    />
                </Grid>
                <Grid item xs={false} sm={1} md={2}/>
            </Grid>
        </Grid>
    );
}

export default App;