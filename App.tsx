import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {FavoritesProvider} from './src/context/FavoritesContext';

// Import screens
import SplashScreen from './src/screens/SplashScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import PropertyListingScreen from './src/screens/PropertyListingScreen';
import PropertyDetailScreen from './src/screens/PropertyDetailScreen';
import SearchScreen from './src/screens/SearchScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import FAQScreen from './src/screens/FAQScreen';
import MyStatusBar from './src/components/Mystatusbar';
import { Property } from './src/types';

// Define the stack parameter list
export type RootStackParamList = {
  Splash: undefined;
  Signup: undefined;
  Home: undefined;
  PropertyList: undefined;
  PropertyDetail: {
    property: Property;
  };
  Search: undefined;
  Profile: undefined;
  Favorites: undefined;
  FAQ: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <FavoritesProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <MyStatusBar backgroundColor='white'/>
          <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="PropertyList" component={PropertyListingScreen} />
            <Stack.Screen name="PropertyDetail" component={PropertyDetailScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Favorites" component={FavoritesScreen} />
            <Stack.Screen name="FAQ" component={FAQScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </FavoritesProvider>
  );
};

export default App;




9364250480-3400