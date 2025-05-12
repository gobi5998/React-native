import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootStackParamList } from '../../App';
import { widthPercentageToDP as wp ,heightPercentageToDP as hp } from 'react-native-responsive-screen';

type BottomNavBarProps = {
  activeScreen: 'Home' | 'PropertyList' | 'Search' | 'Favorites' | 'Profile';
  isLoggedIn?: boolean;
  onLoginPress?: () => void;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const BottomNavBar: React.FC<BottomNavBarProps> = ({ 
  activeScreen, 
  isLoggedIn = false,
  onLoginPress
}) => {
  const navigation = useNavigation<NavigationProp>();

  const handleNavigation = (screenName: 'Home' | 'PropertyList' | 'Search' | 'Favorites' | 'Profile') => {
    // console.log("rprprprp")
    // if ((screenName === 'Favorites' || screenName === 'Profile')) {
    //   if (onLoginPress) {
    //     onLoginPress();
    //   }
    //   return;
    // }
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.navItem, activeScreen === 'Home' && styles.activeNavItem]} 
        onPress={() => handleNavigation('Home')}
      >
        <Ionicons 
          name={activeScreen === 'Home' ? 'home' : 'home-outline'} 
          size={24} 
          color={activeScreen === 'Home' ? '#8D9533' : '#666666'} 
        />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.navItem, activeScreen === 'Search' && styles.activeNavItem]} 
        onPress={() => handleNavigation('Search')}
      >
        <Ionicons 
          name={activeScreen === 'Search' ? 'search' : 'search-outline'} 
          size={24} 
          color={activeScreen === 'Search' ? '#8D9533' : '#666666'} 
        />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.navItem, activeScreen === 'PropertyList' && styles.activeNavItem]} 
        onPress={() => handleNavigation('PropertyList')}
      >
        <MaterialCommunityIcons 
          name={activeScreen === 'PropertyList' ? 'view-grid' : 'view-grid-outline'} 
          size={24} 
          color={activeScreen === 'PropertyList' ? '#8D9533' : '#666666'} 
        />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.navItem, activeScreen === 'Favorites' && styles.activeNavItem]} 
        onPress={() => handleNavigation('Favorites')}
      >
        <MaterialCommunityIcons 
          name={activeScreen === 'Favorites' ? 'heart' : 'heart-outline'} 
          size={24} 
          color={activeScreen === 'Favorites' ? '#8D9533' : '#666666'} 
        />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.navItem, activeScreen === 'Profile' && styles.activeNavItem]} 
        onPress={() => handleNavigation('Profile')}
      >
        <Ionicons 
          name={activeScreen === 'Profile' ? 'person' : 'person-outline'} 
          size={24} 
          color={activeScreen === 'Profile' ? '#8D9533' : '#666666'} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: hp('7%'),
    width: wp('100%'),
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeNavItem: {
    borderTopWidth: 2,
    borderTopColor: '#8D9533',
  },
});

export default BottomNavBar;


