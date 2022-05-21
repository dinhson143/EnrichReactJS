import axiosClient from './axiosClient';

const userAPI = {
    login(params) {
        const url = `user/login?username=${params.username}&password=${params.password}`;
        return axiosClient.get(url);
    },
    signup(params) {
        const url = `user`;
        return axiosClient.post(url, params);
    },
    logout() {
        const url = `user/logout`;
        return axiosClient.get(url);
    },
};
export default userAPI;