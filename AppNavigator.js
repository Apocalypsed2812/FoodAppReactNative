import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Category from './screens/Category';
import Cart from './screens/Cart';
import Orders from './screens/Orders';
import Settings from './screens/Settings';
import Login from './screens/Login';
import Register from './screens/Register';
import ChangePassword from './screens/ChangePassword';
import FoodStore from './screens/FoodStore';
import ProductDetail from './screens/ProductDetail';
import Home from './screens/Home';

const color = { ACTIVE: '#147efb', INACTIVE: '#ccc' };

// ===== STACKS =====
const Stack = createNativeStackNavigator();

function CategoryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="FoodStore" component={FoodStore} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="Category" component={Category} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
}

function CartStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  );
}

function OrderStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Orders" component={Orders} />
    </Stack.Navigator>
  );
}

function SettingStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}

// ===== TAB NAVIGATOR =====
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, size }) => {
          let iconName;
          if (route.name === 'CategoryTab') iconName = 'home';
          else if (route.name === 'CartTab') iconName = 'cart';
          else if (route.name === 'OrderTab') iconName = 'wallet';
          else if (route.name === 'SettingTab') iconName = 'settings';
          return (
            <Ionicons
              name={iconName}
              size={size}
              color={focused ? color.ACTIVE : color.INACTIVE}
            />
          );
        },
        tabBarActiveTintColor: color.ACTIVE,
        tabBarInactiveTintColor: color.INACTIVE,
      })}
    >
      <Tab.Screen name="CategoryTab" component={CategoryStack} options={{ title: 'Home' }} />
      <Tab.Screen name="CartTab" component={CartStack} options={{ title: 'Cart' }} />
      <Tab.Screen name="OrderTab" component={OrderStack} options={{ title: 'Orders' }} />
      <Tab.Screen name="SettingTab" component={SettingStack} options={{ title: 'Settings' }} />
    </Tab.Navigator>
  );
}

// ===== ROOT STACK =====
const RootStack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="MainTabs" component={MainTabs} />
        <RootStack.Screen name="Login" component={Login} />
        <RootStack.Screen name="Register" component={Register} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
