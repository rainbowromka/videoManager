const SAVE_MARKER = "SAVE_MARKER"

// const OPEN_VIDEO = "OPEN_VIDEO";
// const SET_FILTER = "SET_FILTER";
// const EDIT_DESCRIPTION = "EDIT_DESCRIPTION";
// const DELETE_MARKER = "DELETE_MARKER";

/**
 * Начальное состояние. Нужно для тестирования входящих данных не используя
 * сервер.
 */
let initialState = {
    allTags: [
        {title: "DJI"},
        {title: "NATURE"},
        {title: "ROCKS"},
        {title: "GoPro"},
        {title: "Snowboard"},
        {title: "FreeRide"},
    ],
    videoMarkers: [
        {
            id: 1,
            disc: "f:",
            discIsConnected: true,
            title: "Скалы Фараон (DJI_0651.mp4)",
            dateCreation: "22.09.2018",
            description: "Вид сверху на скалы со спуском вниз",
            preView: "assets/1234.jpg",
            tags : [
                {title: "DJI"},
                {title: "NATURE"},
                {title: "ROCKS"},
            ]
        },
        {
            id: 2,
            disc: "f:",
            discIsConnected: true,
            title: "Скалы Фараон (DJI_0652.mp4)",
            dateCreation: "22.09.2018",
            description: "Саня лезет",
            preView: "assets/1234.jpg",
            tags : [
                {title: "DJI"},
                {title: "NATURE"},
                {title: "GoPro"},
            ]
        },
        {
            id: 3,
            disc: "Y:",
            discIsConnected: false,
            title: "Скалы Фараон (DJI_0654.mp4)",
            dateCreation: "22.09.2018",
            description: "Саня спускается",
            preView: "assets/1234.jpg",
            tags : [
                {title: "DJI"},
                {title: "ROCKS"},
            ]
        },
    ]
}

/**
 * обработчик событий хранилища.
 *
 * @param state ссылка на redux хранилище.
 * @param action событие, содержит в себе идентификатор возникшего события, и
 * данные переданные событию.
 *
 * @returns ссылку на новое - измененное хранилище или state.
 */
const profileReducer = (state = initialState, action ) => {
    switch (action.type) {
        case SAVE_MARKER: {
            let videoMarkers = state.videoMarkers.map((item) => {
                return action.marker.id === item.id
                    ? action.marker
                    : item;
            });
            return {...state, videoMarkers}
        }
        default:
            return state;
    };
};

/**
 * Action Creator сохранения Маркера видео в хранилище.
 *
 * @param marker - маркер хранилища.
 *
 * @returns возвращает объект содержащий идентификатор события и Маркер видео.
 */
export const saveMarkerActionCreator = (marker) =>
    ({type: SAVE_MARKER, marker,});

/**
 * Thunk сохранения маркера. Генерирует событие сохранения маркера, и сохраняет
 * маркер на сервере.
 *
 * @param marker маркер видео.
 * @returns возвращает функцию обработчика события сохранения маркера в
 * хранилище.
 */
export const saveMarker = (marker) => (dispatch) => {
    dispatch(saveMarkerActionCreator(marker))
}


export default profileReducer;