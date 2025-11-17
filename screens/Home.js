import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import banner from '../assets/banner.jpg'
// import { getMethod, postMethod } from "../utils/fetchData";
import {GlobalState} from '../context/GlobalState'
import Header from '../components/Header';

export default function HomeScreen({navigation}){
    const state = useContext(GlobalState)
    const [isLogin, setIsLogin] = state.UserAPI.login;
    // console.log("Is Login: ", isLogin);

    const [products, setProducts] = state.ProductAPI.products;
    const [categorys, setCategorys] = state.CategoryAPI.categorys;
    const [foodStores, setFoodStores] = state.FoodStoreAPI.foodStores;
    const [productsShow, setProductsShow] = state.ProductAPI.productsShow;
    const [user, setUser] = state.UserAPI.user;

    const comebackHome = () => {
      setProductsShow([])
    }
    // if(productsShow.length > 0){
    //   setProductsShow([])
    // }

    HomeScreen.navigationOptions = ({ navigation, screenProps }) => ({
          headerTitle: 
          () => 
          <Header 
            checkLogin={() => navigation.navigate('Login')} 
            // user={navigation.state.params}
            settings={() => navigation.navigate('Settings')} 
            // navigationSearch={() => navigation.navigate('Search')}
          />,
          headerStyle: {backgroundColor: '#5fb8f4'},
      });

      // console.log("ProductShow là: ", productsShow.length)

      return (
          // (productsShow.length > 0
          //   ? 
          //   (
          //     <ScrollView>
          //       <View style={styles.container}>
          //         <Image style={styles.image} source={banner}/>
          //         <View style={styles.categories__row}>
          //           {productsShow.map((item, index) => (
          //             <TouchableOpacity style={styles.product__col_12} key={index} onPress={() => {navigation.navigate("ProductDetail", {product: item})}}>
          //                 <View style={styles.product__search}>
          //                     <Image style={styles.product__image_search} source={{uri: item.image_url}}/>
          //                     <Text style={styles.product__title}>{item.name}</Text>
          //                     <Text style={styles.product__price}>{item.price} đ</Text>
          //                     {/* <Text style = {styles.product__btn} onPress={() => handleAddToCart(item._id)}>
          //                         Thêm
          //                     </Text> */}
          //                 </View>
          //             </TouchableOpacity> 
          //         ))} 
          //         <TouchableOpacity onPress={comebackHome} style={styles.product__col_12}>
          //           <Text style={styles.comebackHome}>Quay về trang chủ</Text>
          //         </TouchableOpacity>
                       
          //         </View>
          //       </View>
          //     </ScrollView>
          //   ) 
          //   : 
          //   (
          //     <ScrollView>
          //     <View style={styles.container}>
          //       <Image style={styles.image} source={banner}/>
          //       <Text>51900444 - 51900333</Text>
          //       <View style={styles.categories__row}>
          //           {categorys.map((item, index) => (
          //               <TouchableOpacity style={styles.categories__col_3} key={index} onPress={() => {navigation.navigate("Category", {categoryName: item.name})}}>
          //                   <View style={styles.category}>
          //                       <Image style={styles.category__image} source={{uri: item.image_url}}/>
          //                       <Text style={styles.category__text}>{item.name}</Text>
          //                   </View>
          //               </TouchableOpacity> 
          //           ))} 
          //           {/* <TouchableOpacity style={styles.categories__col_3}>
          //                   <View style={styles.category}>
          //                       <Image style={styles.category__image} source={TDTU}/>
          //                       <Text style={styles.category__text}>Salad</Text>
          //                   </View>
          //           </TouchableOpacity>  */} 
          //       </View>

          //       <View style={styles.eat__today}>
          //           <Text style={styles.eat__today_title}>Hôm nay ăn gì ?</Text>
          //           <ScrollView
          //           horizontal={true}
          //           >
          //             {products.map((item, index) => (
          //               <TouchableOpacity style={styles.product} key={index} onPress={() => {navigation.navigate("ProductDetail", {product: item})}}>
          //                 <View style={{flex: 2}}>
          //                   <Image source={{uri: item.image_url}} style={styles.product_image}/>
          //                 </View>
          //                 <View style={{flex: 1, paddingLeft: 10, paddingTop: 10}}>
          //                   <Text>{item.name}</Text>
          //                 </View>
          //               </TouchableOpacity>
          //             ))}
          //             {/* <TouchableOpacity style={styles.product} onPress={() => {navigation.navigate("ProductDetail")}}>
          //                 <View style={{flex: 2}}>
          //                   <Image source={TDTU} style={styles.product_image}/>
          //                 </View>
          //                 <View style={{flex: 1, paddingLeft: 10, paddingTop: 10}}>
          //                   <Text>Salad</Text>
          //                 </View>
          //             </TouchableOpacity> */}
          //           </ScrollView>
          //       </View>

          //       <View style={styles.eat__impress}>
          //         <Text style={styles.eat__impress_title}>Quán ăn nổi bật</Text>
          //         <View style={styles.categories__row}>
          //           {foodStores.map((item, index) => (
          //             <TouchableOpacity style={styles.categories__col_12} key={index} onPress={() => {navigation.navigate('FoodStore', {foodStore: item})}}>
          //               <View style={styles.eat__impress__product}>
          //                   <Image style={styles.eat__impress__image} source={{uri: item.image_url}} />
          //                   <View style={styles.eat__impress__text}>
          //                     <Text style={styles.eat__impress__name}>{item.name}</Text>
          //                     <Text style={styles.eat__impress__des}>$$$ Ngon chuẩn Việt</Text>
          //                     <Text style={styles.eat__impress__trans}>Giao hàng trong 17 phút</Text>
          //                     <Text style={styles.eat__impress__trans}>Giảm đến 35K cho đơn hàng</Text>
          //                   </View>
          //               </View>
          //             </TouchableOpacity>
          //           ))}
          //           {/* <TouchableOpacity style={styles.categories__col_12} onPress={() => {navigation.navigate('FoodStore')}}>
          //               <View style={styles.eat__impress__product}>
          //                   <Image style={styles.eat__impress__image} source={TDTU} />
          //                   <View style={styles.eat__impress__text}>
          //                     <Text style={styles.eat__impress__name}>Bún đậu mắm tôm</Text>
          //                     <Text style={styles.eat__impress__des}>$$$ Ngon chuẩn Việt</Text>
          //                     <Text style={styles.eat__impress__trans}>Giao hàng trong 17 phút</Text>
          //                     <Text style={styles.eat__impress__trans}>Giảm đến 35K cho đơn hàng</Text>
          //                   </View>
          //               </View>
          //           </TouchableOpacity> */}
          //         </View>
          //       </View>
          //     </View>
          //   </ScrollView>
          //   ))
          <ScrollView>
              <View style={styles.container}>
                <Image style={styles.image} source={banner}/>
                {user ? <Text>{user.username}</Text> : <Text>Nothing</Text>}
                <View style={styles.categories__row}>
                    {categorys.map((item, index) => (
                        <TouchableOpacity style={styles.categories__col_3} key={index} onPress={() => {navigation.navigate("Category", {categoryName: item.name})}}>
                            <View style={styles.category}>
                                <Image style={styles.category__image} source={{uri: item.image_url}}/>
                                <Text style={styles.category__text}>{item.name}</Text>
                            </View>
                        </TouchableOpacity> 
                    ))} 
                    {/* <TouchableOpacity style={styles.categories__col_3}>
                            <View style={styles.category}>
                                <Image style={styles.category__image} source={TDTU}/>
                                <Text style={styles.category__text}>Salad</Text>
                            </View>
                    </TouchableOpacity>  */} 
                </View>

                <View style={styles.eat__today}>
                    <Text style={styles.eat__today_title}>Hôm nay ăn gì ?</Text>
                    <ScrollView
                    horizontal={true}
                    >
                      {products.map((item, index) => (
                        // <TouchableOpacity style={styles.product} key={index} onPress={() => {navigation.navigate("ProductDetail", {product: item})}}>
                        <TouchableOpacity style={styles.product} key={index} onPress={() => {navigation.push("ProductDetail", { product: item })}}>
                          <View style={{flex: 2}}>
                            <Image source={{uri: item.image_url}} style={styles.product_image}/>
                          </View>
                          <View style={{flex: 1, paddingLeft: 10, paddingTop: 10}}>
                            <Text>{item.name}</Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                      {/* <TouchableOpacity style={styles.product} onPress={() => {navigation.navigate("ProductDetail")}}>
                          <View style={{flex: 2}}>
                            <Image source={TDTU} style={styles.product_image}/>
                          </View>
                          <View style={{flex: 1, paddingLeft: 10, paddingTop: 10}}>
                            <Text>Salad</Text>
                          </View>
                      </TouchableOpacity> */}
                    </ScrollView>
                </View>

                <View style={styles.eat__impress}>
                  <Text style={styles.eat__impress_title}>Quán ăn nổi bật</Text>
                  <View style={styles.categories__row}>
                    {foodStores.map((item, index) => (
                      <TouchableOpacity style={styles.categories__col_12} key={index} onPress={() => {navigation.navigate('FoodStore', {foodStore: item})}}>
                        <View style={styles.eat__impress__product}>
                            <Image style={styles.eat__impress__image} source={{uri: item.image_url}} />
                            <View style={styles.eat__impress__text}>
                              <Text style={styles.eat__impress__name}>{item.name}</Text>
                              <Text style={styles.eat__impress__des}>$$$ Ngon chuẩn Việt</Text>
                              <Text style={styles.eat__impress__trans}>Giao hàng trong 17 phút</Text>
                              <Text style={styles.eat__impress__trans}>Giảm đến 35K cho đơn hàng</Text>
                            </View>
                        </View>
                      </TouchableOpacity>
                    ))}
                    {/* <TouchableOpacity style={styles.categories__col_12} onPress={() => {navigation.navigate('FoodStore')}}>
                        <View style={styles.eat__impress__product}>
                            <Image style={styles.eat__impress__image} source={TDTU} />
                            <View style={styles.eat__impress__text}>
                              <Text style={styles.eat__impress__name}>Bún đậu mắm tôm</Text>
                              <Text style={styles.eat__impress__des}>$$$ Ngon chuẩn Việt</Text>
                              <Text style={styles.eat__impress__trans}>Giao hàng trong 17 phút</Text>
                              <Text style={styles.eat__impress__trans}>Giảm đến 35K cho đơn hàng</Text>
                            </View>
                        </View>
                    </TouchableOpacity> */}
                  </View>
                </View>
              </View>
        </ScrollView>
      )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    backgroundColor: '#fff',
    // minHeight: 1000,
  },
  image: {
    width: '100%',
    height: 300,
  },
  categories__row: {
    //height: 400,
    flex: 1,
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 16,
    flexDirection: 'row',
    marginHorizontal: -4,
    paddingLeft: 8,
  },
  categories__row_horizontal: {
    width: '100%',
    display: 'flex',
    // flex: 1,
    // marginTop: 16,
    flexDirection: 'row',
    marginHorizontal: -4,
  },
  scrollview_horizontal: {
    width: '100%',
  },
  categories__col_3: {
    width: '25%',
    height: 100,
    paddingHorizontal: 4,
    marginBottom: 20,
  },
  categories__col_horizontal:{
    width: '30%',
    height: 100,
    paddingHorizontal: 4,
    marginBottom: 20,
  },
  categories__col_12: {
    width: '100%',
    height: 130,
    paddingHorizontal: 4,
    marginBottom: 20,
  },
  category: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 0},
    borderColor: '#ccc',
    borderWidth: 1,
  },
  eat__impress:{
    height: 1000.
  },
  eat__impress__product: {
    display: 'flex',
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    height: '100%',
    marginTop: 10,
  },
  category__image: {
    width: '100%',
    height: '60%',
  },
  eat__impress__image: {
    width: 84,
    height: 84,
  },
  eat__today: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  eat__today_title:{
    color: '#333',
    fontWeight: '600',
    fontSize: 20,
    marginBottom: 12,
  },
  eat__impress:{
    marginTop: 16,
    paddingHorizontal: 12,
  },
  eat__impress_title:{
    color: '#333',
    fontWeight: '600',
    fontSize: 20,
    marginLeft: 8,
  },
  eat__impress__text: {
    height: '100%',
    marginLeft: 12,
    display: 'flex',
    justifyContent: 'center'
  },
  eat__impress__name: {
    fontSize: 20,
    // fontWeight: 200,
  },
  eat__impress__des: {
    fontSize: 16,
    color: '#ccc'
  },
  eat__impress__trans: {
    fontSize: 17,
    // fontWeight: 10,
  },
  product:{
    height: 130,
    width: 130,
    marginRight: 16,
    borderWidth: 0.5,
    borderColor: '#dddddd',
  },
  product_image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  product__col_12: {
    width: '100%',
    height: 170,
    paddingHorizontal: 4,
    marginVertical: 20,
  },
  product__search: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 0},
    paddingVertical: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12
  },
  product__image_search: {
    // flex: 1,
    // width: null,
    // height: null,
    // resizeMode: 'cover',
    width: 100,
    height: 64,
  },
  product__title: {
      fontSize: 20,
      marginVertical: 16,
      height: 30,
  },
  product__price: {

  },
  product__btn: {
    width: '100%',
    backgroundColor: 'transparent',
    color: 'green',
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 16,
    marginVertical: 16,
    textAlign: 'center',
    paddingVertical: 4,
  },
  comebackHome: {
    textAlign: 'center',
    borderColor: 'blue',
    borderWidth: 1,
    color: 'blue',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 30,
    fontSize: 16,
  },
})
