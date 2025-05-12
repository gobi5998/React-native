import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import BottomNavBar from '../components/BottomNavBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFavorites } from '../context/FavoritesContext';
import { Property } from '../types';
import{ widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const PROPERTIES_DATA: Property[] = [
  {
    id: '1',
    title: 'Godrej Prima, Okhla...',
    location: 'Okhla',
    price: '₹ 3.59 Cr. onwards',
    tags: ['Flats', 'New'],
    imageUrl: require('../../assets/image/flat.png'),
    isFavorite: false,
    developer: 'Godrej',
  },
  {
    id: '2',
    title: 'Godrej River Royale',
    location: 'Noida',
    price: '₹ 2.2 Cr* Onwards',
    tags: ['Flats', 'New'],
    imageUrl: require('../../assets/image/flat.png'),
    isFavorite: true,
    developer: 'Godrej',
  },
  {
    id: '3',
    title: 'Godrej Prima, Okhla...',
    location: 'Okhla',
    price: '₹ 3.59 Cr. onwards',
    tags: ['Flats', 'New'],
    imageUrl: require('../../assets/image/flat.png'),
    isFavorite: false,
    developer: 'Godrej',
  },
  {
    id: '4',
    title: 'Godrej River Royale',
    location: 'Noida',
    price: '₹ 2.2 Cr* Onwards',
    tags: ['Flats', 'New'],
    imageUrl: require('../../assets/image/flat.png'),
    isFavorite: true,
    developer: 'Godrej',
  },
  {
    id: '5',
    title: 'Godrej Prima, Okhla...',
    location: 'Okhla',
    price: '₹ 3.59 Cr. onwards',
    tags: ['Flats', 'New'],
    imageUrl: require('../../assets/image/flat.png'),
    isFavorite: false,
    developer: 'Godrej',
  },
  {
    id: '6',
    title: 'Godrej River Royale',
    location: 'Noida',
    price: '₹ 2.2 Cr* Onwards',
    tags: ['Flats', 'New'],
    imageUrl: require('../../assets/image/flat.png'),
    isFavorite: true,
    developer: 'Godrej',
  },
 
];

type PropertyItemProps = {
  item: Property;
  onPress: () => void;
  onToggleFavorite: (id: string) => void;
};

const PropertyItem: React.FC<PropertyItemProps> = ({ item, onPress, onToggleFavorite }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const isItemFavorite = isFavorite(item.id);

  const handleToggleFavorite = (e: any) => {
    e.stopPropagation();
    if (isItemFavorite) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item);
    }
    onToggleFavorite(item.id);
  };

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <Image source={item.imageUrl} style={styles.itemImage} />

      <TouchableOpacity
        style={styles.favButton}
        onPress={handleToggleFavorite}
      >
        <Ionicons 
          name={isItemFavorite ? "heart" : "heart-outline"} 
          size={24} 
          color={isItemFavorite ? "#8D9533" : "#E3E3E3"} 
        />
      </TouchableOpacity>

      <View style={styles.tagsContainer}>
        {item.tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

type PropertyListingScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'PropertyList'>;
};

const PropertyListingScreen: React.FC<PropertyListingScreenProps> = ({ navigation }) => {
  const [properties, setProperties] = useState<Property[]>(PROPERTIES_DATA);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isFavorite } = useFavorites();

  const handleLoginPress = () => {
    navigation.navigate('Signup');
  };

  const handlePropertyPress = (property: Property) => {
    navigation.navigate('PropertyDetail', { property });
  };

  const handleToggleFavorite = (id: string) => {
    setProperties(prev =>
      prev.map(p =>
        p.id === id ? { ...p, isFavorite: isFavorite(id) } : p
      )
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={20} color="#333" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={properties}
          renderItem={({ item }) => (
            <PropertyItem
              item={item}
              onPress={() => handlePropertyPress(item)}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
        />
      </View>
      <BottomNavBar 
        activeScreen="PropertyList" 
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
  },
  header: {
    padding: hp('2%'),
    // paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 5,
  },
  listContainer: {
    padding: 8,
    paddingBottom: 76,
  },
  itemContainer: {
    flex: 1,
    margin: 8,
    backgroundColor: '#EEF0D5',
    // borderRadius: 6,
    overflow: 'hidden',
    maxWidth: '50%',
  },
  itemImage: {
    width: '100%',
    height: 190,
    resizeMode: 'cover',
    // borderTopLeftRadius: 6,
    // borderTopRightRadius: 6,
  },
  favButton: {
    position: 'absolute',
    top: hp('1.2%'),         
    right: wp('2.8%'),       
    borderRadius: wp('4.2%'), 
    width: wp('8.3%'),        
    height: hp('3.7%'),  
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagsContainer: {
    position: 'absolute',
    bottom: hp('9%'), 
    left: wp('2.5%'),  
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  tag: {
    backgroundColor: '#8D9533',
    borderRadius: wp('3.3%'),       
    paddingVertical: hp('0.5%'),    
    paddingHorizontal: wp('2.8%'),  
    marginBottom: hp('0.5%'),
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#6B7932',
  },
  itemPrice: {
    fontSize: 13,
    color: '#252B5C',
  },
});

export default PropertyListingScreen;
