import React from "react";
import {Grid} from "@material-ui/core";

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
                Здесь будет заголовок.
            </Grid>
            <Grid item container>
                Здесь будет рабочая область.
            </Grid>
        </Grid>
    );
}

export default App;