import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Share,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Property } from './PropertyListingScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

type PropertyDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'PropertyDetail'>;

const PropertyDetailScreen: React.FC<PropertyDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const { property } = route.params;
  const [isFavorite, setIsFavorite] = useState(property.isFavorite);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${property.title} - ${property.price}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Product Detail</Text>
          <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
            <Text style={styles.shareButtonText}>Brochure ↓</Text>
          </TouchableOpacity>
        </View>

        {/* Property Image */}
        <View style={styles.imageContainer}>
          <Image source={property.imageUrl} style={styles.propertyImage} />
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={toggleFavorite}
          >
            {isFavorite ? (
              <FontAwesome name="heart" size={22} style={styles.favoriteIcon} />
            ) : (
              <FontAwesome name="heart-o" size={22} style={styles.favoriteIcon} />
            )}
          </TouchableOpacity>
          <View style={styles.propertyLogo}>
            <Text style={styles.logoText}>ATS</Text>
          </View>
          <View style={styles.tagsContainer}>
            {property.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Property Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.propertyTitle}>{property.title}</Text>
          <Text style={styles.propertyPrice}>{property.price}</Text>

          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Project Type</Text>
              <Text style={styles.infoValue}>Apartment</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Status</Text>
              <Text style={styles.infoValue}>New Launch</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Possession Date</Text>
              <Text style={styles.infoValue}>31-08-2029</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Location</Text>
              <TouchableOpacity style={styles.locationButton}>
                <Text style={styles.locationIcon}>📍</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Project Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Project Description</Text>
            <Text style={styles.descriptionText}>
              Lorem ipsum dolor sit amet consectetur. Viverra mattis egestas ac elit lorem pulvinar posuere nullam aliquet. Sollicitudin felis id sit.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // paddingHorizontal: 30,
    // paddingVertical: 15,
    marginTop:35,
    marginBottom:7,
    marginRight:50,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#333',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  shareButton: {
    backgroundColor: '#8B9A46',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  imageContainer: {
    position: 'relative',
  },
  propertyImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    fontSize: 24,
    color: '#E53E3E',
  },
  propertyLogo: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 8,
    borderRadius: 4,
  },
  logoText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tagsContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    flexDirection: 'row',
  },
  tag: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  detailsContainer: {
    padding: 16,
  },
  propertyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  propertyPrice: {
    fontSize: 20,
    color: '#666',
    marginBottom: 24,
  },
  infoSection: {
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  locationButton: {
    padding: 4,
  },
  locationIcon: {
    fontSize: 20,
  },
  descriptionSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
});

export default PropertyDetailScreen; 
