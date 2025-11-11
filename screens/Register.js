import React, { useState } from "react";
import { Image, Text, View, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'

import { getMethod, postMethod } from "../utils/fetchData";

export default function RegisterScreen({navigation}){
  RegisterScreen.navigationOptions = {
        title: 'Register'
  }

    // const [showPassword, setShowPassword] = useState(false);
    // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [user, setUser] = useState({
      username: "",
      password: "",
      confirmPassword: "",
      name: "",
  });
  const handleChangeInput = (name, value) => {
      setUser({ ...user, [name]: value });
  };
  const handleRegister = () => {
      postMethod("register", {
          username: user.username,
          password: user.password,
          name: user.name,
          email: "",
      })
          .then((res) => {
              if (res.success) {
                  // Swal.fire({
                  //     title: "Success",
                  //     text: "Account was registered successfully",
                  //     icon: "success",
                  // });
                  setUser({
                      username: "",
                      password: "",
                      confirmPassword: "",
                      name: "",
                  });
                  navigation.navigate("Login");
              } else {
                  // Swal.fire({
                  //     title: "Error",
                  //     text: res.message,
                  //     icon: "error",
                  // });
                  ToastAndroid.show(response.message, ToastAndroid.SHORT)
              }
          })
          .catch((err) => console.log(err));
  };
  const handleSubmit = (e) => {
      e.preventDefault();
      if (user.username.trim() === "") {
          ToastAndroid.show('Vui lòng nhập username', ToastAndroid.SHORT)
          return;
      }
      if (user.password.trim() === "") {
          ToastAndroid.show('Vui lòng nhập password', ToastAndroid.SHORT)
          return;
      }
      if (user.password.trim().length < 6) {
          ToastAndroid.show('Vui lòng nhập lại password', ToastAndroid.SHORT)
          return;
      }
      if (user.password.trim() !== user.confirmPassword.trim()) {
          ToastAndroid.show('Mật khẩu nhập không khớp', ToastAndroid.SHORT)
          return;
      }
      if (user.name.trim() === "") {
          ToastAndroid.show('Vui lòng nhập tên', ToastAndroid.SHORT)
          return;
      }
      handleRegister();
  };
   
  return (
    <View style={styles.container}>
        <View style={styles.container__form}>
            <Text style={styles.container__form_heading}>Đăng kí</Text>
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
            <TextInput
              style={styles.input}
              onChangeText={(text) => handleChangeInput('confirmPassword', text)}
              placeholder="Nhập lại password"
              value={user.confirmPassword}
              secureTextEntry={true}
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => handleChangeInput('name', text)}
              placeholder="Nhập tên"
              value={user.name}
            />
        </View>
        <View style={styles.container__button}>
          <TouchableOpacity> 
            <Text style = {styles.btn__register} onPress={handleSubmit}>
                Register
            </Text>
          </TouchableOpacity >
          <View style={styles.register__text}>
              <Text>Bạn đã có tài khoản ? </Text>
              <Text style={styles.register__text_btn} onPress={() => navigation.navigate('Login')}>Đăng Nhập</Text>
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