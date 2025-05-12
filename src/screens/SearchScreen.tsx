import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import{ widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Appbar } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BottomNavBar from '../components/BottomNavBar';

type SearchScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Search'>;
};

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginPress = () => {
    navigation.navigate('Signup');
  };

  const handleSearch = () => {
    // Implement search functionality
    console.log('Searching with:', { keyword, location, propertyType });
    // Navigate to results or filter results on the current screen
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.container}>

          <View style={styles.header}>
          
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#000" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          
        </View>
      
        <View style={{ height: 1, backgroundColor: '#ccc', marginVertical: 10,marginBottom:20 }} />

        {/* Search title */}
        <Text style={styles.title}>SEARCH</Text>
        {/* Keyword search */}
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Keyword Search"
            value={keyword}
            onChangeText={setKeyword}
          />
          <TouchableOpacity style={styles.searchIcon}>
            <Ionicons name="search" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Location dropdown */}
        <TouchableOpacity style={styles.dropdownContainer}>
          <Text style={styles.dropdownText}>
            {location || 'Select location'}
          </Text>
          <MaterialIcons name="keyboard-arrow-down" size={20} color="#000" />
        </TouchableOpacity>

        {/* Property type dropdown */}
        <TouchableOpacity style={styles.dropdownContainer}>
          <Text style={styles.dropdownText}>
            {propertyType || 'Property Type'}
          </Text>
          <MaterialIcons name="keyboard-arrow-down" size={20} color="#000" />
        </TouchableOpacity>

        {/* Search button */}
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>SEARCH</Text>
        </TouchableOpacity>
      </View>
      <BottomNavBar 
        activeScreen="Search" 
        isLoggedIn={isLoggedIn}
        onLoginPress={handleLoginPress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 76,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1.2%'),
    // marginTop: 50,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: 16,
    marginLeft: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 18,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: wp('2.2%'),          // roughly 8 on 360px width
    paddingHorizontal: wp('3.5%'),     // roughly 12 on 360px width
    marginBottom: hp('2%'),            // roughly 16 on 812px height
    height: hp('6%'),
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontWeight: 'bold',
    fontSize: 16,
  },
  searchIcon: {
    padding: 8,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    borderRadius: wp('2.2%'),           // ~8 on 360 width
    paddingHorizontal: wp('3.5%'),      // ~12 on 360 width
    paddingVertical: hp('2%'),          // ~16 on 812 height
    marginBottom: hp('2%'),             // ~16 on 812 height
    height: hp('6%'),
  },
  dropdownText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  searchButton: {
    backgroundColor: '#8D9533',
    borderRadius: 4,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SearchScreen;

