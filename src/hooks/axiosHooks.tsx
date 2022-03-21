import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useContext, useEffect, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Box, Text, useToast } from 'native-base';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../store/authReducer';
import { loadingAction, loadingEndAction } from '../store/commonReducer';
// http://192.168.0.11:1818
// 'https://recan-api.mirable.cc'
const env = process.env.NODE_ENV === 'development' ? 'http://192.168.0.11:1818' : 'https://recan-api.mirable.cc';
const urlArray = ['http://192.168.0.11:1818', 'https://recan-api.mirable.cc'];
export const baseUrl = urlArray[1];

const tempShop = ['https://recan-dev.mirable.cc/authLogin?token=', 'http://192.168.219.101:3003/authLogin?token='];
export const shopUrl = tempShop[0];
const useAxiosServices = () => {
    const toast = useToast();

    const dispatch = useDispatch();
    const axiosApiRefreshToken = axios.create({
        baseURL: baseUrl,
    });
    const axiosServicesConfig = axios.create({
        baseURL: baseUrl,
    });
    useEffect(() => {}, []);

    axiosServicesConfig.interceptors.request.use(
        async (config) => {
            dispatch(loadingAction());
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken) {
                const requestHeader = config.headers;
                return {
                    ...config,
                    headers: {
                        ...requestHeader,
                        Authorization: `Bearer ${accessToken}`,
                    },
                };
            }
            return config;
        },
        (error) => {
            console.log(error);
            Promise.reject(error);
        }
    );

    axiosApiRefreshToken.interceptors.request.use(
        async (config) => {
            dispatch(loadingAction());
            const refreshToken = await AsyncStorage.getItem('refreshToken');
            if (refreshToken) {
                const requestHeader = config.headers;
                return {
                    ...config,
                    headers: {
                        ...requestHeader,
                        Authorization: `Bearer ${refreshToken}`,
                    },
                };
            }
            return config;
        },
        (error) => {
            Promise.reject(error);
        }
    );

    axiosServicesConfig.interceptors.response.use(
        async (response) => {
            dispatch(loadingEndAction());
            const originalRequest = response.config;
            if (originalRequest.url === '/users/login') {
                const { accessToken, refreshToken } = response.data?.data;
                if (accessToken && refreshToken) {
                    await AsyncStorage.setItem('refreshToken', refreshToken);
                    await AsyncStorage.setItem('accessToken', accessToken);
                }
            }
            return response;
        },

        async (error: AxiosError) => {
            dispatch(loadingEndAction());
            const originalRequest = error.config;
            const refreshToken = await AsyncStorage.getItem('refreshToken');
            if (error.response?.status === 401 && originalRequest.url === '/users/refresh') {
                dispatch(logoutAction());
                return Promise.reject(error);
            }
            if (error.response?.status === 401 && refreshToken) {
                try {
                    if (refreshToken) {
                        const res: AxiosResponse<{ accessToken: string }> = await axiosApiRefreshToken.get('/users/refresh');
                        const { accessToken } = res.data;
                        await AsyncStorage.setItem('accessToken', accessToken);
                        return await axiosServicesConfig(originalRequest);
                    }
                    await AsyncStorage.removeItem('accessToken');
                    await AsyncStorage.removeItem('refreshToken');
                    dispatch(logoutAction());
                    await Promise.reject(error);
                } catch (e) {
                    await AsyncStorage.removeItem('accessToken');
                    await AsyncStorage.removeItem('refreshToken');
                    await Promise.reject(error);
                }
            }
            return Promise.reject(error);
        }
    );
    const axiosService = useMemo(() => axiosServicesConfig, []);
    const serviceToken = useMemo(async () => {
        const token = await AsyncStorage.getItem('refreshToken');
        return token;
    }, []);
    return { axiosService, serviceToken };
};

export default useAxiosServices;
