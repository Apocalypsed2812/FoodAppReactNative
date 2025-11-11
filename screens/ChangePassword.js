import React, { useState, useContext } from "react";
import { Image, Text, View, StyleSheet, TextInput, Button, Alert, TouchableOpacity, ToastAndroid } from 'react-native'

import { postMethod } from "../utils/fetchData";
import {GlobalState} from '../context/GlobalState';

export default function ChangePasswordScreen({navigation}){
  ChangePasswordScreen.navigationOptions = {
    title: 'ChangePassword'
  }

  const state = useContext(GlobalState);
  const [user, setUser] = state.UserAPI.user;

  const [users, setUsers] = useState({
      username: "",
      password: "",
      confirmPassword: "",
      newPassword: "",
  });
  const handleChangeInput = (name, value) => {
      setUsers({ ...users, [name]: value });
  };
  const handleChangePassword = () => {
      postMethod("change-password", {
          username: user.username,
          password: users.password,
          newPassword: users.newPassword,
      })
          .then((res) => {
              if (res.success) {
                  setUsers({
                      username: "",
                      password: "",
                      confirmPassword: "",
                      newPassword: "",
                  });
                  // navigation.navigate("Home");
                  ToastAndroid.show('Đổi mật khẩu thành công', ToastAndroid.SHORT)
              } else {
                  ToastAndroid.show(response.message, ToastAndroid.SHORT)
              }
          })
          .catch((err) => console.log(err));
  };
  const handleSubmit = (e) => {
      e.preventDefault();
      if (users.newPassword.trim() === "") {
          ToastAndroid.show('Vui lòng nhập mật khẩu mới', ToastAndroid.SHORT)
          return;
      }
      if (users.confirmPassword.trim() === "") {
        ToastAndroid.show('Vui lòng nhập lại mật khẩu mới', ToastAndroid.SHORT)
        return;
    }
      if (users.password.trim() === "") {
          ToastAndroid.show('Vui lòng nhập mật khẩu cũ', ToastAndroid.SHORT)
          return;
      }
      if (users.password.trim().length < 6) {
          ToastAndroid.show('Mật khẩu phải có từ 6 ký tự', ToastAndroid.SHORT)
          return;
      }
      if (users.newPassword.trim() !== users.confirmPassword.trim()) {
          ToastAndroid.show('Mật khẩu mới không khớp', ToastAndroid.SHORT)
          return;
      }
      handleChangePassword();
  };
   
  return (
    <View style={styles.container}>
        <View style={styles.container__form}>
            <Text style={styles.container__form_heading}>Đổi mật khẩu</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => handleChangeInput('password', text)}
              placeholder="Nhập mật khẩu cũ"
              value={users.password}
              secureTextEntry={true}
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => handleChangeInput('newPassword', text)}
              placeholder="Nhập mật khẩu mới"
              value={users.newPassword}
              secureTextEntry={true}
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => handleChangeInput('confirmPassword', text)}
              placeholder="Nhập lại mật khẩu mới"
              value={users.confirmPassword}
              secureTextEntry={true}
            />
        </View>
        <View style={styles.container__button}>
          <TouchableOpacity> 
            <Text style = {styles.btn__register} onPress={handleSubmit}>
                Đổi Mật Khẩu
            </Text>
          </TouchableOpacity >
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
      //paddingVertical: '16px',
      paddingBottom: 8,
  },
  container__form_heading: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 8,
    textTransform: 'capitalize',
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
  btn__register:{
    width: '100%',
    padding: 8,
    borderRadius: 24,
    // shadowColor: 'blue',
    // shadowOpacity: 0.1,
    // shadowRadius: 10,
    // shadowOffset: {width: 0, height: 0},
    borderColor: '#5fb8f4',
    borderWidth: 1,
    paddingHorizontal: 130,
    paddingVertical: 10,
    color: '#5fb8f4',
    textTransform: 'capitalize',
  },
  register__text: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 20,
  },
  register__text_btn: {
    marginLeft: 2,
    cursor: 'pointer',
    color: '#5fb8f4',
  },
})