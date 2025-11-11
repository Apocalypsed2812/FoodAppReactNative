import React, {useState} from "react";
import {Image, Text, View, StyleSheet, TextInput, Modal, Alert, TouchableOpacity } from 'react-native'
import { or } from "react-native-reanimated";

import SkiiImage from '../assets/skii.png'

function Order(props){
    const {order} = props
    const [modalVisible, setModalVisible] = useState(false);
    // const [name, setName] = useState(false);
    // const [address, setAddress] = useState(false);
    // const [total, setTotal] = useState(false);

    const showModalView = (e) => {
        // setName(e.target.getAttribute("data-name"))
        // setAddress(e.target.getAttribute("data-address"))
        // setTotal(e.target.getAttribute("data-total"))
        // setName(order.name)
        // setAddress(order.address)
        // setTotal(order.total)
        setModalVisible(true)
    }

    const closeModalView = () => {
      setModalVisible(false)
    }

    return (
        <>
          <View style={styles.wrapper}>
            <View style={styles.container}>
              {order.product.map((order, index) => {
                return (
                  <View style={styles.product} key={index}>
                    <Image style={styles.image} source={{uri:order.image_url}}/>
                    <View style={styles.content}>
                      <Text style={styles.heading}>{order.name}</Text>
                      <Text style={styles.quantity}>x {order.quantity}</Text>
                      <Text style={styles.price}>{order.price}</Text>
                    </View>
                  </View>
                )
              })}
                <View style={styles.total}>
                  <Text>
                    <Text>Thành tiền: </Text>
                    <Text style={styles.totalPrice}>{order.total}</Text>
                  </Text>
                  <TouchableOpacity onPress={showModalView} data-name={order.name} data-address={order.address} data-total={order.total}>
                    <Text style={styles.detail}> 
                      Chi tiết
                    </Text>
                  </TouchableOpacity>
                </View>
            </View>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <TouchableOpacity style={styles.modal__overlay} onPress={() => setModalVisible(!modalVisible)}>
            </TouchableOpacity>
              <View style={styles.modal__container}>
                <Text style={styles.modal__container_heading}>Chi tiết đơn hàng</Text>
                <View style={styles.modal__form_group}>
                  <Text>Tên Khách Hàng: </Text>
                  <Text>{order.name}</Text>
                </View>
                <View style={styles.modal__form_group}>
                  <Text>Địa Chỉ: </Text>
                  <Text>{order.address}</Text>
                </View>
                <View style={styles.modal__form_group}>
                  <Text>Số Điện Thoại: </Text>
                  <Text>{order.phone}</Text>
                </View>
                <View style={styles.modal__form_group}>
                  <Text>Tổng Tiền: </Text>
                  <Text>{order.total}</Text>
                </View>
                <View style={styles.modal__form_group}>
                  <Text>Trạng Thái: </Text>
                  <Text>{order.status}</Text>
                </View>
                <Text style={styles.button} onPress={closeModalView}>Đóng</Text>
              </View>
          </Modal>
        </>
    )
}

export default Order

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        width: '100%',
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    product: {
      flexDirection: 'row',
      marginBottom: 12,
    },
    content: {
      flex: 1,
      paddingHorizontal: 12,
      paddingVertical: 4,
    },
    heading: {
      fontSize: 16,
      fontWeight: '500',
      height: 22,
    },
    price: {
      color: '#ccc',
    },
    image: {
      width: 64,
      height: 64,
      marginTop: 4,
    }, 
    total: {
      textAlign: 'right',
      paddingBottom: 8,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    totalPrice: {
      color: '#147efb',
      marginLeft: 8,
    },
    detail: {
      borderColor: 'green',
      borderWidth: 1,
      color: 'green',
      paddingHorizontal: 8,
      paddingVertical: 4
    },
    modal__container: {
      width: '100%',
      backgroundColor: '#fff',
      position: 'absolute',
      bottom: 0,
      height: 450,
      borderColor: '#ccc',
      borderWidth: 1,
      display: 'flex',
      alignItems: 'center',
      zIndex: 1,
    },
    modal__overlay: {
      backgroundColor: 'transparent',
      position: 'absolute',
      bottom: 450,
      top: 0,
      left: 0,
      right: 0,
    },
    modal__container_heading: {
      width: '100%',
      textAlign: 'center',
      lineHeight: 40,
      color: 'green',
      fontSize: 20,
      fontWeight: '600',
      marginVertical: 30,
    },
    input: {
      height: 40,
      margin: 12,
      width: '90%',
      paddingVertical: 10,
      paddingLeft: 24,
      borderRadius: 24,
      backgroundColor: '#fff',
      color: 'black',
      outline: 'none',
      borderColor: '#ccc',
      borderWidth: 1,
    },
    button: {
      height: 40,
      marginTop: 50,
      paddingVertical: 10,
      paddingHorizontal: 100,
      borderRadius: 24,
      backgroundColor: '#fff',
      color: 'black',
      outline: 'none',
      borderColor: 'gray',
      borderWidth: 1,
      textTransform: 'uppercase',
      color: 'gray',
    },
    modal__form_group: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: 20,
      fontSize: 30,
    }
})

