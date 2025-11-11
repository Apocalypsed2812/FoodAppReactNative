import { TOKEN_NAME, SERVER_API } from '../credentials'
//const axios = require('axios');
import axios from 'axios';
// import AsyncStorage from '@react-native-community/async-storage';
// import { AsyncStorageStatic as AsyncStorage } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getMethod = async (url) => {
    let token = await AsyncStorage.getItem(TOKEN_NAME)
    if (token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.get(`${SERVER_API + url}`);
    // const response = await fetch(`${SERVER_API + url}`, {method: 'GET',})
    // console.log(response)
    // .then(res => res.json())
    // .then(json => {
    //     console.log(json)
    // })
    return response.data;
}

export const postMethod = async (url = '', data = {}) => {
    let token = await AsyncStorage.getItem(TOKEN_NAME)
    console.log("Token Post is: ", token)
    if (token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.post(`${SERVER_API + url}`, data);
    return response.data;
}

export const deleteMethod = async (url = '', data = {}) => {
    let token = await AsyncStorage.getItem(TOKEN_NAME)
    if (token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.delete(`${SERVER_API + url}`, data);
    return response.data;
}