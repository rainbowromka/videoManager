import * as axios from "axios";

const instance =axios.create({
    baseUrl: "http://localhost/"
});

export const AuthApi = {

    getMyData() {

        // return instance.get(`auth/me`).then(response => response.data);
    },

}