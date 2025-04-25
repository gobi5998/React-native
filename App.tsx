// This MUST be the first import
import 'react-native-gesture-handler';

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native';

// Import navigation components
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
// Import screens
import SignupScreen from './src/screens/SignupScreen';
import PropertyListingScreen from './src/screens/PropertyListingScreen';
import PropertyDetailScreen from './src/screens/PropertyDetailScreen';
import { Property } from './src/screens/PropertyListingScreen';

// Define the stack parameter list for type checking
export type RootStackParamList = {
  Signup: undefined; // No parameters expected for Signup route
  PropertyList: undefined; // No parameters expected for PropertyList route
  PropertyDetail: {
    property: Property;
  };
};

// Create the stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    // Wrap the entire app in NavigationContainer
    <NavigationContainer>
      {/* SafeAreaView might be needed per-screen now, or configure headers */}
      {/* <SafeAreaView style={styles.safeArea}> */}
        <StatusBar barStyle={'dark-content'} />
        {/* Define the stack navigator */}
        <Stack.Navigator initialRouteName="Signup" screenOptions={{ headerShown: false }}>
          {/* Define screens in the stack */}
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="PropertyList" component={PropertyListingScreen} />
          <Stack.Screen name="PropertyDetail" component={PropertyDetailScreen} />
        </Stack.Navigator>
      {/* </SafeAreaView> */}
    </NavigationContainer>
  );
}

// Styles might not be needed here anymore if handled per-screen
const styles = StyleSheet.create({
  // safeArea: {
  //   flex: 1,
  //   backgroundColor: '#F4F4F4',
  // },
});

export default App;
