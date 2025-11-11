import React, {useState, useContext} from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 

// import { getMethod, postMethod } from "../utils/fetchData";
import {GlobalState} from '../context/GlobalState';

function Header({checkLogin, settings, navigationSearch}){
    const state = useContext(GlobalState)
    const setProductsShow = state.ProductAPI.productsShow[1];
    const [isLogin, setIsLogin] = state.UserAPI.login;
    const products = state.ProductAPI.products[0];
    const [search, setSearch] = useState("");

    const handleChangeInput = (name, value) => {
      setSearch(value);
    };

    const handleSearch = () => {
      console.log("Đã vào search")
      console.log(search)
      let newProduct = products;
      if (search !== "") {
        // newProduct = newProduct.filter(
        //     (p) => p.name.indexOf(search) !== -1
        // );
        newProduct = newProduct.filter(
          (p) => p.name === search
        );
      }
      if(newProduct.length == 0){
        ToastAndroid.show('Không tìm thấy sản phẩm', ToastAndroid.SHORT)
      }
      setProductsShow(newProduct)
      // navigationSearch
    }
    
    return (
        <View style={styles.container}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => handleChangeInput('search', text)}
              placeholder="Tìm kiếm"
              //value={"Nhập username"}
              type="submit"
            />
            <TouchableOpacity onPress={handleSearch} style={styles.icon__search}>
              <Feather name="search" size={24} color="black" />
            </TouchableOpacity>
            {isLogin 
            ? 
            <FontAwesome5 
              name="user-circle" 
              size={28} color="black" 
              style={styles.icon}
              onPress={settings}
              />
            : 
            <Text style={styles.text} onPress={checkLogin}>Login</Text>}
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#5fb8f4',
        width: '100%',
    },
    input: {
      width: '70%',
      paddingVertical: 4,
      paddingLeft: 24,
      borderRadius: 24,
      backgroundColor: '#fff',
      color: 'black',
      outline: 'none',
    },
    icon: {
      cursor: 'pointer',
      color: '#fff',
      borderRadius: 4,
    },
    text: {
      cursor: 'pointer',
      color: '#fff',
      fontSize: 16,
    },
    icon__search:{
      position: 'absolute',
      left: '65%',
    }
})
