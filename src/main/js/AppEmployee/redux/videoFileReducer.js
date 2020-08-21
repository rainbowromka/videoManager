const OPEN_VIDEO = "OPEN_VIDEO";
const SET_FILTER = "SET_FILTER";
const EDIT_DESCRIPTION = "EDIT_DESCRIPTION";
const DELETE_MARKER = "DELETE_MARKER";

let initialState = {
    markers: [
        {
            id: 1,
            disk: "D:",
            isVideoConnected: true,
            videoEvent: "Скалы Фараон",
            videoEventDescription: "Ходили с Сашкой Миргородским на скалы, я его снимал, как он лазит",
            videoFileName: "DJI_0951.MP4",
            desription: "Спуск коптера вниз с осмотром нависающей скалы и спуск к стартам трасс.",
            labels: [
                "DJI", "природа", "скалолазание", "фараон"
            ],
        },
        {
            id: 2,
            disk: "D:",
            isVideoConnected: true,
            videoEvent: "Скалы Фараон",
            videoEventDescription: "Ходили с Сашкой Миргородским на скалы, я его снимал, как он лазит",
            videoFileName: "DJI_0951.MP4",
            desription: "Саша лезет дупло.",
            labels: [
                "DJI", "природа", "скалолазание", "фараон"
            ],
        },
    ],
}

const profileReducer = (state = initialState, action ) => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                posts: [...state.posts, {
                    id: 6,
                    message: action.text,
                    likesCount: 0,
                }],
                newPostText: "",
            };
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        default:
            return state;
    };
};

// export const addPostActionCreator= (text) => ({type: ADD_POST, text});
// export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
// export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
// export const setStatus = (status) => ({type: SET_STATUS, status});
//
// export const getUserProfile = (userId) => {
//     return (dispatch) => {
//         dispatch(toggleIsFetching(true));
//         ProfileApi.getUserProfile(userId).then(data => {
//             dispatch(setUserProfile(data))
//             dispatch(toggleIsFetching(false));
//         });
//     }
// }
//
// export const getStatus = (userId) => (dispatch) => {
//     ProfileApi.getStatus(userId).then(data=> {
//         dispatch(setStatus(data))
//     })
// }
//
// export const updateStatus = (status) => (dispatch) => {
//     ProfileApi.updateStatus(status).then(data => {
//         if (data.resultCode === 0) {
//             dispatch(setStatus(status))
//         }
//     })
// }

export default profileReducer;