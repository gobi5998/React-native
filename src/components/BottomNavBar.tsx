import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type BottomNavBarProps = {
  activeScreen: string;
};

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeScreen }) => {
  const navigation = useNavigation();

  const navigateTo = (screenName: string) => {
    if (screenName === activeScreen) return;
    // @ts-ignore
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.navItem, activeScreen === 'PropertyList' && styles.activeNavItem]}
        onPress={() => navigateTo('PropertyList')}
      >
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.navItem, activeScreen === 'Search' && styles.activeNavItem]}
        onPress={() => navigateTo('SearchScreen')}
      >
        <Text style={styles.navText}>Search</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.navItem, activeScreen === 'Profile' && styles.activeNavItem]}
        onPress={() => navigateTo('Profile')}
      >
        <Text style={styles.navText}>Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeNavItem: {
    borderTopWidth: 2,
    borderTopColor: '#8B9A46',
  },
  navText: {
    fontSize: 14,
    color: '#666666',
  },
});

export default BottomNavBar;


