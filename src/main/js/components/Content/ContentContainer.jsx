import React from 'react';
import Content from "./Content";
import {connect} from "react-redux";
import {
    saveMarker,
    // saveMarkerActionCreator
} from "../../redux/videoFileReducer";

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.videoFilesPage,
    }
}

// let mapDispatchToProps = (dispatch) => {
//     return {
//         saveMarker: (marker) => {
//             dispatch(saveMarkerActionCreator(marker));
//         }
//     }
// }

export default
// compose(
    connect(mapStateToProps, {saveMarker})
// , WithAuthRedirect,
// )
(Content);