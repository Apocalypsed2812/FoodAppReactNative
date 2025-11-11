import React, { useContext } from "react";
import {Text, View, StyleSheet, FlatList, Image} from 'react-native'

import {GlobalState} from '../context/GlobalState';
import Order from '../components/Order';
import TDTU from '../assets/logo_tdtu.jpg';

export default function OrdersScreen({navigation}){
    OrdersScreen.navigationOptions = {
        title: 'Orders'
    };

    const state = useContext(GlobalState);
    const isLogin = state.UserAPI.login[0];
    const [orders, setOrders] = state.OrderAPI.orders;
    const [user, setUser] = state.UserAPI.user;
    const [productsShow, setProductsShow] = state.ProductAPI.productsShow;

    let orderList = []
    if(user){
      orders.forEach(item => {
        if(item.user_id == user._id){
          orderList.push(item)
        }
      })
    }
  
    // console.log("Orders là:", orders)
    // console.log("User là:", user)
    // console.log("Orders List là:", orderList)
 
    return (
      (isLogin ? (
      <>
        <View style={styles.header}>
          <Text>Chờ xác nhận</Text>
          <Text>Đang giao</Text>
          <Text>Đã giao</Text>
          <Text>Đã hủy</Text>
          <Text style={styles.line}></Text>
        </View>
        <FlatList 
          data={orderList}
          renderItem={({item}) => 
            <Order 
                order={item}
            />
            }
          keyExtractor={item => item._id}
        />
      </>
      ) : (
        <View style={styles.is__login}>
          <Image style={styles.is__login_img} source={TDTU}/>
          <Text>Vui lòng đăng nhập để sử dụng tính năng này</Text>
          <Text style={styles.is__login_direct} onPress={() => navigation.navigate('Login')}>Đăng nhập</Text>
        </View>
      ))
    )
}

const styles = StyleSheet.create({
    header:{
      flexDirection: 'row',
      backgroundColor: '#FFF',
      justifyContent: 'space-around',
      width: '100%',
      paddingVertical: 12,
      cursor: 'pointer',
      position: 'relative',
      marginBottom: 8
    },
    line: {
      position: 'absolute',
      left: 10,
      bottom: 0,
      width: 110,
      height: 1,
      backgroundColor: 'green',
    },
    is__login: {
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    is__login_direct: {
      color: 'blue',
      borderColor: 'blue',
      borderWidth: 1,
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginTop: 16,
    },
    is__login_img:{
      width: 100,
      height: 100,
    }
})