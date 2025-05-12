import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import BottomNavBar from '../components/BottomNavBar';
import { useFavorites } from '../context/FavoritesContext';
import { Property } from '../types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';

type FavoritesScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Favorites'>;
};

const PropertyItem: React.FC<{ 
  item: Property; 
  onPress: () => void;
  onDelete: () => void;
}> = ({ item, onPress, onDelete }) => (
  <TouchableOpacity style={styles.propertyCard} onPress={onPress}>
    <Image source={item.imageUrl} style={styles.propertyImage} />
    
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={(e) => {
        e.stopPropagation();
        onDelete();
      }}
    >
      <Ionicons name="trash-outline" size={24} color="#FF3B30" />
    </TouchableOpacity>

    <View style={styles.tagsContainer}>
      {item.tags.map((tag, index) => (
        <View key={index} style={styles.tag}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      ))}
    </View>
    <View style={styles.infoContainer}>
      <Text style={styles.propertyTitle} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.propertyPrice}>{item.price}</Text>
    </View>
  </TouchableOpacity>
);

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { favorites, removeFromFavorites } = useFavorites();

  const handleLoginPress = () => {
    navigation.navigate('Signup');
  };

  const handlePropertyPress = (property: Property) => {
    navigation.navigate('PropertyDetail', { property });
  };

  const handleDelete = (property: Property) => {
    Alert.alert(
      'Remove from Favorites',
      'Are you sure you want to remove this property from your favorites?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => removeFromFavorites(property.id),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Favorites</Text>
        </View>
        
        {favorites.length > 0 ? (
          <FlatList
            data={favorites}
            renderItem={({ item }) => (
              <PropertyItem
                item={item}
                onPress={() => handlePropertyPress(item)}
                onDelete={() => handleDelete(item)}
              />
            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <View style={styles.content}>
            <Text style={styles.placeholderText}>Your favorite properties will appear here</Text>
          </View>
        )}
      </View>
      <BottomNavBar 
        activeScreen="Favorites" 
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
    padding: hp('2%'),              // ~16 on standard ~812px height
    paddingBottom: hp('9.4%'),
  },
  header: {
    marginBottom: 20,
    // marginTop: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  listContainer: {
    padding: 8,
  },
  propertyCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#EEF0D5',
    borderRadius: 6,
    overflow: 'hidden',
    maxWidth: '46%',
  },
  propertyImage: {
    width: '100%',
    height: 190,
    resizeMode: 'cover',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  tagsContainer: {
    position: 'absolute',
    bottom: 73,
    left: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  tag: {
    backgroundColor: '#8D9533',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginBottom: 4,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 10,
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#6B7932',
  },
  propertyPrice: {
    fontSize: 13,
    color: '#252B5C',
  },
});

export default FavoritesScreen;