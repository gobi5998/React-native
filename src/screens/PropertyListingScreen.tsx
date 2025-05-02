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
  ScrollView,
  RefreshControl,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import BottomNavBar from '../components/BottomNavBar';
// Import a different icon set
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Export the Property interface
export interface Property {
  id: string;
  title: string;
  price: string;
  tags: string[];
  imageUrl: ReturnType<typeof require>;
  isFavorite: boolean;
}

// Placeholder data - Replace with your actual data source
const PROPERTIES_DATA: Property[] = [
  {
    id: '1',
    title: 'Godrej Prima, Okhla...',
    price: '₹ 3.59 Cr. onwards',
    tags: ['Flats', 'New'],
    imageUrl: require('../../assets/image/flat.png'),
    isFavorite: false,
  },
  {
    id: '2',
    title: 'Godrej River Royale',
    price: '₹ 2.2 Cr* Onwards',
    tags: ['Flats', 'New'],
    imageUrl: require('../../assets/image/flat.png'),
    isFavorite: true,
  },
  {
    id: '3',
    title: 'Godrej Park World',
    price: '₹ 71 Lacs* Onwards',
    tags: ['Flats', 'New'],
    imageUrl: require('../../assets/image/flat.png'),
    isFavorite: true,
  },
   {
    id: '4',
    title: 'Godrej Hillside 3',
    price: '₹ 73.50 Lacs* Onwards',
    tags: ['Flats', 'New'],
    imageUrl: require('../../assets/image/flat.png'),
    isFavorite: false,
  },
   {
    id: '5',
    title: 'Godrej Greenfront',
    price: '₹ 1.14 Cr* Onwards',
    tags: ['Flats', 'New'],
    imageUrl: require('../../assets/image/flat.png'),
    isFavorite: true,
  },
   {
    id: '6',
    title: 'Godrej Evergreen...',
    price: '₹ 45 Lacs* Onwards',
    tags: ['Flats', 'New'],
    imageUrl: require('../../assets/image/flat.png'), // Reused flat.png, replace if needed
    isFavorite: true,
  },
  {
    id: '7',
    title: 'Godrej New thing...',
    price: '₹ 50 Lacs* Onwards',
    tags: ['Flats', 'New'],
    imageUrl: require('../../assets/image/flat.png'), // Reused flat.png, replace if needed
    isFavorite: true,
  },
  {
    id: '8',
    title: 'Godrej Newworld...',
    price: '₹ 55 Lacs* Onwards',
    tags: ['Flats', 'New'],
    imageUrl: require('../../assets/image/flat.png'), // Reused flat.png, replace if needed
    isFavorite: true,
  },
  {
    id: '9',
    title: 'Godrej Everthing...',
    price: '₹ 80 Lacs* Onwards',
    tags: ['Flats', 'New'],
    imageUrl: require('../../assets/image/flat.png'), // Reused flat.png, replace if needed
    isFavorite: true,
  },
  {
    id: '10',
    title: 'Godrej Nothing...',
    price: '₹ 34 Lacs* Onwards',
    tags: ['Flats', 'New'],
    imageUrl: require('../../assets/image/flat.png'), // Reused flat.png, replace if needed
    isFavorite: true,
  },
  // Add more property objects here
];

// Update PropertyItemProps to include navigation
type PropertyItemProps = {
  item: Property;
  onPress: () => void;
  onToggleFavorite: (id: string) => void;
};

const PropertyItem: React.FC<PropertyItemProps> = ({ item, onPress, onToggleFavorite }) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <Image source={item.imageUrl} style={styles.itemImage} />
      
      {/* Use MaterialCommunityIcons instead */}
      <TouchableOpacity 
        style={styles.favButton} 
        onPress={(e) => {
          e.stopPropagation();
          onToggleFavorite(item.id);
        }}
      >
        {item.isFavorite ? (
          <MaterialCommunityIcons name="heart" size={18} color="#E74C3C" />
        ) : (
          <MaterialCommunityIcons name="heart-outline" size={18} color="#666666" />
        )}
      </TouchableOpacity>
      
      {/* Tags */}
      <View style={styles.tagsContainer}>
        {item.tags.map((tag: string, index: number) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
      
      {/* Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

type PropertyListingScreenProps = NativeStackScreenProps<RootStackParamList, 'PropertyList'>;

const PropertyListingScreen: React.FC<PropertyListingScreenProps> = ({ navigation }) => {
  console.log('Rendering PropertyListingScreen');
  const [refreshing, setRefreshing] = useState(false);
  const [properties, setProperties] = useState<Property[]>(PROPERTIES_DATA);

  console.log('Properties data:', properties);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Add your refresh logic here
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handlePropertyPress = (property: Property) => {
    navigation.navigate('PropertyDetail', { property });
  };

  const handleToggleFavorite = (id: string) => {
    console.log('Toggle favorite for property ID:', id);
    setProperties(prevProperties => 
      prevProperties.map(property => 
        property.id === id 
          ? { ...property, isFavorite: !property.isFavorite } 
          : property
      )
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.header}>
         <TouchableOpacity
                     onPress={() => navigation.goBack()}
                     style={styles.backButton}
                   >
                     <Text style={styles.backButtonText}> ← Back</Text>
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
      <BottomNavBar activeScreen="PropertyList" />
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  listContainer: {
    padding: 8,
  },
  itemContainer: {
    flex: 1,
    margin: 8,
    backgroundColor: '#EEF0D5',
    overflow: 'hidden',
    maxWidth: '46%',
  },
  itemImage: {
    width: '100%',
    height: 190,
  },
  favButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    // borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  tagsContainer: {
    position: 'absolute',
    bottom: 65,
    left: 10,
    flexDirection: 'row',
  },
  tag: {
    backgroundColor: '#8D9533',
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginRight: 5,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#6B7932'
  },
  itemPrice: {
    fontSize: 13,
    color: '#252B5C',
  },
  
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#333',
  },
});

export default PropertyListingScreen; 
