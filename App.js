import React from 'react';
import 'react-native-gesture-handler';
import { DataProvider } from './context/GlobalState';
import RootNavigator from './AppNavigator'; // đã bao gồm NavigationContainer

export default function App() {
  return (
    <DataProvider>
      <RootNavigator />
    </DataProvider>
  );
}
