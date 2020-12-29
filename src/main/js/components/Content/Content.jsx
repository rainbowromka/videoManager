import React from "react";
import BrightVideoFragmentItem from "./BrightVideoFragmentItem";
import { Grid } from "@material-ui/core";
import appData from "../../consts/consts";

/**
 * Компонент вывода содержимого главной страницы, в частонсти списка меток
 * видео.
 *
 * @returns {JSX.Element} Список меток видео.
 * @constructor
 */
const Content = (props) => {

    const videoMarkers = props.dialogsPage.videoMarkers;

    const videoMarkerItem = videoMarkerObj => {
        return <BrightVideoFragmentItem videoMarkerObj={videoMarkerObj}
                                        saveMarker={props.saveMarker}/>;
    }

    return (
        <Grid container spacing={1}>
            {videoMarkers && videoMarkers.map(videoMarkerObj =>
                <Grid key={videoMarkerObj.id} item xs={12}>
                    {videoMarkerItem(videoMarkerObj)}
                </Grid>
            )}
        </Grid>

    )
}

export default Content;