import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import BottomNavBar from '../components/BottomNavBar';
import Ionicons from 'react-native-vector-icons/Ionicons';

type ProfileScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Profile'>;
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginPress = () => {
    navigation.navigate('Signup');
  };

  const menuItems = [
    {
      title: 'My Profile',
      icon: 'person-outline',
      onPress: () => {},
    },
    {
      title: 'My Properties',
      icon: 'home-outline',
      onPress: () => {},
    },
   
    {
      title: 'FAQs',
      icon: 'help-circle-outline',
      onPress: () => navigation.navigate('FAQ'),
    },
    {
      title: 'Settings',
      icon: 'settings-outline',
      onPress: () => {},
    },
    {
      title: 'Logout',
      icon: 'log-out-outline',
      onPress: () => {},
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity 
            style={styles.faqButton}
            onPress={() => navigation.navigate('FAQ')}
          >
            <Ionicons name="help-circle-outline" size={24} color="#8D9533" />
            <Text style={styles.faqButtonText}>FAQ</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                <Ionicons name={item.icon} size={24} color="#333" />
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#333" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <BottomNavBar 
        activeScreen="Profile" 
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
    paddingBottom: 76,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  faqButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  faqButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8D9533',
    marginLeft: 4,
  },
  menuContainer: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
});

export default ProfileScreen;