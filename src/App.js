/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Route from './routes';

const App = () => {
  return (
    <NavigationContainer>
      <Route/>
    </NavigationContainer>
  );
}

export default App;
