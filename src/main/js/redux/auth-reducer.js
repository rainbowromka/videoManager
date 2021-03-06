import {AuthApi} from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
    id: null,
    login: null,
    isFetching: false,
    isAuth: false,
};

const authReducer = (state = initialState, action ) => {
    switch (action.type) {
        case SET_USER_DATA:
            return  {
                ...state,
                ...action.data,
                isAuth: true,
            }
        default:
            return state;
    };
};

export const setAuthUserData = (id, email, login) => ({type: SET_USER_DATA, data: {id, email, login}});

export const getMyData = (userId) => {
    return (dispatch) => {
        AuthApi.getMyData()
            .then(data => {
                if (data.resultCode === 0) {
                    const {id, login, email} = data.data;
                    dispatch(setAuthUserData(id, email, login));
                }
            });
    }
}

export default authReducer;