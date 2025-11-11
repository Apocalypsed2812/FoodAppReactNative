import React, { useState, useContext } from "react";
import { Image, Text, View, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import { postMethod } from "../utils/fetchData";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { TOKEN_NAME } from "../credentials";
import {GlobalState} from '../context/GlobalState'
import TDTU from '../assets/logo_tdtu.jpg'

export default function LoginScreen({navigation}){
    const [user, setUser] = useState({ username: "", password: "" });
    const state = useContext(GlobalState)
    const [isLogin, setIsLogin] = state.UserAPI.login;
    const [productsShow, setProductsShow] = state.ProductAPI.productsShow;
    // console.log("Is Login Page: ", isLogin)
    const handleChangeInput = (name, value) => {
        setUser({
            ...user,
            [name]: value,
        });
    };

      const handleLogin = async () => {
          const response = await postMethod("login", user)
          if (response.success) {
              try{
                console.log("Token là: ", response.token)
                await AsyncStorage.setItem(TOKEN_NAME, response.token);
                console.log(await AsyncStorage.getItem(TOKEN_NAME));
                setIsLogin(true);
                navigation.navigate("Home");
              }
              catch(error){
                ToastAndroid.show(error, ToastAndroid.SHORT);
              }
          } else {
              ToastAndroid.show(response.message, ToastAndroid.SHORT)
          }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (user.username.trim() === "") {
            ToastAndroid.show("Username không được trống", ToastAndroid.SHORT)
            return;
        }
        if (user.password.trim() === "") {
            ToastAndroid.show("Password không được trống", ToastAndroid.SHORT)
            return;
        }
        handleLogin();
    };

    LoginScreen.navigationOptions = {
      title: 'Login'
    }
    
    return (
      <View style={styles.container}>
            <View style={styles.container__form}>
              <Image style={styles.form__image} source={TDTU}/>
              <TextInput
                style={styles.input}
                onChangeText={(text) => handleChangeInput('username', text)}
                placeholder="Nhập username"
                value={user.username}
              />
              <TextInput
                style={styles.input}
                onChangeText={(text) => handleChangeInput('password', text)}
                placeholder="Nhập password"
                value={user.password}
                secureTextEntry={true}
              />
              <Text style={styles.forgot}>Quên mật khẩu ?</Text>
            </View>
            <View style={styles.container__button}>
              <TouchableOpacity> 
                <Text style = {styles.btn__login} onPress={handleSubmit}>
                    Log In
                </Text>
              </TouchableOpacity >
              <View style={styles.login__text}>
                <Text>Bạn chưa có tài khoản ?</Text> 
                <Text style={styles.login__text_btn} onPress={() => navigation.navigate('Register')}>Đăng Kí</Text>
              </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
  },
  container__form:{
      flex: 3,
      backgroundColor: '#5fb8f4',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 16,
  },
  container__button:{
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 24,
      paddingBotom: 16,
  },
  input: {
    height: 40,
    margin: 12,
    width: '80%',
    paddingVertical: 10,
    paddingLeft: 24,
    borderRadius: 24,
    backgroundColor: '#fff',
    color: 'black',
    outline: 'none',
  },
  forgot: {
    color: '#fff',
  },
  btn__login:{
    width: '100%',
    padding: 8,
    borderRadius: 24,
    borderColor: '#5fb8f4',
    borderWidth: 1,
    paddingHorizontal: 130,
    paddingVertical: 10,
    color: '#5fb8f4',
  },
  login__text: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 20,
  },
  login__text_btn: {
    marginLeft: 4,
    cursor: 'pointer',
    color: '#5fb8f4',
  },
  form__image: {
    width: 64,
    height: 64,
    marginTop: 20,
    marginBottom: 16,
    borderRadius: 9999,
  },
})