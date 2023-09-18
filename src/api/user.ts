import axios from "axios";
import Cookies from "js-cookie";
import { UserCollection, UserInfoType } from "../helpers/types";

const api = axios.create({
    baseURL: `${process.env.REACT_APP_SERVICES_URL}`,
    withCredentials: true,
    headers: {
        Authorization: Cookies.get(`${process.env.REACT_APP_LOGIN_COOKIE}`)
    }
});

api.interceptors.response.use(response => response.data);

export const getUserCollection = async (username: string): Promise<UserCollection> => await api(`/${username}/collection`);

export const getUserCollectionValue = async (username: string): Promise<string> => await api(`/${username}/collection/value`);

export const getUserInfo = async (): Promise<UserInfoType> => await api('/user/info');

