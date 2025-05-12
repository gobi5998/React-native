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
  Linking,
  FlatList
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
// import { Property } from './PropertyListingScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';

type PropertyDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'PropertyDetail'>;

const PropertyDetailScreen: React.FC<PropertyDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const handleCall = () => {
  Linking.openURL(`tel:${phoneNumber}`);
  };
  const amenities = [
    { name: 'Swimming Pool', icon:'water'},
  { name:'Clubhouse', icon:'home-outline'},
  { name:'Badminton Court', icon: 'fitness-outline' },
  { name:'Cricket Net', icon: 'american-football-outline' },
  { name:'Guest Room', icon: 'bed-outline' },
  { name:'Party Hall', icon: 'wine-outline' },
 
];
  const phoneNumber = '+919876543210';
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
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="chevron-back" size={20} color="#222" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Product Detail</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.brochureButton}>
              <Text style={styles.brochureText}>Brochure</Text>
              <Ionicons name="download-outline" size={16} color="#fff" style={{ marginLeft: 5 }} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <Ionicons name="share-social-outline" size={20} color="#222" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 1, backgroundColor: '#ccc', marginVertical: 10,marginBottom:15 }} />
        <View style={styles.imageContainer}>
          <Image source={property.imageUrl} style={styles.propertyImage} />
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={toggleFavorite}
          >
            <Image 
                      source={
                     isFavorite
                      ? require('../../assets/image/Heart.png')   // Your filled heart image
                      : require('../../assets/image/heart_2.png')  // Your outline heart image
               }
              //  style={{ width: 18, height: 18 }}
             />
          </TouchableOpacity>
          <View style={styles.propertyLogo}>
            <Text style={styles.logoText}>ATS</Text>
          </View>
          <View style={styles.tagsContainer}>
            {/* {property.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))} */}
          </View>
        </View>

        {/* Property Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.propertyTitle}>{property.title}</Text>
          <Text style={styles.propertyPrice}>{property.price}</Text>

          {/* <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Project Type</Text>
              <Text style={styles.infoValue}>Apartment</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Status</Text>
              <Text style={styles.infoValue}>New Launch</Text>
            </View>

            </View>
            <View style={styles.infoSection}>         
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Possession Date</Text>
              <Text style={styles.infoValue}>31-08-2029</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Location</Text>
              <TouchableOpacity style={styles.locationButton}>
              <Ionicons name="location-outline" size={20} color="#000" />
              </TouchableOpacity>
              </View>
          </View> */}
            <View style={styles.containerr}>
            <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={styles.label}>Project Type</Text>
          <Text style={styles.value}>Apartment</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.label}>Status</Text>
          <Text style={styles.value}>New Launch</Text>
        </View>
      </View>

      {/* Second Row */}
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={styles.label}>Possession Date</Text>
          <Text style={styles.value}>31-08-2029</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.label}>Location</Text>
          <Ionicons name="location-outline" size={20} color="#000" />
        </View>
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

        {/* Project Head Section */}
<View style={styles.projectHeadSection}>
  <View style={styles.projectHeadCard}>
    <View style={styles.projectHeadAvatar}>
      <Text style={styles.avatarText}>AS</Text>
    </View>
    <View>
      <Text style={styles.projectHeadName}>ANKIT SINGH</Text>
      <Text style={styles.projectHeadRole}>PROJECT HEAD</Text>
     
    </View>
  </View>
  <TouchableOpacity style={styles.bottomSection} onPress={handleCall}>
        <Text style={styles.phone}>{phoneNumber}</Text>
        <Ionicons name="call-outline" size={20} color="#fff" />
      </TouchableOpacity>
</View>

{/* Project Info */}
<View style={styles.projectInfo}>
  <Text style={styles.infoLabels}>Construction Status</Text>
  <Text style={styles.infoValue}>New Launch</Text>
  <Text style={styles.infoLabels}>Project Location</Text>
  <Text style={styles.infoValue}>Noida, Greator Noida Expressway</Text>
  <Text style={styles.infoLabels}>RERA</Text>
  <Text style={styles.infoValue}>UPRERAPRJ1183246</Text>
</View>

{/* Share and Download */}
<View style={styles.buttonsContainer}>
  <TouchableOpacity style={styles.shareProjectButton} onPress={handleShare}>
    <Text style={styles.shareText}>Share Project Information</Text>
    <Ionicons name="share-social-outline" size={20} color="#666" />
  </TouchableOpacity>

  <TouchableOpacity style={styles.downloadButton}>
    <Text style={styles.downloadText}>Download Brochure</Text>
    <Ionicons name="download-outline"   size={20} color="#000" />
  </TouchableOpacity>
</View>

{/* Gallery */}
{/* Gallery */}
<View style={styles.gallerySection}>
  <Text style={styles.sectionTitle}>Gallery</Text>
  <View style={styles.galleryGrid}>
    {[1,2,3,4,5,6].map((_, index) => (
      <Image
        key={index}
        source={require('../../assets/image/g1.png')}
        style={styles.galleryGridImage}
      />
    ))}
  </View>
