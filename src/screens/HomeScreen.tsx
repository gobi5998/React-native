import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { Appbar } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import BottomNavBar from '../components/BottomNavBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Property } from '../types';
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [justLaunchedProperties, setJustLaunchedProperties] = useState<Property[]>([
    {
      id: '1',
      title: 'ATS Kingston Heath, Noida',
      location: 'Noida',
      price: '₹ 3.59 Cr. onwards',
      imageUrl: require('../../assets/image/flat.png'),
      tags: ['Flats', 'Just Launched'],
      developer: 'ATS',
      isFavorite: false,
    },
    {
      id: '2',
      title: 'Godrej Woods, Noida',
      location: 'Noida',
      price: '₹ 3.2 Cr. onwards',
      imageUrl: require('../../assets/image/flat.png'),
      tags: ['Flats', 'Ready to Move'],
      developer: 'Godrej',
      isFavorite: true,
    },
  ]);

  const [offerProperties, setOfferProperties] = useState<Property[]>([
    {
      id: '3',
      title: 'Limited-Edition Villas at Godrej Noida',
      location: 'Noida',
      price: '₹ 4.5 Cr. onwards',
      imageUrl: require('../../assets/image/flat.png'),
      tags: ['Villas', 'Limited Edition'],
      developer: 'Godrej',
      isFavorite: false,
    },
    {
      id: '4',
      title: 'Luxury Apartments with great views',
      location: 'Gurgaon',
      price: '₹ 2.7 Cr. onwards',
      imageUrl: require('../../assets/image/flat.png'),
      tags: ['Apartments', 'Luxury'],
      developer: 'DLF',
      isFavorite: false,
    },
  ]);

  const handlePropertyPress = (property: Property) => {
    navigation.navigate('PropertyDetail', { property });
  };

  const handleToggleFavorite = (id: string) => {
    if (!isLoggedIn) {
      handleLoginPress();
      return;
    }
    
    // Toggle favorite status for Just Launched properties
    setJustLaunchedProperties(prevProperties => 
      prevProperties.map(property => 
        property.id === id 
          ? { ...property, isFavorite: !property.isFavorite } 
          : property
      )
    );
    
    // Toggle favorite status for Offer properties
    setOfferProperties(prevProperties => 
      prevProperties.map(property => 
        property.id === id 
          ? { ...property, isFavorite: !property.isFavorite } 
          : property
      )
    );
  };

  const handleLoginPress = () => {
    navigation.navigate('Signup');
  };

  const handleViewAllProperties = () => {
    navigation.navigate('PropertyList');
  };

  const renderPropertyCard = (item: Property) => (
    <TouchableOpacity 
      style={styles.propertyCard}
      onPress={() => handlePropertyPress(item)}
    >
      <View style={styles.imageContainer}>
        <Image source={item.imageUrl} style={styles.propertyImage} />
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => handleToggleFavorite(item.id)}
        >
          <FontAwesome 
            name={item.isFavorite ? "heart" : "heart-o"} 
            size={20} 
            color={item.isFavorite ? "#E74C3C" : "#FFFFFF"} 
          />


        {/* <Image 
           source={
           item.isFavorite
           ? require('../../assets/image/Heart.png')  
           : require('../../assets/image/heart_2.png')
            }
          //  style={{ width: 18, height: 18 }}
            /> */}
        </TouchableOpacity>
        
        {item.developer && (
          <View style={styles.developerLogo}>
            <Text style={styles.developerText}>{item.developer}</Text>
          </View>
        )}
        
        <View style={styles.tagsContainer}>
          {item.tags.map((tag) => (
            <View 
              key={`${item.id}-${tag}-${tag.replace(/\s+/g, '-').toLowerCase()}`}
              style={styles.tag}
            >
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.propertyTitle}>{item.title}</Text>
        <Text style={styles.propertyPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderOfferCard = (item: Property) => (
    <TouchableOpacity 
      key={item.id}
      style={styles.offerCard}
      onPress={() => handlePropertyPress(item)}
    >
      <Image source={item.imageUrl} style={styles.offerImage} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      
     
      <View style={styles.header}>
          <View style={styles.logoContainer}>
          <Image 
               source={require('../../assets/image/HomePage_logo.png')} 
               style={styles.logoImage} 
                 resizeMode="contain"
                  />
           </View>
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
     
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Just Launched</Text>
            <TouchableOpacity onPress={handleViewAllProperties}>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={justLaunchedProperties}
            renderItem={({ item }) => renderPropertyCard(item)}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalListContainer}
          />

          {/* Offers Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Offer for Customer</Text>
            <TouchableOpacity onPress={handleViewAllProperties}>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.offerContainer}>
            {offerProperties.map((item) => renderOfferCard(item))}
          </View>

          {/* Flexi Payment Plan Banner */}
          <View style={styles.flexiBanner}>
            <Text style={styles.flexiTitle}>FLEXI PAYMENT PLAN*</Text>
            <Text style={styles.flexiSubtitle}>starting from ₹7 Crore*</Text>
          </View>
        </View>
      </ScrollView>
      <BottomNavBar 
        activeScreen="Home" 
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
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    // marginTop:40,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // logoText: {
  //   backgroundColor: '#8D9533',
  //   color: '#FFFFFF',
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   width: 30,
  //   height: 30,
  //   textAlign: 'center',
  //   lineHeight: 30,
  //   borderRadius: 4,
  //   marginRight: 8,
  // },
  logoTextContainer: {
    flexDirection: 'column',
  },
  logoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8D9533',
  },
  logoSubtitle: {
    fontSize: 10,
    color: '#8D9533',
  },
  logoImage: {
    width: wp('52.78%'),  // ~190px
    height: hp('7.39%'),
  },  
  notificationButton: {
    padding: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllText: {
    fontSize: 14,
    color: '#8D9533',
  },
  horizontalListContainer: {
    paddingBottom: 16,
  },
  propertyCard: {
    width: 250,
    marginRight: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  imageContainer: {
    position: 'relative',
    height: 180,
  },
  propertyImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    // backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  developerLogo: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 4,
    padding: 4,
  },
  developerText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  tagsContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    flexDirection: 'row',
  },
  tag: {
    backgroundColor: 'rgba(141, 149, 51, 0.8)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 6,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  infoContainer: {
    padding: 12,
    backgroundColor: '#E6F2F2',
  },
  propertyTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  propertyPrice: {
    fontSize: 14,
    color: '#333',
  },
  offerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  offerCard: {
    width: '48%',
    height: 120,
    borderRadius: 8,
    overflow: 'hidden',
  },
  offerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  flexiBanner: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#8D9533',
  },
  flexiTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  flexiSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default HomeScreen;
