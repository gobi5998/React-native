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
};

const PropertyItem: React.FC<PropertyItemProps> = ({ item, onPress }) => {
  const [isFav, setIsFav] = React.useState(item.isFavorite);

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <Image source={item.imageUrl} style={styles.itemImage} />
      {/* Favorite Button */}
      <TouchableOpacity 
        style={styles.favButton} 
        onPress={(e) => {
          e.stopPropagation();
          setIsFav(!isFav);
        }}
      >
        <Text style={styles.favIcon}>{isFav ? '♥' : '♡'}</Text>
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
  const [refreshing, setRefreshing] = useState(false);

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Featured Properties</Text>
        </View>
        
        <View style={styles.flatListContainer}>
          <FlatList
            data={PROPERTIES_DATA}
            renderItem={({ item }) => (
              <PropertyItem 
                item={item} 
                onPress={() => handlePropertyPress(item)}
              />
            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  header: {
    marginBottom:10,
    marginTop:40,
    marginLeft:10,
    // paddingHorizontal:45,
    // paddingVertical:35,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    // marginLeft: 5,
  },
  flatListContainer: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 10, // Add horizontal padding for spacing between columns
    paddingVertical: 10,
  },
  itemContainer: {
    flex: 1, // Take up equal space in the column
    margin: 8, // Add margin around each item
    borderRadius: 8,
    backgroundColor: '#F5F5F5', // Light background for item card
    overflow: 'hidden', // Clip image border radius
    maxWidth: '46%', // Ensure 2 columns fit with margin
  },
  itemImage: {
    width: '100%',
    height: 150, // Adjust height as needed
  },
  favButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favIcon: {
    fontSize: 18,
    color: '#E53E3E', // Red color for favorite
  },
  itemLogo: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 50,
    height: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent background
    borderRadius: 4,
  },
  tagsContainer: {
    position: 'absolute',
    bottom: 65, // Position above the info container
    left: 10,
    flexDirection: 'row',
  },
  tag: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
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
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 13,
    color: '#555',
  },
});

export default PropertyListingScreen; 