</View>


{/* Location Map */}
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Location</Text>
  <Image
    source={require('../../assets/image/location.png')}
    style={styles.locationImage}
  />
</View>

{/* Amenities */}
<FlatList
      data={amenities}
      numColumns={3}
      keyExtractor={(item) => item.name}
      contentContainerStyle={styles.grid}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Ionicons name={item.icon} size={32} color="#000" />
          <Text style={styles.labelss}>{item.name}</Text>
        </View>
      )}
    />

{/* Layout Plans */}
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Layouts</Text>
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    {[1, 2].map((_, index) => (
      <Image
        key={index}
        source={require('../../assets/image/layout.png')}
        style={styles.layoutImage}
      />
    ))}
  </ScrollView>
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
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    // paddingHorizontal: 16,
    // paddingTop: 50,
    // paddingBottom: 20,
    // borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: 8,
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brochureButton: {
    backgroundColor: '#8B9A46',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('3.3%'),
    paddingVertical: hp('0.74%'),
    borderRadius: wp('1.7%'),
    marginRight: wp('3.3%'),
  },
  brochureText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  shareButton: {
    padding: 6,
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
    top: hp('2%'),
    right: wp('4.4%'),
    width: wp('10%'),
    height: wp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    fontSize: 24,
    color: '#E53E3E',
  },
  propertyLogo: {
    position: 'absolute',
    top: hp('2%'),
    left: wp('4.4%'),
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
    bottom: hp('2%'),
    left: wp('4.4%'),
    flexDirection: 'row',
  },
  tag: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: wp('3.3%'),
    paddingVertical: hp('0.74%'),
    borderRadius: wp('4.4%'),
    marginRight: wp('2.2%'),
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  detailsContainer: {
    padding: wp('4.4%'),
  },
  propertyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8D9533',
    // backgroundColor:'#8D9533',
    marginBottom: hp('1%'),
  },
  propertyPrice: {
    fontSize: 20,
    color: '#252B5C',
    marginBottom: hp('3%'),
  },
  infoSection: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  infoRow: {
    flexDirection: 'column',
    flex: 1,
    padding: wp('3.3%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fdfdfd',
    borderRightWidth: 1,
    borderColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 16,
    color: '#6B7932',
  },
  infoLabels: {
    fontSize: 16,
    color: '#333',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    paddingBottom:hp('0.9%'),
    fontWeight: '500',
  },
  locationButton: {
    padding: wp('1.1%'),
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
  projectHeadSection: {
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  projectHeadCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: '#e6ecc0',
    borderRadius: 6,
  },
  projectHeadAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#b1b96a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  projectHeadName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  projectHeadRole: {
    fontSize: 12,
    color: '#6e6e6e',
  },
  projectHeadPhone: {
    fontSize: 14,
    color: '#3a3a3a',
    marginTop: 4,
  },
  
  projectInfo: {
    padding: 16,
    backgroundColor: '#fff',
  },
  buttonsContainer: {
    flexDirection: 'column',
    gap: 10,
    padding: 16,
  },
  shareProjectButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: 12,
    borderRadius: 8,
    width: '100%',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    backgroundColor: '#f4f4f4',
    padding: 12,
    borderRadius: 6,
    gap: 10,
  },
  shareText: {
    fontSize: 14,
    color:'#8D9533',
  },
  downloadText: {
    fontSize: 14,
    color: '#000',
  },
  
  gallerySection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  galleryImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  
  section: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  locationImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  amenityItem: {
    width: '30%',
    marginBottom: 16,
    alignItems: 'center',
  },
  amenityText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 6,
  },
  
  layoutImage: {
    width: 180,
    height: 180,
    marginRight: 12,
    borderRadius: 8,
  },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  galleryGridImage: {
    width: '32%',
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
    gap:5,
    marginBottom:5,
  },
  cell: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fdfdfd',
    borderRightWidth: 1,
    borderColor: 'white',
  },
  label: {
    fontSize: 12,
    color: '#7d8b3c',
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    color: '#1c1c3c',
    fontWeight: '600',
    marginTop: 4,
  },
  

  containerr: {
    borderWidth: 1,
    backgroundColor:'#e6e1e1',
    borderColor: 'white',
    borderRadius: 6,
    overflow: 'hidden',
    marginVertical: 10,
  },
  phone: {
    color: '#fff',
    fontSize: 14,
  },
  bottomSection: {
    backgroundColor: '#8a9a3a',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },




  grid: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  item: {
    flex: 1,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    // borderRadius: 10,
    backgroundColor: '#f7f7f7',
    // borderWidth: 1,
    borderColor: '#ddd',
  },
  labelss: {
    marginTop: 6,
    textAlign: 'center',
    fontSize: 14,
  },
});

export default PropertyDetailScreen; 
